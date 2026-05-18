import { createClient } from "@/utils/supabase/server"

export async function GET(req) {
  try {
    const supabase   = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ concepts: [] })

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")
    if (!courseId) return Response.json({ concepts: [] })

    const { data } = await supabase
      .from("mastery_scores")
      .select("score, concept_id, concepts(id, concept_name, course_id)")
      .eq("user_id", user.id)
      .lt("score", 75)
      .order("score", { ascending: true })
      .limit(5)

    const concepts = (data ?? [])
      .filter((m) => m.concepts?.course_id === courseId)
      .map((m) => ({
        id:    m.concept_id,
        name:  m.concepts.concept_name,
        score: Math.round(m.score ?? 0),
      }))

    return Response.json({ concepts })
  } catch {
    return Response.json({ concepts: [] })
  }
}