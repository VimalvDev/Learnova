const patterns = [
  {
    icon: "🔁",
    title: "Repeated Misconception",
    severity: "High",
    severityColor: "text-[var(--color-red)] bg-[var(--color-red)]/10",
    body: "You have confused 2NF and 3NF conditions in 4 of your last 6 quiz sessions. This is a persistent misconception, not a knowledge gap.",
    concepts: ["Normalization", "2NF", "3NF"],
    evidence: "Sessions affected: 4 of 6 · Last occurrence: 2 days ago",
    action: "Generate Targeted Explanation →",
    actionColor: "text-[--color-brand] border-[--color-brand]/25",
  },
  {
    icon: "⬡",
    title: "Prerequisite Gap",
    severity: "Medium",
    severityColor: "text-[#FBBF24] bg-[#FBBF24]/10",
    body: "Normalization mastery (34%) is blocked by Functional Dependency (61%). You cannot master a derived concept without its prerequisite reaching 75%+.",
    prereq: { from: "Functional Dep. 61%", to: "Normalization 34%" },
    concepts: [],
    evidence: "",
    action: "Study Prerequisites First →",
    actionColor: "text-[#FBBF24] border-[#FBBF24]/25",
  },
  {
    icon: "⚡",
    title: "Speed-Accuracy Imbalance",
    severity: "Medium",
    severityColor: "text-[#FBBF24] bg-[#FBBF24]/10",
    body: "On Graph Traversal questions, you answer 28% faster than your baseline but with only 51% accuracy. This indicates guessing rather than understanding.",
    speedBar: { speed: 128, accuracy: 51 },
    concepts: [],
    evidence: "",
    action: "Practice Slower, More Carefully →",
    actionColor: "text-[#FBBF24] border-[#FBBF24]/25",
  },
  {
    icon: "📉",
    title: "Retention Decay",
    severity: "Low",
    severityColor: "text-[--color-secondary-text] bg-white/[0.06]",
    body: "Indexing was mastered 18 days ago (89%) but has dropped to 71% without revision. Spaced repetition schedule was missed for 12 days.",
    decay: [
      { label: "Day 0",  pct: 89, color: "text-[#4ADE80]"  },
      { label: "Day 10", pct: 81, color: "text-[#FBBF24]"  },
      { label: "Today",  pct: 71, color: "text-[var(--color-red)]" },
    ],
    concepts: [],
    evidence: "",
    action: "Schedule Revision Now →",
    actionColor: "text-[--color-brand] border-[--color-brand]/25",
  },
]

export default function WeaknessPanel() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
              Weakness Intelligence
            </p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
              Detected Weakness Patterns
            </h2>
            <p className="text-[12px] text-[--color-tertiary-text] mt-0.5">
              System-identified learning gaps based on error patterns, speed analysis, and retention decay.
            </p>
          </div>
          <span className="text-[11px] text-[--color-tertiary-text] self-end">
            Detection updated after each session
          </span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns.map((p) => (
          <div
            key={p.title}
            className="bg-[--color-card-dark] rounded-xl border border-white/[0.04] p-5 flex flex-col gap-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center text-[16px] flex-shrink-0">
                  {p.icon}
                </div>
                <span className="text-[13px] font-semibold text-white">{p.title}</span>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg flex-shrink-0 ${p.severityColor}`}>
                {p.severity}
              </span>
            </div>

            {/* Body */}
            <p className="text-[12px] text-[--color-secondary-text] leading-relaxed">{p.body}</p>

            {/* Concepts */}
            {p.concepts.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {p.concepts.map((c) => (
                  <span key={c} className="text-[10px] font-bold text-[--color-brand] bg-[--color-brand]/10 px-2 py-0.5 rounded-lg border border-[--color-brand]/15">
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* Prereq chain */}
            {p.prereq && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/20 px-2.5 py-1 rounded-lg">
                  {p.prereq.from}
                </span>
                <span className="text-[--color-dark-gray] text-[12px]">→</span>
                <span className="text-[11px] text-[var(--color-red)] bg-[var(--color-red)]/10 border border-[var(--color-red)]/20 px-2.5 py-1 rounded-lg">
                  {p.prereq.to}
                </span>
              </div>
            )}

            {/* Speed vs accuracy bars */}
            {p.speedBar && (
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Speed",    value: p.speedBar.speed,    color: "bg-[#FBBF24]", max: 128 },
                  { label: "Accuracy", value: p.speedBar.accuracy, color: "bg-[var(--color-red)]", max: 100 },
                ].map(({ label, value, color, max }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-[10px] text-[--color-tertiary-text] w-14 flex-shrink-0">{label}</span>
                    <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-white font-medium w-8 text-right">{value}%</span>
                  </div>
                ))}
              </div>
            )}

            {/* Decay points */}
            {p.decay && (
              <div className="flex items-end gap-4">
                {p.decay.map((d, i) => (
                  <div key={d.label} className="flex flex-col items-center gap-1">
                    <span className={`text-[12px] font-bold ${d.color}`}>{d.pct}%</span>
                    <div className="w-px h-4 bg-white/[0.1]" />
                    <span className="text-[9px] text-[--color-tertiary-text]">{d.label}</span>
                    {i < p.decay.length - 1 && (
                      <span className="text-[--color-dark-gray] text-[10px] absolute ml-8">→</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {p.evidence && (
              <p className="text-[10px] text-[--color-tertiary-text]">{p.evidence}</p>
            )}

            <button className={`w-full mt-auto py-2 text-[11px] font-semibold rounded-xl border bg-transparent transition-all hover:bg-white/[0.02] ${p.actionColor}`}>
              {p.action}
            </button>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="mx-6 mb-6 flex items-center gap-2 px-4 py-3 bg-[--color-card-mid-dark] rounded-xl border border-white/[0.04]">
        <span className="text-[--color-brand] text-[12px]">◈</span>
        <p className="text-[11px] text-[--color-secondary-text]">
          <span className="text-white font-medium">4 patterns detected</span>
          <span className="text-[--color-dark-gray] mx-2">·</span>
          <span className="text-white font-medium">2 high priority</span>
          <span className="text-[--color-dark-gray] mx-2">·</span>
          Estimated recovery: 2–3 focused sessions
        </p>
      </div>
    </div>
  )
}