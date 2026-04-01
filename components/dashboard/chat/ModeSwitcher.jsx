import { RiLockLine, RiGlobalLine } from "react-icons/ri"

export default function ModeSwitcher({ mode, setMode }) {
  return (
    <div className="flex items-center justify-between px-6 py-2.5 bg-dark border-b border-(--color-card-dark) sticky top-0 z-30">
      {/* Toggle */}
      <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
        <button
          onClick={() => setMode("private")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            mode === "private"
              ? "bg-[--color-brand] text-white"
              : "text-(--color-tertiary-text) hover:text-white"
          }`}
        >
          <RiLockLine className="text-[13px]" /> Private Mode
        </button>
        <button
          onClick={() => setMode("public")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            mode === "public"
              ? "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30"
              : "text-(--color-tertiary-text) hover:text-white"
          }`}
        >
          <RiGlobalLine className="text-[13px]" /> Public Mode
        </button>
      </div>

      {/* Center label */}
      <p className="text-[11px] text-(--color-tertiary-text) hidden md:block">
        {mode === "private"
          ? "Document-grounded answers · Source citations included · Confidence scored"
          : "External knowledge mode · Answers from AI training data, not your documents"}
      </p>

      {/* Right context */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-(--color-tertiary-text) hidden lg:block">
          {mode === "private" ? "Session: Private RAG Chat" : "Session: Public Exploration"}
        </span>
      </div>
    </div>
  )
}