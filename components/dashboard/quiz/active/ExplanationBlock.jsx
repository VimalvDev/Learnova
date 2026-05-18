import { RiBookOpenLine, RiFileTextLine } from "react-icons/ri"

export default function ExplanationBlock({ explanation, source, concept }) {
  return (
    <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-5">
      <div className="flex items-center gap-2 mb-3">
        <RiBookOpenLine className="text-brand text-[14px]" />
        <span className="text-[12px] font-semibold text-white">Explanation</span>
      </div>
      <div className="h-px bg-white/[0.04] mb-3" />
      <p className="text-[13px] text-[#888] leading-[1.75] mb-3">{explanation}</p>
      {source && (
        <div className="flex items-center gap-2">
          <RiFileTextLine className="text-brand/50 text-[11px]" />
          <span className="text-[11px] text-secondary-text">{source}</span>
        </div>
      )}
    </div>
  )
}