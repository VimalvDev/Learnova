"use client"

const presets = [
  { label: "5 Quick",     value: 5  },
  { label: "10 Standard", value: 10 },
  { label: "20 Deep",     value: 20 },
  { label: "30 Full",     value: 30 },
]

export default function QuestionCountSlider({ value, onChange }) {
  const pct = ((value - 5) / 25) * 100

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#888]">Questions</span>
        <span className="text-[22px] font-bold text-white tabular-nums">{value}</span>
      </div>

      <div className="relative h-1.5">
        <div className="absolute inset-0 bg-white/6 rounded-full" />
        <div
          className="absolute left-0 top-0 h-full bg-brand rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={5} max={30} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-brand rounded-full border-2 border-dark shadow-lg pointer-events-none"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => onChange(p.value)}
            className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all ${
              value === p.value
                ? "border-brand text-brand bg-brand/8"
                : "border-white/6 text-secondary-text hover:text-white hover:border-white/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}