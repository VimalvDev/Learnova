import SparklineChart from "../charts/SparklineChart"

const cards = [
  {
    label:  "Total Users",
    value:  "2,847",
    delta:  "↑ +124 this week",
    sub:    "+4.6% growth rate",
    spark:  [120, 140, 135, 155, 148, 168, 175],
    bar:    62,
  },
  {
    label:  "Active Users (7D)",
    value:  "1,203",
    delta:  "↑ +8% vs previous 7 days",
    sub:    "42.3% of total user base",
    bar:    42,
    barLabel: "Active ratio",
  },
  {
    label:  "Courses Created",
    value:  "8,341",
    delta:  "↑ +312 this week",
    sub:    "Avg 2.9 courses per user",
    spark:  [280, 310, 295, 330, 340, 380, 390],
  },
  {
    label:  "Quizzes Generated",
    value:  "41,829",
    delta:  "↑ +1,240 this week",
    sub:    "Avg 14.7 per active user",
    spark:  [1200, 1350, 1280, 1500, 1420, 1600, 1700],
  },
]

export default function MetricCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, delta, sub, spark, bar, barLabel }) => (
        <div key={label} className="bg-card rounded-2xl p-5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">{label}</p>
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-[clamp(24px,3vw,36px)] font-black text-white leading-none">{value}</p>
            {spark && <SparklineChart data={spark} />}
          </div>
          <p className="text-[11px] text-[#4ADE80] font-medium mb-0.5">{delta}</p>
          <p className="text-[10px] text-tertiary-text">{sub}</p>
          {bar !== undefined && (
            <div className="mt-3">
              {barLabel && <p className="text-[9px] text-tertiary-text mb-1">{barLabel}</p>}
              <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-(--color-brand) rounded-full" style={{ width: `${bar}%` }} />
              </div>
              <p className="text-[10px] text-brand mt-1 font-medium">{bar}%</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}