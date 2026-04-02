const stats = [
  { label: "Duration",        value: "19 Days",      sub: "Ends Mar 15"     },
  { label: "Topics Covered",  value: "58 total",     sub: "All units"       },
  { label: "Weak First",      value: "9 concepts",   sub: "Front-loaded"    },
  { label: "Quizzes",         value: "14 sessions",  sub: "Adaptive"        },
  { label: "Projected Mastery",value: "+18%",         sub: "78% → 89%", valueColor: "text-[#4ADE80]" },
]

export default function PlanOverview() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-card-dark">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
          Plan Overview
        </p>
        <h2 className="text-[clamp(16px,2vw,20px)] font-semibold text-white">
          Your Personalized Study Plan
        </h2>
        <p className="text-[12px] text-tertiary-text mt-0.5">
          Generated from your mastery profile · Feb 24, 2026
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 divide-x divide-card-dark">
        {stats.map(({ label, value, sub, valueColor }) => (
          <div key={label} className="px-5 py-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-2">{label}</p>
            <p className={`text-[clamp(18px,2.2vw,24px)] font-black leading-none ${valueColor ?? "text-white"}`}>
              {value}
            </p>
            <p className="text-[11px] text-tertiary-text mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Feasibility bar */}
      <div className="px-6 py-4 border-t border-card-dark">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[11px] text-tertiary-text flex-shrink-0">Plan Feasibility</span>
          <div className="flex-1 max-w-xs h-1.5 bg-card-dark rounded-full overflow-hidden">
            <div className="h-full bg-(--color-brand) rounded-full" style={{ width: "78%" }} />
          </div>
          <span className="text-[12px] font-semibold text-brand flex-shrink-0">78% — Achievable</span>
          <span className="text-[10px] text-tertiary-text ml-auto hidden lg:block">
            Based on 19 days, 2.5h/day, current mastery 78%
          </span>
        </div>
      </div>

      {/* Risk flag */}
      <div className="mx-6 mb-5">
        <div className="flex items-start gap-2.5 px-4 py-3 bg-[#FBBF24]/[0.04] rounded-xl">
          <span className="text-[#FBBF24] text-[13px] flex-shrink-0 mt-0.5">⚠</span>
          <p className="text-[11px] text-secondary-text leading-relaxed">
            <span className="text-white font-medium">3 critical concepts</span> may need additional sessions beyond current allocation.
            Consider adding 30 min/day or extending target date by 3 days.
          </p>
        </div>
      </div>
    </div>
  )
}