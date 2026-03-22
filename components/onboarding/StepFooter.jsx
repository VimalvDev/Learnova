export default function StepFooter({ onBack, onNext, nextLabel = "Continue", step }) {
  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/[0.06]">
      {step > 1 ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-[#555] hover:text-white transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Back
        </button>
      ) : <div />}
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-7 h-[44px] bg-[#FA6E43] text-white text-[13px] font-bold rounded-xl hover:brightness-110 transition-all"
      >
        {nextLabel}
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}