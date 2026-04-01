const days = [
  { label: "Mo", count: 2, items: [{ type: "completed" }, { type: "completed" }], isToday: false, isPast: true  },
  { label: "Tu", count: 4, items: [{ type: "overdue" }, { type: "due" }, { type: "scheduled" }, { type: "completed" }], isToday: true, isPast: false },
  { label: "We", count: 2, items: [{ type: "scheduled" }, { type: "scheduled" }], isToday: false, isPast: false },
  { label: "Th", count: 3, items: [{ type: "scheduled" }, { type: "scheduled" }, { type: "scheduled" }], isToday: false, isPast: false },
  { label: "Fr", count: 1, items: [{ type: "scheduled" }], isToday: false, isPast: false },
  { label: "Sa", count: 0, items: [], isToday: false, isPast: false },
  { label: "Su", count: 0, items: [], isToday: false, isPast: false },
]

const dotColor = {
  overdue:   "bg-[var(--color-red)]",
  due:       "bg-[#FBBF24]",
  scheduled: "bg-[--color-brand]",
  completed: "bg-[#4ADE80]",
}

const countColor = (d) => {
  if (d.isToday) return "text-[--color-brand] font-bold"
  if (d.items.some(i => i.type === "overdue")) return "text-[var(--color-red)]"
  if (d.isPast && d.items.every(i => i.type === "completed")) return "text-[#4ADE80]"
  return "text-[--color-secondary-text]"
}

export default function WeeklyStrip() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-3">
        This Week
      </p>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <div
            key={d.label}
            className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl cursor-pointer transition-all ${
              d.isToday
                ? "bg-[--color-brand]/[0.08] border-t-2 border-[--color-brand]"
                : "hover:bg-white/[0.02]"
            }`}
          >
            <span className={`text-[9px] font-bold uppercase ${
              d.isToday ? "text-[--color-brand]" : "text-[--color-dark-gray]"
            }`}>
              {d.label}
            </span>
            <div className="h-px w-full bg-white/[0.05]" />
            <div className="flex flex-col gap-0.5 items-center">
              {d.items.slice(0, 2).map((item, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${dotColor[item.type]}`} />
              ))}
              {d.items.length === 0 && (
                <div className="w-1.5 h-1.5 rounded-full bg-white/[0.06]" />
              )}
            </div>
            <span className={`text-[11px] ${countColor(d)}`}>
              {d.count || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}