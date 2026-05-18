"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiTimeLine, RiCheckLine } from "react-icons/ri"

const statusConfig = {
  overdue: {
    edge:      "bg-[#F87171]",
    dot:       "bg-[#F87171]",
    bar:       "bg-[#F87171]",
    tag:       "text-[#F87171] bg-[#F87171]/10",
    tagLabel:  "Overdue",
    textColor: "text-[#F87171]",
  },
  due: {
    edge:      "bg-[#FBBF24]",
    dot:       "bg-[#FBBF24]",
    bar:       "bg-[#FBBF24]",
    tag:       "text-[#FBBF24] bg-[#FBBF24]/10",
    tagLabel:  "Due Today",
    textColor: "text-[#FBBF24]",
  },
  upcoming: {
    edge:      "bg-brand",
    dot:       "bg-brand",
    bar:       "bg-brand",
    tag:       "text-brand bg-brand/10",
    tagLabel:  "Upcoming",
    textColor: "text-brand",
  },
  completed: {
    edge:      "bg-[#4ADE80]",
    dot:       "bg-[#4ADE80]",
    bar:       "bg-[#4ADE80]",
    tag:       "text-[#4ADE80] bg-[#4ADE80]/10",
    tagLabel:  "Completed",
    textColor: "text-[#4ADE80]",
  },
}

export default function RevisionItem({ item, onComplete, courseId }) {
  const [completing, setCompleting] = useState(false)
  const router = useRouter()
  const c = statusConfig[item.status] ?? statusConfig.upcoming

  const handleComplete = async () => {
    setCompleting(true)
    await onComplete(item.id)
    setCompleting(false)
  }

  const handleStartReview = () => {
    const params = new URLSearchParams()
    if (courseId) params.set("courseId", courseId)
    router.push(`/dashboard/quizzes?${params.toString()}`)
  }

  return (
    <div className={`relative flex gap-4 bg-[#141414] rounded-xl p-4 overflow-hidden transition-all ${
      item.isCompleted ? "opacity-60" : ""
    }`}>
      {/* Left edge */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${c.edge}`} />

      <div className="flex-1 min-w-0 pl-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${c.dot}`} />
            <p className={`text-[14px] font-semibold truncate ${
              item.isCompleted ? "line-through text-secondary-text" : "text-white"
            }`}>
              {item.conceptName}
            </p>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0 ${c.tag}`}>
            {item.isCompleted
              ? new Date(item.completedAt).toLocaleDateString([], { month: "short", day: "numeric" })
              : c.tagLabel}
          </span>
        </div>

        {/* Meta */}
        <p className="text-[11px] text-secondary-text mb-3">
          {item.isCompleted
            ? `Mastery: ${item.score}%`
            : `Last reviewed: ${item.lastReviewed} · Mastery: ${item.score}%`}
        </p>

        {!item.isCompleted && (
          <>
            {/* Mastery bar */}
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[10px] text-tertiary-text w-10 shrink-0">Mastery</span>
              <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden max-w-[160px]">
                <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${item.score}%` }} />
              </div>
              <span className={`text-[11px] font-semibold ${c.textColor}`}>{item.score}%</span>
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-1.5 mb-4">
              <RiTimeLine className="text-[#444] text-[12px]" />
              <span className="text-[11px] text-tertiary-text">Est. {item.estimatedTime}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartReview}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white text-[11px] font-bold rounded-lg hover:brightness-110 transition-all"
              >
                Start Review →
              </button>
              <button
                onClick={handleComplete}
                disabled={completing}
                className="flex items-center gap-1.5 text-[11px] text-secondary-text hover:text-[#4ADE80] transition-colors disabled:opacity-50"
              >
                <RiCheckLine className="text-[13px]" />
                {completing ? "Saving…" : "Mark Done"}
              </button>
            </div>
          </>
        )}

        {item.isCompleted && (
          <div className="flex items-center gap-1.5">
            <RiCheckLine className="text-[#4ADE80] text-[13px]" />
            <span className="text-[11px] text-[#4ADE80] font-semibold">Completed</span>
          </div>
        )}
      </div>
    </div>
  )
}