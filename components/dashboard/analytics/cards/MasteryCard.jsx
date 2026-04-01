import { RiArrowRightUpLine } from "react-icons/ri"

export default function MasteryCard() {
  const pct = 78
  const r   = 28
  const circ = 2 * Math.PI * r
  const fill = (pct / 100) * circ

  return (
    <div className="bg-card-dark rounded-2xl p-5  flex flex-col gap-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70">
        Overall Mastery
      </p>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[clamp(28px,3vw,38px)] font-black text-white leading-none">78%</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <RiArrowRightUpLine className="text-[#4ADE80] text-[13px]" />
            <span className="text-[12px] font-medium text-[#4ADE80]">+6% this week</span>
          </div>
          <p className="text-[11px] text-[--color-tertiary-text] mt-1">58 concepts · DBMS</p>
        </div>
        <div className="relative flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle
              cx="36" cy="36" r={r} fill="none"
              stroke="var(--color-brand)" strokeWidth="6"
              strokeDasharray={`${fill} ${circ}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-white">
            78
          </span>
        </div>
      </div>
      <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
        <div className="h-full bg-brand rounded-full" style={{ width: "78%" }} />
      </div>
    </div>
  )
}