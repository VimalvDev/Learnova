const insights = [
  {
    title: "Difficulty escalated after Q4 and Q7",
    desc:  "Strong performance on ER Model triggered hard-mode questions.",
  },
  {
    title: "Focus shifted to Normalization after Q9",
    desc:  "Two consecutive errors triggered prerequisite reinforcement.",
  },
  {
    title: "Next quiz will prioritize: 2NF, 3NF, Functional Dependency",
    desc:  "Mastery scores updated. Revision scheduled for tomorrow.",
  },
]

export default function AdaptiveReport() {
  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Adaptive Engine Report</p>
      <h2 className="text-[16px] font-semibold text-white mb-4">What the System Learned</h2>
      <div className="flex flex-col gap-2">
        {insights.map((ins, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3.5 bg-[#141414] rounded-xl border border-white/6">
            <span className="text-brand text-[12px] shrink-0 mt-0.5">◈</span>
            <div>
              <p className="text-[12px] font-medium text-white">{ins.title}</p>
              <p className="text-[11px] text-secondary-text mt-0.5">{ins.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}