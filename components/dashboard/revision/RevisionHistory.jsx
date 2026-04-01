import { RiArrowRightLine } from "react-icons/ri"

const history = [
  { date: "Feb 23", concept: "SQL Joins",         duration: "12 min", score: 94, change: +6  },
  { date: "Feb 22", concept: "ER Diagrams",        duration: "18 min", score: 79, change: +4  },
  { date: "Feb 21", concept: "Transactions",       duration: "22 min", score: 61, change: -2  },
  { date: "Feb 20", concept: "Indexing",           duration: "14 min", score: 88, change: +5  },
  { date: "Feb 18", concept: "Normalization",      duration: "25 min", score: 52, change: +2  },
]

const scoreColor  = (s) => s >= 80 ? "text-[#4ADE80]" : s >= 60 ? "text-[#FBBF24]" : "text-[var(--color-red)]"
const changeColor = (c) => c > 0 ? "text-[#4ADE80]" : "text-[var(--color-red)]"

export default function RevisionHistory() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
            Revision History
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Completed Sessions</h2>
        </div>
        <button className="flex items-center gap-1.5 text-[12px] text-[--color-brand] hover:underline">
          View Full History <RiArrowRightLine className="text-[12px]" />
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 gap-3 px-5 py-2.5 bg-[--color-card-dark] border-b border-white/[0.04]">
        {["Date", "Concept", "Duration", "Score", "Mastery Change"].map((h) => (
          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-[--color-dark-gray]">{h}</span>
        ))}
      </div>

      {history.map((row, i) => (
        <div
          key={row.concept}
          className={`grid grid-cols-5 gap-3 items-center px-5 py-3.5 hover:bg-white/[0.015] transition-colors ${
            i < history.length - 1 ? "border-b border-white/[0.03]" : ""
          }`}
        >
          <span className="text-[11px] text-[--color-secondary-text]">{row.date}</span>
          <span className="text-[12px] font-medium text-white">{row.concept}</span>
          <span className="text-[11px] text-[--color-tertiary-text]">{row.duration}</span>
          <span className={`text-[12px] font-semibold ${scoreColor(row.score)}`}>{row.score}%</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[12px] font-bold ${changeColor(row.change)}`}>
              {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
            </span>
            <span className={`text-[11px] ${changeColor(row.change)}`}>
              {row.change > 0 ? "↑" : "↓"}
            </span>
            {row.change < 0 && (
              <span className="text-[10px] text-[var(--color-red)]/60 italic">(declined)</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}