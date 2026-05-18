import { createClient } from "@/utils/supabase/server"
import AnalyticsClient  from "@/components/dashboard/analytics/AnalyticsClient"

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: courses } = await supabase
    .from("courses")
    .select("id, course_name")
    .eq("user_id", user.id)
    .eq("status", "published")
    .order("created_at", { ascending: false })

  return <AnalyticsClient courses={courses ?? []} />
}