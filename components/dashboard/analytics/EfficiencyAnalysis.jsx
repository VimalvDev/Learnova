const scatter = [
  { name: "SQL Joins",       x: 82, y: 94, q: "mastered"  },
  { name: "ER Diagrams",     x: 55, y: 79, q: "understanding" },
  { name: "Normalization",   x: 40, y: 45, q: "struggling"  },
  { name: "Graph Trav.",     x: 78, y: 51, q: "guessing"   },
  { name: "ACID Props",      x: 70, y: 85, q: "mastered"   },
  { name: "Indexing",        x: 65, y: 88, q: "mastered"   },
  { name: "FD Closure",      x: 35, y: 58, q: "struggling" },
  { name: "B-Trees",         x: 60, y: 82, q: "mastered"   },
]

const qColors = {
  mastered:     "fill-[#4ADE80]/60",
  understanding:"fill-[--color-brand]/60",
  struggling:   "fill-[var(--color-red)]/60",
  guessing:     "fill-[#FBBF24]/60",
}

const decay = [
  { name: "SQL Joins",     pct: 91, rate: "−2% / week",  color: "bg-[--color-brand]",     label: "text-[#4ADE80]"  },
  { name: "Normalization", pct: 34, rate: "−9% / week",  color: "bg-[var(--color-red)]",  label: "text-[var(--color-red)]" },
  { name: "Indexing",      pct: 71, rate: "−5% / week",  color: "bg-[#FBBF24]",           label: "text-[#FBBF24]"  },
]

const scores = [
  { label: "Speed Factor",    value: 84, trend: "↑", trendColor: "text-[#4ADE80]" },
  { label: "Accuracy Weight", value: 71, trend: "↑", trendColor: "text-[#4ADE80]" },
  { label: "Consistency",     value: 62, trend: "→", trendColor: "text-[--color-secondary-text]" },
]

export default function EfficiencyAnalysis() {
  const efficiency = 72
  const r = 36
  const circ = Math.PI * r
  const fill = (efficiency / 100) * circ

  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr_3fr] gap-4">

      {/* Scatter */}
      <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">Efficiency Analysis</p>
        <h3 className="text-[15px] font-semibold text-white mb-0.5">Speed vs Accuracy</h3>
        <p className="text-[11px] text-[--color-tertiary-text] mb-4">Each dot is one concept.</p>
        <div className="relative">
          <svg viewBox="0 0 220 160" className="w-full h-40">
            {/* Grid */}
            <line x1="110" y1="0" x2="110" y2="160" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="0" y1="80" x2="220" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
            {/* Quadrant labels */}
            <text x="8"  y="16"  fontSize="7" fill="rgba(255,255,255,0.12)" fontFamily="monospace">Understanding</text>
            <text x="116" y="16" fontSize="7" fill="rgba(255,255,255,0.12)" fontFamily="monospace">Mastery</text>
            <text x="8"  y="156" fontSize="7" fill="rgba(255,255,255,0.12)" fontFamily="monospace">Struggling</text>
            <text x="116" y="156" fontSize="7" fill="rgba(255,255,255,0.12)" fontFamily="monospace">Guessing</text>
            {/* Dots */}
            {scatter.map((d) => {
              const cx = (d.x / 100) * 200 + 10
              const cy = ((100 - d.y) / 100) * 140 + 10
              const colors = {
                mastered:     "#4ADE80",
                understanding:"var(--color-brand)",
                struggling:   "var(--color-red)",
                guessing:     "#FBBF24",
              }
              return (
                <circle key={d.name} cx={cx} cy={cy} r="6" fill={colors[d.q]} fillOpacity="0.65" stroke="var(--color-card)" strokeWidth="1.5" />
              )
            })}
          </svg>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-[--color-dark-gray]">← Slow</span>
            <span className="text-[9px] text-[--color-dark-gray] text-center">Response Speed</span>
            <span className="text-[9px] text-[--color-dark-gray]">Fast →</span>
          </div>
        </div>
      </div>

      {/* Retention */}
      <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">Retention Stability</p>
        <h3 className="text-[15px] font-semibold text-white mb-4">Knowledge Decay Rate</h3>
        <div className="flex flex-col gap-4">
          {decay.map((d) => (
            <div key={d.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] text-white font-medium">{d.name}</span>
                <span className={`text-[10px] font-semibold ${d.label}`}>{d.rate}</span>
              </div>
              <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-3 bg-[--color-card-dark] rounded-xl border border-white/[0.04]">
          <p className="text-[10px] text-[--color-tertiary-text] leading-relaxed">
            <span className="text-[--color-brand]">◈</span>{" "}
            Concepts decay fastest when revision gaps exceed{" "}
            <span className="text-white font-semibold">7 days</span>.
            Average decay: <span className="text-white font-semibold">−6.2% / week</span> without review.
          </p>
        </div>
      </div>

      {/* Efficiency gauge */}
      <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-5 flex flex-col items-center">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1 self-start">Efficiency Score</p>
        <h3 className="text-[15px] font-semibold text-white mb-5 self-start">Overall Score</h3>

        {/* Semicircle gauge */}
        <div className="relative w-28 h-14 flex-shrink-0">
          <svg viewBox="0 0 120 60" className="w-full h-full">
            {/* Track */}
            <path
              d="M 10 55 A 50 50 0 0 1 110 55"
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round"
            />
            {/* Fill */}
            <path
              d="M 10 55 A 50 50 0 0 1 110 55"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(efficiency / 100) * 157} 157`}
            />
          </svg>
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
            <span className="text-[22px] font-black text-white leading-none">{efficiency}</span>
            <span className="text-[9px] text-[--color-tertiary-text]">/ 100</span>
          </div>
        </div>

        <p className="text-[10px] text-[--color-secondary-text] mt-2 mb-4">Efficiency Score</p>

        <div className="w-full flex flex-col divide-y divide-white/[0.04]">
          {scores.map(({ label, value, trend, trendColor }) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <span className="text-[11px] text-[--color-tertiary-text]">{label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold text-white">{value}</span>
                <span className={`text-[12px] font-bold ${trendColor}`}>{trend}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-[--color-tertiary-text] leading-relaxed mt-4 text-center">
          Efficiency measures your balance of speed, accuracy, and consistency.
        </p>
      </div>
    </div>
  )
}