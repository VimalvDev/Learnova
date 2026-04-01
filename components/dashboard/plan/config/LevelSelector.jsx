const levels = [
  { id: "Beginner",     sub: "Starting from ground zero." },
  { id: "Intermediate", sub: "Some foundation, needs structure." },
  { id: "Advanced",     sub: "Reviewing and reinforcing." },
]

export default function LevelSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-[12px] text-(--color-secondary-text) mb-3">
        How would you rate your current understanding?
      </p>
      <div className="grid grid-cols-3 gap-1 p-1 bg-card-dark rounded-xl">
        {levels.map(({ id, sub }) => {
          const active = value === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center text-center py-4 px-2 rounded-xl transition-all ${
                active
                  ? "bg-(--color-brand) text-white"
                  : "text-(--color-secondary-text) hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <span className={`text-[13px] font-semibold ${active ? "text-white" : ""}`}>{id}</span>
              <span className={`text-[10px] mt-1 leading-tight ${active ? "text-white/70" : "text-(--color-tertiary-text)"}`}>
                {sub}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}