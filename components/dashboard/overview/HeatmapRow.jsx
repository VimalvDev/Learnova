"use client"
import Link from "next/link"
import { RiArrowRightSLine } from "react-icons/ri"
import FullHeatmap from "@/components/charts/full/FullHeatmap"
import FullRadar from "@/components/charts/full/FullRadar"

const revisionItems = [
  { name: "Normalization",    due: "Today",     dot: "#F87171" },
  { name: "B-Trees",          due: "Tomorrow",  dot: "#FBBF24" },
  { name: "Transaction Logs", due: "In 2 days", dot: "#FA6E43" },
  { name: "Join Algorithms",  due: "In 3 days", dot: "#4ADE80" },
]

export default function HeatmapRow() {
  return (
    <div className="grid grid-cols-12 gap-4">

      {/* Heatmap */}
      <Link
        href="/dashboard/analytics"
        className="col-span-5 bg-[#171717] rounded-2xl p-5 flex flex-col hover:bg-[#1c1c1c] transition-all group"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[15px] font-semibold text-white/90">Performance Heatmap</p>
            <p className="text-[11px] text-[#666] mt-0.5">Topic mastery over 6 weeks</p>
          </div>
          <div className="text-[11px] text-[#FA6E43] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View Details
            <RiArrowRightSLine className="text-[13px]" />
          </div>
        </div>
        <div className="flex-1 min-h-[200px]">
          <FullHeatmap />
        </div>
        <div className="flex items-center justify-between mt-3 pt-2">
          <span className="text-[10px] text-[#444]">Less Intense</span>
          <div className="flex items-center gap-1">
            {[
              "rgba(250,110,67,0.1)",
              "rgba(250,110,67,0.3)",
              "rgba(250,110,67,0.6)",
              "#FA6E43",
            ].map((c, i) => (
              <div key={i} className="w-5 h-3 rounded-sm" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[10px] text-[#444]">Most Intense</span>
        </div>
      </Link>

      {/* Revision Planner */}
      <div className="col-span-3 bg-[#171717] rounded-2xl p-5 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[15px] font-semibold text-white/90">Revision Planner</p>
          <Link href="/dashboard/revision" className="text-[11px] text-[#FA6E43] hover:underline flex items-center gap-1">
            View All
            <RiArrowRightSLine className="text-[13px]" />
          </Link>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {revisionItems.map(({ name, due, dot }) => (
            <Link
              key={name}
              href="/dashboard/revision"
              className="flex items-center gap-3 p-3 bg-[#111] rounded-xl hover:bg-[#151515] transition-all group"
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-white truncate">{name}</p>
                <p className="text-[10px] text-[#555] mt-0.5">{due}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                className="w-3.5 h-3.5 flex-shrink-0 group-hover:stroke-[#FA6E43] transition-colors"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>

        <Link
          href="/dashboard/revision"
          className="w-full h-9 mt-3 bg-[#111] text-[#666] text-[11px] font-medium rounded-xl flex items-center justify-center hover:text-white transition-all"
        >
          + Schedule Reminder
        </Link>
      </div>

      {/* Radar */}
      <Link
        href="/dashboard/analytics"
        className="col-span-4 bg-[#171717] rounded-2xl p-5 flex flex-col hover:bg-[#1c1c1c] transition-all group"
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[15px] font-semibold text-white/90">Performance</p>
            <p className="text-[11px] text-[#666] mt-0.5">6 dimension overview</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#555]">Overall Score</p>
            <p className="text-[20px] font-black text-[#FA6E43] leading-none mt-0.5">
              73<span className="text-[12px] text-[#555] font-normal">/100</span>
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-[200px]">
          <FullRadar />
        </div>
      </Link>

    </div>
  )
}