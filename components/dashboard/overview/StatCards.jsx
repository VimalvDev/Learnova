import Link from "next/link"
import FullMasteryRing from "@/components/charts/full/FullMasteryRing"

const cards = [
  {
    label:       "Overall Mastery",
    href:        "/dashboard/analytics",
    type:        "ring",
    ringValue:   84,
    value:       "84%",
    change:      "↑ 3% this week",
    changeColor: "#4ADE80",
  },
  {
    label:        "Concepts Mastered",
    href:         "/dashboard/analytics",
    value:        "32",
    valueColor:   "#fff",
    change:       "+5",
    changeColor:  "#4ADE80",
    sub:          "of 58 total concepts",
    progress:     55,
    progressColor:"#FA6E43",
  },
  {
    label:        "Needs Revision",
    href:         "/dashboard/revision",
    value:        "6",
    valueColor:   "#FBBF24",
    change:       "+2",
    changeColor:  "#FBBF24",
    sub:          "concepts flagged",
    progress:     10,
    progressColor:"#FBBF24",
  },
  {
    label:        "Critical Weakness",
    href:         "/dashboard/analytics",
    value:        "2",
    valueColor:   "#F87171",
    change:       "-1",
    changeColor:  "#4ADE80",
    sub:          "concepts below 40%",
    progress:     3,
    progressColor:"#F87171",
  },
]

export default function StatCards() {
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
                <p className="text-[13px] font-bold mb-1.5" style={{ color: changeColor }}>
                  {change}
                </p>
              </div>
              <p className="text-[11px] text-secondary-text mt-1">{sub}</p>
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