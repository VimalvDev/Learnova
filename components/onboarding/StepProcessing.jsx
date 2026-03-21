"use client"
import { useState, useEffect } from "react"
import OnboardingCard from "./OnboardingCard"

const processingItems = [
  "Learning profile created",
  "Timeline and capacity configured",
  "Adaptive engine calibrated",
  "Processing uploaded documents...",
  "Generating initial mastery baseline",
  "Building revision schedule",
  "Preparing your dashboard",
]

export default function StepProcessing({ onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress]       = useState(0)

  useEffect(() => {
    if (activeIndex >= processingItems.length) {
      setTimeout(onComplete, 600)
      return
    }
    const timer = setTimeout(() => {
      setActiveIndex((i) => i + 1)
      setProgress(Math.round(((activeIndex + 1) / processingItems.length) * 100))
    }, 800)
    return () => clearTimeout(timer)
  }, [activeIndex])

  return (
    <OnboardingCard>

      <div className="text-center mb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FA6E43]">
          Setting Up Your System
        </span>
        <h2 className="text-[20px] font-semibold text-white mt-2">
          Building Your Learning Profile...
        </h2>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {processingItems.map((item, i) => {
          const isDone    = i < activeIndex
          const isActive  = i === activeIndex
          const isPending = i > activeIndex

          return (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-300 ${
                isPending ? "opacity-40" : "opacity-100"
              }`}
              style={{
                animation: isDone || isActive ? "fadeSlideIn 0.2s ease forwards" : "none",
              }}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {isDone && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" className="w-4 h-4" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {isActive && (
                  <div className="w-3.5 h-3.5 border-2 border-[#FA6E43] border-t-transparent rounded-full animate-spin" />
                )}
                {isPending && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3a3b3f]" />
                )}
              </div>
              <span
                className={`text-[13px] transition-all ${
                  isDone
                    ? "text-[#888] line-through opacity-60"
                    : isActive
                    ? "text-white font-medium"
                    : "text-[#555]"
                }`}
              >
                {item}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FA6E43] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#444]">
          <span>Almost ready — typically under 20 seconds</span>
          <span>{progress}%</span>
        </div>
      </div>

    </OnboardingCard>
  )
}