const W = 400, H = 120

const weeklyData = [
  { label: "Jan W3", new: 82,  cum: 2100 },
  { label: "Jan W4", label2: "Jan W4", new: 97,  cum: 2197 },
  { label: "Feb W1", new: 142, cum: 2339, peak: true },
  { label: "Feb W2", new: 134, cum: 2473 },
  { label: "Feb W3", new: 118, cum: 2591 },
  { label: "Feb W4", new: 124, cum: 2847 },
]

export default function GrowthBarChart() {
  const maxNew = Math.max(...weeklyData.map(d => d.new))
  const barW   = (W / weeklyData.length) * 0.6
  const gap    = (W / weeklyData.length) * 0.4

  const cumMin = 2000
  const cumMax = 3000
  const cumPts = weeklyData.map((d, i) => ({
    x: (i / (weeklyData.length - 1)) * W,
    y: H - ((d.cum - cumMin) / (cumMax - cumMin)) * (H - 12),
  }))
  const cumPath = cumPts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const cp = (cumPts[i-1].x + p.x) / 2
    return `C ${cp} ${cumPts[i-1].y} ${cp} ${p.y} ${p.x} ${p.y}`
  }).join(" ")

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32" preserveAspectRatio="none">
        {[0.25,0.5,0.75].map(f => (
          <line key={f} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {weeklyData.map((d, i) => {
          const bh = (d.new / maxNew) * (H - 16)
          const bx = i * (W / weeklyData.length) + gap / 2
          return (
            <g key={d.label}>
              <rect x={bx} y={H - bh} width={barW} height={bh} rx="3" fill="rgba(83,77,229,0.55)" />
              {d.peak && (
                <text x={bx + barW / 2} y={H - bh - 6} textAnchor="middle" fontSize="7" fill="#4ADE80" fontFamily="Inter">
                  🔺 +67%
                </text>
              )}
            </g>
          )
        })}
        <path d={cumPath} fill="none" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5" strokeDasharray="4,3" />
      </svg>
      <div className="flex justify-between mt-1">
        {weeklyData.map(d => <span key={d.label} className="text-[9px] text-dark-gray">{d.label}</span>)}
      </div>
    </div>
  )
}