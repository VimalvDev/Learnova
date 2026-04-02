import { RiLockLine, RiGlobalLine } from "react-icons/ri"

export default function ModeComparison({ onSwitchPrivate }) {
  return (
    <div className="p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">
        Mode Comparison
      </p>

      <div className="flex flex-col gap-2 mb-3">
        {/* Private */}
        <div className="bg-card rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <RiLockLine className="text-secondary-text text-[12px]" />
            <span className="text-[12px] font-semibold text-white">Private Mode</span>
          </div>
          <div className="flex flex-col gap-1">
            {[
              "Answers from your documents only",
              "Source citations included",
              "Confidence score shown",
              "Zero hallucination risk",
            ].map((item) => (
              <p key={item} className="text-[10px] text-secondary-text flex items-start gap-1.5">
                <span className="text-dark-gray mt-0.5 flex-shrink-0">·</span> {item}
              </p>
            ))}
          </div>
        </div>

        {/* Public */}
        <div className="bg-[#3B82F6]/[0.05] rounded-xl p-3 border border-[#3B82F6]/15">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <RiGlobalLine className="text-[#3B82F6] text-[12px]" />
              <span className="text-[12px] font-semibold text-[#3B82F6]">Public Mode</span>
            </div>
            <span className="text-[9px] text-[#3B82F6]">← You are here</span>
          </div>
          <div className="flex flex-col gap-1">
            {[
              "Answers from AI training data",
              "No source citations",
              "Verify before exam use",
            ].map((item) => (
              <p key={item} className="text-[10px] text-secondary-text flex items-start gap-1.5">
                <span className="text-dark-gray mt-0.5 flex-shrink-0">·</span> {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onSwitchPrivate}
        className="w-full h-9 bg-card text-white text-[11px] font-medium rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all flex items-center justify-center gap-2"
      >
        <RiLockLine className="text-[12px]" /> Switch to Private Mode
      </button>
    </div>
  )
}