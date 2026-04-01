"use client"
import { useState } from "react"

const months = ["Feb 1", "Feb 8", "Feb 15", "Feb 22", "Mar 1", "Mar 8", "Mar 15", "Mar 22"]

// Projected with revisions
const projected = [72, 73, 75, 78, 80, 83, 86, 89]
// Decay if skipped
const decay     = [72, 71, 70, 68, 66, 63, 60, 57]

const W = 400, H = 120

function buildLine(data) {
  const min = 50, max = 100
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * (H - 12),
  }))
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const cpx  = (prev.x + p.x) / 2
    return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`
  }).join(" ")
  const area = `${d} L ${pts[pts.length - 1].x} ${H} L 0 ${H} Z`
  return { d, area, pts }
}

const projLine  = buildLine(projected)
const decayLine = buildLine(decay)

const projStats = [
  { label: "Current Overall", value: "78%",   sub: "Today",        subColor: "text-[--color-secondary-text]" },
  { label: "Projected in 30 Days", value: "89%", sub: "+11% gain", subColor: "text-[#4ADE80]"                },
  { label: "Sessions Required", value: "14",   sub: "~6h total",    subColor: "text-[--color-secondary-text]" },
]

const conceptProjections = [
  { name: "Normalization",   current: 34, projected: 65, sessions: 3, eta: "~8 days"  },
  { name: "Func. Dep.",      current: 61, projected: 78, sessions: 2, eta: "~5 days"  },
  { name: "ER Diagrams",     current: 74, projected: 85, sessions: 1, eta: "~3 days"  },
]

const masteryColor = (m) =>
  m >= 80 ? "text-[#4ADE80]" : m >= 60 ? "text-[--color-brand]" : m >= 40 ? "text-[#FBBF24]" : "text-[var(--color-red)]"

export default function ProjectionChart() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
            Projection Model
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
            Projected Mastery if Revisions Completed
          </h2>
          <p className="text-[12px] text-[--color-tertiary-text] mt-0.5">
            Based on current mastery scores and scheduled revision sessions.
          </p>
        </div>
        <span className="text-[10px] text-[--color-tertiary-text] italic self-end text-right">
          Based on spaced repetition model
        </span>
      </div>

      {/* Chart */}
      <div className="relative mb-5">
        {/* Y labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none">
          {["100%", "80%", "60%"].map((l) => (
            <span key={l} className="text-[9px] text-[--color-dark-gray] leading-none">{l}</span>
          ))}
        </div>
        <div className="pl-8">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-32">
            <defs>
              <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid */}
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" y1={H * f} x2={W} y2={H * f}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            {/* Divergence marker */}
            <line x1="200" y1="0" x2="200" y2={H}
              stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3,3" />
            {/* Decay area (subtle) */}
            <path d={decayLine.area} fill="rgba(239,68,68,0.03)" />
            {/* Decay line */}
            <path d={decayLine.d} fill="none" stroke="rgba(239,68,68,0.45)"
              strokeWidth="1.5" strokeDasharray="5,3" strokeLinecap="round" />
            {/* Projected area */}
            <path d={projLine.area} fill="url(#projGrad)" />
            {/* Projected line */}
            <path d={projLine.d} fill="none" stroke="var(--color-brand)"
              strokeWidth="2" strokeLinecap="round" />
            {/* Dots on projected line */}
            {projLine.pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5"
                fill="var(--color-brand)" stroke="var(--color-card)" strokeWidth="1.5" />
            ))}
            {/* Today label */}
            <text x="204" y="10" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="monospace">
              Today ↕ +18%
            </text>
          </svg>
          {/* X labels */}
          <div className="flex justify-between mt-1">
            {months.map((m) => (
              <span key={m} className="text-[9px] text-[--color-dark-gray]">{m}</span>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="h-[2px] w-6 bg-[--color-brand] rounded-full" />
              <span className="text-[10px] text-[--color-secondary-text]">With revisions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-[2px] w-6 rounded-full"
                style={{ background: "rgba(239,68,68,0.5)", backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(13,13,13,1) 3px,rgba(13,13,13,1) 6px)" }} />
              <span className="text-[10px] text-[--color-secondary-text]">Without revisions (decay)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat boxes */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {projStats.map(({ label, value, sub, subColor }) => (
          <div key={label} className="bg-[--color-card-dark] rounded-xl px-4 py-3.5 border border-white/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-tertiary-text] mb-2">{label}</p>
            <p className="text-[clamp(18px,2vw,22px)] font-black text-white leading-none">{value}</p>
            <p className={`text-[11px] mt-1 font-medium ${subColor}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Concept projection table */}
      <div className="bg-[--color-card-dark] rounded-xl border border-white/[0.04] overflow-hidden">
        <div className="grid grid-cols-5 gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
          {["Concept", "Current", "Projected", "Sessions", "ETA"].map((h) => (
            <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-[--color-dark-gray]">{h}</span>
          ))}
        </div>
        {conceptProjections.map((c) => (
          <div
            key={c.name}
            className="grid grid-cols-5 gap-2 items-center px-4 py-3 border-b border-white/[0.03] last:border-0"
          >
            <span className="text-[12px] font-medium text-white">{c.name}</span>
            <span className={`text-[12px] font-semibold ${masteryColor(c.current)}`}>{c.current}%</span>
            <span className="text-[12px] font-semibold text-[--color-brand]">{c.projected}%</span>
            <span className="text-[11px] text-[--color-secondary-text]">{c.sessions} sessions</span>
            <span className="text-[11px] text-[--color-tertiary-text]">{c.eta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}