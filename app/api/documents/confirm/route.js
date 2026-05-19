import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { callGemini } from "@/lib/clients"

export async function POST(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { course_id, file_name, file_type, word_count, page_count, units } = await req.json()

    const savedDocs = []

    for (let i = 0; i < units.length; i++) {
      const unit   = units[i]
      let   unitId = unit.unit_id ?? null

      if (!unitId) {
        const unitName = unit.unit_name?.trim() || "General"
        const { data: existing } = await supabase
          .from("units")
          .select("id")
          .eq("course_id", course_id)
          .eq("unit_name", unitName)
          .maybeSingle()

        if (existing) {
          unitId = existing.id
        } else {
          const { data: lastUnit } = await supabase
            .from("units")
            .select("order_index")
            .eq("course_id", course_id)
            .order("order_index", { ascending: false })
            .limit(1)
            .maybeSingle()

          const nextIndex = (lastUnit?.order_index ?? -1) + 1
          const { data: newUnit, error: unitError } = await supabase
            .from("units")
            .insert({
              course_id,
              user_id:     user.id,
              unit_name:   unitName,
              order_index: nextIndex,
            })
            .select()
            .single()

          if (unitError) throw new Error(`Unit insert failed: ${unitError.message}`)
          unitId = newUnit.id
        }
      }

      const unitWordCount = unit.content?.split(/\s+/).filter(Boolean).length ?? 0

      const { data: doc, error: docError } = await supabase
        .from("documents")
        .insert({
          user_id:        user.id,
          course_id,
          unit_id:        unitId,
          file_name:      units.length > 1 ? `${file_name} — ${unit.unit_name}` : file_name,
          file_type,
          extracted_text: unit.content,
          word_count:     unitWordCount,
          chunk_count:    Math.ceil(unitWordCount / 500),
          page_count:     i === 0 ? (page_count ?? 0) : 0,
          status:         "complete",
        })
        .select()
        .single()

      if (docError) throw new Error(`Document insert failed: ${docError.message}`)
      savedDocs.push(doc)

      // Extract concepts from this document using Gemini
      try {
        const text = (unit.content ?? "").slice(0, 6000)
        if (text.trim().length > 100) {
          const conceptPrompt = `You are an academic concept extractor.

Extract the key concepts/topics from this study material. These will be used to track a student's mastery of each topic.

RULES:
- Extract 5-15 concepts depending on content length
- Each concept should be a distinct topic or idea
- Keep names short and clear (2-5 words max)
- Respond ONLY with a valid JSON array, no markdown, no extra text

FORMAT:
[
  { "name": "concept name", "description": "one sentence description" }
]

STUDY MATERIAL:
${text}`

          const raw = await callGemini(conceptPrompt)
          let concepts = []

          try {
            const match = raw.match(/\[[\s\S]*\]/)
            if (match) concepts = JSON.parse(match[0])
          } catch {}

          if (concepts.length > 0) {
            const conceptsToInsert = concepts
              .filter((c) => c.name?.trim())
              .map((c) => ({
                user_id:     user.id,
                course_id,
                document_id: doc.id,
                concept_name: c.name.trim(),
                description:  c.description?.trim() ?? null,
              }))

            if (conceptsToInsert.length > 0) {
              await supabase.from("concepts").insert(conceptsToInsert)
            }
          }
        }
      } catch (conceptErr) {
        // Don't fail the whole request if concept extraction fails
        console.error("Concept extraction failed:", conceptErr.message)
      }
    }

    return NextResponse.json({ success: true, documents: savedDocs })
  } catch (err) {
    console.error("Confirm error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}