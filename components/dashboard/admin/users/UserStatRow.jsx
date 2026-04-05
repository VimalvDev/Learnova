const stats = [
  {
    label: "Total Users",
    value: "2,847",
    delta: "↑ +124/wk",
    deltaColor: "text-[#4ADE80]",
    sub: "All registered accounts",
  },
  {
    label: "Active (7 Days)",
    value: "1,203",
    delta: "42.3% of base",
    deltaColor: "text-(--color-brand)",
    sub: "Logged in last 7 days",
  },
  {
    label: "Pro / Paying",
    value: "847",
    delta: "29.7% conversion",
    deltaColor: "text-(--color-brand)",
    sub: "Active paid subscriptions",
  },
  {
    label: "Churned (30 Days)",
    value: "124",
    delta: "↓ −12/wk improving",
    deltaColor: "text-[#FBBF24]",
    sub: "Inactive 30+ days",
  },
]

export default function UserStatRow() {
  return (
    <div className="bg-card-dark rounded-2xl border-white/4 overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/5">
        {stats.map(({ label, value, delta, deltaColor, sub }) => (
          <div key={label} className="px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-2">
              {label}
            </p>
            <p className="text-[clamp(22px,2.8vw,32px)] font-black text-white leading-none mb-1">
              {value}
            </p>
            <p className={`text-[11px] font-medium mb-0.5 ${deltaColor}`}>{delta}</p>
            <p className="text-[10px] text-(--color-tertiary-text)">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}