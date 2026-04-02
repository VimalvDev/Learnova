import UsageLineChart from "../charts/UsageLineChart"

const metrics = [
  { label: "API Calls",       value: "124,841", delta: "↑ +12% today",     dColor: "text-[#4ADE80]" },
  { label: "Embedding Req.",  value: "38,204",  delta: "↑ +8%",            dColor: "text-[#4ADE80]" },
  { label: "Avg Response",    value: "1.24s",   delta: "↓ −0.3s faster",   dColor: "text-[#4ADE80]" },
  { label: "RAG Queries",     value: "89,302",  delta: "↑ +9%",            dColor: "text-[#4ADE80]" },
]

const costs = [
  { label: "LLM API (OpenAI)",      value: "$184.20", pct: 64.8, color: "bg-(--color-brand)"  },
  { label: "Vector DB (Supabase)",  value: "$62.40",  pct: 21.9, color: "bg-[#4ADE80]"        },
  { label: "OCR Processing",        value: "$24.80",  pct: 8.7,  color: "bg-[#FBBF24]"        },
  { label: "Storage & CDN",         value: "$13.00",  pct: 4.6,  color: "bg-(--color-dark-gray)" },
]

export default function AIUsageMonitor() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">

      {/* Left — usage chart */}
      <div className="bg-card rounded-2xl p-6">
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">AI Usage Monitor</p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">API & Processing Activity</h2>
          </div>
          <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
            {["Today","7 Days","30 Days"].map((t,i) => (
              <button key={t} className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all ${
                i === 1 ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
              }`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Metric row */}
        <div className="grid grid-cols-4 divide-x divide-white/[0.04] mb-5">
          {metrics.map(({ label, value, delta, dColor }) => (
            <div key={label} className="px-4 first:pl-0 last:pr-0">
              <p className="text-[9px] uppercase tracking-widest text-dark-gray mb-1">{label}</p>
              <p className="text-[clamp(16px,1.8vw,20px)] font-black text-white leading-none mb-0.5">{value}</p>
              <p className={`text-[10px] font-medium ${dColor}`}>{delta}</p>
            </div>
          ))}
        </div>

        <UsageLineChart />

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3">
          {[
            { color: "bg-(--color-brand)", label: "API Calls"  },
            { color: "bg-[#4ADE80]",       label: "Embeddings" },
            { color: "bg-[#FBBF24]",       label: "RAG Queries"},
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`h-[2px] w-5 rounded-full ${color}`} />
              <span className="text-[10px] text-secondary-text">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — cost */}
      <div className="bg-card rounded-2xl p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Estimated Cost</p>
        <h3 className="text-[14px] font-semibold text-white mb-1">Monthly Projection</h3>
        <p className="text-[clamp(22px,2.8vw,30px)] font-black text-white leading-none mb-1">$284.40</p>
        <p className="text-[11px] text-secondary-text mb-1">estimated this month</p>
        <p className="text-[12px] text-[#FBBF24] font-medium mb-4">↑ +$42.30 vs February</p>

        <div className="flex flex-col divide-y divide-white/[0.04] mb-4">
          {costs.map(({ label, value, pct }) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <span className="text-[11px] text-secondary-text">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-white">{value}</span>
                <span className="text-[10px] text-tertiary-text w-8 text-right">{pct}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stacked bar */}
        <div className="h-2 rounded-full overflow-hidden flex mb-4">
          {costs.map(({ color, pct, label }) => (
            <div key={label} className={`h-full ${color}`} style={{ width: `${pct}%` }} />
          ))}
        </div>

        <div className="flex items-start gap-2 bg-card-dark rounded-xl px-3 py-2.5">
          <span className="text-brand text-[11px] flex-shrink-0 mt-0.5">◈</span>
          <p className="text-[10px] text-tertiary-text leading-relaxed">
            At current rate: <span className="text-white font-medium">$341</span> projected by month end.
            Budget threshold: $400/month — <span className="text-[#FBBF24] font-medium">85% utilized.</span>
          </p>
        </div>
      </div>
    </div>
  )
}