const types = [
  { id: "mcq",       label: "Multiple Choice"   },
  { id: "truefalse", label: "True / False"       },
  { id: "short",     label: "Short Answer"       },
  { id: "fill",      label: "Fill in the Blank"  },
]

export default function QuestionTypeSelector({ value, onChange }) {
  const toggle = (id) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])

  return (
    <div className="flex flex-col gap-2">
      {types.map(({ id, label }) => {
        const active = value.includes(id)
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all text-left ${
              active
                ? "border-brand/40 bg-brand/5"
                : "border-white/6 bg-[#141414] hover:border-white/10"
            }`}
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
              active ? "bg-brand border-brand" : "border-white/20"
            }`}>
              {active && <span className="text-white text-[9px] font-bold">✓</span>}
            </div>
            <span className={`text-[12px] font-medium ${active ? "text-white" : "text-secondary-text"}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}