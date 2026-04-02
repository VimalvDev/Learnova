const W = 200, H = 100

const planLine  = [78, 80, 83, 86, 89]
const decayLine = [78, 76, 74, 72, 71]
const weeks     = ["Now", "W1", "W2", "W3", "End"]

function buildPath(data) {
  const min = 60, max = 95
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * (H - 8),
  }))
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const cp = (pts[i - 1].x + p.x) / 2
    return `C ${cp} ${pts[i-1].y} ${cp} ${p.y} ${p.x} ${p.y}`
  }).join(" ")
  const area = `${d} L ${pts[pts.length-1].x} ${H} L 0 ${H} Z`
  return { d, area, pts }
}

const planPath  = buildPath(planLine)
const decayPath = buildPath(decayLine)

export default function MasteryForecast({ phase }) {
  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
        Projected Outcome
      </p>
      <h3 className="text-[14px] font-semibold text-white mb-4">Mastery Forecast</h3>

      {/* Chart */}
      <div className="bg-card-dark rounded-xl p-3 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-24">
          <defs>
            <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.33, 0.66].map(f => (
            <line key={f} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          <path d={decayPath.d} fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" strokeDasharray="4,3" />
          <path d={planPath.area} fill="url(#forecastGrad)" />
          <path d={planPath.d} fill="none" stroke="var(--color-brand)" strokeWidth="2" />

          {/* End labels */}
          <text x={W - 2} y={planPath.pts[4].y - 4} textAnchor="end" fontSize="7" fill="var(--color-brand)" fontFamily="Inter">89%</text>
          <text x={W - 2} y={decayPath.pts[4].y + 9} textAnchor="end" fontSize="7" fill="rgba(239,68,68,0.7)" fontFamily="Inter">71%</text>
        </svg>
        <div className="flex justify-between mt-1">
          {weeks.map(w => (
            <span key={w} className="text-[9px] text-dark-gray">{w}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-card-dark">
        {[
          { label: "Today",    value: "78%",   color: "text-white"           },
          { label: "Plan end", value: "89%",   color: "text-white"           },
          { label: "Gain",     value: "+11%",  color: "text-[#4ADE80]"       },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex flex-col items-center py-2.5">
            <span className="text-[9px] text-tertiary-text mb-1">{label}</span>
            <span className={`text-[16px] font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}