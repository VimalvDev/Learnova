"use client"
import { useMemo } from "react"
import OnboardingCard from "./OnboardingCard"
import StepLabel from "./StepLabel"
import StepFooter from "./StepFooter"

export default function StepTimeline({ formData, update, onNext, onBack }) {
  const daysRemaining = useMemo(() => {
    if (!formData.targetDate) return null
    const diff = Math.ceil((new Date(formData.targetDate) - new Date()) / (1000 * 60 * 60 * 24))
    return diff
  }, [formData.targetDate])

  return (
    <OnboardingCard>

      <StepLabel text="Step 2 of 6 — Study Timeline" />

      <h2 className="text-[22px] font-bold text-white">Set Your Study Timeline</h2>
      <p className="text-[13px] text-[#888] mt-1 mb-6 leading-relaxed">
        We use this to calculate your learning plan, revision schedule,
        and daily session targets.
      </p>

      {/* Target date */}
      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-[12px] font-medium text-[#888]">Target Date</label>
        <span className="text-[11px] text-[#444]">When do you need to be fully prepared?</span>
        <input
          type="date"
          value={formData.targetDate}
          onChange={(e) => update("targetDate", e.target.value)}
          className="h-[48px] px-4 bg-[#141414] border border-white/[0.08] rounded-xl text-[14px] text-white outline-none focus:border-[#FA6E43] focus:ring-2 focus:ring-[#FA6E43]/20 transition-all"
        />

        {daysRemaining !== null && (
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] mt-1 ${
              daysRemaining < 7
                ? "bg-[#FBBF24]/5 border-[#FBBF24]/20 text-[#FBBF24]"
                : "bg-[#FA6E43]/5 border-[#FA6E43]/15 text-[#888]"
            }`}
          >
            <span className={daysRemaining < 7 ? "text-[#FBBF24]" : "text-[#FA6E43]"}>
              {daysRemaining < 7 ? "⚠" : "◈"}
            </span>
            {daysRemaining < 7
              ? `Very short window — plan will be intensive.`
              : `${daysRemaining} days remaining — sufficient time for structured preparation.`}
          </div>
        )}
      </div>

      {/* Daily hours slider */}
      <div className="flex flex-col gap-2 mb-5">
        <label className="text-[12px] font-medium text-[#888]">Available Study Hours Per Day</label>
        <div className="relative pt-6">
          {/* Value callout */}
          <div
            className="absolute -top-1 bg-[#FA6E43] text-white text-[11px] font-bold px-2 py-0.5 rounded-full transform -translate-x-1/2 transition-all"
            style={{ left: `${((formData.dailyHours - 0.5) / 5.5) * 100}%` }}
          >
            {formData.dailyHours}h
          </div>
          <input
            type="range"
            min={0.5}
            max={6}
            step={0.5}
            value={formData.dailyHours}
            onChange={(e) => update("dailyHours", parseFloat(e.target.value))}
            className="w-full accent-[#FA6E43] cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#666] mt-1">
          <span>Light (1h)</span>
          <span>Moderate (2–3h)</span>
          <span>Intensive (4h+)</span>
        </div>
        <div className="text-right text-[11px] text-[#444] mt-1">
          ≈ {Math.round(formData.dailyHours * 1.5)} topics/day · {Math.round(formData.dailyHours * 1.5)} quiz sessions/week
        </div>
      </div>

      {/* Study window */}
      <div className="flex flex-col gap-1.5 mb-5">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-[#888]">Preferred Study Time</label>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#444] bg-white/[0.04] px-2 py-0.5 rounded-full">
            Optional
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#444]">From</span>
            <input
              type="time"
              value={formData.studyFrom}
              onChange={(e) => update("studyFrom", e.target.value)}
              className="h-[44px] px-3 bg-[#141414] border border-white/[0.08] rounded-xl text-[13px] text-white outline-none focus:border-[#FA6E43] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#444]">To</span>
            <input
              type="time"
              value={formData.studyTo}
              onChange={(e) => update("studyTo", e.target.value)}
              className="h-[44px] px-3 bg-[#141414] border border-white/[0.08] rounded-xl text-[13px] text-white outline-none focus:border-[#FA6E43] transition-all"
            />
          </div>
        </div>
        <p className="text-[11px] text-[#444] mt-0.5">Used to schedule revision reminders.</p>
      </div>

      {/* Projection */}
      <div className="bg-[#141414] rounded-xl px-4 py-3.5 text-[12px] text-[#555]">
        <div className="flex items-start gap-2">
          <span className="text-[#FA6E43] mt-0.5">◈</span>
          <div>
            Based on your timeline and <span className="text-white font-medium">{formData.dailyHours}h/day</span>:
            <div className="mt-1 space-y-0.5">
              <div>≈ <span className="text-white font-medium">{Math.round(formData.dailyHours * 2)} concepts</span> covered per day</div>
              {daysRemaining && (
                <div>≈ <span className="text-white font-medium">{daysRemaining} days</span> to reach 80%+ overall mastery (estimated)</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <StepFooter onNext={onNext} onBack={onBack} disabled={!formData.targetDate} />

    </OnboardingCard>
  )
}