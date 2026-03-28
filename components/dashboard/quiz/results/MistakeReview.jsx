const mistakes = [
  {
    q: "Q7", concept: "Normalization", difficulty: "Medium",
    text: "Which condition must hold for a relation to be in 2NF?",
    yourAnswer: "B — Eliminate transitive dependencies",
    correctAnswer: "A — Eliminate partial dependencies",
    pattern: "This is the 3rd time you've confused 2NF and 3NF conditions.",
  },
  {
    q: "Q11", concept: "Functional Dependency", difficulty: "Hard",
    text: "What is a trivial functional dependency?",
    yourAnswer: "D — A dependency involving only prime attributes",
    correctAnswer: "C — When the dependent is a subset of the determinant",
    pattern: null,
  },
]

export default function MistakeReview() {
  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Mistakes</p>
      <h2 className="text-[16px] font-semibold text-white mb-1">Questions to Review</h2>
      <p className="text-[12px] text-secondary-text mb-5">{mistakes.length} questions answered incorrectly</p>
      <div className="flex flex-col gap-3">
        {mistakes.map((m) => (
          <div key={m.q} className="bg-[#141414] rounded-xl border border-white/6 p-4">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[11px] font-bold text-brand">{m.q}</span>
              <span className="text-[9px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-lg border border-brand/15">
                {m.concept}
              </span>
              <span className="text-[9px] font-medium text-[#FBBF24] bg-[#FBBF24]/10 px-2 py-0.5 rounded-lg">
                {m.difficulty}
              </span>
            </div>
            <p className="text-[13px] text-white leading-relaxed mb-4">{m.text}</p>
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-start gap-2">
                <span className="text-[#F87171] text-[11px] mt-0.5 shrink-0">✗</span>
                <span className="text-[12px] text-[#F87171]/70">{m.yourAnswer}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#4ADE80] text-[11px] mt-0.5 shrink-0">✓</span>
                <span className="text-[12px] text-[#4ADE80]">{m.correctAnswer}</span>
              </div>
            </div>
            {m.pattern && (
              <>
                <div className="h-px bg-white/4 mb-3" />
                <div className="flex items-start gap-2">
                  <span className="text-brand text-[11px] shrink-0">📖</span>
                  <p className="text-[11px] text-secondary-text italic">{m.pattern}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}