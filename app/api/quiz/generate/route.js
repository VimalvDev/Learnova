import { createClient } from "@/utils/supabase/server"
import { callGemini } from "@/lib/clients"

export async function POST(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { courseId, unitIds, count = 10, difficulty = "auto", types = ["mcq", "truefalse"], smarts = {} } = await req.json()

    if (!courseId) return Response.json({ error: "courseId is required" }, { status: 400 })

    // 1. Fetch documents with extracted text
    let docsQuery = supabase
      .from("documents")
      .select("id, file_name, extracted_text, unit_id, units(unit_name)")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("status", "complete")
      .not("extracted_text", "is", null)

    if (unitIds?.length) docsQuery = docsQuery.in("unit_id", unitIds)

    const { data: docs } = await docsQuery.limit(10)

    if (!docs?.length) {
      return Response.json({ error: "No documents found. Upload study materials first." }, { status: 400 })
    }

    // 2. Fetch weak concepts for this course (sorted by score asc)
    const { data: masteryScores } = await supabase
      .from("mastery_scores")
      .select("score, status, concept_id, concepts(id, concept_name, document_id)")
      .eq("user_id", user.id)
      .in("concepts.document_id", docs.map((d) => d.id))
      .order("score", { ascending: true })
      .limit(20)

    // 3. Fetch all concepts for this course
    const { data: allConcepts } = await supabase
      .from("concepts")
      .select("id, concept_name, description, document_id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .limit(30)

    // 4. Build weak concept list for prioritization
    const weakConcepts = (masteryScores ?? [])
      .filter((m) => m.concepts?.concept_name)
      .map((m) => ({
        id:    m.concept_id,
        name:  m.concepts.concept_name,
        score: Math.round(m.score ?? 0),
      }))

    // 5. Combine document text (limit to avoid token overflow)
    const docContext = docs.map((d) => {
      const text = (d.extracted_text ?? "").slice(0, 3000)
      return `[Document: ${d.file_name} | Unit: ${d.units?.unit_name ?? "General"}]\n${text}`
    }).join("\n\n---\n\n")

    // 6. Build weak concept context for prompt
    const weakContext = weakConcepts.length > 0
      ? `WEAK AREAS TO PRIORITIZE (student struggles here — generate MORE questions on these):\n${
          weakConcepts.slice(0, 8).map((c) => `- ${c.name} (mastery: ${c.score}%)`).join("\n")
        }`
      : "No prior mastery data — generate balanced questions across all topics."

    // 7. Determine question type distribution
    const typeInstructions = types.map((t) => {
      if (t === "mcq")       return "MCQ (multiple choice with 4 options, exactly one correct)"
      if (t === "truefalse") return "TRUE_FALSE (statement that is either true or false)"
      if (t === "short")     return "SHORT_ANSWER (requires 1-3 sentence written answer)"
      if (t === "fill")      return "FILL_BLANK (sentence with one key term blanked out)"
      return t
    }).join(", ")

    const difficultyInstruction = difficulty === "auto"
      ? "Mix difficulties: 30% Easy, 50% Medium, 20% Hard. Make harder questions for weak concepts."
      : `All questions should be ${difficulty} difficulty.`

    // 8. Build final prompt
    const prompt = `You are an expert academic quiz generator for a student learning platform.

Generate exactly ${count} quiz questions based ONLY on the study material provided below.

${weakContext}

QUESTION TYPES TO USE: ${typeInstructions}
DIFFICULTY: ${difficultyInstruction}
${smarts.prioritizeIncorrect ? "PRIORITY: Focus heavily on the weak areas listed above." : ""}
${smarts.explanationMode ? "EXPLANATIONS: Include detailed explanations for every question." : "Include brief explanations."}

STRICT OUTPUT FORMAT — respond with ONLY a valid JSON array, no markdown, no extra text:
[
  {
    "concept": "concept name from the material",
    "difficulty": "Easy" | "Medium" | "Hard",
    "type": "mcq" | "truefalse" | "short" | "fill",
    "text": "the question text",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],  // only for mcq
    "correct": "A" | "B" | "C" | "D" for mcq, "true" | "false" for truefalse, "model answer text" for short/fill,
    "explanation": "why this answer is correct, referencing the source material",
    "source": "document name and relevant section if identifiable"
  }
]

RULES:
- Questions MUST come from the study material only
- MCQ options must be plausible, not obviously wrong
- Short answer correct field must be a model answer (2-3 sentences)
- Fill blank: use ___ in the question text for the blank
- Never repeat the same concept twice unless it's a weak area
- Distribute question types roughly evenly across the selected types

STUDY MATERIAL:
${docContext}`

    const raw = await callGemini(prompt)

    // 9. Parse JSON safely
    let questions
    try {
      const match = raw.match(/\[[\s\S]*\]/)
      if (!match) throw new Error("No JSON array found")
      questions = JSON.parse(match[0])
    } catch {
      return Response.json({ error: "Failed to parse generated questions. Try again." }, { status: 500 })
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return Response.json({ error: "No questions generated. Check your documents." }, { status: 500 })
    }

    // 10. Save quiz session to DB
    const { data: quiz } = await supabase
      .from("quizzes")
      .insert({
        user_id:              user.id,
        course_id:            courseId,
        unit_ids:             unitIds ?? [],
        difficulty_mode:      difficulty,
        total_questions:      questions.length,
        question_types:       types,
        prioritize_incorrect: smarts.prioritizeIncorrect ?? true,
        explanation_mode:     smarts.explanationMode ?? false,
        status:               "active",
      })
      .select("id")
      .single()

    // 11. Save questions to DB
    const questionsToInsert = questions.map((q, i) => ({
      quiz_id:        quiz.id,
      concept_id:     allConcepts?.find((c) =>
        c.concept_name?.toLowerCase().includes(q.concept?.toLowerCase()) ||
        q.concept?.toLowerCase().includes(c.concept_name?.toLowerCase())
      )?.id ?? null,
      question_type:    q.type,
      question_text:    q.text,
      options:          q.options ?? null,
      correct_answer:   q.correct,
      explanation:      q.explanation,
      difficulty:       q.difficulty,
      question_order:   i + 1,
    }))

    const { data: savedQuestions } = await supabase
      .from("quiz_questions")
      .insert(questionsToInsert)
      .select("id, question_type, question_text, options, correct_answer, explanation, difficulty, question_order, concept_id")

    // 12. Attach DB ids to questions for frontend
    const finalQuestions = questions.map((q, i) => ({
      ...q,
      id:        savedQuestions?.[i]?.id ?? `q-${i}`,
      conceptId: savedQuestions?.[i]?.concept_id ?? null,
      order:     i + 1,
    }))

    return Response.json({
      quizId:    quiz.id,
      questions: finalQuestions,
      weakConcepts,
    })

  } catch (err) {
    console.error("Quiz generate error:", err)
    return Response.json({ error: err.message ?? "Failed to generate quiz" }, { status: 500 })
  }
}