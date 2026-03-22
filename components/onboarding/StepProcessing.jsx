"use client"
import { useEffect, useState } from "react"
import { RiCheckLine } from "react-icons/ri"

const steps = [
  { label: "Creating your course structure",    duration: 1000 },
  { label: "Configuring adaptive engine",        duration: 1200 },
  { label: "Setting up revision scheduler",      duration: 1000 },
  { label: "Initialising knowledge base",        duration: 1400 },
  { label: "Preparing your dashboard",           duration: 800  },
]

export default function StepProcessing({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [done,    setDone]    = useState(false)

  useEffect(() => {
    let idx = 0
    const run = () => {
      if (idx < steps.length) {
        setCurrent(idx)
        setTimeout(() => { idx++; run() }, steps[idx - 1]?.duration ?? 1000)
      } else {
        setDone(true)
        setTimeout(onComplete, 1000)
      }
    }
    run()
  }, [])

  const progress = done ? 100 : Math.round((current / steps.length) * 100)

  return (
    <div className="max-w-[560px] flex flex-col items-center text-center pt-8">

      {/* Animated ring */}
      <div className="relative w-24 h-24 mb-8">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="48" cy="48" r="40" fill="none"
            stroke="#FA6E43" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {done ? (
            <RiCheckLine className="text-[#FA6E43] text-[28px]" />
          ) : (
            <span className="text-[18px] font-black text-white">{progress}%</span>
          )}
        </div>
      </div>

      <h2 className="text-[28px] font-black text-white mb-2">
        {done ? "All done!" : "Setting things up..."}
      </h2>
      <p className="text-[14px] text-[#888891] mb-10">
        {done
          ? "Your learning system is ready. Taking you to the dashboard."
          : "Configuring your personal learning system. This only happens once."}
      </p>

      {/* Steps checklist */}
      <div className="w-full flex flex-col gap-2.5 text-left">
        {steps.map(({ label }, i) => {
          const isComplete = i < current || done
          const isActive   = i === current && !done
          return (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all"
              style={{
                background: isActive
                  ? "rgba(250,110,67,0.06)"
                  : isComplete
                  ? "rgba(255,255,255,0.02)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(250,110,67,0.2)"
                  : "1px solid transparent",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: isComplete || done
                    ? "#FA6E43"
                    : isActive
                    ? "rgba(250,110,67,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive && !isComplete
                    ? "1.5px solid #FA6E43"
                    : "none",
                }}
              >
                {(isComplete || done) ? (
                  <RiCheckLine className="text-white text-[11px]" />
                ) : isActive ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FA6E43] animate-pulse" />
                ) : null}
              </div>
              <span
                className="text-[13px] transition-colors"
                style={{
                  color: isComplete || done
                    ? "#888891"
                    : isActive
                    ? "#fff"
                    : "#333",
                }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

    </div>
  )
}