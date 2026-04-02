const risks = [
  {
    level: "High",
    dot:   "bg-[var(--color-red)]",
    edge:  "bg-[var(--color-red)]",
    title: "Normalization + Prerequisite Chain",
    body:  "Normalization (34%) depends on Functional Dependency (61%). Both are currently below target thresholds. If Functional Dependency is not resolved in Days 1–2, the entire Normalization cluster (4 concepts) will be under-prepared.",
    impact:[
      { label: "Concepts at risk", value: "Normalization, 2NF, 3NF, BCNF (4 total)" },
      { label: "Exam weight",      value: "High · Estimated exam coverage: 25–30%"   },
    ],
    mitigation: "Plan already allocates Days 1–5 to this cluster. Adding 20 min/day would provide a safety buffer.",
  },
  {
    level: "Moderate",
    dot:   "bg-[#FBBF24]",
    edge:  "bg-[#FBBF24]",
    title: "Retention Decay on Mastered Concepts",
    body:  "SQL Joins (91%) and Indexing (88%) were mastered but have not been reviewed in 12+ days. Without revision sessions, these may decay below 80% by exam date.",
    impact:[],
    mitigation: "3 revision sessions are already scheduled in Weeks 2–3. These should maintain scores above 85%.",
  },
  {
    level: "Low",
    dot:   "bg-(--color-brand)",
    edge:  "bg-(--color-brand)",
    title: "Time Constraint on Week 3",
    body:  "Week 3 has only 5 days allocated. If any sessions from Weeks 1–2 are missed, Week 3 becomes the recovery window — reducing consolidation time.",
    impact:[],
    mitigation: "Buffer Day on Day 14 is designed to absorb any session carryover before final review week.",
  },
]

const levelStyle = {
  "High":     "text-[var(--color-red)] bg-[var(--color-red)]/10",
  "Moderate": "text-[#FBBF24] bg-[#FBBF24]/10",
  "Low":      "text-brand bg-(--color-brand)/10",
}

export default function RiskAssessment() {
  return (
    <div className="bg-card rounded-2xl p-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
        Risk Assessment
      </p>
      <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white mb-1">
        Plan Risk Analysis
      </h2>
      <p className="text-[12px] text-tertiary-text mb-5">
        System-identified risks based on mastery gaps, timeline constraints, and concept dependencies.
      </p>

      <div className="flex flex-col gap-3">
        {risks.map(({ level, dot, edge, title, body, impact, mitigation }) => (
          <div key={title} className="bg-card-dark rounded-xl overflow-hidden relative">
            {/* Left edge */}
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${edge}`} />

            <div className="pl-5 pr-5 py-5">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg ${levelStyle[level]}`}>
                  {level} Risk
                </span>
                <span className="text-[13px] font-semibold text-white">{title}</span>
              </div>

              {/* Body */}
              <p className="text-[12px] text-secondary-text leading-relaxed mb-3">{body}</p>

              {/* Impact */}
              {impact.length > 0 && (
                <div className="mb-3 flex flex-col gap-1">
                  {impact.map(({ label, value }) => (
                    <p key={label} className="text-[11px] text-tertiary-text">
                      <span className="text-white font-medium">{label}:</span> {value}
                    </p>
                  ))}
                </div>
              )}

              {/* Mitigation */}
              <div className="flex items-start gap-2 bg-card rounded-xl px-3 py-2.5">
                <span className="text-brand text-[11px] flex-shrink-0 mt-0.5">◈</span>
                <p className="text-[11px] text-tertiary-text leading-relaxed">{mitigation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-start gap-2 bg-card-dark rounded-xl px-4 py-3.5">
        <span className="text-brand">◈</span>
        <p className="text-[11px] text-secondary-text leading-relaxed">
          Overall plan risk: <span className="text-[#FBBF24] font-semibold">Moderate</span>
          <span className="text-dark-gray mx-1.5">·</span>
          Main dependency: <span className="text-white font-medium">Functional Dependency mastery by Day 2</span>.
          Recommended: Add 15–20 min/day or resolve prerequisite gap before Day 3.
        </p>
      </div>
    </div>
  )
}