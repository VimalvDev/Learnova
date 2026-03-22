export default function StepLabel({ step, title, desc }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FA6E43]/70">
          Step {step} of 6
        </span>
        <span className="text-[#333] text-[10px]">—</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#FA6E43]/70">
          {title}
        </span>
      </div>
      <h2 className="text-[28px] lg:text-[32px] font-black text-white leading-tight mb-2">
        {title}
      </h2>
      {desc && (
        <p className="text-[14px] text-[#888891] leading-relaxed">{desc}</p>
      )}
    </div>
  )
}