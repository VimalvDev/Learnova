import { callGemini } from "@/lib/clients"

export async function POST(req) {
  try {
    const { questionText, questionType, correctAnswer, userAnswer, concept, explanation } = await req.json()

    if (!userAnswer?.trim()) {
      return Response.json({ score: 0, isCorrect: false, feedback: "No answer provided.", grammarIssues: [] })
    }

    // MCQ and True/False — simple exact match
    if (questionType === "mcq") {
      const userLetter  = userAnswer.trim().charAt(0).toUpperCase()
      const corrLetter  = correctAnswer.trim().charAt(0).toUpperCase()
      const isCorrect   = userLetter === corrLetter
      return Response.json({ score: isCorrect ? 100 : 0, isCorrect, feedback: explanation ?? "", grammarIssues: [] })
    }

    if (questionType === "truefalse") {
      const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      return Response.json({ score: isCorrect ? 100 : 0, isCorrect, feedback: explanation ?? "", grammarIssues: [] })
    }

    // Short answer and fill blank — Gemini semantic evaluation
    const prompt = `You are an academic answer evaluator for a student learning platform.

Evaluate the student's answer for the following question.

QUESTION: ${questionText}
CONCEPT: ${concept}
MODEL ANSWER: ${correctAnswer}
STUDENT'S ANSWER: ${userAnswer}

Evaluate in THREE dimensions:

1. CORRECTNESS: Is the student's answer conceptually correct, even if worded differently?
   - Award 0-100 score based on how well it covers the key points
   - 90-100: Fully correct and complete
   - 70-89: Mostly correct, minor missing details
   - 50-69: Partially correct, some key points missing
   - 0-49: Incorrect or fundamentally wrong

2. GRAMMAR & LANGUAGE: Identify specific grammar, spelling, or language mistakes in the student's answer
   - List each mistake with: the wrong text, the correction, and where it appears
   - Be specific — quote the exact phrase that has the issue

3. FEEDBACK: Give encouraging, constructive 1-2 sentence feedback explaining what was right or wrong conceptually

Respond ONLY with valid JSON, no markdown:
{
  "score": 0-100,
  "isCorrect": true if score >= 60,
  "conceptualFeedback": "1-2 sentences about correctness",
  "grammarIssues": [
    {
      "original": "exact text with mistake",
      "correction": "corrected version",
      "type": "spelling" | "grammar" | "punctuation" | "word choice",
      "explanation": "brief explanation of the error"
    }
  ],
  "missingPoints": ["key point 1 that was missed", "key point 2"] 
}`

    const raw = await callGemini(prompt)

    let result
    try {
      const match = raw.match(/\{[\s\S]*\}/)
      if (!match) throw new Error("No JSON")
      result = JSON.parse(match[0])
    } catch {
      return Response.json({
        score: 50, isCorrect: true,
        conceptualFeedback: "Answer evaluated — could not parse detailed feedback.",
        grammarIssues: [], missingPoints: [],
      })
    }

    return Response.json({
      score:             Math.min(100, Math.max(0, result.score ?? 0)),
      isCorrect:         result.isCorrect ?? (result.score >= 60),
      conceptualFeedback: result.conceptualFeedback ?? "",
      grammarIssues:     result.grammarIssues ?? [],
      missingPoints:     result.missingPoints ?? [],
    })

  } catch (err) {
    console.error("Evaluate error:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}