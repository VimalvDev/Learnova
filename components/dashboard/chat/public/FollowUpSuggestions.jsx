import { RiArrowRightLine } from "react-icons/ri"

export default function FollowUpSuggestions({ suggestions, onSelect }) {
  return (
    <div className="bg-card rounded-2xl p-5">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
        Ask a Follow-Up
      </p>
      <div className="flex flex-col gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="flex items-center gap-3 px-4 py-3 bg-card-dark rounded-xl border border-white/[0.04] text-left hover:border-(--color-brand)/30 hover:bg-(--color-brand)/[0.03] transition-all group"
          >
            <RiArrowRightLine className="text-(--color-brand) text-[13px] flex-shrink-0" />
            <span className="text-[12px] text-(--color-secondary-text) group-hover:text-white transition-colors leading-relaxed">
              {s}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}