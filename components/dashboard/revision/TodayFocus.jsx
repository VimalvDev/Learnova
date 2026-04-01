import { RiAlertLine } from "react-icons/ri"
import RevisionItem from "./RevisionItem"

const todayItems = [
  {
    id: 1, type: "overdue",
    name: "Normalization",
    lastReviewed: "9 days ago",
    mastery: 34, decay: -12,
    estimatedTime: "15–20 min",
  },
  {
    id: 2, type: "due",
    name: "Functional Dependency",
    lastReviewed: "5 days ago",
    mastery: 61, decay: -6,
    estimatedTime: "10–15 min",
  },
  {
    id: 3, type: "scheduled",
    name: "ER Diagrams",
    lastReviewed: "4 days ago",
    mastery: 74, decay: -4,
    estimatedTime: "10 min",
  },
  {
    id: 4, type: "completed",
    name: "SQL Joins",
    completedTime: "Completed 9:14 AM",
    masteryBefore: 85,
    masteryAfter: 91,
  },
]

export default function TodayFocus() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
              Today's Priority
            </p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
              Recommended Revision for Today
            </h2>
            <p className="text-[12px] text-[--color-tertiary-text] mt-0.5">
              Ordered by urgency: overdue first, then by mastery score and retention decay.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[12px] text-[--color-tertiary-text]">Tuesday, February 24</p>
            <p className="text-[12px] text-[#FBBF24] font-semibold mt-0.5">4 items due</p>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {/* Overdue banner */}
        <div className="flex items-start gap-3 px-4 py-3 bg-[var(--color-red)]/[0.05] rounded-xl border border-[var(--color-red)]/15">
          <RiAlertLine className="text-[var(--color-red)] text-[15px] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[--color-secondary-text] leading-relaxed">
            <span className="text-[var(--color-red)] font-semibold">3 revision sessions are overdue.</span>{" "}
            Delaying further will accelerate knowledge decay. These have been moved to top priority.
          </p>
        </div>

        {/* Items */}
        {todayItems.map((item) => (
          <RevisionItem key={item.id} item={item} />
        ))}

        {/* Batch action */}
        <div className="mt-1">
          <button className="w-full flex flex-col items-center justify-center py-3.5 bg-[--color-card-dark] rounded-xl border border-[--color-brand]/20 hover:border-[--color-brand]/50 transition-all">
            <span className="text-[13px] font-semibold text-[--color-brand]">
              Start All Due Sessions in Sequence →
            </span>
            <span className="text-[10px] text-[--color-tertiary-text] mt-0.5">
              Estimated total time: ~45–60 min
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}