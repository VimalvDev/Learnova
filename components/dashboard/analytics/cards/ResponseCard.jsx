const bars = [65, 80, 55, 72]

export default function ResponseCard() {
  const max = Math.max(...bars)

  return (
    <div className="bg-card-dark rounded-2xl p-5 flex flex-col gap-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70">
        Response Time
      </p>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[clamp(28px,3vw,38px)] font-black text-[#4ADE80] leading-none">−18%</p>
          <p className="text-[11px] text-[--color-tertiary-text] mt-1.5">vs 30-day average</p>
          <p className="text-[11px] text-[--color-secondary-text] mt-1">Avg 34s per question</p>
        </div>
        <div className="flex items-end gap-1.5 h-10 flex-shrink-0">
          {bars.map((b, i) => (
            <div
              key={i}
              className="w-2 rounded-sm transition-all"
              style={{
                height: `${(b / max) * 100}%`,
                background: i === bars.indexOf(max)
                  ? "var(--color-brand)"
                  : "rgba(250,110,67,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}