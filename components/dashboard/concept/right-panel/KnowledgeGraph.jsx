"use client"
import { useState } from "react"

const nodes = [
  { id: "fd",   label: "Functional Dep.", x: 60,  y: 12,  type: "prereq",   mastery: 61  },
  { id: "ck",   label: "Candidate Keys", x: 220, y: 12,  type: "prereq",   mastery: 78  },
  { id: "norm", label: "Normalization",  x: 140, y: 78,  type: "current",  mastery: 42  },
  { id: "2nf",  label: "2NF",           x: 70,  y: 144, type: "blocked",  mastery: 38  },
  { id: "3nf",  label: "3NF",           x: 210, y: 144, type: "blocked",  mastery: 41  },
  { id: "bcnf", label: "BCNF",          x: 210, y: 200, type: "unstudied", mastery: 0  },
]

const edges = [
  { from: "fd",   to: "norm", type: "prereq"  },
  { from: "ck",   to: "norm", type: "prereq"  },
  { from: "norm", to: "2nf",  type: "blocked" },
  { from: "norm", to: "3nf",  type: "blocked" },
  { from: "3nf",  to: "bcnf", type: "blocked" },
]

const nodeStyle = {
  prereq:   { bg: "#FBBF2412", border: "#FBBF24", text: "#FBBF24" },
  current:  { bg: "var(--color-brand-20)", border: "var(--color-brand)", text: "#ffffff" },
  blocked:  { bg: "var(--color-red-10)", border: "var(--color-red)", text: "var(--color-red)" },
  unstudied:{ bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.1)", text: "#666" },
}

const prereqStatus = [
  { name: "Functional Dependency", pct: 61, status: "Prerequisite gap", color: "text-[#FBBF24]" },
  { name: "Candidate Keys",        pct: 78, status: "Sufficient",        color: "text-[#4ADE80]" },
]

export default function KnowledgeGraph() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">
        Concept Relationships
      </p>
      <h3 className="text-[14px] font-semibold text-white mb-0.5">Knowledge Graph</h3>
      <p className="text-[11px] text-(--color-tertiary-text) mb-4">
        Prerequisite chain and dependent concepts.
      </p>

      {/* SVG graph */}
      <div className="bg-card-dark rounded-xl p-3 mb-4">
        <svg viewBox="0 0 300 230" className="w-full h-44">
          {/* Edges */}
          {edges.map((e) => {
            const from = nodes.find(n => n.id === e.from)
            const to   = nodes.find(n => n.id === e.to)
            const isPrereq = e.type === "prereq"
            return (
              <g key={`${e.from}-${e.to}`}>
                <line
                  x1={from.x + 40} y1={from.y + 14}
                  x2={to.x + 40}   y2={to.y}
                  stroke={isPrereq ? "rgba(251,191,36,0.4)" : "rgba(239,68,68,0.3)"}
                  strokeWidth="1.5"
                  strokeDasharray={isPrereq ? "none" : "4,3"}
                />
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const s       = nodeStyle[node.type]
            const isCurr  = node.type === "current"
            const isHov   = hovered === node.id
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={node.x} y={node.y}
                  width={isCurr ? 100 : 80} height={isCurr ? 28 : 24}
                  rx="6"
                  fill={s.bg}
                  stroke={s.border}
                  strokeWidth={isCurr ? 2 : 1}
                  opacity={isHov ? 1 : 0.9}
                />
                <text
                  x={node.x + (isCurr ? 50 : 40)}
                  y={node.y + (isCurr ? 18 : 16)}
                  textAnchor="middle"
                  fontSize={isCurr ? "10" : "9"}
                  fontWeight={isCurr ? "700" : "500"}
                  fill={s.text}
                  fontFamily="Inter, sans-serif"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-2">
          {[
            { color: "bg-[#FBBF24]",           label: "Prerequisite" },
            { color: "bg-(--color-brand)",      label: "Current"     },
            { color: "bg-[var(--color-red)]",   label: "Blocked"     },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
              <span className="text-[9px] text-(--color-tertiary-text)">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prereq status */}
      <div className="flex flex-col gap-2 mb-3">
        {prereqStatus.map(({ name, pct, status, color }) => (
          <div key={name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-(--color-brand) text-[11px]">◈</span>
              <span className="text-[11px] text-white truncate">{name}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`text-[11px] font-semibold ${color}`}>{pct}%</span>
              <span className="text-[10px] text-(--color-tertiary-text)">{status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card-dark rounded-xl p-3">
        <p className="text-[10px] text-(--color-tertiary-text) leading-relaxed">
          Mastering Functional Dependency first will significantly accelerate Normalization progress.
        </p>
      </div>
    </div>
  )
}