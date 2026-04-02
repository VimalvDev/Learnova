"use client"
import { useEffect, useState } from "react"

const steps = [
  "Analyzing mastery profile...",
  "Ordering prerequisite chains...",
  "Allocating daily sessions...",
  "Calculating projections...",
]

export default function LoadingState() {
  const [step,  setStep]  = useState(0)
  const [pct,   setPct]   = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((s) => Math.min(s + 1, steps.length - 1))
    }, 750)
    const pctInterval = setInterval(() => {
      setPct((p) => Math.min(p + 2, 100))
    }, 60)
    return () => { clearInterval(stepInterval); clearInterval(pctInterval) }
  }, [])

  return (
    <div className="bg-card rounded-2xl p-16 flex flex-col items-center text-center col-span-full">
      <div className="w-14 h-14 rounded-2xl bg-(--color-brand)/10 flex items-center justify-center mb-6">
        <span className="text-brand text-[24px] animate-pulse">◈</span>
      </div>
      <h3 className="text-[17px] font-semibold text-white mb-2">Building your personalized roadmap</h3>
      <p className="text-[12px] text-tertiary-text mb-6">{steps[step]}</p>
      <div className="w-48 h-1 bg-card-dark rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-(--color-brand) rounded-full transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-dark-gray">{pct}%</span>
    </div>
  )
}