import { createClient } from "@/utils/supabase/server"

export async function GET(req, { params }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ units: [] })

    const { courseId } = await params

    const { data: units } = await supabase
      .from("units")
      .select("id, unit_name, order_index, documents(id, file_name, word_count, status)")
      .eq("course_id", courseId)
      .eq("user_id", user.id)
      .order("order_index", { ascending: true })

    return Response.json({ units: units ?? [] })
  } catch {
    return Response.json({ units: [] })
  }
}