import { RiAlertLine } from "react-icons/ri"

export default function LowConfidenceMessage({ message }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[12px] font-semibold text-(--color-brand)">Learnova AI</span>
        <span className="text-[10px] text-(--color-tertiary-text)">{message.time}</span>
      </div>
      <div className="bg-[#FBBF24]/[0.05] rounded-xl p-5 border border-[#FBBF24]/15">
        <div className="flex items-center gap-2 mb-2">
          <RiAlertLine className="text-[#FBBF24] text-[14px]" />
          <span className="text-[12px] font-semibold text-[#FBBF24]">Low Confidence</span>
        </div>
        <p className="text-[13px] text-(--color-secondary-text) leading-relaxed">{message.content}</p>
        <div className="mt-3 pt-3 border-t border-[#FBBF24]/10">
          <button className="text-[11px] text-(--color-brand) hover:underline">
            Ask in Public Mode for a general answer →
          </button>
        </div>
      </div>
    </div>
  )
}