import { createClient }     from "@/utils/supabase/server"
import WelcomeRow           from "@/components/dashboard/overview/WelcomeRow"
import StatCards            from "@/components/dashboard/overview/StatCards"
import RevisionCalendar     from "@/components/dashboard/overview/RevisionCalendar"
import ChartsRow            from "@/components/dashboard/overview/ChartsRow"
import WeaknessSection      from "@/components/dashboard/overview/WeaknessSection"
import HeatmapRow           from "@/components/dashboard/overview/HeatmapRow"
import ActivityRow          from "@/components/dashboard/overview/ActivityRow"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: profile },
    { data: docs },
    { count: totalConcepts },
    { data: masteryScores },
    { data: quizzes },
    { data: quizQuestions },
    { data: revisionItems },
  ] = await Promise.all([
    supabase.from("profiles").select("name").eq("id", user.id).single(),
    supabase.from("documents").select("id, file_name, word_count, created_at, courses(course_name)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
    supabase.from("concepts").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("mastery_scores").select("score, status, accuracy, speed_score, recency_boost, error_penalty, updated_at, concept_id, concepts(concept_name, course_id, courses(course_name))").eq("user_id", user.id),
    supabase.from("quizzes").select("id, score, accuracy, time_taken_seconds, created_at, completed_at, status").eq("user_id", user.id).eq("status", "completed").order("completed_at", { ascending: true }),
    supabase.from("quiz_questions").select("is_correct, time_taken_seconds, quiz_id").eq("user_id", user.id),
    supabase.from("revision_schedule").select("id, scheduled_date, priority, is_completed, concepts(concept_name)").eq("user_id", user.id).eq("is_completed", false).order("scheduled_date", { ascending: true }).limit(4),
  ])

  // --- stat cards ---
  const mastered      = masteryScores?.filter((m) => m.status === "mastered").length       ?? 0
  const needsRevision = masteryScores?.filter((m) => m.status === "needs_revision").length ?? 0
  const critical      = masteryScores?.filter((m) => m.status === "critical").length       ?? 0
  const avgMastery    = masteryScores?.length
    ? Math.round(masteryScores.reduce((s, m) => s + (m.score ?? 0), 0) / masteryScores.length)
    : 0

  const stats = { avgMastery, mastered, totalConcepts: totalConcepts ?? 0, needsRevision, critical }

  // --- bar chart: concept name → mastery score ---
  const barData = (masteryScores ?? [])
    .filter((m) => m.concepts?.concept_name)
    .map((m) => ({ topic: m.concepts.concept_name, mastery: Math.round(m.score ?? 0) }))
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 10)

  // --- line chart: quiz completed_at → avg mastery on that day ---
  const lineByDate = {}
  ;(quizzes ?? []).forEach((q) => {
    const day = q.completed_at?.slice(0, 10)
    if (!day) return
    if (!lineByDate[day]) lineByDate[day] = { scores: [], accuracies: [] }
    lineByDate[day].scores.push(q.accuracy ?? 0)
    lineByDate[day].accuracies.push(q.accuracy ?? 0)
  })
  const sortedDays = Object.keys(lineByDate).sort()
  const masteryLine = {
    id: "Overall Mastery",
    color: "var(--color-brand)",
    data: sortedDays.map((d) => ({
      x: d.slice(5),
      y: Math.round(lineByDate[d].scores.reduce((s, v) => s + v, 0) / lineByDate[d].scores.length),
    })),
  }
  const accuracyLine = {
    id: "Quiz Accuracy",
    color: "rgba(255,255,255,0.4)",
    data: sortedDays.map((d) => ({
      x: d.slice(5),
      y: Math.round(lineByDate[d].accuracies.reduce((s, v) => s + v, 0) / lineByDate[d].accuracies.length),
    })),
  }
  const lineData = sortedDays.length > 0 ? [masteryLine, accuracyLine] : []

  // --- weakness list: bottom 3 by score ---
  const weaknesses = (masteryScores ?? [])
    .filter((m) => m.concepts?.concept_name)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 3)
    .map((m) => ({
      name:    m.concepts.concept_name,
      sub:     `${m.concepts.courses?.course_name ?? "Unknown"} · Confidence: ${Math.round(m.score ?? 0)}%`,
      mastery: Math.round(m.score ?? 0),
      status:  m.score < 40 ? "CRITICAL" : m.score < 65 ? "MODERATE" : "STABLE",
      statusColor: m.score < 40 ? "#F87171" : m.score < 65 ? "#FBBF24" : "#4ADE80",
    }))

  // --- radar: 6 dimensions from quiz data ---
  const totalQuestions  = quizQuestions?.length ?? 0
  const correctAnswers  = quizQuestions?.filter((q) => q.is_correct).length ?? 0
  const avgAccuracy     = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  const avgSpeedRaw     = quizQuestions?.filter((q) => q.time_taken_seconds > 0)
  const avgSpeed        = avgSpeedRaw?.length
    ? Math.round(Math.max(0, 100 - (avgSpeedRaw.reduce((s, q) => s + q.time_taken_seconds, 0) / avgSpeedRaw.length / 60) * 100))
    : 0

  const quizDates       = (quizzes ?? []).map((q) => q.completed_at?.slice(0, 10)).filter(Boolean)
  const uniqueDays      = new Set(quizDates).size
  const consistency     = quizzes?.length ? Math.min(100, Math.round((uniqueDays / Math.max(1, quizzes.length)) * 100)) : 0

  const avgRecency      = masteryScores?.length
    ? Math.round(masteryScores.reduce((s, m) => s + (m.recency_boost ?? 0), 0) / masteryScores.length)
    : 0

  const firstScore      = quizzes?.[0]?.accuracy ?? 0
  const lastScore       = quizzes?.[quizzes.length - 1]?.accuracy ?? 0
  const improvement     = quizzes?.length > 1 ? Math.min(100, Math.round(Math.max(0, lastScore - firstScore) + 50)) : 0

  const engagement      = Math.min(100, Math.round(((quizzes?.length ?? 0) / 10) * 100))

  const radarData = [
    { skill: "Accuracy",    score: avgAccuracy },
    { skill: "Speed",       score: avgSpeed },
    { skill: "Consistency", score: consistency },
    { skill: "Retention",   score: avgRecency },
    { skill: "Improvement", score: improvement },
    { skill: "Engagement",  score: engagement },
  ]
  const overallScore = Math.round(
    radarData.reduce((s, d) => s + d.score, 0) / radarData.length
  )

  // --- heatmap: concept × week ---
  const weekLabels = ["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"]
  const heatmapData = (masteryScores ?? [])
    .filter((m) => m.concepts?.concept_name)
    .slice(0, 6)
    .map((m) => ({
      id: m.concepts.concept_name,
      data: weekLabels.map((w) => ({ x: w, y: Math.round(m.score ?? 0) })),
    }))

  // --- calendar: quiz sessions per day ---
  const sessionsByDay = {}
  ;(quizzes ?? []).forEach((q) => {
    const day = q.completed_at?.slice(0, 10)
    if (!day) return
    sessionsByDay[day] = (sessionsByDay[day] ?? 0) + 1
  })
  const calendarData = Object.entries(sessionsByDay).map(([day, value]) => ({ day, value }))

  // --- streak stats ---
  const sortedQuizDays = [...new Set((quizzes ?? []).map((q) => q.completed_at?.slice(0, 10)).filter(Boolean))].sort()
  let currentStreak = 0, longestStreak = 0, streak = 0
  const today = new Date().toISOString().slice(0, 10)
  for (let i = sortedQuizDays.length - 1; i >= 0; i--) {
    const expected = new Date(today)
    expected.setDate(expected.getDate() - (sortedQuizDays.length - 1 - i))
    if (sortedQuizDays[i] === expected.toISOString().slice(0, 10)) {
      currentStreak++
    } else break
  }
  for (let i = 0; i < sortedQuizDays.length; i++) {
    if (i === 0) { streak = 1; continue }
    const prev = new Date(sortedQuizDays[i - 1])
    prev.setDate(prev.getDate() + 1)
    streak = prev.toISOString().slice(0, 10) === sortedQuizDays[i] ? streak + 1 : 1
    longestStreak = Math.max(longestStreak, streak)
  }
  longestStreak = Math.max(longestStreak, currentStreak)

  const streakStats = {
    currentStreak,
    longestStreak,
    totalSessions: quizzes?.length ?? 0,
    activeDays:    uniqueDays,
  }

  // --- calendar date range ---
  const now     = new Date()
  const calFrom = new Date(now.getFullYear(), 0, 1).toISOString().slice(0, 10)
  const calTo   = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10)

  // --- revision planner items ---
  const today2 = new Date().toISOString().slice(0, 10)
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().slice(0, 10)

  const revisionList = (revisionItems ?? []).map((r) => {
    const d = r.scheduled_date
    const due = d === today2 ? "Today" : d === tomorrowStr ? "Tomorrow"
      : `In ${Math.ceil((new Date(d) - new Date(today2)) / 86400000)} days`
    const dot = r.priority === "critical" ? "#F87171"
      : r.priority === "high" ? "#FBBF24"
      : r.priority === "medium" ? "#FA6E43"
      : "#4ADE80"
    return { name: r.concepts?.concept_name ?? "Unknown", due, dot }
  })

  return (
    <div className="max-w-330 mx-auto flex flex-col gap-4 py-4">
      <WelcomeRow name={profile?.name ?? user.email} avgMastery={avgMastery} />
      <StatCards stats={stats} />
      <RevisionCalendar calendarData={calendarData} streakStats={streakStats} calFrom={calFrom} calTo={calTo} />
      <ChartsRow barData={barData} lineData={lineData} />
      <WeaknessSection weaknesses={weaknesses} radarData={radarData} overallScore={overallScore} />
      <HeatmapRow heatmapData={heatmapData} revisionItems={revisionList} />
      <ActivityRow recentDocs={docs ?? []} />
    </div>
  )
}