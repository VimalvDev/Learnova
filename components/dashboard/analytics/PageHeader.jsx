"use client"
import { useState } from "react"
import Link from "next/link"
import {
  RiArrowRightSLine, RiDownloadLine,
  RiTimeLine, RiArrowDownSLine,
} from "react-icons/ri"

const ranges = ["7 Days", "30 Days", "All Time"]

export default function PageHeader() {
  const [range,  setRange]  = useState("30 Days")
  const [course, setCourse] = useState("DBMS — Semester 4")
  const [open,   setOpen]   = useState(false)

  return (
    <div className="flex items-start justify-between pb-6 border-b border-white/[0.06] flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Link href="/dashboard" className="text-[12px] text-[--color-tertiary-text] hover:text-[--color-brand] transition-colors">
            Dashboard
          </Link>
          <RiArrowRightSLine className="text-[--color-dark-gray] text-[13px]" />
          <span className="text-[12px] text-[--color-secondary-text]">Mastery Analytics</span>
        </div>
        <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
          Mastery Analytics
        </h1>
        <p className="text-[clamp(12px,1.3vw,14px)] text-[--color-tertiary-text] mt-1">
          Concept-level performance intelligence across your entire course history.
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 flex-wrap">

          {/* Course selector */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 h-9 px-3 bg-[--color-card-dark] text-[13px] text-white rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all"
            >
              <span className="text-[--color-brand] text-[12px]">📂</span>
              {course}
              <RiArrowDownSLine className="text-[--color-dark-gray] text-[13px]" />
            </button>
            {open && (
              <div className="absolute top-10 left-0 w-52 bg-[--color-card-mid] rounded-xl border border-white/[0.06] shadow-2xl z-20 overflow-hidden">
                {["DBMS — Semester 4", "Operating Systems", "Data Structures"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCourse(c); setOpen(false) }}
                    className={`w-full text-left px-3.5 py-2.5 text-[12px] hover:bg-white/[0.04] transition-colors ${
                      course === c ? "text-[--color-brand]" : "text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time range */}
          <div className="flex items-center gap-0.5 p-1 bg-[--color-card-dark] rounded-xl border border-white/[0.06]">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                  range === r
                    ? "bg-[--color-brand] text-white"
                    : "text-[--color-tertiary-text] hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Export */}
          <button className="flex items-center gap-1.5 h-9 px-3.5 bg-[--color-card-dark] text-[--color-secondary-text] text-[12px] rounded-xl border border-white/[0.06] hover:text-white hover:border-white/[0.1] transition-all">
            <RiDownloadLine className="text-[14px]" /> Export Report
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[--color-tertiary-text]">
          <RiTimeLine className="text-[12px]" />
          Last updated: Today at 3:42 PM · Auto-refreshes after each quiz
        </div>
      </div>
    </div>
  )
}