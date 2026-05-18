import { createClient } from "@/utils/supabase/server"
import RevisionPageClient from "@/components/dashboard/revision/RevisionPageClient"

export default async function RevisionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: courses } = await supabase
    .from("courses")
    .select("id, course_name")
    .eq("user_id", user.id)
    .eq("status", "published")
    .order("created_at", { ascending: false })

  return <RevisionPageClient courses={courses ?? []} />
}