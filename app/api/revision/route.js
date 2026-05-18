import { createClient } from "@/utils/supabase/server"

export async function GET(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    const today = new Date().toISOString().slice(0, 10)

    // Fetch revision schedule with concept + mastery info
    let query = supabase
      .from("revision_schedule")
      .select(`
        id,
        scheduled_date,
        priority,
        is_completed,
        completed_at,
        interval_days,
        concept_id,
        concepts (
          id,
          concept_name,
          course_id,
          courses ( id, course_name )
        )
      `)
      .eq("user_id", user.id)
      .order("scheduled_date", { ascending: true })

    const { data: schedule } = await query

    if (!schedule?.length) return Response.json({ items: [], stats: {} })

    // Filter by course if provided
    const filtered = courseId
      ? schedule.filter((r) => r.concepts?.course_id === courseId)
      : schedule

    // Fetch mastery scores for all concepts
    const conceptIds = [...new Set(filtered.map((r) => r.concept_id).filter(Boolean))]
    const { data: masteryData } = await supabase
      .from("mastery_scores")
      .select("concept_id, score, last_practiced")
      .eq("user_id", user.id)
      .in("concept_id", conceptIds)

    const masteryMap = {}
    masteryData?.forEach((m) => { masteryMap[m.concept_id] = m })

    // Build enriched items
    const items = filtered.map((r) => {
      const mastery     = masteryMap[r.concept_id]
      const score       = Math.round(mastery?.score ?? 0)
      const lastPracticed = mastery?.last_practiced ?? null
      const schedDate   = r.scheduled_date
      const isOverdue   = !r.is_completed && schedDate < today
      const isDueToday  = !r.is_completed && schedDate === today
      const isUpcoming  = !r.is_completed && schedDate > today
      const isCompleted = r.is_completed

      // Calculate days since last practice
      let lastReviewedLabel = "Never"
      if (lastPracticed) {
        const days = Math.floor((Date.now() - new Date(lastPracticed).getTime()) / 86400000)
        lastReviewedLabel = days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`
      }

      // Estimated session time based on mastery
      const estimatedTime = score < 40 ? "15–20 min" : score < 65 ? "10–15 min" : "5–10 min"

      // Decay: rough estimate — lower mastery + more days = higher decay
      const daysSince = lastPracticed
        ? Math.floor((Date.now() - new Date(lastPracticed).getTime()) / 86400000)
        : 30
      const decay = -Math.min(25, Math.round(daysSince * (1 - score / 100) * 0.8))

      return {
        id:             r.id,
        conceptId:      r.concept_id,
        conceptName:    r.concepts?.concept_name ?? "Unknown",
        courseName:     r.concepts?.courses?.course_name ?? "Unknown",
        courseId:       r.concepts?.course_id ?? null,
        scheduledDate:  schedDate,
        priority:       r.priority,
        isCompleted,
        completedAt:    r.completed_at,
        score,
        decay,
        lastReviewed:   lastReviewedLabel,
        estimatedTime,
        status: isOverdue ? "overdue" : isDueToday ? "due" : isCompleted ? "completed" : "upcoming",
      }
    })

    // Stats
    const overdue   = items.filter((i) => i.status === "overdue").length
    const dueToday  = items.filter((i) => i.status === "due").length
    const completed = items.filter((i) => i.isCompleted).length
    const upcoming  = items.filter((i) => i.status === "upcoming").length
    const total     = items.length

    // Calendar data — map scheduled_date → status
    const calendarMap = {}
    items.forEach((item) => {
      const d = item.scheduledDate
      if (!calendarMap[d]) calendarMap[d] = []
      calendarMap[d].push(item.status)
    })

    return Response.json({
      items,
      stats: { overdue, dueToday, completed, upcoming, total },
      calendarMap,
    })
  } catch (err) {
    console.error("Revision route error:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}