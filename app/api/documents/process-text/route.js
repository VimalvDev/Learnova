import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { text, name, course_id } = await req.json()

    if (!text?.trim()) return NextResponse.json({ error: "No text provided" },      { status: 400 })
    if (!course_id)    return NextResponse.json({ error: "No course_id provided" }, { status: 400 })

    const wordCount = text.split(/\s+/).filter(Boolean).length
    const units     = await detectUnits(text, name || "Pasted Notes")

    return NextResponse.json({
      success:    true,
      file_name:  name || "Pasted Notes",
      file_type:  "txt",
      word_count: wordCount,
      page_count: 0,
      units,
    })
  } catch (err) {
    console.error("Process-text error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

async function detectUnits(text, name) {
  const trimmed = text.slice(0, 12000)

  const prompt = `
You are analyzing a student's study notes called "${name}".

Extract the logical units or sections from the text below.
A "unit" is a major topic section — like UNIT-I, Chapter 1, Module 1, or any clearly separated topic block.

Rules:
- If you find clear unit/chapter/module divisions, split by those.
- If the document is one continuous topic with no divisions, return a single unit using the document title or main topic as the name.
- Each unit must include ALL the text that belongs to it.
- Return ONLY valid JSON. No explanation. No markdown. No backticks.

Format:
[
  { "unit_name": "Unit name here", "content": "Full text of this unit here" },
  ...
]

Document text:
${trimmed}
`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents:         [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1 },
      }),
    }
  )

  const json = await res.json()
  const raw  = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

  try {
    const cleaned = raw.replace(/```json|```/g, "").trim()
    return JSON.parse(cleaned)
  } catch {
    return [{ unit_name: name || "General", content: text }]
  }
}