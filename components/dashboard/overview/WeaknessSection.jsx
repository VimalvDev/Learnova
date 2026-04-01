import Link from "next/link"
import {
  RiArrowRightSLine,
  RiAlertFill,
  RiArrowDownLine,
  RiEqualLine,
  RiPlayCircleFill,
  RiSparklingLine,
} from "react-icons/ri"

const weaknesses = [
  {
    name: "Database Normalization",
    sub:  "DBMS · Confidence: 42%",
    mastery: 42, status: "CRITICAL",
    statusColor: "#F87171",
    icon: RiAlertFill,
  },
  {
    name: "Functional Dependency",
    sub:  "DBMS · Confidence: 61%",
    mastery: 61, status: "MODERATE",
    statusColor: "#FBBF24",
    icon: RiArrowDownLine,
  },
  {
    name: "Transaction Management",
    sub:  "DBMS · Confidence: 71%",
    mastery: 71, status: "STABLE",
    statusColor: "#4ADE80",
    icon: RiEqualLine,
  },
]

export default function WeaknessSection() {
  return (
    <div className="grid grid-cols-12 gap-4">

      {/* Weakness list */}
      <div className="col-span-8 bg-card-dark rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand">
                  AI Detection · Scanning Complete
                </span>
              </div>
            </div>
            <p className="text-[14px] font-medium text-white/70">Weakness Detection Engine</p>
          </div>
          <Link href="/dashboard/analytics" className="text-[11px] text-brand hover:underline flex items-center gap-1">
            View Full Report <RiArrowRightSLine className="text-[13px]" />
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          {weaknesses.map(({ name, sub, mastery, status, statusColor, icon: Icon }) => (
            <Link
              key={name}
              href="/dashboard/quizzes"
              className="flex items-center gap-4 p-4 bg-[#111] rounded-2xl hover:bg-[#151515] transition-all group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${statusColor}15`, color: statusColor }}
              >
                <Icon className="text-[16px]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white">{name}</p>
                <p className="text-[11px] text-secondary-text mt-0.5">{sub}</p>
              </div>
              <div className="w-[130px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-secondary-text">Mastery</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: statusColor }}>
                    {status}
                  </span>
                </div>
                <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${mastery}%`, background: statusColor }} />
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <RiPlayCircleFill className="text-brand text-[18px]" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div className="col-span-4 bg-[#171717] rounded-2xl p-5 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <RiSparklingLine className="text-brand text-[16px] flex-shrink-0" />
            <p className="text-[14px] font-medium text-white/90">AI Learning Insight</p>
          </div>
          <p className="text-[12px] text-[#888] leading-relaxed">
            Your performance in{" "}
            <span className="text-white font-semibold">Database Normalization</span>{" "}
            drops significantly with complex word problems. Focus on{" "}
            <span className="text-white font-semibold">Concept Visualization</span>{" "}
            before tackling the next 3 modules.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-brand/80 mb-3">
            Recommended Path
          </p>
          <div className="flex items-center gap-2">
            {[{ num: "1", active: true }, { num: "2", active: false }, { num: "3", active: false }].map(({ num, active }) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold ${
                  active ? "bg-brand text-white" : "bg-[#111] text-secondary-text"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {[
            { label: "Impact Score",  value: "High",         color: "#F87171" },
            { label: "Mastery Gap",   value: "42%",          color: "#F87171" },
            { label: "Est. Fix Time", value: "2-3 sessions", color: "#FBBF24" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0"
            >
              <span className="text-[12px] text-secondary-text">{label}</span>
              <span className="text-[12px] font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard/quizzes"
          className="w-full h-10 bg-brand text-white text-[12px] font-bold rounded-xl flex items-center justify-center gap-1.5 hover:brightness-110 transition-all"
        >
          Start Targeted Revision
          <RiArrowRightSLine className="text-[15px]" />
        </Link>
      </div>

    </div>
  )
}