const steps = [
  {
    num:    "01",
    title:  "Review Functional Dependency first",
    desc:   "Your prerequisite gap is blocking progress. Mastery: 61% → target 75% before retrying.",
    action: "Go to Functional Dependency →",
  },
  {
    num:    "02",
    title:  "Complete 5 targeted easy-level questions",
    desc:   "Build foundational accuracy before advancing to medium difficulty on this concept.",
    action: "Generate Easy Quiz →",
  },
  {
    num:    "03",
    title:  "Study the 2NF vs 3NF distinction",
    desc:   "Your most frequent error pattern. Estimated time: 10–15 minutes.",
    action: "Open Explanation →",
  },
  {
    num:    "04",
    title:  "Schedule revision within 3 days",
    desc:   "At 42% mastery, retention decays rapidly. Next review window: Feb 26–27.",
    action: "Schedule Now →",
  },
]

export default function ImprovementPlan() {
  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
        Action Plan
      </p>
      <h3 className="text-[14px] font-semibold text-white mb-0.5">Suggested Next Steps</h3>
      <p className="text-[11px] text-tertiary-text mb-4">
        System-generated based on your error patterns and mastery score.
      </p>

      <div className="flex flex-col gap-2 mb-4">
        {steps.map(({ num, title, desc, action }) => (
          <div key={num} className="bg-card-dark rounded-xl p-3.5">
            <div className="flex items-start gap-3">
              <span className="text-[16px] font-black text-brand leading-none flex-shrink-0 mt-0.5">
                {num}
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white mb-0.5">{title}</p>
                <p className="text-[11px] text-secondary-text leading-relaxed mb-2">{desc}</p>
                <button className="text-[11px] text-brand hover:underline font-medium">
                  {action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button className="w-full h-9 bg-(--color-brand) text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all">
          Start Guided Review
        </button>
        <button className="w-full h-9 bg-card-dark text-white text-[12px] font-medium rounded-xl hover:bg-(--color-card-mid) transition-colors">
          Generate Practice Quiz
        </button>
      </div>
    </div>
  )
}