"use client"
import { useState } from "react"
import Link from "next/link"
import {
  RiArrowRightSLine, RiPlayFill,
  RiFlashlightLine, RiBookOpenLine,
} from "react-icons/ri"
import ScopeSelector        from "./setup/ScopeSelector"
import DifficultySelector   from "./setup/DifficultySelector"
import QuestionCountSlider  from "./setup/QuestionCountSlider"
import QuestionTypeSelector from "./setup/QuestionTypeSelector"
import SmartOptions         from "./setup/SmartOptions"
import WeakConceptPreview   from "./setup/WeakConceptPreview"

export default function QuizSetup({ onStart }) {
  const [difficulty, setDifficulty] = useState("auto")
  const [count,      setCount]      = useState(15)
  const [types,      setTypes]      = useState(["mcq", "truefalse"])
  const [smarts,     setSmarts]     = useState({
    prioritizeIncorrect:  true,
    includePrerequisites: true,
    explanationMode:      false,
  })

  return (
    <div className="w-full">

      {/* Page header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Link href="/dashboard" className="text-[12px] text-secondary-text hover:text-brand transition-colors">Dashboard</Link>
            <RiArrowRightSLine className="text-tertiary-text text-[13px]" />
            <span className="text-[12px] text-[#888]">Quiz Center</span>
          </div>
          <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
            Generate Adaptive Quiz
          </h1>
          <p className="text-[clamp(12px,1.3vw,14px)] text-secondary-text mt-1">
            Learnova builds a quiz targeting your weakest concepts and adjusts difficulty in real time.
          </p>
        </div>
        
      </div>

      {/* Two column layout matching dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

        {/* Left — main config */}
        <div className="flex flex-col gap-4">

          {/* Scope card-dark */}
          <div className="bg-card-dark rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <RiBookOpenLine className="text-brand text-[15px]" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">Quiz Scope</p>
            </div>
            <ScopeSelector />
          </div>

          {/* Difficulty card-dark */}
          <div className="bg-card-dark rounded-2xl p-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Difficulty Mode</p>
            <DifficultySelector value={difficulty} onChange={setDifficulty} />
          </div>

          {/* Count + Types row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card-dark rounded-2xl p-5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">
                Number of Questions
              </p>
              <QuestionCountSlider value={count} onChange={setCount} />
            </div>
            <div className="bg-card-dark rounded-2xl p-5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">
                Question Types
              </p>
              <QuestionTypeSelector value={types} onChange={setTypes} />
            </div>
          </div>

          {/* Smart options card-dark */}
          <div className="bg-card-dark rounded-2xl p-5 ">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Smart Options</p>
            <SmartOptions value={smarts} onChange={setSmarts} />
          </div>

        </div>

        {/* Right — summary panel */}
        <div className="flex flex-col gap-4">

          {/* Session summary */}
          <div className="bg-card-dark rounded-2xl p-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Session Summary</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Course",      value: "DBMS — Semester 4" },
                { label: "Scope",       value: "3 units · 312 chunks" },
                { label: "Questions",   value: `${count} questions` },
                { label: "Mode",        value: difficulty === "auto" ? "Adaptive" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1) },
                { label: "Types",       value: `${types.length} type${types.length !== 1 ? "s" : ""}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                  <span className="text-[11px] text-[#999]">{label}</span>
                  <span className="text-[12px] font-medium text-white">{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onStart}
              className="w-full mt-4 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <RiPlayFill className="text-[13px]" /> Start Quiz
            </button>
          </div>

          {/* Weak concepts */}
          {difficulty === "auto" && (
            <div className="bg-card-dark rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <RiFlashlightLine className="text-brand text-[14px]" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">
                  Focus Areas
                </p>
              </div>
              <WeakConceptPreview />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}