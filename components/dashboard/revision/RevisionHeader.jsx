"use client"
import { useState } from "react"
import Link from "next/link"
import {
  RiArrowRightSLine, RiArrowDownSLine,
  RiFlashlightLine, RiBookOpenLine,
} from "react-icons/ri"

const courses = ["DBMS — Semester 4", "Operating Systems", "Data Structures"]

export default function RevisionHeader() {
  const [view,       setView]       = useState("Agenda")
  const [course,     setCourse]     = useState(courses[0])
  const [courseOpen, setCourseOpen] = useState(false)

  const revisionItems = [
  { name: "Normalization",    due: "Today",     dot: "#F87171" },
  { name: "B-Trees",          due: "Tomorrow",  dot: "#FBBF24" },
  { name: "Transaction Logs", due: "In 2 days", dot: "#FA6E43" },
  { name: "Join Algorithms",  due: "In 3 days", dot: "#4ADE80" },
]


  return (
    <div className="flex items-start justify-between pb-5 flex-wrap gap-4">
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
            className="flex items-center gap-2 h-9 px-3 bg-[--color-card-dark] text-[12px] text-white rounded-xl hover:bg-white/[0.04] transition-all"
          >
            <RiBookOpenLine className="text-[--color-brand] text-[13px]" />
            {course}
            <RiArrowDownSLine className="text-[--color-dark-gray] text-[13px]" />
          </button>
          {courseOpen && (
            <div className="absolute top-10 left-0 w-52 bg-[--color-card-mid] rounded-xl shadow-2xl z-20 overflow-hidden">
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
      </div>
    </div>
  )
}