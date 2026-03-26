export default function QuizProgressBar({ current, total }) {
  const pct = Math.round(((current - 1) / total) * 100)
  return (
    <div className="bg-card rounded-2xl p-4 border border-white/4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] text-[#888]">Progress</span>
        <span className="text-[12px] font-semibold text-white">{pct}%</span>
      </div>
      <div className="h-2 bg-white/6 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}