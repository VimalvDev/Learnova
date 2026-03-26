const concepts = [
  { name: "Normalization",          mastery: 34, errors: 4, color: "bg-[#F87171]",  textColor: "text-[#F87171]"  },
  { name: "Functional Dependency",  mastery: 61, errors: 2, color: "bg-[#FBBF24]",  textColor: "text-[#FBBF24]"  },
  { name: "Transaction Management", mastery: 71, errors: 1, color: "bg-brand",  textColor: "text-brand"  },
]

export default function WeakConceptPreview() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] text-secondary-text mb-1">
        This quiz will focus on your weakest areas:
      </p>
      {concepts.map((c) => (
        <div key={c.name} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${c.color}`} />
              <span className="text-[12px] text-white">{c.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-semibold ${c.textColor}`}>{c.mastery}%</span>
              <span className="text-[10px] text-[#444]">{c.errors} error{c.errors !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <div className="h-0.75 bg-white/6 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.mastery}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}