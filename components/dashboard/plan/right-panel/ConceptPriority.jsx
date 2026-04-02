const concepts = [
  { name: "Functional Dependency", pct: 61, level: "revision"  },
  { name: "Candidate Keys",        pct: 78, level: "revision"  },
  { name: "Normalization",         pct: 34, level: "critical"  },
  { name: "2NF Rules",             pct: 38, level: "critical"  },
  { name: "3NF Rules",             pct: 41, level: "critical"  },
  { name: "ER Diagrams",           pct: 74, level: "good"      },
  { name: "Transactions",          pct: 68, level: "revision"  },
  { name: "ACID Properties",       pct: 85, level: "mastered"  },
]

const dot = {
  critical: "bg-[var(--color-red)]",
  revision: "bg-[#FBBF24]",
  good:     "bg-(--color-brand)",
  mastered: "bg-[#4ADE80]",
}

const pctColor = {
  critical: "text-[var(--color-red)]",
  revision: "text-[#FBBF24]",
  good:     "text-brand",
  mastered: "text-[#4ADE80]",
}

export default function ConceptPriority() {
  return (
    <div className="bg-card rounded-2xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
        Priority Order
      </p>
      <h3 className="text-[13px] font-semibold text-white mb-0.5">Concept Sequence</h3>
      <p className="text-[10px] text-tertiary-text mb-3">Order topics will be covered</p>

      <div className="flex flex-col divide-y divide-card-dark">
        {concepts.map(({ name, pct, level }, i) => (
          <div key={name} className="flex items-center gap-3 py-2.5">
            <span className="text-[10px] font-bold text-brand w-5 flex-shrink-0 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-medium text-white flex-1 truncate">{name}</span>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot[level]}`} />
            <span className={`text-[11px] font-semibold flex-shrink-0 ${pctColor[level]}`}>{pct}%</span>
          </div>
        ))}
      </div>

      <button className="w-full text-center text-[11px] text-brand hover:underline mt-3">
        ... 50 more concepts
      </button>
    </div>
  )
}