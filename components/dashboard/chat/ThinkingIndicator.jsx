export default function ThinkingIndicator() {
  return (
    <div className="flex flex-col gap-2 max-w-[85%]">
      <span className="text-[12px] font-semibold text-brand">Learnova AI</span>
      <div className="bg-card rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
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