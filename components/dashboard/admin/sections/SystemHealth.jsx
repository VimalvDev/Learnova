import LatencyChart from "../charts/LatencyChart"

const services = [
  { name: "PostgreSQL Database",   status: "operational", meta: "Query latency: 4ms avg"      },
  { name: "Vector DB (Supabase)",  status: "operational", meta: "Index sync: 8,420 chunks"    },
  { name: "LLM API (OpenAI)",      status: "operational", meta: "Avg response: 1.24s"         },
  { name: "OCR Pipeline",          status: "operational", meta: "Queue: 0 pending"            },
  { name: "File Storage (S3)",     status: "operational", meta: "3.2 TB used of 10 TB"        },
  { name: "Email Service (Resend)", status: "degraded",   meta: "Delivery delay: ~2min"       },
]

const dot = {
  operational: "bg-[#4ADE80]/80",
  degraded:    "bg-[#FBBF24]",
  down:        "bg-[var(--color-red)]",
}
const label = {
  operational: "text-[#4ADE80]",
  degraded:    "text-[#FBBF24]",
  down:        "text-[var(--color-red)]",
}
const text = { operational: "Operational", degraded: "Degraded", down: "Down" }

const alerts = [
  {
    type: "warning", icon: "⚠", title: "Email delivery delay",
    desc: "Resend API response slow", since: "Since: 2:14 PM · 88 min ago",
    bg: "bg-[#FBBF24]/[0.05]", border: "border-[#FBBF24]/20",
  },
  {
    type: "info", icon: "ⓘ", title: "High quiz generation volume",
    desc: "3× above daily average", since: "Since: 1:00 PM · 2h 42m ago",
    bg: "bg-(--color-brand)/[0.05]", border: "border-(--color-brand)/20",
  },
]

export default function SystemHealth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr_3fr] gap-5">

      {/* Service status */}
      <div className="bg-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-0.5">System Health</p>
            <h3 className="text-[14px] font-semibold text-white">Service Status</h3>
          </div>
          <span className="text-[10px] text-tertiary-text">Refreshed 42s ago</span>
        </div>
        <div className="flex flex-col gap-2">
          {services.map((s) => (
            <div
              key={s.name}
              className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl ${
                s.status === "degraded"
                  ? "bg-[#FBBF24]/[0.03] border border-[#FBBF24]/20"
                  : "bg-card-dark"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${dot[s.status]}`} />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-white truncate">{s.name}</p>
                  <p className="text-[10px] text-tertiary-text">{s.meta}</p>
                </div>
              </div>
              <span className={`text-[11px] font-medium flex-shrink-0 ${label[s.status]}`}>
                {text[s.status]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-card-dark text-center">
          <p className="text-[11px] text-tertiary-text">
            5 of 6 services operational · <span className="text-[#FBBF24]">1 degraded</span>
          </p>
        </div>
      </div>

      {/* Latency chart */}
      <div className="bg-card rounded-2xl p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Latency Monitor</p>
        <h3 className="text-[14px] font-semibold text-white mb-4">API Response Time</h3>
        <LatencyChart />
      </div>

      {/* Alerts */}
      <div className="bg-card rounded-2xl p-5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Active Alerts</p>
        <h3 className="text-[14px] font-semibold text-white mb-4">System Alerts</h3>
        <div className="flex flex-col gap-2.5">
          {alerts.map((a) => (
            <div key={a.title} className={`p-3.5 rounded-xl border ${a.bg} ${a.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={a.type === "warning" ? "text-[#FBBF24]" : "text-brand"}>{a.icon}</span>
                <span className="text-[12px] font-semibold text-white">{a.title}</span>
              </div>
              <p className="text-[11px] text-secondary-text mb-1">{a.desc}</p>
              <p className="text-[10px] text-tertiary-text mb-2">{a.since}</p>
              <button className="text-[11px] text-brand hover:underline">
                {a.type === "warning" ? "Investigate" : "Dismiss"}
              </button>
            </div>
          ))}
          <p className="text-[11px] text-[#4ADE80] text-center mt-1">✓ No critical alerts</p>
          <button className="text-[11px] text-tertiary-text hover:text-white transition-colors text-center">
            3 resolved alerts today ▶
          </button>
        </div>
      </div>
    </div>
  )
}