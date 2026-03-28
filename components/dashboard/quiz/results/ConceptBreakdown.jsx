"use client"
import { useState } from "react"

const concepts = [
  { name: "Normalization",         sessionPct: 60, allTime: 34, delta: -4, correct: 3, total: 5, errors: 2, status: "focus"    },
  { name: "Functional Dependency", sessionPct: 75, allTime: 61, delta: +2, correct: 3, total: 4, errors: 1, status: "improving"},
  { name: "SQL Joins",             sessionPct: 100,allTime: 91, delta: +6, correct: 4, total: 4, errors: 0, status: "mastered" },
  { name: "ER Diagrams",           sessionPct: 80, allTime: 79, delta: +5, correct: 4, total: 5, errors: 1, status: "improving"},
]

const badge = {
  focus:     "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",
  improving: "bg-brand/10 text-brand border-brand/20",
  mastered:  "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20",
}
const badgeLabel = { focus: "⚠ Needs Focus", improving: "↑ Improving", mastered: "✓ Mastered" }

export default function ConceptBreakdown() {
  const [tab, setTab] = useState("accuracy")

  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/4">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Concept Analysis</p>
          <h2 className="text-[16px] font-semibold text-white">Performance by Concept</h2>
        </div>
        <div className="flex items-center gap-1 p-1 bg-[#141414] rounded-xl border border-white/6">
          {["accuracy", "time", "improvement"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 text-[10px] font-medium rounded-lg capitalize transition-all ${
                tab === t ? "bg-[#2A2B2F] text-white" : "text-secondary-text hover:text-white"
              }`}
            >
              {t === "time" ? "Avg Time" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-white/4">
        {concepts.map((c) => (
          <div key={c.name} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div>
                <p className="text-[13px] font-semibold text-white">{c.name}</p>
                <p className="text-[11px] text-secondary-text mt-0.5">
                  {c.correct}/{c.total} correct
                  {c.errors > 0 && ` · ${c.errors} repeated error${c.errors !== 1 ? "s" : ""}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border ${badge[c.status]}`}>
                  {badgeLabel[c.status]}
                </span>
                <button className="text-[11px] text-brand hover:underline">Practice →</button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Session",  value: c.sessionPct, barColor: "bg-brand" },
                { label: "All-time", value: c.allTime,    barColor: c.allTime >= 65 ? "bg-brand" : "bg-[#FBBF24]" },
              ].map(({ label, value, barColor }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[9px] text-[#444] w-14 shrink-0">{label}</span>
                  <div className="flex-1 h-0.75 bg-white/6 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${value}%` }} />
                  </div>
                  <span className="text-[11px] text-white w-8 text-right shrink-0 font-medium">{value}%</span>
                  {label === "All-time" && (
                    <span className={`text-[10px] font-semibold w-8 shrink-0 ${c.delta > 0 ? "text-[#4ADE80]" : "text-[#F87171]"}`}>
                      {c.delta > 0 && "+"}
                      {c.delta}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}