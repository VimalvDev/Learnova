"use client"
import { useState } from "react"
import QuizSetup   from "@/components/dashboard/quiz/QuizSetup"
import QuizActive  from "@/components/dashboard/quiz/QuizActive"
import QuizResults from "@/components/dashboard/quiz/QuizResults"

export default function QuizzesPage() {
  const [phase,       setPhase]       = useState("setup")
  const [quizData,    setQuizData]    = useState(null)
  const [resultsData, setResultsData] = useState(null)

  const handleStart = (data) => {
    setQuizData(data)
    setPhase("active")
  }

  const handleFinish = async ({ quizId, answers, timeTakenSeconds }) => {
    // Save to DB and get mastery deltas
    let masteryDeltas = []
    try {
      const res  = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers, timeTakenSeconds }),
      })
      const data = await res.json()
      masteryDeltas = data.masteryDeltas ?? []
    } catch {}

    const correct  = answers.filter((a) => a.isCorrect).length
    const total    = answers.length
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

    setResultsData({
      summary:       { accuracy, correct, total, timeTakenSeconds },
      masteryDeltas,
      answers,
      questions:     quizData.questions,
    })
    setPhase("results")
  }

  const handleRestart = () => {
    setQuizData(null)
    setResultsData(null)
    setPhase("setup")
  }

  return (
    <div className="max-w-330 mx-auto flex flex-col gap-4 py-4">
      {phase === "setup"   && <QuizSetup   onStart={handleStart} />}
      {phase === "active"  && <QuizActive  quizData={quizData} onFinish={handleFinish} />}
      {phase === "results" && <QuizResults resultsData={resultsData} onRestart={handleRestart} />}
    </div>
  )
}