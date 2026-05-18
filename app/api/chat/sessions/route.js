import { createClient } from "@/utils/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ sessions: [] })

    const { data: sessions } = await supabase
      .from("chat_sessions")
      .select("id, mode, session_title, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    return Response.json({ sessions: sessions ?? [] })
  } catch {
    return Response.json({ sessions: [] })
  }
}