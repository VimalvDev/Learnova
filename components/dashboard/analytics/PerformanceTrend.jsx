"use client"
import { useState } from "react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

const datasets = {
  mastery:   [52, 58, 64, 68, 74, 78],
  accuracy:  [60, 65, 63, 72, 76, 81],
  response:  [45, 50, 58, 55, 62, 70],
}

const trendStats = [
  { label: "Best 7-Day Period", value: "Feb 12–18", sub: "+22% mastery gain" },
  { label: "Current Streak",   value: "🔥 6 sessions", sub: "Improvement streak" },
  { label: "Plateau Alert",    value: "⚠ Normalization", sub: "No change for 14 days" },
  { label: "Projection",       value: "85% in ~12 days", sub: "At current pace" },
]

function buildPath(data, w, h) {
  const max = 100, min = 40
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * (h - 16)
    return [x, y]
  })
  const d = pts.map(([x, y], i) => {
    if (i === 0) return `M ${x} ${y}`
    const [px, py] = pts[i - 1]
    const cpx = (px + x) / 2
    return `C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`
  }).join(" ")
  const area = d + ` L ${pts[pts.length - 1][0]} ${h} L 0 ${h} Z`
  return { d, area, pts }
}

export default function PerformanceTrend() {
  const [tab, setTab] = useState("mastery")
  const W = 400, H = 140
  const { d, area, pts } = buildPath(datasets[tab], W, H)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">

      {/* Chart card */}
      <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-6">
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
              Performance Trends
            </p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
              Mastery Progression Over Time
            </h2>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[--color-card-dark] rounded-xl border border-white/[0.06]">
            {["mastery", "accuracy", "response"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 text-[10px] font-medium rounded-lg capitalize transition-all ${
                  tab === t ? "bg-[--color-brand] text-white" : "text-[--color-tertiary-text] hover:text-white"
                }`}
              >
                {t === "mastery" ? "Mastery" : t === "accuracy" ? "Accuracy" : "Response"}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          {/* Y labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between pr-2 pointer-events-none">
            {["100%", "75%", "50%", "25%"].map((l) => (
              <span key={l} className="text-[9px] text-[--color-dark-gray] leading-none">{l}</span>
            ))}
          </div>
          <div className="pl-8">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-36">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid */}
              {[0.2, 0.4, 0.6, 0.8].map((f) => (
                <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {/* Area */}
              <path d={area} fill="url(#areaGrad)" />
              {/* Line */}
              <path d={d} fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
              {/* Dots */}
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="var(--color-brand)" stroke="var(--color-card)" strokeWidth="2" />
              ))}
            </svg>
            {/* X labels */}
            <div className="flex justify-between mt-2 px-1">
              {months.map((m) => (
                <span key={m} className="text-[9px] text-[--color-dark-gray]">{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-start gap-2">
          <span className="text-[--color-brand] text-[12px] flex-shrink-0">◈</span>
          <p className="text-[11px] text-[--color-tertiary-text] leading-relaxed italic">
            Mastery consistently improves 8–12% in the 48 hours following a revision session.
            Longest improvement streak: 6 consecutive sessions (Feb 12–18).
          </p>
        </div>
      </div>

      {/* Stats sidebar */}
      <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-5 flex flex-col gap-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70">
          Trend Analysis
        </p>
        <div className="flex flex-col divide-y divide-white/[0.04]">
          {trendStats.map(({ label, value, sub }) => (
            <div key={label} className="py-3.5 first:pt-0 last:pb-0">
              <p className="text-[9px] text-[--color-tertiary-text] uppercase tracking-widest mb-1">{label}</p>
              <p className="text-[13px] font-semibold text-white">{value}</p>
              <p className="text-[11px] text-[--color-secondary-text] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-white/[0.04]">
          <p className="text-[10px] text-[--color-tertiary-text] leading-relaxed">
            Sessions with <span className="text-white font-semibold">45+ min</span> study time show{" "}
            <span className="text-white font-semibold">2.4×</span> higher mastery gain.
          </p>
          <div className="flex items-end gap-1.5 mt-3 h-10">
            {[60, 80, 45, 90, 70].map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${b}%`,
                  background: i === 3 ? "var(--color-brand)" : "rgba(250,110,67,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}