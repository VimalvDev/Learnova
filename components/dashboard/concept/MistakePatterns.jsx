const patterns = [
  {
    dot:      "bg-[var(--color-red)]",
    severity: "Frequent Confusion",
    count:    "4 of 6 sessions",
    countStyle:"text-[var(--color-red)] bg-[var(--color-red)]/10",
    title:    "Confusion between 2NF and 3NF conditions",
    detail:   "You consistently select answers describing 3NF (transitive dependency elimination) when 2NF (partial dependency elimination) is asked. These two conditions are closely related but operate at different dependency levels.",
    evidence: "Last occurrence: Feb 23 · Quiz Session 6 · Q7",
    inset:    "◈  2NF: Eliminates partial dependencies on composite key.\n     3NF: Eliminates transitive dependencies on non-key attributes.\n     These are sequential — a relation must satisfy 2NF before 3NF.",
    actions:  ["View Full Explanation", "Practice This Distinction →"],
  },
  {
    dot:      "bg-[#FBBF24]",
    severity: "Identification Error",
    count:    "3 of 6 sessions",
    countStyle:"text-[#FBBF24] bg-[#FBBF24]/10",
    title:    "Incorrect identification of functional dependencies",
    detail:   "When given a relation schema, you frequently miss non-obvious functional dependencies, particularly those involving composite attributes.",
    evidence: "Last occurrence: Feb 21 · Q11",
    inset:    "◈  Strategy: List all attribute pairs systematically.\n     Check if left side determines right side in all tuples.\n     Never assume dependency without testing all instances.",
    actions:  ["View Explanation", "Practice Dependency Identification →"],
  },
  {
    dot:      "bg-(--color-brand)",
    severity: "Speed Pattern",
    count:    "2 of 6 sessions",
    countStyle:"text-brand bg-(--color-brand)/10",
    title:    "Slow candidate key identification under time pressure",
    detail:   "Your accuracy on candidate key questions is 68% overall, but drops to 41% when average time exceeds 45 seconds. This suggests partial understanding that breaks down under exam-like time pressure.",
    evidence: "Last occurrence: Feb 20 · Q3, Q14",
    inset:    null,
    actions:  ["Timed Practice Mode →"],
  },
]

export default function MistakePatterns() {
  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
            Error Intelligence
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
            Common Mistake Patterns
          </h2>
          <p className="text-[12px] text-tertiary-text mt-0.5">
            Detected from 6 quiz sessions · 18 total attempts on this concept.
          </p>
        </div>
        <span className="text-[11px] text-tertiary-text self-end">18 total errors logged</span>
      </div>

      <div className="flex flex-col gap-3">
        {patterns.map(({ dot, severity, count, countStyle, title, detail, evidence, inset, actions }) => (
          <div key={title} className="bg-card-dark rounded-xl p-5">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                <span className="text-[13px] font-semibold text-white">{severity}</span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${countStyle}`}>
                {count}
              </span>
            </div>

            {/* Title */}
            <p className="text-[13px] font-medium text-white mb-2">{title}</p>

            {/* Detail */}
            <p className="text-[12px] text-secondary-text leading-relaxed mb-3">{detail}</p>

            {/* Evidence */}
            <p className="text-[10px] text-tertiary-text mb-3">{evidence}</p>

            {/* Clarification inset */}
            {inset && (
              <div className="pl-3 border-l-2 border-(--color-brand)/30 mb-3">
                <p className="text-[11px] text-secondary-text leading-relaxed font-mono whitespace-pre-line">
                  {inset}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {actions.map((a, i) => (
                <button
                  key={a}
                  className={`text-[11px] font-medium rounded-lg transition-all ${
                    i === actions.length - 1
                      ? "text-brand hover:underline"
                      : "px-3 py-1.5 bg-card text-secondary-text hover:text-white"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="mt-4 flex items-start gap-2 bg-card-dark rounded-xl p-4">
        <span className="text-brand flex-shrink-0 mt-0.5">◈</span>
        <p className="text-[11px] text-secondary-text leading-relaxed">
          <span className="text-white font-semibold">3 error patterns detected</span>
          <span className="text-dark-gray mx-1.5">·</span>
          Most critical: 2NF vs 3NF confusion (4 sessions).
          Addressing pattern 1 alone is estimated to improve accuracy by ~15–20%.
        </p>
      </div>
    </div>
  )
}