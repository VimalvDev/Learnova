"use client"
import { useState } from "react"
import { RiArrowDownSLine, RiBookOpenLine } from "react-icons/ri"

const courses = ["DBMS — Semester 4", "Operating Systems", "Data Structures"]
const units   = [
  { id: 1, name: "Introduction to Databases" },
  { id: 2, name: "ER Model" },
  { id: 3, name: "Normalization" },
]

export default function ScopeSelector() {
  const [course,     setCourse]     = useState(courses[0])
  const [courseOpen, setCourseOpen] = useState(false)
  const [unitOpen,   setUnitOpen]   = useState(false)
  const [selected,   setSelected]   = useState([1, 2, 3])

  const toggle = (id) =>
    setSelected((p) => p.includes(id) ? p.filter((u) => u !== id) : [...p, id])

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Course */}
        <div>
          <label className="text-[11px] font-medium text-secondary-text block mb-1.5">Course</label>
          <div className="relative">
            <button
              onClick={() => { setCourseOpen(!courseOpen); setUnitOpen(false) }}
              className="w-full h-10 px-3 bg-[#141414] rounded-xl text-[12px] text-white flex items-center gap-2 border border-white/6 hover:border-white/10 transition-all"
            >
              <RiBookOpenLine className="text-brand text-[12px] shrink-0" />
              <span className="flex-1 text-left truncate">{course}</span>
              <RiArrowDownSLine className="text-secondary-text text-[13px] shrink-0" />
            </button>
            {courseOpen && (
              <div className="absolute top-11 left-0 w-full bg-[#2A2B2F] rounded-xl shadow-2xl z-30 overflow-hidden border border-white/6">
                {courses.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCourse(c); setCourseOpen(false) }}
                    className={`w-full text-left px-3.5 py-2.5 text-[12px] hover:bg-white/4 transition-colors flex items-center justify-between ${
                      course === c ? "text-brand" : "text-white"
                    }`}
                  >
                    {c}
                    {course === c && <span className="text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Units */}
        <div>
          <label className="text-[11px] font-medium text-secondary-text block mb-1.5">
            Units
            {selected.length > 0 && (
              <span className="ml-2 text-[9px] font-bold text-brand bg-brand/10 px-1.5 py-0.5 rounded-full">
                {selected.length} selected
              </span>
            )}
          </label>
          <div className="relative">
            <button
              onClick={() => { setUnitOpen(!unitOpen); setCourseOpen(false) }}
              className="w-full h-10 px-3 bg-[#141414] rounded-xl text-[12px] text-white flex items-center justify-between border border-white/6 hover:border-white/10 transition-all"
            >
              <span>
                {selected.length === units.length ? "All Units" : `${selected.length} unit${selected.length !== 1 ? "s" : ""}`}
              </span>
              <RiArrowDownSLine className="text-secondary-text text-[13px] shrink-0" />
            </button>
            {unitOpen && (
              <div className="absolute top-11 left-0 w-full bg-[#2A2B2F] rounded-xl shadow-2xl z-30 overflow-hidden border border-white/6">
                {units.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => toggle(u.id)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-[12px] hover:bg-white/4 transition-colors"
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                      selected.includes(u.id)
                        ? "bg-brand border-brand"
                        : "border-white/20"
                    }`}>
                      {selected.includes(u.id) && <span className="text-white text-[9px] font-bold">✓</span>}
                    </div>
                    <span className={selected.includes(u.id) ? "text-white" : "text-[#888]"}>{u.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 bg-brand/5 rounded-xl border border-brand/10">
        <span className="text-brand text-[11px]">◈</span>
        <span className="text-[11px] text-[#888]">
          312 chunks available across {selected.length} units · 5 documents
        </span>
      </div>
    </div>
  )
}