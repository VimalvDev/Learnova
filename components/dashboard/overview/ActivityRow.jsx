import Link from "next/link"
import {
  RiArrowRightSLine,
  RiPlayCircleFill,
  RiTimerLine,
  RiFileList3Line,
  RiChat3Line,
  RiMagicLine,
} from "react-icons/ri"

const activities = [
  { dot: "#4ADE80", title: "Completed Quiz — DBMS Unit 3",      sub: "Score: 71% · +12% improvement",     time: "2h ago"    },
  { dot: "#FA6E43", title: "AI Chat — Functional Dependency",   sub: "Asked 3 questions · Avg conf: 87%", time: "4h ago"    },
  { dot: "#888",    title: "Uploaded OS_Lecture_Notes.pdf",     sub: "42 pages · 380 concepts extracted",  time: "Yesterday" },
  { dot: "#FBBF24", title: "Revision Session — SQL Joins",      sub: "8 concepts reviewed · All mastered", time: "Yesterday" },
]

const quickActions = [
  { icon: RiMagicLine,     label: "AI Optimize", href: "/dashboard/chat",    color: "#FA6E43" },
  { icon: RiTimerLine,     label: "Focus Timer",  href: "/dashboard",         color: "#FBBF24" },
  { icon: RiFileList3Line, label: "Flashcard-darks",   href: "/dashboard/quizzes", color: "#4ADE80" },
  { icon: RiChat3Line,     label: "AI Chat",      href: "/dashboard/chat",    color: "#FA6E43" },
]

export default function ActivityRow() {
  return (
    <div className="grid grid-cols-12 gap-4">

      {/* Activity */}
      <div className="col-span-8 bg-[#171717] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-medium text-white/70">Recent Activity</p>
          <button className="text-[11px] text-brand hover:underline flex items-center gap-0.5">
            View All <RiArrowRightSLine className="text-[13px]" />
          </button>
        </div>
        <div className="flex flex-col">
          {activities.map(({ dot, title, sub, time }) => (
            <div
              key={title}
              className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: dot }} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white">{title}</p>
                <p className="text-[11px] text-secondary-text mt-0.5">{sub}</p>
              </div>
              <span className="text-[11px] text-[#444] flex-shrink-0 mt-0.5">{time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-span-4 bg-[#171717] rounded-2xl p-5">
        <p className="text-[14px] font-medium text-white/70 mb-4">Quick Actions</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickActions.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-2 p-4 bg-[#111] rounded-2xl hover:bg-[#151515] transition-all"
            >
              <Icon className="text-[20px]" style={{ color }} />
              <span className="text-[11px] text-[#888] font-medium">{label}</span>
            </Link>
          ))}
        </div>

        {/* Continue card-dark */}
        <Link
          href="/dashboard/quizzes"
          className="flex items-center gap-3 p-3.5 bg-[#111] rounded-2xl hover:bg-[#151515] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-brand/15 flex items-center justify-center flex-shrink-0">
            <RiPlayCircleFill className="text-brand text-[16px]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-white">Continue: DBMS Unit 3</p>
            <p className="text-[10px] text-secondary-text">Question 7 of 18 · 2h ago</p>
          </div>
          <span className="text-[11px] text-brand opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            Resume →
          </span>
        </Link>
      </div>

    </div>
  )
}
