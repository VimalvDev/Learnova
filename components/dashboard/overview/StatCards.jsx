import Link from "next/link"
import FullMasteryRing from "@/components/charts/full/FullMasteryRing"

export default function StatCards({ stats }) {
  const {
    avgMastery    = 0,
    mastered      = 0,
    totalConcepts = 0,
    needsRevision = 0,
    critical      = 0,
  } = stats ?? {}

  const cards = [
    {
      label:       "Overall Mastery",
      href:        "/analytics",
      type:        "ring",
      ringValue:   avgMastery,
      value:       `${avgMastery}%`,
      change:      avgMastery > 0 ? "Based on quiz results" : "No quizzes yet",
      changeColor: "#4ADE80",
    },
    {
      label:        "Concepts Mastered",
      href:         "/analytics",
      value:        String(mastered),
      valueColor:   "#fff",
      change:       totalConcepts > 0 ? `of ${totalConcepts} total` : "No concepts yet",
      changeColor:  "#4ADE80",
      sub:          "concepts mastered",
      progress:     totalConcepts > 0 ? Math.round((mastered / totalConcepts) * 100) : 0,
      progressColor:"#FA6E43",
    },
    {
      label:        "Needs Revision",
      href:         "/revision",
      value:        String(needsRevision),
      valueColor:   "#FBBF24",
      change:       needsRevision > 0 ? "Review soon" : "All caught up",
      changeColor:  needsRevision > 0 ? "#FBBF24" : "#4ADE80",
      sub:          "concepts flagged",
      progress:     totalConcepts > 0 ? Math.round((needsRevision / totalConcepts) * 100) : 0,
      progressColor:"#FBBF24",
    },
    {
      label:        "Critical Weakness",
      href:         "/analytics",
      value:        String(critical),
      valueColor:   "#F87171",
      change:       critical > 0 ? "Needs attention" : "Looking good",
      changeColor:  critical > 0 ? "#F87171" : "#4ADE80",
      sub:          "concepts below 40%",
      progress:     totalConcepts > 0 ? Math.round((critical / totalConcepts) * 100) : 0,
      progressColor:"#F87171",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ label, href, type, ringValue, value, valueColor, change, changeColor, sub, progress, progressColor }) => (
        <Link
          key={label}
          href={href}
          className="bg-card-dark rounded-2xl p-5 hover:bg-[#1c1c1c] transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium uppercase tracking-widest text-brand/80">
              {label}
            </span>
            <span className="text-tertiary-text text-[12px] group-hover:text-brand transition-colors">→</span>
          </div>

          {type === "ring" ? (
            <div className="flex items-center gap-4 mt-3">
              <FullMasteryRing value={ringValue} size={72} strokeWidth={6} />
              <div>
                <p className="text-[32px] font-black text-white leading-none">{value}</p>
                <p className="text-[11px] font-semibold mt-1.5" style={{ color: changeColor }}>
                  {change}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <div className="flex items-end gap-2">
                <p className="text-[40px] font-black leading-none" style={{ color: valueColor }}>
                  {value}
                </p>
              </div>
              <p className="text-[11px] font-semibold mt-1" style={{ color: changeColor }}>{change}</p>
              <p className="text-[11px] text-secondary-text mt-0.5">{sub}</p>
              <div className="mt-3 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress}%`, background: progressColor }}
                />
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}