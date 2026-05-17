import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

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

        // Check if unit with same name already exists in this course
        const { data: existing } = await supabase
          .from("units")
          .select("id")
          .eq("course_id", course_id)
          .eq("unit_name", unitName)
          .maybeSingle()

        if (existing) {
          unitId = existing.id
        } else {
          // Get next order_index
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
    }

    return NextResponse.json({ success: true, documents: savedDocs })

  } catch (err) {
    console.error("Confirm error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}