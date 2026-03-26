"use client"
import { useState } from "react"
import QuizSetup   from "@/components/dashboard/quiz/QuizSetup"
import QuizActive  from "@/components/dashboard/quiz/QuizActive"
import QuizResults from "@/components/dashboard/quiz/QuizResults"

export default function QuizzesPage() {
  const [phase, setPhase] = useState("setup")
  return (
    <div className="w-full min-h-full">
      {phase === "setup"   && <QuizSetup   onStart={()   => setPhase("active")}  />}
      {phase === "active"  && <QuizActive  onFinish={()  => setPhase("results")} />}
      {phase === "results" && <QuizResults onRestart={() => setPhase("setup")}   />}
    </div>
  )
}