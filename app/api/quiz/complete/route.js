import { createClient } from "@/utils/supabase/server"

export async function POST(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { quizId, answers, timeTakenSeconds } = await req.json()
    // answers: [{ questionId, conceptId, userAnswer, isCorrect, score, timeTaken }]

    if (!quizId || !answers?.length) {
      return Response.json({ error: "quizId and answers required" }, { status: 400 })
    }

    const correct   = answers.filter((a) => a.isCorrect).length
    const total     = answers.length
    const accuracy  = Math.round((correct / total) * 100)

    // 1. Update quiz record
    await supabase
      .from("quizzes")
      .update({
        score:               correct,
        accuracy,
        time_taken_seconds:  timeTakenSeconds,
        status:              "completed",
        completed_at:        new Date().toISOString(),
      })
      .eq("id", quizId)
      .eq("user_id", user.id)

    // 2. Update each quiz_question with user answer
    await Promise.all(
      answers.map((a) =>
        supabase
          .from("quiz_questions")
          .update({
            user_answer:        a.userAnswer,
            is_correct:         a.isCorrect,
            time_taken_seconds: a.timeTaken ?? 0,
          })
          .eq("id", a.questionId)
      )
    )

    // 3. Update mastery scores per concept
    // Group answers by conceptId
    const byConceptId = answers.reduce((acc, a) => {
      if (!a.conceptId) return acc
      if (!acc[a.conceptId]) acc[a.conceptId] = []
      acc[a.conceptId].push(a)
      return acc
    }, {})

    const masteryUpdates = Object.entries(byConceptId).map(async ([conceptId, conceptAnswers]) => {
      const conceptCorrect  = conceptAnswers.filter((a) => a.isCorrect).length
      const conceptTotal    = conceptAnswers.length
      const conceptAccuracy = Math.round((conceptCorrect / conceptTotal) * 100)

      // Calculate speed score (faster = higher, cap at 100)
      const avgTime     = conceptAnswers.reduce((s, a) => s + (a.timeTaken ?? 30), 0) / conceptAnswers.length
      const speedScore  = Math.min(100, Math.max(0, Math.round(100 - (avgTime / 60) * 100)))

      // Error penalty — repeated wrong answers
      const errorPenalty = Math.min(25, conceptAnswers.filter((a) => !a.isCorrect).length * 8)

      // Recency boost — answered recently
      const recencyBoost = 15

      // Final mastery formula
      const newScore = Math.min(100, Math.max(0,
        (conceptAccuracy * 0.4) +
        (speedScore      * 0.2) -
        (errorPenalty    * 0.25) +
        (recencyBoost    * 0.15)
      ))

      const status =
        newScore >= 85 ? "mastered"        :
        newScore >= 65 ? "good"            :
        newScore >= 40 ? "needs_revision"  : "critical"

      // Check if mastery score exists
      const { data: existing } = await supabase
        .from("mastery_scores")
        .select("id, score")
        .eq("user_id", user.id)
        .eq("concept_id", conceptId)
        .single()

      if (existing) {
        await supabase
          .from("mastery_scores")
          .update({
            score:          Math.round(newScore),
            accuracy:       conceptAccuracy,
            speed_score:    speedScore,
            error_penalty:  errorPenalty,
            recency_boost:  recencyBoost,
            status,
            last_practiced: new Date().toISOString(),
            updated_at:     new Date().toISOString(),
          })
          .eq("id", existing.id)

        return { conceptId, before: Math.round(existing.score ?? 0), after: Math.round(newScore), delta: Math.round(newScore - (existing.score ?? 0)) }
      } else {
        await supabase
          .from("mastery_scores")
          .insert({
            user_id:        user.id,
            concept_id:     conceptId,
            score:          Math.round(newScore),
            accuracy:       conceptAccuracy,
            speed_score:    speedScore,
            error_penalty:  errorPenalty,
            recency_boost:  recencyBoost,
            status,
            last_practiced: new Date().toISOString(),
          })

        return { conceptId, before: 0, after: Math.round(newScore), delta: Math.round(newScore) }
      }
    })

    const masteryDeltas = await Promise.all(masteryUpdates)

    // 4. Schedule revisions for weak concepts
    const today = new Date()
    const revisionInserts = masteryDeltas
      .filter((m) => m.after < 85)
      .map((m) => {
        const daysUntil = m.after < 40 ? 1 : m.after < 65 ? 3 : 7
        const schedDate = new Date(today)
        schedDate.setDate(schedDate.getDate() + daysUntil)
        const priority  = m.after < 40 ? "critical" : m.after < 65 ? "high" : "medium"
        return {
          user_id:        user.id,
          concept_id:     m.conceptId,
          scheduled_date: schedDate.toISOString().slice(0, 10),
          priority,
          interval_days:  daysUntil,
          is_completed:   false,
        }
      })

    if (revisionInserts.length > 0) {
      await supabase.from("revision_schedule").insert(revisionInserts)
    }

    return Response.json({
      accuracy,
      correct,
      total,
      masteryDeltas,
      revisionsScheduled: revisionInserts.length,
    })

  } catch (err) {
    console.error("Quiz complete error:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}