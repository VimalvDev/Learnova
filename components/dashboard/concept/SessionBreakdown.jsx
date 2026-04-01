const sessions = [
  { date: "Feb 23", session: "Quiz Session 6", score: 50, time: "14 min", mistakes: 3, result: "Needs Revision", best: false },
  { date: "Feb 21", session: "Quiz Session 5", score: 58, time: "18 min", mistakes: 2, result: "Needs Revision", best: false },
  { date: "Feb 14", session: "Quiz Session 4", score: 61, time: "12 min", mistakes: 1, result: "Needs Revision", best: true  },
  { date: "Feb 12", session: "Quiz Session 3", score: 55, time: "22 min", mistakes: 4, result: "High Risk",      best: false },
  { date: "Feb 8",  session: "Quiz Session 2", score: 48, time: "25 min", mistakes: 5, result: "Critical",       best: false },
  { date: "Feb 5",  session: "Quiz Session 1", score: 44, time: "28 min", mistakes: 6, result: "Critical",       best: false },
]

const scoreColor  = (s) => s >= 65 ? "text-[#4ADE80]" : s >= 50 ? "text-[#FBBF24]" : "text-[var(--color-red)]"

const resultStyle = {
  "Needs Revision": "text-[#FBBF24] bg-[#FBBF24]/10",
  "High Risk":      "text-[var(--color-red)] bg-[var(--color-red)]/10",
  "Critical":       "text-[var(--color-red)] bg-[var(--color-red)]/10",
}

export default function SessionBreakdown() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-card-dark">
        <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">
          Session Breakdown
        </p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
          Quiz Performance History
        </h2>
        <p className="text-[12px] text-(--color-tertiary-text) mt-0.5">
          All recorded attempts on Normalization across sessions.
        </p>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-6 gap-2 px-5 py-2.5 bg-card-dark">
        {["Date", "Session", "Score", "Time", "Mistakes", "Result"].map(h => (
          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-(--color-dark-gray)">{h}</span>
        ))}
      </div>

      {sessions.map((s, i) => (
        <div
          key={s.date}
          className={`grid grid-cols-6 gap-2 items-center px-5 py-3.5 hover:bg-white/[0.01] transition-colors ${
            i < sessions.length - 1 ? "border-b border-card-dark" : ""
          }`}
        >
          <span className="text-[11px] text-(--color-secondary-text)">{s.date}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-medium text-white truncate">{s.session}</span>
            {s.best && (
              <span className="text-[9px] text-(--color-brand) flex-shrink-0">⭐</span>
            )}
          </div>
          <span className={`text-[13px] font-bold ${scoreColor(s.score)}`}>{s.score}%</span>
          <span className="text-[11px] text-(--color-secondary-text)">{s.time}</span>
          <span className="text-[12px] text-[#FBBF24]">{s.mistakes} errors</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg w-fit ${resultStyle[s.result] ?? "text-(--color-secondary-text) bg-card-dark"}`}>
            {s.result}
          </span>
        </div>
      ))}

      {/* Footer */}
      <div className="px-5 py-3 bg-card-dark border-t border-card-dark text-center">
        <p className="text-[11px] text-(--color-tertiary-text)">
          6 sessions recorded
          <span className="text-(--color-dark-gray) mx-1.5">·</span>
          Average: <span className="text-white font-medium">53%</span>
          <span className="text-(--color-dark-gray) mx-1.5">·</span>
          Best: <span className="text-white font-medium">61%</span>
          <span className="text-(--color-dark-gray) mx-1.5">·</span>
          Trend: <span className="text-[#4ADE80] font-medium">↑ Slowly improving</span>
        </p>
      </div>
    </div>
  )
}