export default function StepFooter({ onNext, onBack, nextLabel = "Continue →", disabled = false, showBack = true }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
      {showBack ? (
        <button
          onClick={onBack}
          className="text-[12px] text-[#666] hover:text-white transition-colors"
        >
          ← Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className="h-[44px] px-8 bg-[#FA6E43] text-white text-[13px] font-semibold rounded-xl hover:brightness-110 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel}
      </button>
    </div>
  )
}