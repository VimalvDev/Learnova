"use client"
import { useState } from "react"
import { RiSearchLine, RiArrowUpDownLine } from "react-icons/ri"

const concepts = [
  {
    name: "Normalization", source: "Chapter 4 · DBMS_Notes.pdf",
    mastery: 34, accuracy: 45, timeFlag: "+22%", errors: 5, repeated: 4,
    status: "critical", statusLabel: "Critical",
    action: "Practice →",
  },
  {
    name: "Functional Dep.", source: "Chapter 3 · DBMS_Notes.pdf",
    mastery: 61, accuracy: 67, timeFlag: "+8%", errors: 2, repeated: 1,
    status: "revision", statusLabel: "Revision",
    action: "Review →",
  },
  {
    name: "ER Diagrams", source: "Chapter 2 · DBMS_Notes.pdf",
    mastery: 74, accuracy: 79, timeFlag: "On pace", errors: 1, repeated: 0,
    status: "good", statusLabel: "Good",
    action: "Continue →",
  },
  {
    name: "SQL Joins", source: "Chapter 5 · DBMS_Notes.pdf",
    mastery: 91, accuracy: 94, timeFlag: "−12%", errors: 0, repeated: 0,
    status: "mastered", statusLabel: "Mastered",
    action: "Reinforce →",
  },
  {
    name: "Graph Traversal", source: "Chapter 7 · DBMS_Notes.pdf",
    mastery: 68, accuracy: 51, timeFlag: "−28%", errors: 6, repeated: 3,
    status: "speed", statusLabel: "Speed Risk",
    action: "Investigate →",
  },
]

const statusStyles = {
  critical: { pill: "bg-[var(--color-red)]/10 text-[var(--color-red)] border-[var(--color-red)]/20", bar: "bg-[var(--color-red)]", text: "text-[var(--color-red)]" },
  revision: { pill: "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",  bar: "bg-[#FBBF24]",  text: "text-[#FBBF24]"  },
  good:     { pill: "bg-[--color-brand]/10 text-[--color-brand] border-[--color-brand]/20", bar: "bg-[--color-brand]", text: "text-[--color-brand]" },
  mastered: { pill: "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20",  bar: "bg-[#4ADE80]",  text: "text-[#4ADE80]"  },
  speed:    { pill: "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",  bar: "bg-[#FBBF24]",  text: "text-[#FBBF24]"  },
}

const filters = ["All", "Critical", "Needs Revision", "Mastered"]

export default function ConceptTable() {
  const [search, setSearch]   = useState("")
  const [filter, setFilter]   = useState("All")

  const filtered = concepts.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === "All" ? true
      : filter === "Critical" ? c.status === "critical"
      : filter === "Needs Revision" ? c.status === "revision"
      : filter === "Mastered" ? c.status === "mastered"
      : true
    return matchSearch && matchFilter
  })

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
          Concept Intelligence
        </p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
          Concept-Level Performance
        </h2>
        <p className="text-[12px] text-[--color-tertiary-text] mt-0.5">
          Every concept scored across accuracy, speed, error patterns, and recency.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-white/[0.04] flex-wrap bg-[--color-card-dark]">
        <div className="flex items-center gap-2 h-9 px-3 bg-[#111] rounded-xl border border-white/[0.06] w-48 focus-within:border-[--color-brand]/40 transition-colors">
          <RiSearchLine className="text-[--color-dark-gray] text-[14px] flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter concepts..."
            className="flex-1 bg-transparent text-[12px] text-white placeholder:text-[--color-dark-gray] outline-none"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-[--color-card-mid-dark] rounded-xl border border-white/[0.06]">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === f
                  ? "bg-[--color-brand] text-white"
                  : "text-[--color-secondary-text] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1.5 h-9 px-3 bg-[#111] text-[--color-secondary-text] text-[12px] rounded-xl  hover:text-white hover:border-white/[0.1] transition-all">
          <RiArrowUpDownLine className="text-[13px]" /> Sort: Mastery ↑
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#111]">
              {["Concept", "Mastery", "Accuracy", "Avg Time", "Errors", "Status", "Action"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[9px] font-bold uppercase tracking-widest text-[--color-dark-gray] px-5 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const s = statusStyles[c.status]
              return (
                <tr
                  key={c.name}
                  className={`border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors ${
                    i === filtered.length - 1 ? "border-0" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-medium text-white">{c.name}</p>
                    <p className="text-[10px] text-[--color-tertiary-text] mt-0.5">{c.source}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className={`text-[13px] font-semibold ${s.text}`}>{c.mastery}%</p>
                    <div className="mt-1 h-[3px] w-20 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${c.mastery}%` }} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[13px] font-semibold ${s.text}`}>{c.accuracy}%</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[12px] font-medium ${
                      c.timeFlag.startsWith("+") ? "text-[var(--color-red)]"
                      : c.timeFlag.startsWith("−") ? "text-[#4ADE80]"
                      : "text-[--color-secondary-text]"
                    }`}>
                      {c.timeFlag}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[13px] font-semibold ${s.text}`}>{c.errors}</span>
                    {c.repeated > 0 && (
                      <p className="text-[10px] text-[--color-tertiary-text] mt-0.5">{c.repeated} repeated</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${s.pill}`}>
                      {c.statusLabel}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-[12px] text-[--color-brand] hover:underline whitespace-nowrap">
                      {c.action}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[--color-card-dark] border-t border-white/[0.04]">
        <span className="text-[11px] text-[--color-tertiary-text]">Showing {filtered.length} of 58 concepts</span>
        <button className="text-[12px] text-[--color-brand] hover:underline">Load More</button>
      </div>
    </div>
  )
}