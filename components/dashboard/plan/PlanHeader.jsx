"use client"
import { useState } from "react"
import Link from "next/link"
import { RiArrowRightSLine, RiArrowDownSLine, RiBookOpenLine } from "react-icons/ri"

const courses = ["DBMS — Semester 4", "Operating Systems", "Data Structures"]

export default function PlanHeader({ phase }) {
  const [open, setOpen] = useState(false)
  const [course, setCourse] = useState(courses[0])

  return (
    <div className="flex items-start justify-between pb-5 border-b border-(--color-card) flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Link href="/dashboard" className="text-[12px] text-(--color-tertiary-text) hover:text-(--color-brand) transition-colors">
            Dashboard
          </Link>
          <RiArrowRightSLine className="text-(--color-dark-gray) text-[13px]" />
          <span className="text-[12px] text-(--color-secondary-text)">Learning Plan Generator</span>
        </div>
        <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
          Learning Plan Generator
        </h1>
        <p className="text-[clamp(12px,1.3vw,14px)] text-(--color-tertiary-text) mt-1 max-w-xl">
          Converts your mastery profile and timeline into a structured, adaptive study roadmap.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Course selector */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 h-9 px-3.5 bg-card-dark text-[12px] text-white rounded-xl hover:bg-(--color-card-mid) transition-colors"
          >
            <RiBookOpenLine className="text-(--color-brand) text-[13px]" />
            {course}
            <RiArrowDownSLine className="text-(--color-dark-gray) text-[13px]" />
          </button>
          {open && (
            <div className="absolute top-10 left-0 w-52 bg-(--color-card-mid) rounded-xl shadow-2xl z-20 overflow-hidden">
              {courses.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCourse(c); setOpen(false) }}
                  className={`w-full text-left px-3.5 py-2.5 text-[12px] hover:bg-white/[0.04] transition-colors ${
                    course === c ? "text-(--color-brand)" : "text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Plan active pill */}
        {phase === "plan" && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4ADE80]/[0.08] rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            <span className="text-[11px] text-(--color-secondary-text)">
              Plan Active · <span className="text-white font-medium">Generated Feb 24</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}