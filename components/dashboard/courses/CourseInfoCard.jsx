"use client"
import { useState } from "react"

const categories = [
  "Computer Science", "Mathematics", "Physics",
  "Engineering", "Medicine", "Law", "Business", "Languages", "Custom...",
]

const durations = ["1 Week", "2 Weeks", "1 Month", "3 Months", "Custom"]

export default function CourseInfoCard() {
  const [name,        setName]       = useState("Database Management Systems — Semester 4")
  const [category,    setCategory]   = useState("Computer Science")
  const [level,       setLevel]      = useState("Intermediate")
  const [description, setDesc]       = useState("")
  const [goal,        setGoal]       = useState("Final Semester Exam")
  const [duration,    setDuration]   = useState("3 Months")
  const [catOpen,     setCatOpen]    = useState(false)
  const [durOpen,     setDurOpen]    = useState(false)

  return (
    <div className="bg-[#171717] rounded-2xl p-6">
      <div className="mb-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FA6E43]/80 block mb-1">
          Course Setup
        </span>
        <h2 className="text-[17px] font-semibold text-white/90">Course Information</h2>
        <p className="text-[12px] text-[#666] mt-0.5">
          This defines how Learnova structures and tracks your learning.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Course Name — full width */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-medium text-[#888]">Course Name</label>
            <span className="text-[10px] text-[#444]">{name.length} / 80</span>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 80))}
            placeholder="e.g. Database Management Systems — Semester 4"
            className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-[#FA6E43]/40 transition-all"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <label className="text-[11px] font-medium text-[#888] block mb-1.5">Subject Category</label>
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white flex items-center justify-between outline-none focus:ring-1 focus:ring-[#FA6E43]/40 transition-all"
          >
            <span>{category}</span>
            <span className="text-[#555] text-[11px]">▾</span>
          </button>
          {catOpen && (
            <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a] rounded-xl shadow-2xl z-20 overflow-hidden">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setCatOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/[0.04] transition-colors flex items-center justify-between ${
                    category === c ? "text-[#FA6E43]" : "text-white"
                  }`}
                >
                  {c}
                  {category === c && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-[11px] font-medium text-[#888] block mb-1.5">Difficulty Level</label>
          <div className="flex items-center gap-1 p-1 bg-[#111] rounded-xl">
            {["Beginner", "Intermediate", "Advanced"].map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 py-2 text-[11px] font-medium rounded-lg transition-all ${
                  level === l
                    ? "bg-[#FA6E43] text-white"
                    : "text-[#555] hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Description — full width */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-medium text-[#888]">Description</label>
              <span className="text-[9px] text-[#444] bg-white/[0.04] px-1.5 py-0.5 rounded-full">
                Optional
              </span>
            </div>
            <span className="text-[10px] text-[#444]">{description.length} / 400</span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDesc(e.target.value.slice(0, 400))}
            placeholder="Describe what this course covers and your learning objectives..."
            rows={3}
            className="w-full px-3.5 py-3 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-[#FA6E43]/40 transition-all resize-y min-h-[80px]"
          />
        </div>

        {/* Goal */}
        <div>
          <label className="text-[11px] font-medium text-[#888] block mb-1.5">Target Exam or Goal</label>
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Final Semester Exam, GRE"
            className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-[#FA6E43]/40 transition-all"
          />
        </div>

        {/* Duration */}
        <div className="relative">
          <label className="text-[11px] font-medium text-[#888] block mb-1.5">Estimated Duration</label>
          <button
            onClick={() => setDurOpen(!durOpen)}
            className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white flex items-center justify-between outline-none focus:ring-1 focus:ring-[#FA6E43]/40 transition-all"
          >
            <span>{duration}</span>
            <span className="text-[#555] text-[11px]">▾</span>
          </button>
          {durOpen && (
            <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a] rounded-xl shadow-2xl z-20 overflow-hidden">
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => { setDuration(d); setDurOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/[0.04] transition-colors flex items-center justify-between ${
                    duration === d ? "text-[#FA6E43]" : "text-white"
                  }`}
                >
                  {d}
                  {duration === d && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.04]">
        <p className="text-[11px] text-[#444] flex items-center gap-1.5">
          <span className="text-[#FA6E43]">◈</span>
          Course information can be edited at any time.
        </p>
        <div className="flex items-center gap-3">
          <button className="text-[12px] text-[#666] hover:text-white transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#FA6E43] text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all">
            Save Course Information
          </button>
        </div>
      </div>
    </div>
  )
}