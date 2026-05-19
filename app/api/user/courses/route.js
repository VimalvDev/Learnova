import { createClient } from "@/utils/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ courses: [] })

    const { data: courses } = await supabase
      .from("courses")
      .select("id, course_name, subject_category, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    return Response.json({ courses: courses ?? [] })
  } catch {
    return Response.json({ courses: [] })
  }
}