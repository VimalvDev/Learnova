"use client"
import { useState } from "react"
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri"

const checkboxItems = [
  { key: "explanation", label: "Explanation text",    checked: true  },
  { key: "concepts",    label: "Key concepts",        checked: true  },
  { key: "quiz",        label: "Practice quiz",       checked: false },
  { key: "tags",        label: "Related concept tags",checked: true  },
]

export default function CourseIntegration({ topic }) {
  const [added,    setAdded]    = useState(false)
  const [checks,   setChecks]   = useState(checkboxItems.reduce((a, i) => ({ ...a, [i.key]: i.checked }), {}))

  const toggle = (key) => setChecks(prev => ({ ...prev, [key]: !prev[key] }))

  if (!topic) {
    return (
      <div className="p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-2">Course Integration</p>
        <p className="text-[11px] text-(--color-tertiary-text)">Generate an answer to add it to a course.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">Course Integration</p>
      <h3 className="text-[13px] font-semibold text-white mb-0.5">Add to Your Course</h3>
      <p className="text-[10px] text-(--color-tertiary-text) mb-4">Make this topic part of your private learning system.</p>

      <div className="flex flex-col gap-3 mb-4">
        {/* Course selector */}
        <div>
          <label className="text-[10px] text-(--color-tertiary-text) block mb-1">Course</label>
          <button className="w-full flex items-center justify-between h-9 px-3 bg-card rounded-xl text-[11px] text-white">
            📂 DBMS — Semester 4
            <RiArrowDownSLine className="text-(--color-dark-gray) text-[13px]" />
          </button>
        </div>

        {/* Unit selector */}
        <div>
          <label className="text-[10px] text-(--color-tertiary-text) block mb-1">Unit</label>
          <button className="w-full flex items-center justify-between h-9 px-3 bg-card rounded-xl text-[11px] text-(--color-secondary-text)">
            Select Unit
            <RiArrowDownSLine className="text-(--color-dark-gray) text-[13px]" />
          </button>
        </div>

        {/* What to add */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-(--color-tertiary-text)">What to add</label>
          {checkboxItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="flex items-center gap-2 text-left"
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all ${
                checks[key] ? "bg-(--color-brand) border-(--color-brand)" : "border-white/[0.2]"
              }`}>
                {checks[key] && <RiCheckLine className="text-white text-[9px]" />}
              </div>
              <span className="text-[11px] text-white">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {added ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RiCheckLine className="text-[#4ADE80] text-[15px]" />
            <span className="text-[12px] text-white">Added to DBMS · Unit 3</span>
          </div>
          <button className="text-[11px] text-(--color-brand) hover:underline text-left">View in Course →</button>
        </div>
      ) : (
        <button
          onClick={() => setAdded(true)}
          className="w-full h-9 bg-(--color-brand) text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          Add to Course Material
        </button>
      )}
    </div>
  )
}