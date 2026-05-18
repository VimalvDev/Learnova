"use client"
import { useState, useEffect } from "react"

const steps = [
  { id: 1, label: "Reading your answer",         sub: "Parsing what you wrote…"                              },
  { id: 2, label: "Checking key concepts",       sub: "Comparing against the correct answer conceptually…"  },
  { id: 3, label: "Reviewing language",          sub: "Checking grammar, spelling, and phrasing…"           },
  { id: 4, label: "Calculating your score",      sub: "Weighing accuracy and completeness…"                 },
]

export default function EvaluatingOverlay() {
  const [currentStep, setCurrentStep] = useState(0)
  const [dots,        setDots]        = useState(".")

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 1200)

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 400)

    return () => {
      clearInterval(stepInterval)
      clearInterval(dotInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 bg-[#151515] rounded-3xl p-7 flex flex-col items-center gap-5 shadow-2xl">

        {/* Pulsing ring */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-brand/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-brand/40" />
          <span className="text-brand text-[20px] relative z-10">◈</span>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-[16px] font-bold text-white mb-1">
            Evaluating Answer{dots}
          </h2>
          <p className="text-[11px] text-tertiary-text">
            Gemini is reading your response carefully
          </p>
        </div>

        {/* Steps */}
        <div className="w-full flex flex-col gap-1.5">
          {steps.map((step, i) => {
            const done   = i < currentStep
            const active = i === currentStep

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  active ? "bg-brand/10 border border-brand/20"
                  : done  ? "opacity-40"
                  : "opacity-20"
                }`}
              >
                <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                  {done ? (
                    <svg viewBox="0 0 12 12" className="w-3.5 h-3.5">
                      <polyline points="2,6 5,9 10,3" fill="none" stroke="#FA6E43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : active ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-[11px] font-medium ${active ? "text-white" : "text-secondary-text"}`}>
                    {step.label}
                  </p>
                  {active && (
                    <p className="text-[10px] text-tertiary-text mt-0.5">{step.sub}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-[10px] text-tertiary-text text-center">
          Short answers are graded for meaning, not just exact wording
        </p>
      </div>
    </div>
  )
}