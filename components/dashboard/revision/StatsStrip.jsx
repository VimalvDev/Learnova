import { RiFileListLine, RiAlertLine, RiTimeLine, RiCheckLine } from "react-icons/ri"

export default function StatsStrip({ stats, loading }) {
  const { total = 0, overdue = 0, dueToday = 0, completed = 0 } = stats

  const items = [
    { icon: RiFileListLine, label: "Total scheduled", value: loading ? "—" : String(total),     color: "text-white"    },
    { icon: RiAlertLine,    label: "Overdue",          value: loading ? "—" : String(overdue),   color: "text-[#F87171]"},
    { icon: RiTimeLine,     label: "Due today",        value: loading ? "—" : String(dueToday),  color: "text-[#FBBF24]"},
    { icon: RiCheckLine,    label: "Completed",        value: loading ? "—" : String(completed), color: "text-[#4ADE80]"},
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-card-dark rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#141414] flex items-center justify-center shrink-0">
            <Icon className="text-brand text-[14px]" />
          </div>
          <div>
            <p className={`text-[18px] font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-tertiary-text">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}