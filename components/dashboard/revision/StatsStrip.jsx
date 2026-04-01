import {
  RiFileListLine, RiAlertLine,
  RiTimeLine, RiCheckLine, RiCalendarLine,
} from "react-icons/ri"

const stats = [
  { icon: RiFileListLine, label: "Total scheduled", value: "14",           valueColor: "text-white"                   },
  { icon: RiAlertLine,    label: "Overdue",          value: "3",            valueColor: "text-[var(--color-red)]"      },
  { icon: RiTimeLine,     label: "Due today",        value: "4",            valueColor: "text-[#FBBF24]"               },
  { icon: RiCheckLine,    label: "Completed this week", value: "7",         valueColor: "text-[#4ADE80]"               },
  { icon: RiCalendarLine, label: "Next session",     value: "Normalization · 3PM", valueColor: "text-[--color-secondary-text]" },
]

export default function StatsStrip() {
  return (
    <div className="flex items-center gap-0 bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      {stats.map(({ icon: Icon, label, value, valueColor }, i) => (
        <div
          key={label}
          className={`flex items-center gap-3 px-5 py-3.5 flex-1 min-w-0 ${
            i < stats.length - 1 ? "border-r border-white/[0.04]" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-[--color-card-dark] flex items-center justify-center flex-shrink-0">
            <Icon className="text-[--color-brand] text-[14px]" />
          </div>
          <div className="min-w-0">
            <p className={`text-[13px] font-semibold truncate ${valueColor}`}>{value}</p>
            <p className="text-[10px] text-[--color-tertiary-text] truncate">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}