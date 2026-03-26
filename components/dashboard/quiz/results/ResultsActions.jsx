import Link from "next/link"
import { RiRefreshLine } from "react-icons/ri"

const revisions = [
  { concept: "Normalization",       when: "Tomorrow, 3:00 PM", color: "bg-[#F87171]" },
  { concept: "Func. Dependency",    when: "In 2 days",         color: "bg-[#FBBF24]" },
  { concept: "SQL Joins",           when: "In 7 days",         color: "bg-[#4ADE80]" },
]

export default function ResultsActions({ onRestart }) {
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-4">

      {/* Revision schedule */}
      <div className="bg-card rounded-2xl p-5 border border-white/4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-brand text-[12px]">◈</span>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">
            Revision Scheduled
          </p>
        </div>
        <div className="h-px bg-white/4 mb-3" />
        <div className="flex flex-col gap-3">
          {revisions.map((r) => (
            <div key={r.concept} className="flex items-center justify-between">
              <span className="text-[12px] text-white">{r.concept}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-secondary-text">{r.when}</span>
                <div className={`w-2 h-2 rounded-full shrink-0 ${r.color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-card rounded-2xl p-5 border border-white/4 flex flex-col gap-2.5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Next Steps</p>
        <button className="w-full py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all">
          Review All Mistakes
        </button>
        <Link
          href="/dashboard/revision"
          className="w-full py-2.5 bg-[#141414] text-white text-[12px] font-medium rounded-xl border border-white/6 hover:border-white/10 transition-all text-center"
        >
          Start Revision Session
        </Link>
        <button
          onClick={onRestart}
          className="w-full py-2.5 bg-[#141414] text-white text-[12px] font-medium rounded-xl border border-white/6 hover:border-white/10 transition-all flex items-center justify-center gap-2"
        >
          <RiRefreshLine className="text-[12px]" /> Generate Follow-up Quiz
        </button>
        <Link
          href="/dashboard"
          className="w-full py-2 text-secondary-text hover:text-white text-[11px] transition-colors text-center"
        >
          Return to Dashboard
        </Link>
      </div>

    </div>
  )
}