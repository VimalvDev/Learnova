"use client"
import { useState } from "react"
import { RiTimeLine, RiCheckLine } from "react-icons/ri"

const config = {
  overdue: {
    border:   "border-[var(--color-red)]/25",
    edge:     "bg-[var(--color-red)]",
    dot:      "bg-[var(--color-red)]",
    bar:      "bg-[var(--color-red)]",
    tag:      "text-[var(--color-red)] bg-[var(--color-red)]/10",
    tagLabel: "Overdue",
    textColor: "text-[var(--color-red)]",
  },
  due: {
    border:   "border-[#FBBF24]/20",
    edge:     "bg-[#FBBF24]",
    dot:      "bg-[#FBBF24]",
    bar:      "bg-[#FBBF24]",
    tag:      "text-[#FBBF24] bg-[#FBBF24]/10",
    tagLabel: "Due Today",
    textColor: "text-[#FBBF24]",
  },
  scheduled: {
    border:   "border-[--color-brand]/15",
    edge:     "bg-[--color-brand]",
    dot:      "bg-[--color-brand]",
    bar:      "bg-[--color-brand]",
    tag:      "text-[--color-brand] bg-[--color-brand]/10",
    tagLabel: "Due Today",
    textColor: "text-[--color-brand]",
  },
  completed: {
    border:   "border-white/[0.05]",
    edge:     "bg-[#4ADE80]",
    dot:      "bg-[#4ADE80]",
    bar:      "bg-[#4ADE80]",
    tag:      "text-[#4ADE80] bg-[#4ADE80]/10",
    tagLabel: "Completed",
    textColor: "text-[#4ADE80]",
  },
}

export default function RevisionItem({ item }) {
  const c         = config[item.type]
  const isCompleted = item.type === "completed"

  return (
    <div className={`relative flex gap-4 bg-[--color-card-dark] rounded-xl border p-4 overflow-hidden transition-all ${c.border} ${isCompleted ? "opacity-60" : ""}`}>
      {/* Left edge accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${c.edge}`} />

      <div className="flex-1 min-w-0 pl-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${c.dot}`} />
            <p className={`text-[14px] font-semibold ${isCompleted ? "line-through text-[--color-secondary-text] decoration-white/20" : "text-white"}`}>
              {item.name}
            </p>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${c.tag}`}>
            {isCompleted ? item.completedTime : c.tagLabel}
          </span>
        </div>

        {/* Metadata */}
        <p className="text-[11px] text-[--color-secondary-text] mb-3">
          {isCompleted
            ? `Mastery improved: ${item.masteryBefore}% → ${item.masteryAfter}%`
            : `Last reviewed: ${item.lastReviewed} · Mastery: ${item.mastery}%`}
        </p>

        {!isCompleted && (
          <>
            {/* Mastery bar */}
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[10px] text-[--color-tertiary-text] w-10 flex-shrink-0">Mastery</span>
              <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden max-w-[160px]">
                <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${item.mastery}%` }} />
              </div>
              <span className={`text-[11px] font-semibold ${c.textColor}`}>{item.mastery}%</span>
            </div>

            {/* Decay bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] text-[--color-tertiary-text] w-10 flex-shrink-0">Decay</span>
              <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden max-w-[160px]">
                <div
                  className="h-full rounded-full bg-[#FBBF24]"
                  style={{ width: `${Math.abs(item.decay)}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-[#FBBF24]">{item.decay}%</span>
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-1.5 mb-3">
              <RiTimeLine className="text-[--color-dark-gray] text-[12px]" />
              <span className="text-[11px] text-[--color-tertiary-text]">
                Estimated session: {item.estimatedTime}
              </span>
            </div>
          </>
        )}

        {isCompleted && (
          <div className="flex items-center gap-1.5 mb-3">
            <RiCheckLine className="text-[#4ADE80] text-[13px]" />
            <span className="text-[11px] text-[#4ADE80] font-semibold">
              +{item.masteryAfter - item.masteryBefore}% mastery gained
            </span>
          </div>
        )}

        {/* Actions */}
        {!isCompleted && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[--color-brand] text-white text-[11px] font-bold rounded-lg hover:brightness-110 transition-all">
              Start Review →
            </button>
            <button className="text-[11px] text-[--color-secondary-text] hover:text-white transition-colors">
              Reschedule
            </button>
          </div>
        )}
      </div>
    </div>
  )
}