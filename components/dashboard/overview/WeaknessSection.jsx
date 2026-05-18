import Link from "next/link"
import FullRadar from "@/components/charts/full/FullRadar"
import { RiArrowRightSLine, RiAlertFill, RiArrowDownLine, RiEqualLine, RiPlayCircleFill } from "react-icons/ri"

export default function WeaknessSection({ weaknesses = [], radarData = [], overallScore = 0 }) {
  return (
    <div className="grid grid-cols-12 gap-4">
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

        {weaknesses.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-[13px] text-secondary-text">No weakness data yet.</p>
            <Link href="/dashboard/quizzes" className="text-[12px] text-brand hover:underline mt-2 block">
              Take a quiz to see results →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {weaknesses.map(({ name, sub, mastery, status, statusColor }) => {
              const Icon = status === "CRITICAL" ? RiAlertFill : status === "MODERATE" ? RiArrowDownLine : RiEqualLine
              return (
                <Link
                  key={name}
                  href="/dashboard/quizzes"
                  className="flex items-center gap-4 p-4 bg-[#111] rounded-2xl hover:bg-[#151515] transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${statusColor}15`, color: statusColor }}>
                    <Icon className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white">{name}</p>
                    <p className="text-[11px] text-secondary-text mt-0.5">{sub}</p>
                  </div>
                  <div className="w-[130px]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] uppercase tracking-widest text-secondary-text">Mastery</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: statusColor }}>{status}</span>
                    </div>
                    <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${mastery}%`, background: statusColor }} />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <RiPlayCircleFill className="text-brand text-[18px]" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <Link
        href="/dashboard/analytics"
        className="col-span-4 bg-[#171717] rounded-2xl p-5 flex flex-col hover:bg-[#1c1c1c] transition-all group"
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[14px] font-medium text-white/70">Performance</p>
            <p className="text-[11px] text-[#666] mt-0.5">6 dimension overview</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-secondary-text">Overall Score</p>
            <p className="text-[20px] font-black text-brand leading-none mt-0.5">
              {overallScore}<span className="text-[12px] text-secondary-text font-normal">/100</span>
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-[200px]">
          <FullRadar data={radarData} />
        </div>
      </Link>
    </div>
  )
}