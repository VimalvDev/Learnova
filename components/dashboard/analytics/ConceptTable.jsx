"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiSearchLine } from "react-icons/ri"

function Skeleton() {
  return (
    <div className="flex flex-col gap-2 p-5">
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="h-10 bg-white/[0.04] rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

const statusStyles = {
  critical:     { pill: "bg-[#F87171]/10 text-[#F87171]",  bar: "bg-[#F87171]",  text: "text-[#F87171]",  label: "Critical"     },
  needs_revision: { pill: "bg-[#FBBF24]/10 text-[#FBBF24]", bar: "bg-[#FBBF24]", text: "text-[#FBBF24]",  label: "Needs Revision" },
  good:         { pill: "bg-brand/10 text-brand",           bar: "bg-brand",      text: "text-brand",      label: "Good"         },
  mastered:     { pill: "bg-[#4ADE80]/10 text-[#4ADE80]",   bar: "bg-[#4ADE80]",  text: "text-[#4ADE80]",  label: "Mastered"     },
  not_started:  { pill: "bg-white/[0.06] text-[#555]",      bar: "bg-[#555]",     text: "text-[#555]",     label: "Not Started"  },
}

const filters = ["All", "Critical", "Needs Revision", "Good", "Mastered"]

export default function ConceptTable({ rows, loading, courseId }) {
  const [search,  setSearch]  = useState("")
  const [filter,  setFilter]  = useState("All")
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  const allRows = rows ?? []
  const filtered = allRows.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === "All"            ? true :
      filter === "Critical"       ? r.status === "critical" :
      filter === "Needs Revision" ? r.status === "needs_revision" :
      filter === "Good"           ? r.status === "good" :
      filter === "Mastered"       ? r.status === "mastered" :
      true
    return matchSearch && matchFilter
  })

  const displayed = showAll ? filtered : filtered.slice(0, 8)

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Concept Intelligence</p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Concept-Level Performance</h2>
        <p className="text-[12px] text-tertiary-text mt-0.5">Every concept scored across accuracy, speed, and error patterns.</p>
      </div>

      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.04] flex-wrap bg-[#111]">
        <div className="flex items-center gap-2 h-9 px-3 bg-card-dark rounded-xl border border-white/[0.06] w-44 focus-within:border-brand/40 transition-colors">
          <RiSearchLine className="text-[#444] text-[14px] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search concepts..."
            className="flex-1 bg-transparent text-[12px] text-white placeholder:text-[#444] outline-none"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === f ? "bg-brand text-white" : "text-tertiary-text hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Skeleton /> : filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-[13px] text-tertiary-text">No concepts match your filter.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#111]">
                  {["Concept", "Mastery", "Accuracy", "Speed", "Errors", "Status"].map((h) => (
                    <th key={h} className="text-left text-[9px] font-bold uppercase tracking-widest text-[#444] px-5 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((r, i) => {
                  const s = statusStyles[r.status] ?? statusStyles.not_started
                  return (
                    <tr
                      key={r.id ?? i}
                      className="border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="text-[13px] font-medium text-white">{r.name}</p>
                        {r.lastPracticed && (
                          <p className="text-[10px] text-tertiary-text mt-0.5">
                            Last: {new Date(r.lastPracticed).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className={`text-[13px] font-semibold ${s.text}`}>{r.mastery}%</p>
                        <div className="mt-1 h-[3px] w-16 bg-white/[0.05] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${r.mastery}%` }} />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[13px] font-semibold ${s.text}`}>{r.accuracy}%</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-[12px] text-secondary-text">{r.speedScore}/100</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[13px] font-semibold ${r.errorPenalty > 10 ? "text-[#F87171]" : "text-secondary-text"}`}>
                          {r.errorPenalty > 0 ? `-${r.errorPenalty}` : "0"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${s.pill}`}>
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3.5 bg-[#111] border-t border-white/[0.04]">
            <span className="text-[11px] text-tertiary-text">
              Showing {displayed.length} of {filtered.length} concepts
            </span>
            {filtered.length > 8 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[12px] text-brand hover:underline"
              >
                {showAll ? "Show Less" : `Load More (${filtered.length - 8} more)`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}