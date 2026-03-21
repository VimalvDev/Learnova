import Link from "next/link"
import { RiArrowRightSLine, RiSaveLine, RiSendPlaneLine } from "react-icons/ri"

export default function PageHeader({ published, onPublish }) {
  return (
    <div className="flex items-start justify-between pb-6 mb-6 border-b border-white/[0.06]">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Link href="/dashboard" className="text-[12px] text-[#555] hover:text-[#FA6E43] transition-colors">
            My Courses
          </Link>
          <RiArrowRightSLine className="text-[#333] text-[13px]" />
          <span className="text-[12px] text-[#888]">New Course</span>
        </div>
        <h1 className="text-[24px] font-bold text-white leading-tight">Create New Course</h1>
        <p className="text-[13px] text-[#666] mt-1">
          Structure your study material into an intelligent learning engine.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-1">
        {/* Status pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] rounded-lg">
          <div className={`w-1.5 h-1.5 rounded-full ${published ? "bg-[#4ADE80]" : "bg-[#FBBF24]"}`} />
          <span className="text-[11px] text-[#888]">{published ? "Published" : "Draft"}</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#171717] text-white text-[12px] font-medium rounded-xl hover:bg-[#1c1c1c] transition-all">
          <RiSaveLine className="text-[14px]" />
          Save Draft
        </button>
        <button
          onClick={onPublish}
          className="flex items-center gap-2 px-4 py-2 bg-[#FA6E43] text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          <RiSendPlaneLine className="text-[14px]" />
          Publish Course
        </button>
      </div>
    </div>
  )
}