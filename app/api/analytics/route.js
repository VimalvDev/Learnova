import { createClient } from "@/utils/supabase/server"

export async function GET(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    // 1. Fetch all mastery scores with concept info
    let masteryQuery = supabase
      .from("mastery_scores")
      .select(`
        score, accuracy, speed_score, error_penalty, recency_boost,
        status, last_practiced, updated_at,
        concept_id,
        concepts ( id, concept_name, course_id, document_id,
          courses ( id, course_name )
        )
      `)
      .eq("user_id", user.id)

    const { data: masteryRows } = await masteryQuery

    const filtered = courseId
      ? (masteryRows ?? []).filter((m) => m.concepts?.course_id === courseId)
      : (masteryRows ?? [])

    // 2. Compute overview stats
    const scores       = filtered.map((m) => m.score ?? 0)
    const avgMastery   = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    const mastered     = filtered.filter((m) => m.status === "mastered").length
    const critical     = filtered.filter((m) => m.status === "critical").length
    const needsRev     = filtered.filter((m) => m.status === "needs_revision").length
    const good         = filtered.filter((m) => m.status === "good").length
    const notStarted   = filtered.filter((m) => m.status === "not_started").length

    // 3. Fetch quizzes for this user
    let quizQuery = supabase
      .from("quizzes")
      .select("id, accuracy, time_taken_seconds, completed_at, score, total_questions, status")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("completed_at", { ascending: true })

    if (courseId) quizQuery = quizQuery.eq("course_id", courseId)
    const { data: quizzes } = await quizQuery

    // 4. Fetch quiz questions for avg response time + error patterns
let questionsQuery = supabase
  .from("quiz_questions")
  .select("quiz_id, concept_id, is_correct, time_taken_seconds, question_type, user_answer, correct_answer")
  .eq("user_id", user.id)
  .not("time_taken_seconds", "is", null)

if (courseId) {
  const quizIds = (quizzes ?? []).map((q) => q.id)
  if (quizIds.length > 0) {
    questionsQuery = questionsQuery.in("quiz_id", quizIds)
  } else {
    questionsQuery = questionsQuery.limit(0)
  }
}

const { data: qs } = await questionsQuery.limit(500)
const questions = qs ?? []
    // 5. Improvement rate — compare last 7 days vs previous 7 days
    const now      = new Date()
    const day7     = new Date(now); day7.setDate(now.getDate() - 7)
    const day14    = new Date(now); day14.setDate(now.getDate() - 14)
    const recent7  = (quizzes ?? []).filter((q) => new Date(q.completed_at) >= day7)
    const prev7    = (quizzes ?? []).filter((q) => new Date(q.completed_at) >= day14 && new Date(q.completed_at) < day7)
    const avgRecent = recent7.length  ? Math.round(recent7.reduce((s, q)  => s + (q.accuracy ?? 0), 0) / recent7.length)  : 0
    const avgPrev   = prev7.length    ? Math.round(prev7.reduce((s, q)    => s + (q.accuracy ?? 0), 0) / prev7.length)    : 0
    const improvementRate = avgPrev > 0 ? avgRecent - avgPrev : 0

    // 6. Avg response time
    const timedQs    = questions.filter((q) => (q.time_taken_seconds ?? 0) > 0)
    const avgResponse = timedQs.length
      ? Math.round(timedQs.reduce((s, q) => s + q.time_taken_seconds, 0) / timedQs.length)
      : 0

    // Compare to 30-day average
    const day30    = new Date(now); day30.setDate(now.getDate() - 30)
    const old30Ids = (quizzes ?? []).filter((q) => new Date(q.completed_at) < day7 && new Date(q.completed_at) >= day30).map((q) => q.id)
    const oldQs    = questions.filter((q) => old30Ids.includes(q.quiz_id) && (q.time_taken_seconds ?? 0) > 0)
    const oldAvgResp = oldQs.length ? Math.round(oldQs.reduce((s, q) => s + q.time_taken_seconds, 0) / oldQs.length) : 0
    const responseDelta = oldAvgResp > 0 ? Math.round(((avgResponse - oldAvgResp) / oldAvgResp) * 100) : 0

    // 7. Concept table rows
    const conceptRows = filtered.map((m) => ({
      id:          m.concept_id,
      name:        m.concepts?.concept_name ?? "Unknown",
      courseId:    m.concepts?.course_id,
      courseName:  m.concepts?.courses?.course_name ?? "",
      mastery:     Math.round(m.score ?? 0),
      accuracy:    Math.round(m.accuracy ?? 0),
      speedScore:  Math.round(m.speed_score ?? 0),
      errorPenalty: Math.round(m.error_penalty ?? 0),
      status:      m.status ?? "not_started",
      lastPracticed: m.last_practiced,
    })).sort((a, b) => a.mastery - b.mastery)

    // 8. Performance trend — mastery scores grouped by week
    const trendMap = {}
    filtered.forEach((m) => {
      if (!m.updated_at) return
      const d    = new Date(m.updated_at)
      const week = `${d.getFullYear()}-W${String(Math.ceil(d.getDate() / 7)).padStart(2, "0")}-${d.getMonth() + 1}`
      if (!trendMap[week]) trendMap[week] = []
      trendMap[week].push(m.score ?? 0)
    })
    const trendData = Object.entries(trendMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8)
      .map(([week, scores]) => ({
        label: week.split("-").slice(1).join("/"),
        mastery: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))

    // Quiz accuracy trend
    const quizTrend = (quizzes ?? []).slice(-8).map((q) => ({
      label:    q.completed_at?.slice(5, 10) ?? "",
      accuracy: Math.round(q.accuracy ?? 0),
    }))

    // 9. Weakness patterns from real data
    const patterns = []

    // Pattern 1: Repeated errors — concepts with error_penalty > 10
    const repeatedErrors = filtered
      .filter((m) => (m.error_penalty ?? 0) > 10)
      .sort((a, b) => (b.error_penalty ?? 0) - (a.error_penalty ?? 0))
      .slice(0, 3)
    if (repeatedErrors.length > 0) {
      patterns.push({
        type:     "repeated_error",
        icon:     "🔁",
        title:    "Repeated Mistakes",
        severity: "High",
        body:     `You have repeated errors on ${repeatedErrors.map((m) => m.concepts?.concept_name).join(", ")}. These are persistent mistakes, not just knowledge gaps.`,
        concepts: repeatedErrors.map((m) => m.concepts?.concept_name ?? "").filter(Boolean),
      })
    }

    // Pattern 2: Prerequisite gap — critical concepts
    const criticalConcepts = filtered.filter((m) => m.status === "critical")
    if (criticalConcepts.length > 0 && needsRev > 0) {
      patterns.push({
        type:     "prereq_gap",
        icon:     "⬡",
        title:    "Prerequisite Gap",
        severity: "Medium",
        body:     `${criticalConcepts.length} concepts are critically weak (below 40%). These may be blocking progress on related topics. Focus on foundational concepts first.`,
        concepts: criticalConcepts.slice(0, 2).map((m) => m.concepts?.concept_name ?? "").filter(Boolean),
      })
    }

    // Pattern 3: Speed vs accuracy
    const speedRisk = filtered.filter((m) => (m.speed_score ?? 0) > 70 && (m.accuracy ?? 0) < 60)
    if (speedRisk.length > 0) {
      patterns.push({
        type:     "speed_accuracy",
        icon:     "⚡",
        title:    "Speed-Accuracy Imbalance",
        severity: "Medium",
        body:     `${speedRisk.length} concepts show fast answers but low accuracy — this may indicate guessing rather than understanding.`,
        concepts: speedRisk.slice(0, 2).map((m) => m.concepts?.concept_name ?? "").filter(Boolean),
        speedScore: Math.round(speedRisk[0]?.speed_score ?? 0),
        accuracyScore: Math.round(speedRisk[0]?.accuracy ?? 0),
      })
    }

    // Pattern 4: Retention decay — mastered concepts not practiced recently
    const decayRisk = filtered.filter((m) => {
      if (m.status !== "mastered" && m.status !== "good") return false
      if (!m.last_practiced) return false
      const daysSince = Math.floor((Date.now() - new Date(m.last_practiced).getTime()) / 86400000)
      return daysSince > 14
    })
    if (decayRisk.length > 0) {
      const item = decayRisk[0]
      const days = Math.floor((Date.now() - new Date(item.last_practiced).getTime()) / 86400000)
      patterns.push({
        type:     "retention_decay",
        icon:     "📉",
        title:    "Retention Decay Risk",
        severity: "Low",
        body:     `${decayRisk.length} mastered concepts haven't been reviewed in ${days}+ days. Knowledge decay may already be occurring.`,
        concepts: decayRisk.slice(0, 2).map((m) => m.concepts?.concept_name ?? "").filter(Boolean),
      })
    }

    // 10. Heatmap cells
    const heatmapCells = filtered.map((m) => ({
      name:   m.concepts?.concept_name ?? "Unknown",
      score:  m.score !== null ? Math.round(m.score) : null,
      status: m.status ?? "not_started",
    }))

    // Add unstudied concepts (concepts table but no mastery score)
    // We already have filtered mastery rows — unstudied = status "not_started"

    return Response.json({
      overview: {
        avgMastery,
        mastered,
        critical,
        needsRev,
        good,
        notStarted,
        totalConcepts: filtered.length,
        improvementRate,
        avgResponse,
        responseDelta,
        quizCount: (quizzes ?? []).length,
        lastUpdated: new Date().toISOString(),
      },
      conceptRows,
      trendData,
      quizTrend,
      patterns,
      heatmapCells,
    })
  } catch (err) {
    console.error("Analytics error:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}