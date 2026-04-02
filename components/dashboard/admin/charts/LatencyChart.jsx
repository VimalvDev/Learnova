const W = 300, H = 100

const data = [1.1,1.3,1.2,1.4,1.2,1.1,1.3,1.5,3.84,1.8,1.4,1.3,1.2,1.3,1.24]
const min = 0, max = 5

export default function LatencyChart() {
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * (H - 8),
  }))
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const cp = (pts[i-1].x + p.x) / 2
    return `C ${cp} ${pts[i-1].y} ${cp} ${p.y} ${p.x} ${p.y}`
  }).join(" ")
  const area = `${d} L ${W} ${H} L 0 ${H} Z`
  const slaY  = H - ((2 - min) / (max - min)) * (H - 8)

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25,0.5,0.75].map(f => (
          <line key={f} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* SLA threshold */}
        <line x1="0" y1={slaY} x2={W} y2={slaY} stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="4,3" />
        <text x={W-2} y={slaY - 3} textAnchor="end" fontSize="7" fill="#FBBF24" fontFamily="Inter">SLA 2s</text>
        <path d={area} fill="url(#latGrad)" />
        <path d={d} fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="flex items-center justify-center gap-5 mt-2 pt-3 border-t border-card-dark">
        {[
          { label: "Current", value: "1.24s" },
          { label: "24h Avg", value: "1.31s" },
          { label: "Peak",    value: "3.84s" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-[9px] text-tertiary-text">{label}</span>
            <span className="text-[13px] font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}