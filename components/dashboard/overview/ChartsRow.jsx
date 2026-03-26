"use client"
import { useState } from "react"
import Link from "next/link"
import FullBarChart  from "@/components/charts/full/FullBarChart"
import FullLineChart from "@/components/charts/full/FullLineChart"

export default function ChartsRow() {
  const [trendRange,   setTrendRange]   = useState("30D")
  const [visibleLines, setVisibleLines] = useState(["Overall Mastery", "Quiz Accuracy"])

  const lineColors = {
    "Overall Mastery": "#FA6E43",
    "Quiz Accuracy":   "rgba(255,255,255,0.4)",
  }

  const toggleLine = (line) =>
    setVisibleLines((prev) =>
      prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
    )

  return (
    <div className="grid grid-cols-12 gap-4">

      {/* Bar chart */}
      <Link
        href="/dashboard/analytics"
        className="col-span-5 bg-[#171717] rounded-2xl p-5 flex flex-col hover:bg-[#1c1c1c] transition-all group"
      >
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[14px] font-medium text-white/70">Concept Mastery</p>
            <p className="text-[11px] text-[#666] mt-0.5">Per-topic breakdown</p>
          </div>
          <span className="text-[11px] text-brand opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            View All →
          </span>
        </div>
        <div className="flex-1 min-h-[260px] mt-2">
          <FullBarChart />
        </div>
      </Link>

      {/* Line chart */}
      <Link
        href="/dashboard/analytics"
        className="col-span-7 bg-[#171717] rounded-2xl p-5 flex flex-col hover:bg-[#1c1c1c] transition-all group"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[14px] font-medium text-white/70">Mastery Trend</p>
            <p className="text-[11px] text-[#666] mt-0.5">Cross-subject proficiency over time</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {Object.entries(lineColors).map(([line, color]) => (
                <button
                  key={line}
                  onClick={(e) => { e.preventDefault(); toggleLine(line) }}
                  className={`flex items-center gap-1.5 transition-opacity ${
                    visibleLines.includes(line) ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="w-3 h-[2px] rounded-full" style={{ background: color }} />
                  <span className="text-[10px] text-[#666]">{line}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-0.5 bg-[#111] rounded-lg p-0.5">
              {["7D", "30D", "All"].map((r) => (
                <button
                  key={r}
                  onClick={(e) => { e.preventDefault(); setTrendRange(r) }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                    trendRange === r ? "bg-brand text-white" : "text-secondary-text"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[240px]">
          <FullLineChart visibleLines={visibleLines} />
        </div>
      </Link>

    </div>
  )
}