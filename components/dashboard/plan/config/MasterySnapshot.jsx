const snapshot = {
  critical: [
    { name: "Normalization", pct: 34 },
    { name: "2NF Rules",     pct: 38 },
    { name: "FD Closure",    pct: 39 },
  ],
  revision: [
    { name: "Func. Dep.",    pct: 61 },
    { name: "ER Diagrams",   pct: 74 },
    { name: "Transactions",  pct: 68 },
  ],
  mastered: [
    { name: "SQL Joins",     pct: 91 },
    { name: "Indexing",      pct: 88 },
  ],
}

const colors = {
  critical: "text-[var(--color-red)]",
  revision: "text-[#FBBF24]",
  mastered: "text-[#4ADE80]",
}

const labels = { critical: "Critical (3)", revision: "Needs Revision (6)", mastered: "Mastered (12)" }

export default function MasterySnapshot() {
  return (
    <div className="bg-card-dark rounded-xl p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
        Current Mastery Snapshot
      </p>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(snapshot).map(([key, items]) => (
          <div key={key}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-dark-gray) mb-2">
              {labels[key]}
            </p>
            <div className="h-px bg-white/[0.04] mb-2" />
            <div className="flex flex-col gap-1.5">
              {items.map(({ name, pct }) => (
                <div key={name} className="flex items-center justify-between gap-1">
                  <span className="text-[10px] text-(--color-secondary-text) truncate">{name}</span>
                  <span className={`text-[10px] font-semibold flex-shrink-0 ${colors[key]}`}>{pct}%</span>
                </div>
              ))}
              {key === "mastered" && (
                <button className="text-[10px] text-(--color-brand) hover:underline text-left mt-0.5">
                  + 10 more
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}