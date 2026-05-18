export default function ResultsHeader({ summary }) {
  const { accuracy, correct, total, timeTakenSeconds } = summary
  const mm = String(Math.floor(timeTakenSeconds / 60)).padStart(2, "0")
  const ss = String(timeTakenSeconds % 60).padStart(2, "0")

  const stats = [
    { label: "Accuracy",    value: `${accuracy}%`,    sub: `${correct} of ${total} correct`, subColor: accuracy >= 70 ? "text-[#4ADE80]" : "text-[#FBBF24]" },
    { label: "Total Time",  value: `${mm}:${ss}`,     sub: "Total duration",                 subColor: "text-secondary-text" },
    { label: "Questions",   value: String(total),      sub: "Answered",                       subColor: "text-secondary-text" },
    { label: "Score",       value: `${accuracy >= 85 ? "A" : accuracy >= 70 ? "B" : accuracy >= 55 ? "C" : "D"}`, sub: accuracy >= 70 ? "Well done!" : "Keep practicing", subColor: accuracy >= 70 ? "text-[#4ADE80]" : "text-[#FBBF24]" },
  ]

  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Quiz Complete</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-[clamp(18px,2.2vw,24px)] font-bold text-white">Session Results</h1>
          <p className="text-[12px] text-secondary-text">{total} Questions · Adaptive Mode · {mm}:{ss}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/[0.06]">
        {stats.map(({ label, value, sub, subColor }) => (
          <div key={label} className="px-5 py-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-secondary-text mb-2">{label}</p>
            <p className="text-[clamp(18px,2.2vw,26px)] font-bold text-white leading-none">{value}</p>
            <p className={`text-[11px] mt-1.5 ${subColor}`}>{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}