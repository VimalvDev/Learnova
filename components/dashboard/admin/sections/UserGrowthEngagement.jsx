import GrowthBarChart from "../charts/GrowthBarChart"
import DonutChart     from "../charts/DonutChart"

export default function UserGrowthEngagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">

      {/* Growth chart */}
      <div className="bg-card rounded-2xl p-6">
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">User Growth</p>
            <h2 className="text-[clamp(14px,1.7vw,16px)] font-semibold text-white">New Registrations Over Time</h2>
          </div>
          <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
            {["Weekly","Monthly"].map((t,i) => (
              <button key={t} className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all ${
                i === 0 ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
              }`}>{t}</button>
            ))}
          </div>
        </div>

        <GrowthBarChart />

        <div className="mt-4 flex items-start gap-2 bg-card-dark rounded-xl px-3 py-2.5">
          <span className="text-brand text-[11px] flex-shrink-0">◈</span>
          <p className="text-[11px] text-tertiary-text">
            Growth rate increased 34% in the week following the adaptive quiz engine release (Feb 10).
          </p>
        </div>
      </div>

      {/* Engagement donut */}
      <div className="bg-card rounded-2xl p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Engagement</p>
        <h3 className="text-[14px] font-semibold text-white mb-4">User Distribution</h3>
        <DonutChart />
        <div className="mt-4 pt-4 border-t border-card-dark flex flex-col gap-1.5">
          {[
            { label: "7-day retention",  value: "68%", delta: "↑ +4%" },
            { label: "30-day retention", value: "41%", delta: "↑ +2%" },
          ].map(({ label, value, delta }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[11px] text-tertiary-text">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-white">{value}</span>
                <span className="text-[10px] text-[#4ADE80]">{delta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}