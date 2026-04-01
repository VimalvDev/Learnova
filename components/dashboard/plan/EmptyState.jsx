import { RiFlashlightLine } from "react-icons/ri"

const hints = [
  "Plans typically take 3–5 seconds to generate.",
  "You can regenerate or adjust at any time.",
  "Plans are recalculated after every quiz session.",
]

export default function EmptyState() {
  return (
    <div className="bg-card rounded-2xl p-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-(--color-brand)/10 flex items-center justify-center mb-5">
        <RiFlashlightLine className="text-(--color-brand) text-[28px]" />
      </div>
      <h3 className="text-[17px] font-semibold text-white mb-2">No Learning Plan Generated Yet</h3>
      <p className="text-[13px] text-(--color-secondary-text) leading-relaxed max-w-sm mb-6">
        Configure your parameters above and click "Generate My Learning Plan" to create a personalized study roadmap tailored to your mastery profile and timeline.
      </p>
      <div className="h-px w-full bg-card-dark mb-5" />
      <div className="flex flex-col gap-2.5 w-full max-w-xs">
        {hints.map((h) => (
          <div key={h} className="flex items-start gap-2 text-left">
            <span className="text-(--color-brand) flex-shrink-0 mt-0.5 text-[12px]">◈</span>
            <p className="text-[12px] text-(--color-tertiary-text)">{h}</p>
          </div>
        ))}
      </div>
    </div>
  )
}