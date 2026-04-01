import { RiMicLine, RiSendPlaneFill } from "react-icons/ri"

export default function InputBar({ value, onChange, onSend }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-card-dark rounded-2xl border border-white/[0.06] focus-within:border-(--color-brand)/30 transition-colors">
      <span className="text-(--color-brand) text-[14px] flex-shrink-0">◈</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend() } }}
        placeholder="Ask a question about your notes..."
        className="flex-1 bg-transparent text-[13px] text-white placeholder:text-(--color-dark-gray) outline-none"
      />
      <button className="text-(--color-tertiary-text) hover:text-white transition-colors">
        <RiMicLine className="text-[16px]" />
      </button>
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
          value.trim() ? "bg-(--color-brand) hover:brightness-110" : "bg-white/[0.05] cursor-not-allowed"
        }`}
      >
        <RiSendPlaneFill className={`text-[13px] ${value.trim() ? "text-white" : "text-(--color-dark-gray)"}`} />
      </button>
    </div>
  )
}