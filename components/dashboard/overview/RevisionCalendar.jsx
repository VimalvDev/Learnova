"use client"
import Link from "next/link"
import FullCalendar from "@/components/charts/full/FullCalendar"
import { RiCalendarTodoLine, RiArrowRightSLine, RiFireLine } from "react-icons/ri"

const totalSessions = 34
const currentStreak = 5
const longestStreak = 14
const activeDays    = 34

export default function RevisionCalendar() {
  return (
    <div className="bg-[#171717] rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FA6E43]/10 flex items-center justify-center flex-shrink-0">
            <RiCalendarTodoLine className="text-[#FA6E43] text-[16px]" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-white/90">Revision Activity</p>
            <p className="text-[11px] text-[#555] mt-0.5">
              Your study sessions over the last 6 months
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Streak pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FA6E43]/10 rounded-lg">
            <RiFireLine className="text-[#FA6E43] text-[13px]" />
            <span className="text-[11px] font-bold text-[#FA6E43]">
              {currentStreak} day streak
            </span>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#555]">
            <span className="text-white font-semibold">{totalSessions}</span> sessions ·
            <span className="text-white font-semibold">{activeDays}</span> active days ·
            <span className="text-white font-semibold">{longestStreak}</span> longest streak
          </div>

          <Link
            href="/dashboard/revision"
            className="flex items-center gap-1 text-[11px] text-[#FA6E43] hover:underline"
          >
            View Planner <RiArrowRightSLine className="text-[13px]" />
          </Link>
        </div>
      </div>

      {/* Calendar — full width, no side gaps */}
      <div className="w-full h-[15vw] md:h-[160px]">
  <FullCalendar />
</div>



      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-3">
        <span className="text-[10px] text-[#444]">Less</span>
        {[
          "rgba(250,110,67,0.2)",
          "rgba(250,110,67,0.45)",
          "rgba(250,110,67,0.7)",
          "#FA6E43",
        ].map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[10px] text-[#444]">More</span>
      </div>

    </div>
  )
}