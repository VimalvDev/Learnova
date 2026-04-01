import { RiEditLine } from "react-icons/ri"

export default function CollapsedConfigBar({ config, onEdit }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-card rounded-xl px-5 py-3.5 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap text-[12px] text-(--color-secondary-text)">
        <span className="text-white font-medium">{config.targetDate.split(" ")[0]}</span>
        <span className="text-(--color-dark-gray)">·</span>
        <span className="text-white font-medium">{config.daysRemaining} days</span>
        <span className="text-(--color-dark-gray)">·</span>
        <span className="text-white font-medium">{config.hoursPerDay}h/day</span>
        <span className="text-(--color-dark-gray)">·</span>
        <span className="text-white font-medium">{config.level}</span>
        <span className="text-(--color-dark-gray)">·</span>
        <span>Weak topics prioritized</span>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-1.5 text-[11px] text-(--color-brand) hover:underline flex-shrink-0"
      >
        <RiEditLine className="text-[13px]" /> Edit Parameters
      </button>
    </div>
  )
}