export default function SparklineChart({ data, color = "var(--color-brand)", width = 80, height = 40 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / (max - min || 1)) * (height - 4),
  }))
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const cp = (pts[i - 1].x + p.x) / 2
    return `C ${cp} ${pts[i-1].y} ${cp} ${p.y} ${p.x} ${p.y}`
  }).join(" ")
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height }} preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}