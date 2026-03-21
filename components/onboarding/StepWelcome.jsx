import OnboardingCard from "./OnboardingCard"

const setupRows = [
  "Learning profile & timeline",
  "Adaptive intelligence settings",
  "First course and document upload",
]

export default function StepWelcome({ onNext }) {
  return (
    <OnboardingCard>

      <div className="flex flex-col gap-5">

        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">
            Welcome to Learnova.
          </h1>
          <p className="text-[14px] text-[#888] mt-2 leading-[1.7]">
            Before you start, we need 5 minutes to configure your learning
            system. Your answers shape how Learnova tracks mastery, generates
            quizzes, and schedules revision.
          </p>
        </div>

        {/* Setup rows */}
        <div className="flex flex-col border border-white/[0.06] rounded-xl overflow-hidden">
          {setupRows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05] last:border-0"
            >
              <span className="text-[#FA6E43] text-[12px]">◈</span>
              <span className="text-[13px] text-[#888]">{row}</span>
            </div>
          ))}
        </div>

        {/* Estimated time */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#444]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Estimated setup time: 4–6 minutes
        </div>

        <button
          onClick={onNext}
          className="w-full h-[48px] bg-[#FA6E43] text-white text-[14px] font-bold rounded-xl hover:brightness-110 hover:scale-[1.01] active:scale-[0.98] transition-all mt-2"
        >
          Begin Setup
        </button>

      </div>

    </OnboardingCard>
  )
}