import { NextResponse }       from "next/server"
import { extractText }        from "unpdf"
import mammoth                from "mammoth"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file     = formData.get("file")
    const courseId = formData.get("course_id")

    if (!file)     return NextResponse.json({ error: "No file provided" },      { status: 400 })
    if (!courseId) return NextResponse.json({ error: "No course_id provided" }, { status: 400 })

    const bytes    = await file.arrayBuffer()
    const fileName = file.name
    const fileType = fileName.split(".").pop().toLowerCase()

    let extractedText = ""
    let pageCount     = 0

    if (fileType === "pdf") {
      const buffer      = new Uint8Array(bytes)
      const { text, totalPages } = await extractText(buffer, { mergePages: true })
      extractedText = text
      pageCount     = totalPages
    } else if (fileType === "docx") {
      const buffer      = Buffer.from(bytes)
      const result      = await mammoth.extractRawText({ buffer })
      extractedText     = result.value
    } else if (fileType === "txt") {
      extractedText = Buffer.from(bytes).toString("utf-8")
    } else {
      return NextResponse.json({ error: "Unsupported file type. Use PDF, DOCX, or TXT." }, { status: 400 })
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ error: "Could not extract text from file." }, { status: 422 })
    }

    const units = await detectUnits(extractedText, fileName)

    return NextResponse.json({
      success:    true,
      file_name:  fileName,
      file_type:  fileType,
      word_count: extractedText.split(/\s+/).filter(Boolean).length,
      page_count: pageCount,
      units,
    })

  } catch (err) {
    console.error("Process error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

async function detectUnits(text, fileName) {
  const trimmed = text.slice(0, 12000)

  const prompt = `
You are analyzing a student's study document called "${fileName}".

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
    return [{ unit_name: "General", content: text }]
  }
}