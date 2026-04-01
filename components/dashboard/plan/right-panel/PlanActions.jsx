import {
  RiFlashlightLine, RiCalendarLine,
  RiDownloadLine, RiEditLine,
} from "react-icons/ri"

export default function PlanActions({ phase, onRegenerate }) {
  const actions = [
    { icon: RiFlashlightLine, label: "Regenerate Plan",         primary: true,  onClick: onRegenerate },
    { icon: RiCalendarLine,   label: "Add to Revision Scheduler",primary: false, onClick: null },
    { icon: RiDownloadLine,   label: "Export as PDF",           primary: false, onClick: null },
    { icon: RiEditLine,       label: "Customize Manually",      ghost: true,    onClick: null },
  ]

  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
        Plan Actions
      </p>
      <div className="flex flex-col gap-2">
        {actions.map(({ icon: Icon, label, primary, ghost, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`w-full h-10 flex items-center gap-2.5 px-3.5 rounded-xl text-[12px] font-medium transition-all ${
              primary ? "bg-(--color-brand) text-white hover:brightness-110"
              : ghost  ? "bg-transparent text-(--color-secondary-text) hover:text-white"
              : "bg-card-dark text-white hover:bg-(--color-card-mid)"
            }`}
          >
            <Icon className={`text-[14px] ${primary ? "text-white" : ghost ? "text-(--color-secondary-text)" : "text-(--color-brand)"}`} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}