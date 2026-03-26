import { RiCheckLine, RiCloseLine } from "react-icons/ri"

const LETTERS = ["A", "B", "C", "D"]

export default function AnswerOption({ option, selected, revealed, isCorrect, onClick }) {
  const idx = ["a", "b", "c", "d"].indexOf(option.id)

  const container = revealed
    ? isCorrect
      ? "border-[#4ADE80]/50 bg-[#4ADE80]/[0.05]"
      : selected
      ? "border-[#F87171]/50 bg-[#F87171]/[0.05]"
      : "border-white/[0.03] opacity-40"
    : selected
    ? "border-brand/50 bg-brand/[0.05]"
    : "border-white/[0.06] bg-[#141414] hover:border-white/[0.1] hover:bg-white/[0.02] cursor-pointer"

  const badge = revealed
    ? isCorrect
      ? "bg-[#4ADE80] text-white"
      : selected
      ? "bg-[#F87171] text-white"
      : "bg-[#2A2B2F] text-[#444]"
    : selected
    ? "bg-brand text-white"
    : "bg-[#2A2B2F] text-secondary-text"

  const textCol = revealed
    ? isCorrect
      ? "text-[#4ADE80] font-medium"
      : selected
      ? "text-[#F87171]"
      : "text-[#444]"
    : selected
    ? "text-white font-medium"
    : "text-[#888]"

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3.5 px-4 py-4 rounded-xl border transition-all duration-150 ${container}`}
    >
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold transition-all ${badge}`}>
        {LETTERS[idx]}
      </div>
      <span className={`text-[13px] leading-relaxed flex-1 transition-colors ${textCol}`}>
        {option.text}
      </span>
      {revealed && isCorrect && <RiCheckLine className="text-[#4ADE80] text-[15px] shrink-0 mt-0.5" />}
      {revealed && selected && !isCorrect && <RiCloseLine className="text-[#F87171] text-[15px] shrink-0 mt-0.5" />}
    </div>
  )
}