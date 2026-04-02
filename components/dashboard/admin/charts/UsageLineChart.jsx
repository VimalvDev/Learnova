const W = 500, H = 140

function buildPath(data, min, max) {
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min || 1)) * (H - 12),
  }))
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const cp = (pts[i-1].x + p.x) / 2
    return `C ${cp} ${pts[i-1].y} ${cp} ${p.y} ${p.x} ${p.y}`
  }).join(" ")
  return { d, pts }
}

const apiData  = [14000,16200,15800,18400,17200,18420,19800]
const embData  = [4200, 5100, 4900, 5800, 5200, 5640, 6100]
const ragData  = [10200,11800,11400,13400,12500,13200,14200]
const labels   = ["Feb 16","Feb 17","Feb 18","Feb 19","Feb 20","Feb 21","Feb 22"]
const allVals  = [...apiData,...embData,...ragData]
const min = Math.min(...allVals), max = Math.max(...allVals)

const api  = buildPath(apiData, min, max)
const emb  = buildPath(embData, min, max)
const rag  = buildPath(ragData, min, max)

export default function UsageLineChart() {
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-36">
        <defs>
          <linearGradient id="adminApiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25,0.5,0.75].map(f => (
          <line key={f} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* Spike annotation */}
        <line x1="420" y1="0" x2="420" y2={H} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
        <text x="424" y="12" fontSize="8" fill="#555" fontFamily="Inter">Feature release +34%</text>
        {/* Area */}
        <path d={`${api.d} L ${W} ${H} L 0 ${H} Z`} fill="url(#adminApiGrad)" />
        {/* Lines */}
        <path d={api.d} fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
        <path d={emb.d} fill="none" stroke="rgba(74,222,128,0.6)" strokeWidth="1.5" strokeDasharray="5,3" strokeLinecap="round" />
        <path d={rag.d} fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" strokeDasharray="5,3" strokeLinecap="round" />
        {/* Dots on api */}
        {api.pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-brand)" stroke="var(--color-card)" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="flex justify-between mt-1 px-1">
        {labels.map(l => <span key={l} className="text-[9px] text-dark-gray">{l}</span>)}
      </div>
    </div>
  )
}