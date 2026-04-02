"use client"
import { useState } from "react"

const cells = [
  { name: "SQL Joins",      pct: 91, status: "mastered"  },
  { name: "Indexing",       pct: 88, status: "mastered"  },
  { name: "ACID Props",     pct: 85, status: "mastered"  },
  { name: "B-Trees",        pct: 82, status: "good"      },
  { name: "Hashing",        pct: 79, status: "good"      },
  { name: "ER Diagrams",    pct: 74, status: "good"      },
  { name: "Transactions",   pct: 68, status: "revision"  },
  { name: "Triggers",       pct: 67, status: "revision"  },
  { name: "Views",          pct: 64, status: "revision"  },
  { name: "Cursors",        pct: 61, status: "revision"  },
  { name: "FD Closure",     pct: 58, status: "revision"  },
  { name: "Decomposition",  pct: 55, status: "revision"  },
  { name: "Normalization",  pct: 34, status: "critical"  },
  { name: "2NF",            pct: 38, status: "critical"  },
  { name: "3NF",            pct: 41, status: "critical"  },
  { name: "Graph Trav.",    pct: 48, status: "critical"  },
  { name: "Concurrency",    pct: null, status: "unstudied" },
  { name: "Recovery",       pct: null, status: "unstudied" },
  { name: "Procedures",     pct: null, status: "unstudied" },
  { name: "Sequences",      pct: null, status: "unstudied" },
  { name: "Partitioning",   pct: null, status: "unstudied" },
  { name: "Replication",    pct: null, status: "unstudied" },
  { name: "Sharding",       pct: null, status: "unstudied" },
  { name: "Clustering",     pct: null, status: "unstudied" },
]

const cellStyle = {
  mastered:  { bg: "bg-[#4ADE80]/10",  text: "text-[#4ADE80]",   label: "text-[#E0FFE8]"  },
  good:      { bg: "bg-green-600/10",  text: "text-[--color-brand]", label: "text-white" },
  revision:  { bg: "bg-[#FBBF24]/[0.07]",  text: "text-[#FBBF24]", label: "text-[#FFF3DC]" },
  critical:  { bg: "bg-[var(--color-red)]/[0.07]",  text: "text-[var(--color-red)]", label: "text-[#FFE8E8]" },
  unstudied: { bg: "bg-white/[0.02]",   text: "text-[--color-dark-gray]", label: "text-[--color-dark-gray]" },
}

const legend = [
  { label: "Mastered 85%+",    color: "bg-[#4ADE80]"        },
  { label: "Good 70–84%",      color: "bg-[--color-brand]"  },
  { label: "Revision 50–69%",  color: "bg-[#FBBF24]"        },
  { label: "Critical <50%",    color: "bg-[var(--color-red)]" },
  { label: "Unstudied",        color: "bg-white/[0.15]"     },
]

export default function ConceptHeatmap() {
  const [view, setView] = useState("mastery")
  const [hovered, setHovered] = useState(null)

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
              Topic Heatmap
            </p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
              Concept Performance Map
            </h2>
            <p className="text-[12px] text-[--color-tertiary-text] mt-0.5">
              Color intensity reflects mastery depth. Updated after every quiz session.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[--color-card-dark] rounded-xl border border-white/[0.06]">
            {["mastery", "activity", "improvement"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 text-[10px] font-medium rounded-lg capitalize transition-all ${
                  view === v ? "bg-[--color-brand] text-white" : "text-[--color-tertiary-text] hover:text-white"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {cells.map((cell, i) => {
            const s = cellStyle[cell.status]
            return (
              <div
                key={cell.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex flex-col items-center justify-center rounded-xl  py-3 px-2 cursor-pointer transition-all hover:scale-[1.03] ${s.bg} ${s.border}`}
              >
                <span className={`text-[10px] font-medium text-center leading-tight ${s.label}`}>
                  {cell.name}
                </span>
                <span className={`text-[13px] font-bold mt-1 ${s.text}`}>
                  {cell.pct !== null ? `${cell.pct}%` : "—"}
                </span>
                {hovered === i && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-[--color-card-mid] rounded-xl border border-white/[0.08] p-3 shadow-2xl z-20 pointer-events-none">
                    <p className="text-[12px] font-semibold text-white mb-1">{cell.name}</p>
                    <p className="text-[10px] text-[--color-secondary-text]">
                      Mastery: <span className={`font-semibold ${s.text}`}>{cell.pct ?? "Not started"}%</span>
                    </p>
                    <button className="mt-2 w-full text-[10px] text-[--color-brand] font-medium bg-[--color-brand]/10 rounded-lg py-1">
                      Study Now →
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-5 flex-wrap justify-end">
          {legend.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
              <span className="text-[10px] text-[--color-secondary-text]">{label}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/[0.04] flex-wrap">
          {[
            { label: "mastered",  count: 3,  color: "text-[#4ADE80]"          },
            { label: "good",      count: 3,  color: "text-[--color-brand]"    },
            { label: "revision",  count: 6,  color: "text-[#FBBF24]"          },
            { label: "critical",  count: 4,  color: "text-[var(--color-red)]" },
            { label: "unstudied", count: 8,  color: "text-[--color-dark-gray]" },
          ].map(({ label, count, color }) => (
            <span key={label} className="text-[11px] text-[--color-tertiary-text]">
              <span className={`font-bold ${color}`}>{count}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}