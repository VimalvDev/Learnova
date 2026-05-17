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

  // Fetch profile for name
  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single()

  // Fetch document stats
  const { data: docs } = await supabase
    .from("documents")
    .select("id, file_name, file_type, word_count, status, created_at, courses(course_name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Fetch concept counts
  const { count: totalConcepts } = await supabase
    .from("concepts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Fetch mastery scores
  const { data: masteryScores } = await supabase
    .from("mastery_scores")
    .select("score, status")
    .eq("user_id", user.id)

  // Compute stats
  const totalDocs      = docs?.length ?? 0
  const recentDocs     = docs ?? []

  const mastered       = masteryScores?.filter((m) => m.status === "mastered").length        ?? 0
  const needsRevision  = masteryScores?.filter((m) => m.status === "needs_revision").length  ?? 0
  const critical       = masteryScores?.filter((m) => m.status === "critical").length        ?? 0
  const avgMastery     = masteryScores?.length
    ? Math.round(masteryScores.reduce((sum, m) => sum + (m.score ?? 0), 0) / masteryScores.length)
    : 0

  const stats = {
    avgMastery,
    mastered,
    totalConcepts: totalConcepts ?? 0,
    needsRevision,
    critical,
  }

  return (
    <div className="max-w-330 mx-auto flex flex-col gap-4 py-4">
      <WelcomeRow name={profile?.name ?? user.email} avgMastery={avgMastery} />
      <StatCards stats={stats} />
      <RevisionCalendar />
      <ChartsRow />
      <WeaknessSection />
      <HeatmapRow />
      <ActivityRow recentDocs={recentDocs} />
    </div>
  )
}