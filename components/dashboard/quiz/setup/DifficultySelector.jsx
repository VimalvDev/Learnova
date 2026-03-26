import { RiFlashlightLine } from "react-icons/ri"

const options = [
  { id: "auto",   label: "Auto",   sub: "Recommended", icon: true },
  { id: "easy",   label: "Easy",   sub: "Beginner"                },
  { id: "medium", label: "Medium", sub: "Standard"                },
  { id: "hard",   label: "Hard",   sub: "Advanced"                },
]

export default function DifficultySelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-2 p-1 bg-[#121212] rounded-xl">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${
                active
                  ? "bg-brand text-white"
                  : "text-secondary-text hover:text-[#888] hover:bg-white/3"
              }`}
            >
              {o.icon && (
                <RiFlashlightLine className={`text-[13px] mb-0.5 ${active ? "text-white" : "text-brand"}`} />
              )}
              <span className="text-[12px] font-semibold">{o.label}</span>
              <span className={`text-[9px] mt-0.5 ${active ? "text-white/70" : "text-tertiary-text"}`}>{o.sub}</span>
            </button>
          )
        })}
      </div>

      {value === "auto" && (
        <div className="flex items-start gap-2.5 px-3 py-3 bg-brand/5 rounded-xl border border-brand/5">
          <span className="text-brand text-[12px] mt-0.5 shrink-0">⬡</span>
          <p className="text-[11px] text-tertiary-text leading-relaxed">
            Learnova will prioritize concepts with mastery below 70% and scale difficulty based on your real-time performance.
          </p>
        </div>
      )}
    </div>
  )
}