export default function VelocityCard() {
  const points = [40, 52, 48, 61, 58, 72, 78]
  const max    = Math.max(...points)
  const min    = Math.min(...points)
  const norm   = points.map((p) => ((p - min) / (max - min)) * 34)
  const d      = norm.map((y, i) => `${i === 0 ? "M" : "L"} ${i * 13.3} ${36 - y}`).join(" ")

  return (
    <div className="bg-card-dark rounded-2xl p-5 flex flex-col gap-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70">
        Improvement Rate
      </p>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[clamp(28px,3vw,38px)] font-black text-[#4ADE80] leading-none">+12%</p>
          <p className="text-[11px] text-[--color-tertiary-text] mt-1.5">vs previous 7-day period</p>
          <p className="text-[11px] text-[--color-secondary-text] mt-1">
            Fastest: <span className="text-white">SQL Joins +18%</span>
          </p>
        </div>
        <svg viewBox="0 0 80 40" className="w-20 h-10 flex-shrink-0">
          <path d={d} fill="none" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}