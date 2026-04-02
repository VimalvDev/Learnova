const stats = [
  { label: "Days completed",   value: "1 of 19" },
  { label: "Sessions done",    value: "3 of 76" },
  { label: "Concepts touched", value: "2 of 58" },
  { label: "On schedule",      value: "✓ Yes",  color: "text-[#4ADE80]" },
]

const pct = 8
const r   = 30
const circ = 2 * Math.PI * r
const fill = (pct / 100) * circ

export default function PlanProgress() {
  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
        Plan Progress
      </p>
      <h3 className="text-[13px] font-semibold text-white mb-4">Completion Status</h3>

      {/* Ring */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
            <circle
              cx="36" cy="36" r={r}
              fill="none" stroke="var(--color-brand)" strokeWidth="7"
              strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[14px] font-bold text-white leading-none">{pct}%</span>
            <span className="text-[8px] text-tertiary-text">done</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[10px] text-tertiary-text">{label}</span>
              <span className={`text-[11px] font-medium ${color ?? "text-white"}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 bg-card-dark rounded-xl px-3 py-2.5">
        <span className="text-brand text-[11px] flex-shrink-0 mt-0.5">◈</span>
        <div>
          <p className="text-[11px] text-white font-medium">2 sessions remaining today</p>
          <p className="text-[10px] text-tertiary-text mt-0.5">Est. 1h 10m</p>
        </div>
      </div>
    </div>
  )
}