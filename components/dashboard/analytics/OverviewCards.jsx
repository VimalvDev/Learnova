import { RiArrowRightUpLine, RiArrowRightDownLine } from "react-icons/ri"

function Skeleton({ className }) {
  return <div className={`bg-white/[0.06] rounded-lg animate-pulse ${className}`} />
}

function Ring({ pct }) {
  const r    = 26
  const circ = 2 * Math.PI * r
  const fill = (Math.min(100, pct) / 100) * circ
  return (
    <div className="relative shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--color-brand)" strokeWidth="5"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-white">
        {pct}
      </span>
    </div>
  )
}

export default function OverviewCards({ overview, loading }) {
  const {
    avgMastery = 0, mastered = 0, totalConcepts = 0,
    critical = 0, improvementRate = 0,
    avgResponse = 0, responseDelta = 0,
  } = overview ?? {}

  const cards = [
    {
      label: "Overall Mastery",
      value: `${avgMastery}%`,
      sub:   totalConcepts > 0 ? `${totalConcepts} concepts tracked` : "No data yet",
      delta: null,
      ring:  avgMastery,
      color: "text-white",
    },
    {
      label: "Improvement Rate",
      value: improvementRate === 0 ? "—" : `${improvementRate > 0 ? "+" : ""}${improvementRate}%`,
      sub:   "vs previous 7 days",
      delta: improvementRate,
      color: improvementRate >= 0 ? "text-[#4ADE80]" : "text-[#F87171]",
    },
    {
      label: "Critical Weaknesses",
      value: String(critical),
      sub:   critical > 0 ? "Below 40% threshold" : "None — looking good",
      delta: null,
      color: critical > 0 ? "text-[#F87171]" : "text-[#4ADE80]",
    },
    {
      label: "Avg Response Time",
      value: avgResponse > 0 ? `${avgResponse}s` : "—",
      sub:   avgResponse > 0 ? `${responseDelta > 0 ? "+" : ""}${responseDelta}% vs 30-day avg` : "No timing data",
      delta: -responseDelta, // negative delta = faster = good
      color: responseDelta <= 0 ? "text-[#4ADE80]" : "text-[#F87171]",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, delta, ring, color }) => (
        <div key={label} className="bg-card-dark rounded-2xl p-5 flex flex-col gap-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">{label}</p>
          {loading ? (
            <>
              <Skeleton className="h-9 w-24 mt-1" />
              <Skeleton className="h-3 w-32" />
            </>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className={`text-[clamp(26px,3vw,36px)] font-black leading-none ${color}`}>{value}</p>
                {delta !== null && delta !== 0 && (
                  <div className="flex items-center gap-1">
                    {delta > 0
                      ? <RiArrowRightUpLine className="text-[#4ADE80] text-[13px]" />
                      : <RiArrowRightDownLine className="text-[#F87171] text-[13px]" />
                    }
                    <span className={`text-[11px] font-medium ${delta > 0 ? "text-[#4ADE80]" : "text-[#F87171]"}`}>
                      {delta > 0 ? `+${delta}%` : `${delta}%`}
                    </span>
                  </div>
                )}
                <p className="text-[11px] text-tertiary-text">{sub}</p>
              </div>
              {ring !== undefined && <Ring pct={ring} />}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}