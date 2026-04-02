const subMetrics = [
  {
    label: "Accuracy Rate",
    value: "45%",
    valueColor: "text-[var(--color-red)]",
    bar: { color: "bg-[var(--color-red)]", pct: 45 },
    delta: "↓ −5% from last session",
    deltaColor: "text-[var(--color-red)]",
  },
  {
    label: "Avg Response Time",
    value: "+22%",
    valueColor: "text-[#FBBF24]",
    sub: "Slower than your baseline",
    delta: "↑ +8% slower this week",
    deltaColor: "text-[#FBBF24]",
  },
  {
    label: "Retention Score",
    value: "Low",
    valueColor: "text-[var(--color-red)]",
    sub: "Decaying −9% per week",
    decay: true,
  },
  {
    label: "Study Frequency",
    value: "1 session",
    valueColor: "text-[#FBBF24]",
    sub: "In the last 14 days",
    rec: "Recommended: 3–4 sessions",
  },
]

export default function MasteryOverview() {
  const mastery = 42
  const r       = 44
  const circ    = 2 * Math.PI * r
  const fill    = (mastery / 100) * circ

  return (
    <div className="bg-card rounded-2xl p-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-5">
        Mastery Profile
      </p>

      {/* Top — score + ring */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 mb-6">

        {/* Left — score */}
        <div>
          <p className="text-[clamp(40px,5vw,56px)] font-black text-[var(--color-red)] leading-none mb-1">
            42%
          </p>
          <p className="text-[14px] text-secondary-text mb-2">Overall Mastery Score</p>
          <div className="flex items-center gap-2 text-[12px] mb-4 flex-wrap">
            <span className="text-[var(--color-red)]">↓ −4% from last session</span>
            <span className="text-dark-gray">·</span>
            <span className="text-[#4ADE80]">↑ +2% from 30 days ago</span>
          </div>

          {/* Status card */}
          <div className="bg-[var(--color-red)]/[0.06] rounded-xl p-4 border border-[var(--color-red)]/15 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-[16px] flex-shrink-0">🔴</span>
              <div>
                <p className="text-[14px] font-semibold text-[var(--color-red)] mb-1">Critical Risk</p>
                <p className="text-[12px] text-secondary-text leading-relaxed">
                  Mastery below 50%. This concept requires immediate focused attention before it blocks dependent topics.
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-tertiary-text">Mastery Progress</span>
              <span className="text-[11px] text-secondary-text">42 / 100</span>
            </div>
            <div className="relative h-2 bg-card-dark rounded-full overflow-visible">
              <div
                className="h-full bg-[var(--color-red)] rounded-full transition-all duration-700"
                style={{ width: "42%" }}
              />
              {/* Milestones */}
              {[50, 70, 85].map((m) => (
                <div
                  key={m}
                  className="absolute top-0 h-full w-px bg-white/10"
                  style={{ left: `${m}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {[{ pct: 50, label: "Threshold" }, { pct: 70, label: "Good" }, { pct: 85, label: "Mastered" }].map((m) => (
                <span
                  key={m.label}
                  className="text-[9px] text-dark-gray"
                  style={{ position: "relative", left: `${m.pct - 10}%` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — ring */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle
                cx="50" cy="50" r={r}
                fill="none"
                stroke="var(--color-red)"
                strokeWidth="10"
                strokeDasharray={`${fill} ${circ}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-bold text-white leading-none">42%</span>
              <span className="text-[10px] text-tertiary-text mt-0.5">Mastery</span>
            </div>
          </div>
          <div className="w-full bg-card-dark rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-tertiary-text">Course avg</span>
              <span className="text-[12px] font-semibold text-white">64%</span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-tertiary-text">Your best</span>
              <span className="text-[12px] font-semibold text-white">61% <span className="text-tertiary-text text-[10px]">(Feb 12)</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5 border-t border-(--color-card-dark)">
        {subMetrics.map(({ label, value, valueColor, bar, delta, deltaColor, sub, decay, rec }) => (
          <div key={label}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-2">{label}</p>
            <p className={`text-[clamp(18px,2.2vw,24px)] font-black leading-none mb-1 ${valueColor}`}>{value}</p>
            {bar && (
              <div className="h-[3px] w-20 bg-card-dark rounded-full overflow-hidden my-1.5">
                <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
              </div>
            )}
            {sub && <p className="text-[10px] text-tertiary-text mb-1">{sub}</p>}
            {decay && (
              <svg viewBox="0 0 60 16" className="w-14 h-4 my-1">
                <polyline points="0,2 20,6 40,10 60,14" fill="none" stroke="var(--color-red)" strokeWidth="1.5" strokeLinecap="round" />
                {[0, 20, 40, 60].map((x, i) => (
                  <circle key={i} cx={x} cy={2 + i * 4} r="2" fill="var(--color-red)" />
                ))}
              </svg>
            )}
            {delta && <p className={`text-[10px] font-medium ${deltaColor}`}>{delta}</p>}
            {rec && <p className="text-[10px] text-brand">{rec}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}