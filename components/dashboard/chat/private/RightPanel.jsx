"use client"
import { useState } from "react"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

const units = [
  { name: "Introduction to Databases", docs: 2, active: true  },
  { name: "ER Model",                  docs: 1, active: true  },
  { name: "Normalization",             docs: 1, active: true  },
]

const sources = [
  { rank: 1, name: "DBMS_Notes.pdf",      loc: "Ch.4 · P.57", score: 0.91, snippet: "…2NF requires every non-prime attribute to be fully dependent on the primary key…" },
  { rank: 2, name: "Unit2_Slides.pdf",    loc: "Slide 14",     score: 0.84, snippet: "…A relation R is in 2NF if no non-prime attribute is partially dependent…"         },
  { rank: 3, name: "DBMS_Notes.pdf",      loc: "Ch.3 · P.29",  score: 0.71, snippet: "…Partial dependency occurs when a non-key attribute depends on part of a composite key…" },
]

const activeFiles = [
  { name: "DBMS_Complete_Notes.pdf", active: true  },
  { name: "Unit2_Slides.pdf",        active: true  },
]

const scoreColor = (s) => s >= 0.85 ? "text-(--color-brand)" : s >= 0.70 ? "text-[#FBBF24]" : "text-[var(--color-red)]"
const scoreBar   = (s) => s >= 0.85 ? "bg-(--color-brand)" : s >= 0.70 ? "bg-[#FBBF24]" : "bg-[var(--color-red)]"

export default function RightPanel() {
  const [threshold, setThreshold] = useState(75)
  const [sourcesOpen, setSourcesOpen] = useState(true)

  return (
    <div className="flex flex-col h-full overflow-y-auto mt-[2em] bg-card-dark border-l border-(--color-card)">

      {/* Scope */}
      <div className="p-4 border-b border-(--color-card)">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70">Scope</p>
          <button className="text-[10px] text-(--color-brand) hover:underline">Deselect All</button>
        </div>
        <div className="flex flex-col gap-2">
          {units.map((u) => (
            <div key={u.name} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-white truncate">{u.name}</p>
                <p className="text-[10px] text-(--color-tertiary-text)">{u.docs} docs</p>
              </div>
              <div className={`w-8 h-4 rounded-full relative flex-shrink-0 transition-all ${u.active ? "bg-(--color-brand)" : "bg-white/[0.1]"}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${u.active ? "left-[17px]" : "left-[2px]"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence threshold */}
      <div className="p-4 border-b border-(--color-card)">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70">Confidence Threshold</p>
          <span className="text-[12px] font-bold text-white">{threshold}%</span>
        </div>
        <div className="relative h-1.5 mb-2">
          <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
          <div className="absolute left-0 top-0 h-full bg-(--color-brand) rounded-full" style={{ width: `${((threshold - 50) / 50) * 100}%` }} />
          <input type="range" min={50} max={100} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-(--color-brand) rounded-full border-2 border-card-dark pointer-events-none"
            style={{ left: `${((threshold - 50) / 50) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-(--color-dark-gray)">
          <span>Strict</span><span>Balanced</span><span>Loose</span>
        </div>
      </div>

      {/* Retrieved sources */}
      <div className="p-4 border-b border-(--color-card)">
        <button
          onClick={() => setSourcesOpen(!sourcesOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70">Retrieved Sources</p>
          {sourcesOpen ? <RiArrowUpSLine className="text-(--color-dark-gray) text-[13px]" /> : <RiArrowDownSLine className="text-(--color-dark-gray) text-[13px]" />}
        </button>
        {sourcesOpen && (
          <div className="flex flex-col gap-2.5">
            {sources.map((s) => (
              <div key={s.rank} className="bg-card rounded-xl p-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-bold text-(--color-brand)">#{s.rank}</span>
                      <span className="text-[11px] font-medium text-white">{s.name}</span>
                    </div>
                    <p className="text-[10px] text-(--color-tertiary-text)">{s.loc}</p>
                  </div>
                  <span className={`text-[12px] font-bold flex-shrink-0 ${scoreColor(s.score)}`}>
                    {s.score}
                  </span>
                </div>
                <div className={`h-[2px] rounded-full mb-2 ${scoreBar(s.score)}`} style={{ width: `${s.score * 100}%` }} />
                <p className="text-[10px] text-(--color-secondary-text) leading-relaxed">{s.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active sources */}
      <div className="p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">Active Sources</p>
        <div className="flex flex-col gap-2">
          {activeFiles.map((f) => (
            <div key={f.name} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.active ? "bg-[#4ADE80]" : "bg-(--color-dark-gray)"}`} />
              <span className="text-[11px] text-white truncate">{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}