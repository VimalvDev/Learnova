import { createClient } from "@/utils/supabase/server"

export async function POST(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { revisionId } = await req.json()
    if (!revisionId) return Response.json({ error: "revisionId required" }, { status: 400 })

    await supabase
      .from("revision_schedule")
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq("id", revisionId)
      .eq("user_id", user.id)

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}