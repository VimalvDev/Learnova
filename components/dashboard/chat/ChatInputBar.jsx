import { RiSendPlaneFill } from "react-icons/ri"

export default function ChatInputBar({ value, onChange, onSend, disabled, mode }) {
  return (
    <div className="flex items-end gap-3 px-4 py-3 bg-card-dark rounded-2xl border border-white/[0.06] focus-within:border-(--color-brand)/30 transition-colors">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !disabled) {
            e.preventDefault()
            onSend()
          }
        }}
        placeholder={mode === "private" ? "Ask a question about your notes..." : "Ask about any topic..."}
        disabled={disabled}
        rows={1}
        className="flex-1 bg-transparent text-[13px] text-white placeholder:text-dark-gray outline-none resize-none disabled:opacity-50 max-h-[120px]"
        style={{ fieldSizing: "content" }}
      />
      <button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${
          value.trim() && !disabled
            ? "bg-(--color-brand) hover:brightness-110"
            : "bg-white/[0.05] cursor-not-allowed"
        }`}
      >
        <RiSendPlaneFill className={`text-[13px] ${value.trim() && !disabled ? "text-white" : "text-dark-gray"}`} />
      </button>
    </div>
  )
}