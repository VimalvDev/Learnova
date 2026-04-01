"use client"
import { useState } from "react"
import Link from "next/link"
import {
  RiArrowRightSLine, RiArrowDownSLine,
  RiFlashlightLine, RiBookOpenLine,
} from "react-icons/ri"

const views   = ["Agenda", "Calendar", "Timeline"]
const courses = ["DBMS — Semester 4", "Operating Systems", "Data Structures"]

export default function RevisionHeader() {
  const [view,       setView]       = useState("Agenda")
  const [course,     setCourse]     = useState(courses[0])
  const [courseOpen, setCourseOpen] = useState(false)

  return (
    <div className="flex items-start justify-between pb-5 border-b border-white/[0.06] flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Link href="/dashboard" className="text-[12px] text-[--color-tertiary-text] hover:text-[--color-brand] transition-colors">
            Dashboard
          </Link>
          <RiArrowRightSLine className="text-[--color-dark-gray] text-[13px]" />
          <span className="text-[12px] text-[--color-secondary-text]">Revision Planner</span>
        </div>
        <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
          Revision Planner
        </h1>
        <p className="text-[clamp(12px,1.3vw,14px)] text-[--color-tertiary-text] mt-1 max-w-xl">
          Intelligent scheduling based on mastery scores, retention decay, and spaced repetition intervals.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">

        {/* Course selector */}
        <div className="relative">
          <button
            onClick={() => setCourseOpen(!courseOpen)}
            className="flex items-center gap-2 h-9 px-3 bg-[--color-card-dark] text-[12px] text-white rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all"
          >
            <RiBookOpenLine className="text-[--color-brand] text-[13px]" />
            {course}
            <RiArrowDownSLine className="text-[--color-dark-gray] text-[13px]" />
          </button>
          {courseOpen && (
            <div className="absolute top-10 left-0 w-52 bg-[--color-card-mid] rounded-xl border border-white/[0.06] shadow-2xl z-20 overflow-hidden">
              {courses.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCourse(c); setCourseOpen(false) }}
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

        {/* View toggle */}
        <div className="flex items-center gap-0.5 p-1 bg-[--color-card-dark] rounded-xl border border-white/[0.06]">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                view === v
                  ? "bg-[--color-brand] text-white"
                  : "text-[--color-tertiary-text] hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Auto-schedule */}
        <button className="flex items-center gap-2 h-9 px-3.5 bg-[--color-card-dark] text-[--color-brand] text-[12px] font-semibold rounded-xl border border-[--color-brand]/25 hover:border-[--color-brand]/60 transition-all">
          <RiFlashlightLine className="text-[14px]" /> Auto-Schedule Remaining
        </button>

      </div>
    </div>
  )
}