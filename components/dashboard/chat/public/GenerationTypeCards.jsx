const types = [
  {
    id: "explanation",
    icon: "📖",
    title: "Generate Explanation",
    desc: "Full concept breakdown with examples",
  },
  {
    id: "quiz",
    icon: "🧪",
    title: "Generate Practice Quiz",
    desc: "5 questions on the entered topic · adaptive difficulty",
  },
  {
    id: "summary",
    icon: "📋",
    title: "Generate Summary Card",
    desc: "Concise overview and key points for quick review",
  },
]

export default function GenerationTypeCards({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {types.map(({ id, icon, title, desc }) => {
        const active = value === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex flex-col items-start gap-2 p-4 rounded-xl text-left transition-all hover:-translate-y-px ${
              active
                ? "bg-(--color-brand)/[0.08] border border-(--color-brand)"
                : "bg-card-dark border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02]"
            }`}
          >
            <span className="text-[18px]">{icon}</span>
            <p className={`text-[12px] font-semibold ${active ? "text-(--color-brand)" : "text-white"}`}>
              {title}
            </p>
            <p className="text-[10px] text-(--color-tertiary-text) leading-relaxed">{desc}</p>
          </button>
        )
      })}
    </div>
  )
}