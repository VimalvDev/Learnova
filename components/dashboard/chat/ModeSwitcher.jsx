import { RiLockLine, RiGlobalLine } from "react-icons/ri"

export default function ModeSwitcher({ mode, setMode }) {
  return (
    <div className="flex items-center gap-4 px-6 py-2.5 bg-dark border-b border-(--color-card-dark) shrink-0 z-30">
      <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
        <button
          onClick={() => setMode("private")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            mode === "private" ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
          }`}
        >
          <RiLockLine className="text-[13px]" /> Private Mode
        </button>
        <button
          onClick={() => setMode("public")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            mode === "public"
              ? "bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30"
              : "text-tertiary-text hover:text-white"
          }`}
        >
          <RiGlobalLine className="text-[13px]" /> Public Mode
        </button>
      </div>
      <p className="text-[11px] text-tertiary-text hidden md:block">
        {mode === "private"
          ? "Answers from your uploaded documents only · Source citations included"
          : "Answers from AI general knowledge · Not from your documents"}
      </p>
    </div>
  )
}