const weakConcepts = [
  { name: "Normalization",           pct: 68 },
  { name: "Recursion",               pct: 54 },
  { name: "Functional Dependency",   pct: 51 },
  { name: "Indexing",                pct: 44 },
  { name: "Graph Traversal",         pct: 41 },
  { name: "Transaction Isolation",   pct: 38 },
  { name: "Candidate Keys",          pct: 34 },
  { name: "Binary Search Trees",     pct: 29 },
]

const contentStats = [
  { label: "Total documents indexed",  value: "24,840"  },
  { label: "Total chunks generated",   value: "312,400" },
  { label: "Total embeddings stored",  value: "312,400" },
  { label: "Avg doc size",             value: "3.1 MB"  },
  { label: "Avg chunks per document",  value: "84"      },
]

const subjects = [
  { name: "Computer Science", courses: 2841, pct: 100 },
  { name: "Mathematics",      courses: 1520, pct: 53  },
  { name: "Engineering",      courses: 1280, pct: 45  },
  { name: "Medicine",         courses: 940,  pct: 33  },
  { name: "Business",         courses: 680,  pct: 24  },
]

export default function PlatformIntelligence() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

      {/* Weak concepts */}
      <div className="bg-card rounded-2xl p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Global Intelligence</p>
        <h3 className="text-[clamp(14px,1.7vw,16px)] font-semibold text-white mb-0.5">Most Common Weak Concepts</h3>
        <p className="text-[11px] text-tertiary-text mb-4">Topics where the most users struggle across all courses.</p>
        <div className="flex flex-col divide-y divide-white/[0.04]">
          {weakConcepts.map(({ name, pct }, i) => (
            <div key={name} className="flex items-center gap-3 py-2.5">
              <span className="text-[10px] font-bold text-brand w-5 flex-shrink-0 tabular-nums">
                #{i + 1}
              </span>
              <span className="text-[12px] font-medium text-white flex-1 truncate">{name}</span>
              <span className="text-[11px] text-secondary-text flex-shrink-0 hidden sm:block w-24 text-right">
                {pct}% of users
              </span>
              <div className="w-24 h-[3px] bg-white/[0.06] rounded-full overflow-hidden flex-shrink-0">
                <div className="h-full bg-(--color-brand) rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 bg-card-dark rounded-xl px-3 py-2.5">
          <span className="text-brand text-[11px] flex-shrink-0">◈</span>
          <p className="text-[10px] text-tertiary-text leading-relaxed">
            Normalization affects 68% of users — consider adding a curated prerequisite path in the platform library.
          </p>
        </div>
      </div>

      {/* Content analytics */}
      <div className="bg-card rounded-2xl p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Content Analytics</p>
        <h3 className="text-[clamp(14px,1.7vw,16px)] font-semibold text-white mb-4">Platform Content Breakdown</h3>

        <div className="flex flex-col divide-y divide-white/[0.04] mb-5">
          {contentStats.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <span className="text-[11px] text-secondary-text">{label}</span>
              <span className="text-[12px] font-semibold text-white">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">Most Studied Subjects</p>
        <div className="flex flex-col gap-3">
          {subjects.map(({ name, courses, pct }) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-[11px] text-secondary-text w-28 flex-shrink-0 truncate">{name}</span>
              <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-(--color-brand) rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[11px] text-tertiary-text flex-shrink-0 w-16 text-right">
                {courses.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}