"use client"
import { useState } from "react"
import RevisionItem from "./RevisionItem"

const priorityStyle = {
  critical: "text-[#F87171] bg-[#F87171]/10",
  high:     "text-[#FBBF24] bg-[#FBBF24]/10",
  medium:   "text-brand bg-brand/10",
  low:      "text-secondary-text bg-white/[0.05]",
}

function groupByDate(items) {
  const today    = new Date()
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1)
  const todayStr    = today.toISOString().slice(0, 10)
  const tomorrowStr = tomorrow.toISOString().slice(0, 10)

  const groups = {}
  items.forEach((item) => {
    const d = item.scheduledDate
    const label = d === tomorrowStr ? "Tomorrow"
      : d > tomorrowStr ? new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
      : "Upcoming"
    if (!groups[label]) groups[label] = []
    groups[label].push(item)
  })
  return groups
}

export default function UpcomingList({ items, loading, onComplete, courseId }) {
  const [collapsed, setCollapsed] = useState({})
  const groups = groupByDate(items)

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
          Upcoming Schedule
        </p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Revision Queue</h2>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-4">
        {loading ? (
          <p className="text-[12px] text-tertiary-text py-6 text-center">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-[12px] text-tertiary-text py-6 text-center">No upcoming revisions scheduled.</p>
        ) : (
          Object.entries(groups).map(([label, groupItems]) => (
            <div key={label}>
              {/* Group header */}
              <button
                onClick={() => setCollapsed((p) => ({ ...p, [label]: !p[label] }))}
                className="flex items-center gap-3 w-full mb-3"
              >
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary-text whitespace-nowrap">
                  {label}
                </span>
                <span className="text-[10px] text-[#444]">{groupItems.length}</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </button>

              {!collapsed[label] && (
                <div className="flex flex-col gap-2.5">
                  {groupItems.map((item) => (
                    <RevisionItem
                      key={item.id}
                      item={item}
                      onComplete={onComplete}
                      courseId={courseId}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}