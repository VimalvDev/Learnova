export default function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-3 px-5 py-4 bg-card rounded-xl border border-(--color-card-dark) w-fit">
      <span className="text-[12px] text-(--color-brand)">Learnova AI</span>
      <div className="flex items-center gap-1">
        {[0,1,2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-(--color-brand) animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}