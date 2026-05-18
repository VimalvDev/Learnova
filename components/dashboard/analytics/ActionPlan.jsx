import Link from "next/link"

export default function ActionPlan({ patterns, overview, loading, courseId }) {
  if (loading) return null

  const critical   = overview?.critical ?? 0
  const needsRev   = overview?.needsRev ?? 0
  const mastered   = overview?.mastered ?? 0

  // Build action items from real data
  const actions = []

  if (critical > 0) {
    actions.push({
      priority:    "Immediate",
      when:        "Today",
      borderColor: "border-[#F87171]/20",
      headerColor: "text-[#F87171] bg-[#F87171]/10",
      dotColor:    "bg-[#F87171]",
      title:       "Address Critical Weaknesses",
      body:        `${critical} concept${critical !== 1 ? "s" : ""} below 40% need focused practice. Start with the lowest scoring concept first.`,
      concepts:    (patterns ?? []).find((p) => p.type === "repeated_error")?.concepts ?? [],
      actionColor: "text-[#F87171] border-[#F87171]/30",
      href:        courseId ? `/dashboard/quizzes?courseId=${courseId}` : "/dashboard/quizzes",
      action:      "Start Focused Quiz →",
    })
  }

  if (needsRev > 0) {
    actions.push({
      priority:    "This Week",
      when:        "Short Term",
      borderColor: "border-[#FBBF24]/20",
      headerColor: "text-[#FBBF24] bg-[#FBBF24]/10",
      dotColor:    "bg-[#FBBF24]",
      title:       "Complete Scheduled Revisions",
      body:        `${needsRev} concept${needsRev !== 1 ? "s" : ""} flagged for revision. Regular review prevents knowledge decay.`,
      concepts:    [],
      actionColor: "text-[#FBBF24] border-[#FBBF24]/30",
      href:        "/dashboard/revision",
      action:      "View Revision Planner →",
    })
  }

  if (mastered > 0) {
    actions.push({
      priority:    "Maintain",
      when:        "Ongoing",
      borderColor: "border-brand/20",
      headerColor: "text-brand bg-brand/10",
      dotColor:    "bg-brand",
      title:       "Protect Mastered Concepts",
      body:        `${mastered} mastered concept${mastered !== 1 ? "s" : ""}. Periodic revision prevents decay and keeps scores high.`,
      concepts:    [],
      actionColor: "text-brand border-brand/30",
      href:        "/dashboard/revision",
      action:      "Schedule Revision →",
    })
  }

  if (actions.length === 0) return null

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Recommendations</p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Prioritized Action Plan</h2>
        <p className="text-[12px] text-tertiary-text mt-0.5">
          Next steps based on your analytics profile.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a) => (
          <div key={a.title} className={`bg-[#141414] rounded-xl border p-5 flex flex-col gap-3.5 ${a.borderColor}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${a.dotColor}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg ${a.headerColor}`}>
                  {a.priority}
                </span>
              </div>
              <span className="text-[10px] text-tertiary-text">{a.when}</span>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-white mb-1.5">{a.title}</h3>
              <p className="text-[11px] text-secondary-text leading-relaxed">{a.body}</p>
            </div>

            {a.concepts.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {a.concepts.map((c) => (
                  <span key={c} className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-lg">
                    {c}
                  </span>
                ))}
              </div>
            )}

            <Link
              href={a.href}
              className={`w-full mt-auto py-2 text-[11px] font-semibold rounded-xl border bg-transparent hover:bg-white/[0.02] transition-all text-center block ${a.actionColor}`}
            >
              {a.action}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}