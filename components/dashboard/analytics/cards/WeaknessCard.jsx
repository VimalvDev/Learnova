const critical = [
  { name: "Normalization",   pct: 34 },
  { name: "2NF Rules",       pct: 38 },
  { name: "FD Closure",      pct: 39 },
]

export default function WeaknessCard() {
  return (
    <div className="bg-card-dark rounded-2xl p-5  flex flex-col gap-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70">
        Critical Weaknesses
      </p>
      <div>
        <p className="text-[clamp(28px,3vw,38px)] font-black text-red leading-none">3</p>
        <p className="text-[11px] text-[--color-tertiary-text] mt-1.5">Below 40% threshold · ↓ from 5</p>
      </div>
      <div className="flex flex-col gap-2">
        {critical.map((c) => (
          <div key={c.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0" />
              <span className="text-[11px] text-white">{c.name}</span>
            </div>
            <span className="text-[11px] font-semibold text-red">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}