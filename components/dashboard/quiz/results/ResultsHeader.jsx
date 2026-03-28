const stats = [
  { label: "Accuracy",      value: "73%",       delta: "↑ 8% vs last",  deltaColor: "text-[#4ADE80]" },
  { label: "Avg Time / Q",  value: "34s",        delta: "↓ 12s faster",  deltaColor: "text-[#4ADE80]" },
  { label: "Strongest",     value: "SQL Joins",  sub: "Mastery: 91%",    subColor: "text-[#4ADE80]"   },
  { label: "Weakest",       value: "2NF Rules",  sub: "Mastery: 34%",    subColor: "text-[#F87171]"   },
]

export default function ResultsHeader() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/4 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/6">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Quiz Complete</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-[clamp(18px,2.2vw,24px)] font-bold text-white">Session Results</h1>
          <p className="text-[12px] text-secondary-text">DBMS · 15 Questions · Auto Mode · 8m 42s</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/6">
        {stats.map(({ label, value, delta, sub, deltaColor, subColor }) => (
          <div key={label} className="px-5 py-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-secondary-text mb-2">{label}</p>
            <p className="text-[clamp(18px,2.2vw,26px)] font-bold text-white leading-none">{value}</p>
            {delta && <p className={`text-[11px] mt-1.5 ${deltaColor}`}>{delta}</p>}
            {sub   && <p className={`text-[11px] mt-1.5 ${subColor}`}>{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}