import { RiAlertLine } from "react-icons/ri"
import RevisionItem from "./RevisionItem"

export default function TodayFocus({ items, loading, onComplete, courseId }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const overdue = items.filter((i) => i.status === "overdue")

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
              Today's Priority
            </p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
              Revision for Today
            </h2>
            <p className="text-[12px] text-tertiary-text mt-0.5">
              Overdue first, then by mastery score.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-tertiary-text">{today}</p>
            {!loading && (
              <p className="text-[12px] text-[#FBBF24] font-semibold mt-0.5">
                {items.length} item{items.length !== 1 ? "s" : ""} due
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-3">
        {loading ? (
          <div className="py-8 text-center">
            <p className="text-[12px] text-tertiary-text">Loading…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-[28px] mb-3">✓</p>
            <p className="text-[14px] font-semibold text-[#4ADE80]">All caught up!</p>
            <p className="text-[12px] text-tertiary-text mt-1">No revisions due today.</p>
          </div>
        ) : (
          <>
            {overdue.length > 0 && (
              <div className="flex items-start gap-3 px-4 py-3 bg-[#F87171]/[0.05] rounded-xl border border-[#F87171]/15">
                <RiAlertLine className="text-[#F87171] text-[15px] shrink-0 mt-0.5" />
                <p className="text-[11px] text-secondary-text leading-relaxed">
                  <span className="text-[#F87171] font-semibold">{overdue.length} revision{overdue.length !== 1 ? "s" : ""} overdue.</span>{" "}
                  Delaying further will increase knowledge decay.
                </p>
              </div>
            )}
            {items.map((item) => (
              <RevisionItem
                key={item.id}
                item={item}
                onComplete={onComplete}
                courseId={courseId}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}