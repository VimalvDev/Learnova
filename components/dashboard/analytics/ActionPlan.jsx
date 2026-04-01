const actions = [
  {
    priority:      "Immediate",
    when:          "Today",
    borderColor:   "border-[var(--color-red)]/20",
    headerColor:   "text-[var(--color-red)] bg-[var(--color-red)]/10",
    dotColor:      "bg-[var(--color-red)]",
    title:         "Address Critical Weaknesses",
    body:          "3 concepts below 40% require focused practice before your next revision cycle. Start with Normalization as it blocks 4 dependent concepts.",
    concepts:      ["Normalization", "2NF", "3NF"],
    pillColor:     "text-[var(--color-red)] bg-[var(--color-red)]/10 border-[var(--color-red)]/20",
    action:        "Start Focused Practice →",
    actionColor:   "text-[var(--color-red)] border-[var(--color-red)]/30",
  },
  {
    priority:      "This Week",
    when:          "Short Term",
    borderColor:   "border-[#FBBF24]/20",
    headerColor:   "text-[#FBBF24] bg-[#FBBF24]/10",
    dotColor:      "bg-[#FBBF24]",
    title:         "Resolve Prerequisite Chain",
    body:          "Mastering Functional Dependency (currently 61%) will unlock improvement in Normalization, 2NF, and 3NF simultaneously.",
    concepts:      ["Functional Dep.", "Normalization"],
    pillColor:     "text-[#FBBF24] bg-[#FBBF24]/10 border-[#FBBF24]/20",
    action:        "Study Prerequisites →",
    actionColor:   "text-[#FBBF24] border-[#FBBF24]/30",
  },
  {
    priority:      "Maintain",
    when:          "Ongoing",
    borderColor:   "border-[--color-brand]/20",
    headerColor:   "text-[--color-brand] bg-[--color-brand]/10",
    dotColor:      "bg-[--color-brand]",
    title:         "Protect Mastered Concepts",
    body:          "SQL Joins and Indexing are mastered but show early decay signals. 2 revision sessions this week will stabilize their retention.",
    concepts:      ["SQL Joins", "Indexing"],
    pillColor:     "text-[--color-brand] bg-[--color-brand]/10 border-[--color-brand]/20",
    action:        "Schedule Revision →",
    actionColor:   "text-[--color-brand] border-[--color-brand]/30",
  },
]

export default function ActionPlan() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
          Recommendations
        </p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Prioritized Action Plan</h2>
        <p className="text-[12px] text-[--color-tertiary-text] mt-0.5">
          System-generated next steps based on your complete analytics profile.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a) => (
          <div
            key={a.title}
            className={`bg-[--color-card-dark] rounded-xl border p-5 flex flex-col gap-3.5 ${a.borderColor}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.dotColor}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg ${a.headerColor}`}>
                  {a.priority}
                </span>
              </div>
              <span className="text-[10px] text-[--color-tertiary-text]">{a.when}</span>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-white mb-1.5">{a.title}</h3>
              <p className="text-[11px] text-[--color-secondary-text] leading-relaxed">{a.body}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {a.concepts.map((c) => (
                <span key={c} className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${a.pillColor}`}>
                  {c}
                </span>
              ))}
            </div>

            <button className={`w-full mt-auto py-2 text-[11px] font-semibold rounded-xl border bg-transparent hover:bg-white/[0.02] transition-all ${a.actionColor}`}>
              {a.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}