"use client"
import { useState } from "react"

const tabs = ["Mastery Score", "Accuracy", "Response Time"]

const sessions = [
  { date: "Feb 5",  mastery: 44, accuracy: 40, response: 100 },
  { date: "Feb 8",  mastery: 48, accuracy: 46, response: 95  },
  { date: "Feb 12", mastery: 57, accuracy: 62, response: 80  },
  { date: "Feb 14", mastery: 61, accuracy: 65, response: 75  },
  { date: "Feb 18", mastery: 54, accuracy: 58, response: 85  },
  { date: "Feb 21", mastery: 50, accuracy: 55, response: 90  },
  { date: "Feb 23", mastery: 42, accuracy: 45, response: 95  },
]

const W = 400, H = 120

function buildPath(values) {
  const min = 30, max = 100
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * (H - 12),
  }))
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const cp = (pts[i - 1].x + p.x) / 2
    return `C ${cp} ${pts[i-1].y} ${cp} ${p.y} ${p.x} ${p.y}`
  }).join(" ")
  const area = `${d} L ${pts[pts.length-1].x} ${H} L 0 ${H} Z`
  return { d, area, pts }
}

export default function PerformanceTrend() {
  const [tab, setTab] = useState("Mastery Score")

  const key    = tab === "Mastery Score" ? "mastery" : tab === "Accuracy" ? "accuracy" : "response"
  const values = sessions.map(s => s[key])
  const { d, area, pts } = buildPath(values)

  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
            Performance History
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
            Mastery Progression Over Time
          </h2>
        </div>
        <div className="flex items-center gap-0.5 p-1 bg-card-dark rounded-xl">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all whitespace-nowrap ${
                tab === t ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Y labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none">
          {["100%","75%","50%","25%","0%"].map(l => (
            <span key={l} className="text-[9px] text-dark-gray leading-none">{l}</span>
          ))}
        </div>

        <div className="pl-8">
          {/* Annotation zones */}
          <div className="relative">
            <div className="absolute inset-0 flex">
              {/* Improvement zone (session 3–4) */}
              <div className="flex-[3]" />
              <div className="flex-[2] bg-[#4ADE80]/[0.03] rounded" />
              <div className="flex-1" />
              {/* Decline zone (session 5–6) */}
              <div className="flex-[2] bg-[var(--color-red)]/[0.03] rounded" />
              <div className="flex-1" />
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-32">
            <defs>
              <linearGradient id="conceptGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25,0.5,0.75].map(f => (
              <line key={f} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            <path d={area} fill="url(#conceptGrad)" />
            <path d={d} fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--color-brand)" stroke="var(--color-card)" strokeWidth="1.5" />
            ))}
          </svg>

          {/* X labels */}
          <div className="flex justify-between mt-1">
            {sessions.map(s => (
              <span key={s.date} className="text-[9px] text-dark-gray">{s.date}</span>
            ))}
          </div>

          {/* Session diamonds */}
          <div className="flex justify-between mt-1">
            {sessions.map(s => (
              <span key={s.date} className="text-[8px] text-brand opacity-60">◆</span>
            ))}
          </div>
        </div>
      </div>

      {/* Annotation */}
      <div className="mt-4 pt-4 border-t border-card-dark flex items-start gap-2">
        <span className="text-brand flex-shrink-0 mt-0.5">◈</span>
        <p className="text-[11px] text-tertiary-text leading-relaxed italic">
          Mastery dropped 12% during a 7-day revision gap (Feb 15–20). Recovery sessions on Feb 21 and 23 partially restored performance. Pattern suggests this concept requires review every 3–4 days at current mastery level.
        </p>
      </div>
    </div>
  )
}