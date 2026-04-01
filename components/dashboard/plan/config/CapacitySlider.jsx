"use client"

export default function CapacitySlider({ value, onChange }) {
  const pct = ((value - 1) / 3) * 100
  const topicsPerDay = Math.round(value * 0.8)

  return (
    <div>
      <p className="text-[12px] text-(--color-secondary-text) mb-3">
        How much time can you study per day?
      </p>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] font-medium text-(--color-tertiary-text)">
          Study Hours Per Day
        </label>
        <span className="text-[13px] font-bold text-white">{value}h</span>
      </div>

      <div className="relative h-1.5 mb-3">
        <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
        <div
          className="absolute left-0 top-0 h-full bg-(--color-brand) rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={1} max={4} step={0.5} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-(--color-brand) rounded-full border-2 border-(--color-card) shadow-lg pointer-events-none"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[9px] text-(--color-dark-gray) mb-3">
        <span>Light (1h)</span>
        <span>Moderate (2–3h)</span>
        <span>Intensive (4h+)</span>
      </div>

      <div className="flex items-center justify-end gap-2 text-[11px] text-(--color-tertiary-text)">
        <span>≈ <span className="text-white font-medium">{topicsPerDay} topics/day</span></span>
        <span className="text-(--color-dark-gray)">·</span>
        <span><span className="text-white font-medium">~15 min</span> per session avg</span>
      </div>
    </div>
  )
}