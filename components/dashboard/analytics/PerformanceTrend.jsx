"use client"
import { useState } from "react"

function Skeleton({ className }) {
  return <div className={`bg-white/[0.06] rounded-lg animate-pulse ${className}`} />
}

function buildPath(data, key, W, H, min = 0, max = 100) {
  if (!data?.length) return { d: "", area: "", pts: [] }
  const range = max - min || 1
  const pts   = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * W
    const y = H - ((((d[key] ?? 0) - min) / range) * (H - 20)) - 10
    return [x, y]
  })
  const d = pts.map(([x, y], i) => {
    if (i === 0) return `M ${x} ${y}`
    const [px, py] = pts[i - 1]
    const cpx = (px + x) / 2
    return `C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`
  }).join(" ")
  const area = pts.length > 1
    ? d + ` L ${pts[pts.length - 1][0]} ${H} L 0 ${H} Z`
    : ""
  return { d, area, pts }
}

export default function PerformanceTrend({ trendData, quizTrend, loading }) {
  const [tab, setTab] = useState("mastery")

  const activeData = tab === "mastery" ? (trendData ?? []) : (quizTrend ?? [])
  const activeKey  = tab === "mastery" ? "mastery" : "accuracy"
  const W = 500, H = 150

  const { d, area, pts } = buildPath(activeData, activeKey, W, H)

  const hasData = activeData.length > 1

  return (
    <div className="bg-card-dark rounded-2xl p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
            Performance Trends
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
            Mastery Over Time
          </h2>
        </div>
        <div className="flex items-center gap-1 p-1 bg-[#111] rounded-xl">
          {[
            { id: "mastery",  label: "Mastery"  },
            { id: "accuracy", label: "Quiz Accuracy" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                tab === id ? "bg-brand text-white" : "text-tertiary-text hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : !hasData ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-tertiary-text">Take more quizzes to see trends.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-0 top-0 h-[150px] flex flex-col justify-between pr-2 pointer-events-none">
            {["100%", "75%", "50%", "25%"].map((l) => (
              <span key={l} className="text-[9px] text-[#444] leading-none">{l}</span>
            ))}
          </div>
          <div className="pl-8 overflow-hidden">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-40">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FA6E43" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FA6E43" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {area && <path d={area} fill="url(#areaGrad)" />}
              {d && <path d={d} fill="none" stroke="#FA6E43" strokeWidth="2" strokeLinecap="round" />}
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#FA6E43" stroke="#0D0D0D" strokeWidth="2" />
              ))}
            </svg>
            <div className="flex justify-between mt-2 px-1">
              {activeData.map((d, i) => (
                <span key={i} className="text-[9px] text-[#444] truncate max-w-[40px] text-center">{d.label}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}