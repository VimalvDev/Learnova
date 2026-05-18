"use client"
import { useState } from "react"
import Link from "next/link"
import {
  RiArrowRightSLine, RiPlayFill,
  RiFlashlightLine, RiBookOpenLine, RiErrorWarningLine,
} from "react-icons/ri"
import ScopeSelector        from "./setup/ScopeSelector"
import DifficultySelector   from "./setup/DifficultySelector"
import QuestionCountSlider  from "./setup/QuestionCountSlider"
import QuestionTypeSelector from "./setup/QuestionTypeSelector"
import SmartOptions         from "./setup/SmartOptions"
import WeakConceptPreview   from "./setup/WeakConceptPreview"
import GeneratingOverlay from "@/components/dashboard/quiz/GeneratingOverlay"

export default function QuizSetup({ onStart }) {
  const [difficulty, setDifficulty] = useState("auto")
  const [count,      setCount]      = useState(10)
  const [types,      setTypes]      = useState(["mcq", "truefalse"])
  const [smarts,     setSmarts]     = useState({ prioritizeIncorrect: true, explanationMode: false })
  const [scope,      setScope]      = useState({ courseId: null, unitIds: [], docCount: 0 })
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState(null)

  const handleStart = async () => {
    if (!scope.courseId) { setError("Please select a course first."); return }
    if (types.length === 0) { setError("Select at least one question type."); return }
    if (scope.docCount === 0) { setError("No documents found in selected units. Upload study materials first."); return }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId:   scope.courseId,
          unitIds:    scope.unitIds,
          count,
          difficulty,
          types,
          smarts,
        }),
      })

      const data = await res.json()
      if (data.error) { setError(data.error); return }

      onStart({ quizId: data.quizId, questions: data.questions, weakConcepts: data.weakConcepts, smarts })
    } catch (err) {
      setError("Failed to generate quiz. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {loading && <GeneratingOverlay />}
    <div className="w-full">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Link href="/dashboard" className="text-[12px] text-secondary-text hover:text-brand transition-colors">Dashboard</Link>
            <RiArrowRightSLine className="text-tertiary-text text-[13px]" />
            <span className="text-[12px] text-[#888]">Quiz Center</span>
          </div>
          <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">Generate Adaptive Quiz</h1>
          <p className="text-[clamp(12px,1.3vw,14px)] text-secondary-text mt-1">
            Learnova builds a quiz from your notes, targeting your weakest concepts first.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
          <RiErrorWarningLine className="text-red-400 text-[14px] shrink-0" />
          <p className="text-[12px] text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <div className="flex flex-col gap-4">

          <div className="bg-card-dark rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <RiBookOpenLine className="text-brand text-[15px]" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">Quiz Scope</p>
            </div>
            <ScopeSelector onScopeChange={setScope} />
          </div>

          <div className="bg-card-dark rounded-2xl p-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Difficulty Mode</p>
            <DifficultySelector value={difficulty} onChange={setDifficulty} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card-dark rounded-2xl p-5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Number of Questions</p>
              <QuestionCountSlider value={count} onChange={setCount} />
            </div>
            <div className="bg-card-dark rounded-2xl p-5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Question Types</p>
              <QuestionTypeSelector value={types} onChange={setTypes} />
            </div>
          </div>

          <div className="bg-card-dark rounded-2xl p-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Smart Options</p>
            <SmartOptions value={smarts} onChange={setSmarts} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-card-dark rounded-2xl p-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Session Summary</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Questions",  value: `${count} questions` },
                { label: "Mode",       value: difficulty === "auto" ? "Adaptive" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1) },
                { label: "Types",      value: types.length === 0 ? "None selected" : `${types.length} type${types.length !== 1 ? "s" : ""}` },
                { label: "Smart Mode", value: smarts.prioritizeIncorrect ? "Weak areas first" : "Balanced" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-[11px] text-[#999]">{label}</span>
                  <span className="text-[12px] font-medium text-white">{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleStart}
              disabled={loading}
              className="w-full mt-4 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <><RiPlayFill className="text-[13px]" /> Start Quiz</>
              )}
            </button>
            {loading && (
              <p className="text-[10px] text-tertiary-text text-center mt-2">
                Gemini is reading your notes and building questions…
              </p>
            )}
          </div>

          {difficulty === "auto" && (
            <div className="bg-card-dark rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <RiFlashlightLine className="text-brand text-[14px]" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">Focus Areas</p>
              </div>
              <WeakConceptPreview courseId={scope.courseId} />
            </div>
          )}
        </div>
      </div>
    </div>
        </>

  )
}