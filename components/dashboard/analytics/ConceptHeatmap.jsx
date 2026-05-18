"use client"
import { useState } from "react"

function Skeleton() {
  return (
    <div className="p-6 grid grid-cols-4 sm:grid-cols-6 gap-2">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="aspect-square bg-white/[0.04] rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

const cellStyle = {
  mastered:     { bg: "bg-[#4ADE80]/10",  text: "text-[#4ADE80]",  label: "text-[#E0FFE8]"  },
  good:         { bg: "bg-brand/10",      text: "text-brand",      label: "text-white"       },
  needs_revision: { bg: "bg-[#FBBF24]/[0.07]", text: "text-[#FBBF24]", label: "text-[#FFF3DC]" },
  critical:     { bg: "bg-[#F87171]/[0.07]",   text: "text-[#F87171]", label: "text-[#FFE8E8]"  },
  not_started:  { bg: "bg-white/[0.02]",  text: "text-[#555]",     label: "text-[#555]"      },
}

const legend = [
  { label: "Mastered 85%+",  color: "bg-[#4ADE80]"  },
  { label: "Good 70–84%",    color: "bg-brand"       },
  { label: "Revision 40–69%",color: "bg-[#FBBF24]"  },
  { label: "Critical <40%",  color: "bg-[#F87171]"   },
  { label: "Not Started",    color: "bg-white/[0.15]"},
]

export default function ConceptHeatmap({ cells, loading }) {
  const [hovered, setHovered] = useState(null)

  const allCells = cells ?? []

  // Count by status
  const counts = allCells.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Topic Heatmap</p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Concept Performance Map</h2>
        <p className="text-[12px] text-tertiary-text mt-0.5">
          Color reflects mastery depth. Updated after every quiz.
        </p>
      </div>

      {loading ? <Skeleton /> : allCells.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-[13px] text-tertiary-text">No concept data yet. Take a quiz first.</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            {allCells.map((cell, i) => {
              const s = cellStyle[cell.status] ?? cellStyle.not_started
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex flex-col items-center justify-center rounded-xl py-3 px-2 cursor-pointer transition-all hover:scale-[1.03] ${s.bg}`}
                >
                  <span className={`text-[10px] font-medium text-center leading-tight ${s.label}`}>
                    {cell.name}
                  </span>
                  <span className={`text-[13px] font-bold mt-1 ${s.text}`}>
                    {cell.score !== null ? `${cell.score}%` : "—"}
                  </span>
                  {hovered === i && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-[#1e1e1e] rounded-xl border border-white/[0.08] p-3 shadow-2xl z-20 pointer-events-none">
                      <p className="text-[12px] font-semibold text-white mb-1">{cell.name}</p>
                      <p className="text-[10px] text-secondary-text">
                        Mastery: <span className={`font-semibold ${s.text}`}>{cell.score !== null ? `${cell.score}%` : "Not started"}</span>
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-4 mt-5 flex-wrap justify-end">
            {legend.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                <span className="text-[10px] text-secondary-text">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/[0.04] flex-wrap">
            {[
              { label: "mastered",      color: "text-[#4ADE80]" },
              { label: "good",          color: "text-brand"     },
              { label: "needs_revision",color: "text-[#FBBF24]" },
              { label: "critical",      color: "text-[#F87171]" },
              { label: "not_started",   color: "text-[#555]"    },
            ].map(({ label, color }) => (
              counts[label] ? (
                <span key={label} className="text-[11px] text-tertiary-text">
                  <span className={`font-bold ${color}`}>{counts[label]}</span>{" "}
                  {label.replace("_", " ")}
                </span>
              ) : null
            ))}
          </div>
        </div>
      )}
    </div>
  )
}