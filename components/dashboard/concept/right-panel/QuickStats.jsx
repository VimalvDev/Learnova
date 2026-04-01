const stats = [
  { label: "Total attempts",        value: "18"          },
  { label: "Sessions studied",      value: "6"           },
  { label: "Best score",            value: "61% (Feb 14)" },
  { label: "Avg score",             value: "53%"          },
  { label: "Time investment",       value: "1h 42m total" },
  { label: "Days since first study", value: "19"          },
]

export default function QuickStats() {
  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
        Concept Stats
      </p>

      <div className="flex flex-col divide-y divide-card-dark">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2.5">
            <span className="text-[11px] text-(--color-tertiary-text)">{label}</span>
            <span className="text-[12px] font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="mt-3 bg-card-dark rounded-xl p-3">
        <p className="text-[10px] text-(--color-tertiary-text) mb-2">You vs course average</p>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-(--color-secondary-text)">Your mastery</span>
          <span className="text-[12px] font-semibold text-[var(--color-red)]">42%</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-(--color-secondary-text)">Course avg</span>
          <span className="text-[12px] font-semibold text-[#4ADE80]">64%</span>
        </div>
        <div className="h-px bg-card mb-2" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-(--color-tertiary-text)">Gap</span>
          <span className="text-[12px] font-bold text-[var(--color-red)]">−22%</span>
        </div>
        <p className="text-[10px] text-(--color-tertiary-text) mt-1">Bottom 18% of learners</p>
      </div>
    </div>
  )
}