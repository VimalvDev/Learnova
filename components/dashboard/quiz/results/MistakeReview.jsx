export default function MistakeReview({ answers, questions }) {
  const mistakes = answers
    .filter((a) => !a.isCorrect && a.userAnswer !== "")
    .map((a) => {
      const q = questions.find((q) => q.id === a.questionId)
      if (!q) return null
      return { q, a }
    })
    .filter(Boolean)

  if (mistakes.length === 0) {
    return (
      <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Mistakes</p>
        <p className="text-[14px] font-semibold text-[#4ADE80] mt-2">No mistakes! Perfect session.</p>
      </div>
    )
  }

  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Mistakes</p>
      <h2 className="text-[16px] font-semibold text-white mb-1">Questions to Review</h2>
      <p className="text-[12px] text-secondary-text mb-5">{mistakes.length} question{mistakes.length !== 1 ? "s" : ""} answered incorrectly</p>

      <div className="flex flex-col gap-3">
        {mistakes.map(({ q, a }, i) => (
          <div key={i} className="bg-[#141414] rounded-xl border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[11px] font-bold text-brand">{q.concept}</span>
              <span className={`text-[9px] font-medium px-2 py-0.5 rounded-lg ${
                q.difficulty === "Hard" ? "text-[#F87171] bg-[#F87171]/10"
                : q.difficulty === "Medium" ? "text-[#FBBF24] bg-[#FBBF24]/10"
                : "text-[#4ADE80] bg-[#4ADE80]/10"
              }`}>{q.difficulty}</span>
            </div>
            <p className="text-[13px] text-white leading-relaxed mb-4">{q.text}</p>
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-start gap-2">
                <span className="text-[#F87171] text-[11px] mt-0.5 shrink-0">✗</span>
                <span className="text-[12px] text-[#F87171]/70">Your answer: {a.userAnswer}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#4ADE80] text-[11px] mt-0.5 shrink-0">✓</span>
                <span className="text-[12px] text-[#4ADE80]">Correct: {q.correct}</span>
              </div>
            </div>
            {q.explanation && (
              <>
                <div className="h-px bg-white/[0.04] mb-3" />
                <p className="text-[11px] text-secondary-text leading-relaxed">{q.explanation}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}