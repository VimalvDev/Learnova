const examFocus = [
  "Distinguishing CP vs AP systems",
  "Real-world database examples",
  "Implications of partition tolerance",
  "Comparison with ACID properties",
]

const metadata = [
  { label: "Subject area",    value: "Distributed Systems",     valueColor: "text-white"     },
  { label: "Related field",   value: "Database Engineering",    valueColor: "text-white"     },
  { label: "First studied",   value: "Not in your docs",        valueColor: "text-[#FBBF24]" },
  { label: "Exam relevance",  value: "Commonly tested",         valueColor: "text-white"     },
]

export default function TopicKnowledgeCard({ topic }) {
  if (!topic) {
    return (
      <div className="p-4 mt-[2em] ">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-2">Topic Overview</p>
        <p className="text-[11px] text-tertiary-text">Generate an answer to see topic details.</p>
      </div>
    )
  }

  return (
    <div className="p-4 ">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Topic Overview</p>
      <h3 className="text-[13px] font-semibold text-white mb-3">{topic}</h3>

      {/* Difficulty bar */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] text-tertiary-text flex-shrink-0">Difficulty</span>
        <div className="flex-1 h-[3px] bg-card rounded-full overflow-hidden">
          <div className="h-full bg-[#FBBF24] rounded-full" style={{ width: "60%" }} />
        </div>
        <span className="text-[10px] text-[#FBBF24] font-medium flex-shrink-0">Intermediate</span>
      </div>

      {/* Metadata */}
      <div className="flex flex-col divide-y divide-white/[0.03] mb-4">
        {metadata.map(({ label, value, valueColor }) => (
          <div key={label} className="flex items-center justify-between py-2">
            <span className="text-[10px] text-tertiary-text">{label}</span>
            <span className={`text-[10px] font-medium ${valueColor}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Exam focus */}
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-2">
        Common Exam Focus
      </p>
      <div className="flex flex-col divide-y divide-white/[0.03]">
        {examFocus.map((f) => (
          <div key={f} className="flex items-center gap-2 py-2">
            <span className="text-brand text-[11px] flex-shrink-0">◈</span>
            <span className="text-[11px] text-secondary-text">{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}