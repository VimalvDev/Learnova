import { createClient }  from "@/utils/supabase/server"
import { callGemini, callGroq } from "@/lib/clients"

export async function POST(req) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { message, mode, sessionId, courseId } = body

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    // --- Save user message to DB ---
    let activeSessionId = sessionId

    if (!activeSessionId) {
      const { data: newSession } = await supabase
        .from("chat_sessions")
        .insert({
          user_id: user.id,
          mode,
          session_title: message.slice(0, 60),
        })
        .select("id")
        .single()
      activeSessionId = newSession?.id
    }

    if (activeSessionId) {
      await supabase.from("chat_messages").insert({
        session_id: activeSessionId,
        user_id: user.id,
        role: "user",
        content: message,
      })
    }

    // ── PUBLIC MODE → Groq ──────────────────────────────────────────
    if (mode === "public") {
      const systemPrompt = `You are Learnova AI, an expert academic tutor. 
Give clear, structured, educational answers. 
Use markdown-style formatting with sections when helpful.
Be thorough but concise.`

      const groqMessages = [
        { role: "system", content: systemPrompt },
        { role: "user",   content: message },
      ]

      const reply = await callGroq(groqMessages)

      if (activeSessionId) {
        await supabase.from("chat_messages").insert({
          session_id: activeSessionId,
          user_id: user.id,
          role: "assistant",
          content: reply,
        })
      }

      return Response.json({ reply, sessionId: activeSessionId, mode: "public" })
    }

    // ── PRIVATE MODE → Gemini RAG ───────────────────────────────────
    // 1. Fetch user documents (with extracted_text)
    const docsQuery = supabase
      .from("documents")
      .select("id, file_name, extracted_text, courses(course_name), units(unit_name)")
      .eq("user_id", user.id)
      .eq("status", "complete")
      .not("extracted_text", "is", null)

    if (courseId) docsQuery.eq("course_id", courseId)

    const { data: docs } = await docsQuery.limit(10)

    if (!docs || docs.length === 0) {
      return Response.json({
        reply: "No documents found. Please upload study materials first.",
        sessionId: activeSessionId,
        sources: [],
        confidence: 0,
        mode: "private",
      })
    }

    // 2. Simple keyword-based chunk relevance scoring
    const keywords = message.toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3)

    const scoredDocs = docs.map((doc) => {
      const text = (doc.extracted_text ?? "").toLowerCase()
      const score = keywords.reduce((s, kw) => {
        const count = (text.match(new RegExp(kw, "g")) ?? []).length
        return s + count
      }, 0)
      return { ...doc, score }
    }).sort((a, b) => b.score - a.score)

    // 3. Take top 3 docs, chunk each to ~2000 chars
    const topDocs = scoredDocs.slice(0, 3)
    const chunks = topDocs.map((doc) => {
      const text = doc.extracted_text ?? ""
      // Find most relevant 2000-char section
      let bestChunk = text.slice(0, 2000)
      let bestScore = 0
      const step = 500
      for (let i = 0; i < text.length - 2000; i += step) {
        const chunk = text.slice(i, i + 2000)
        const s = keywords.reduce((acc, kw) => {
          return acc + (chunk.toLowerCase().match(new RegExp(kw, "g")) ?? []).length
        }, 0)
        if (s > bestScore) { bestScore = s; bestChunk = chunk }
      }
      return {
        docId: doc.id,
        fileName: doc.file_name,
        courseName: doc.courses?.course_name ?? "Unknown",
        unitName: doc.units?.unit_name ?? "",
        text: bestChunk,
        score: doc.score,
      }
    }).filter((c) => c.score > 0)

    // 4. If no relevant chunks found
    if (chunks.length === 0) {
      return Response.json({
        reply: "I couldn't find relevant information about this topic in your uploaded documents. Try asking about topics covered in your notes, or switch to Public Mode for general knowledge.",
        sessionId: activeSessionId,
        sources: [],
        confidence: 0,
        mode: "private",
      })
    }

    // 5. Build RAG prompt
    const context = chunks.map((c, i) =>
      `[Source ${i + 1}: ${c.fileName} — ${c.courseName}]\n${c.text}`
    ).join("\n\n---\n\n")

    const ragPrompt = `You are Learnova AI, a private academic tutor that ONLY answers from the provided study material.

STRICT RULES:
- Answer ONLY using the provided sources below
- If the answer is not in the sources, say: "This topic is not covered in your uploaded documents."
- Always cite which source your answer comes from
- Be educational, clear, and structured
- Do NOT use any outside knowledge

STUDENT'S QUESTION: ${message}

STUDY MATERIAL:
${context}

Provide a clear, well-structured answer based only on the above material.`

    const reply = await callGemini(ragPrompt)

    // 6. Calculate confidence based on keyword match quality
    const maxPossibleScore = keywords.length * 10
    const actualScore = chunks.reduce((s, c) => s + c.score, 0)
    const confidence = Math.min(98, Math.max(30,
      Math.round((actualScore / Math.max(maxPossibleScore, 1)) * 100)
    ))

    // 7. Build sources array for UI
    const sources = chunks.map((c, i) => ({
      rank: i + 1,
      name: c.fileName,
      loc: c.courseName + (c.unitName ? ` · ${c.unitName}` : ""),
      score: parseFloat((c.score / Math.max(actualScore, 1)).toFixed(2)),
      snippet: c.text.slice(0, 120).replace(/\s+/g, " ").trim() + "…",
      docId: c.docId,
    }))

    // 8. Save AI message with source tracking
    if (activeSessionId) {
      await supabase.from("chat_messages").insert({
        session_id: activeSessionId,
        user_id: user.id,
        role: "assistant",
        content: reply,
        source_document_id: sources[0]?.docId ?? null,
        source_section: sources[0]?.loc ?? null,
        confidence_score: confidence / 100,
      })
    }

    return Response.json({
      reply,
      sessionId: activeSessionId,
      sources,
      confidence,
      mode: "private",
    })

  } catch (err) {
    console.error("Chat API error:", err)
    return Response.json(
      { error: err.message ?? "Something went wrong" },
      { status: 500 }
    )
  }
}