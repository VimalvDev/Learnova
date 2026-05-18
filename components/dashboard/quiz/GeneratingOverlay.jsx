"use client"
import { useState, useEffect } from "react"

const steps = [
  { id: 1, label: "Reading your documents",       sub: "Scanning uploaded study materials…"                     },
  { id: 2, label: "Identifying weak concepts",    sub: "Checking mastery scores to find where you need help…"   },
  { id: 3, label: "Building questions",           sub: "Gemini is writing questions from your notes…"           },
  { id: 4, label: "Calibrating difficulty",       sub: "Adjusting question difficulty to your current level…"   },
  { id: 5, label: "Finalising your quiz",         sub: "Almost ready — preparing your personalised session…"    },
]

export default function GeneratingOverlay() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress,    setProgress]    = useState(0)

  useEffect(() => {
    // Advance steps every ~1.8s, progress bar fills smoothly
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 1800)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev   // hold just before 100 until actual finish
        return prev + 1
      })
    }, 80)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-[#151515] rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl">

        {/* Animated logo mark */}
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(250,110,67,0.1)" strokeWidth="4" />
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke="#FA6E43"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-brand text-[22px]">◈</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-[18px] font-bold text-white mb-1">Building Your Quiz</h2>
          <p className="text-[12px] text-tertiary-text">Gemini is reading your notes and crafting questions…</p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-tertiary-text">Progress</span>
            <span className="text-[11px] font-semibold text-brand">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.08s linear" }}
            />
          </div>
        </div>

        {/* Steps list */}
        <div className="w-full flex flex-col gap-2">
          {steps.map((step, i) => {
            const done    = i < currentStep
            const active  = i === currentStep
            const pending = i > currentStep

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active  ? "bg-brand/10 border border-brand/20"
                  : done  ? "opacity-50"
                  : "opacity-25"
                }`}
              >
                {/* Status dot */}
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                  {done ? (
                    <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-3 h-3">
                        <polyline points="2,6 5,9 10,3" fill="none" stroke="#FA6E43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : active ? (
                    <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  )}
                </div>

                {/* Label */}
                <div className="min-w-0">
                  <p className={`text-[12px] font-medium ${active ? "text-white" : "text-secondary-text"}`}>
                    {step.label}
                  </p>
                  {active && (
                    <p className="text-[10px] text-tertiary-text mt-0.5 truncate">{step.sub}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="text-[10px] text-tertiary-text text-center">
          Questions are built from your uploaded documents only
        </p>
      </div>
    </div>
  )
}