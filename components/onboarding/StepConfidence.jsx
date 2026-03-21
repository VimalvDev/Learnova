"use client"
import OnboardingCard from "./OnboardingCard"
import StepLabel from "./StepLabel"
import StepFooter from "./StepFooter"

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    desc: "Starting from the basics. Little or no prior knowledge of this subject. I need foundational structure first.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
        <path d="M12 2v10M12 22v-4M4.93 4.93l7.07 7.07M19.07 4.93l-7.07 7.07" />
      </svg>
    ),
  },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "I have some foundation but gaps remain. I want to strengthen understanding and fill in missing concepts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
        <rect x="2" y="14" width="4" height="7" /><rect x="9" y="9" width="4" height="12" />
        <rect x="16" y="4" width="4" height="17" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "advanced",
    title: "Advanced",
    desc: "I'm familiar with most concepts and reviewing for an exam or reinforcing mastery before a deadline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
        <rect x="2" y="14" width="4" height="7" /><rect x="9" y="9" width="4" height="12" />
        <rect x="16" y="4" width="4" height="17" />
      </svg>
    ),
  },
]

export default function StepConfidence({ formData, update, onNext, onBack }) {
  return (
    <OnboardingCard>

      <StepLabel text="Step 3 of 6 — Confidence Level" />

      <h2 className="text-[22px] font-bold text-white">How Familiar Are You?</h2>
      <p className="text-[13px] text-[#888] mt-1 mb-6 leading-relaxed">
        This calibrates your starting difficulty level and initial mastery baseline.
      </p>

      <div className="flex flex-col gap-3 mb-5">
        {levels.map(({ id, title, desc, icon }) => {
          const selected = formData.confidenceLevel === id
          return (
            <button
              key={id}
              onClick={() => update("confidenceLevel", id)}
              className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                selected
                  ? "bg-[#FA6E43]/[0.06] border-[#FA6E43] border-l-[3px]"
                  : "bg-[#2A2B2F] border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                  selected ? "bg-[#FA6E43]/15 text-[#FA6E43]" : "bg-white/[0.05] text-[#555]"
                }`}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[14px] font-medium transition-colors ${selected ? "text-white" : "text-[#aaa]"}`}>
                  {title}
                </p>
                <p className="text-[12px] text-[#888] mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <div
                className={`w-[18px] h-[18px] rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  selected ? "bg-[#FA6E43] border-[#FA6E43]" : "border-[#3a3b3f]"
                }`}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Context note */}
      <div className="flex items-start gap-2 bg-[#141414] rounded-xl px-4 py-3 text-[11px] text-[#555]">
        <span className="text-[#FA6E43] mt-0.5">◈</span>
        <span>
          This sets your starting quiz difficulty only.
          Learnova recalibrates automatically as you progress.
        </span>
      </div>

      <StepFooter onNext={onNext} onBack={onBack} disabled={!formData.confidenceLevel} />

    </OnboardingCard>
  )
}