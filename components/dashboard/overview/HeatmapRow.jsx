"use client"
import Link from "next/link"
import FullHeatmap from "@/components/charts/full/FullHeatmap"

export default function HeatmapRow({ heatmapData = [], revisionItems = [] }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Link
        href="/dashboard/analytics"
        className="col-span-6 bg-[#171717] rounded-2xl p-5 flex flex-col hover:bg-[#1c1c1c] transition-all group"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[14px] font-medium text-white/70">Performance Heatmap</p>
            <p className="text-[11px] text-[#666] mt-0.5">Topic mastery over 6 weeks</p>
          </div>
          <span className="text-[11px] text-brand opacity-0 group-hover:opacity-100 transition-opacity">
            View Details →
          </span>
        </div>
        <div className="flex-1 min-h-[200px]">
          <FullHeatmap data={heatmapData} />
        </div>
        <div className="flex items-center justify-between mt-3 pt-2">
          <span className="text-[10px] text-[#444]">Less Intense</span>
          <div className="flex items-center gap-1">
            {["rgba(250,110,67,0.1)","rgba(250,110,67,0.3)","rgba(250,110,67,0.6)","#FA6E43"].map((c, i) => (
              <div key={i} className="w-5 h-3 rounded-sm" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[10px] text-[#444]">Most Intense</span>
        </div>
      </Link>

      <div className="col-span-6 bg-[#171717] rounded-2xl p-5 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] font-medium text-white/70">Revision Planner</p>
          <Link href="/dashboard/revision" className="text-[11px] text-brand hover:underline">
            View All →
          </Link>
        </div>

        {revisionItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <p className="text-[13px] text-secondary-text">No revisions scheduled.</p>
            <Link href="/dashboard/quizzes" className="text-[12px] text-brand hover:underline mt-2">
              Take a quiz to schedule revisions →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-1">
            {revisionItems.map(({ name, due, dot }) => (
              <Link
                key={name}
                href="/dashboard/revision"
                className="flex items-center gap-3 p-3 bg-[#111] rounded-xl hover:bg-[#151515] transition-all group"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-white truncate">{name}</p>
                  <p className="text-[10px] text-secondary-text mt-0.5">{due}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="#555" className="w-3.5 h-3.5 group-hover:stroke-brand transition-colors" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/dashboard/revision"
          className="w-full h-9 mt-3 bg-[#111] text-[#666] text-[11px] font-medium rounded-xl flex items-center justify-center hover:text-white transition-all"
        >
          + Schedule Reminder
        </Link>
      </div>
    </div>
  )
}