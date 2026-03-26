import { RiBookOpenLine, RiFileTextLine } from "react-icons/ri"

export default function ExplanationBlock({ explanation, source, concept, mastery }) {
  const barColor    = mastery >= 85 ? "bg-[#4ADE80]" : mastery >= 65 ? "bg-brand" : mastery >= 40 ? "bg-[#FBBF24]" : "bg-[#F87171]"
  const labelColor  = mastery >= 85 ? "text-[#4ADE80]" : mastery >= 65 ? "text-brand" : mastery >= 40 ? "text-[#FBBF24]" : "text-[#F87171]"
  const masteryLabel = mastery >= 85 ? "Strong" : mastery >= 65 ? "Good" : mastery >= 40 ? "Needs Revision" : "Critical"

  return (
    <div className="bg-[#141414] rounded-xl border border-white/6 p-5">
      <div className="flex items-center gap-2 mb-3">
        <RiBookOpenLine className="text-brand text-[14px]" />
        <span className="text-[12px] font-semibold text-white">Explanation</span>
      </div>
      <div className="h-px bg-white/4 mb-3" />
      <p className="text-[13px] text-[#888] leading-[1.75] mb-3">{explanation}</p>
      <div className="flex items-center gap-2 mb-4">
        <RiFileTextLine className="text-brand/50 text-[11px]" />
        <span className="text-[11px] text-secondary-text">{source}</span>
      </div>
      <div className="h-px bg-white/4 mb-3" />
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-bold text-brand/70 uppercase tracking-widest">{concept}</span>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-white">{mastery}%</span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/4 ${labelColor}`}>
            {masteryLabel}
          </span>
        </div>
      </div>
      <div className="h-0.75 bg-white/6 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${mastery}%` }} />
      </div>
    </div>
  )
}