"use client"
import { useState } from "react"
import { RiAddLine, RiArrowDownSLine } from "react-icons/ri"

const dayItems = [
  { type: "overdue",   name: "Normalization",      mastery: 34, time: "Overdue"        },
  { type: "due",       name: "Functional Dep.",     mastery: 61, time: "3:00 PM"        },
  { type: "scheduled", name: "ER Diagrams",         mastery: 74, time: "5:00 PM"        },
  { type: "completed", name: "SQL Joins",           mastery: 91, time: "Completed"      },
]

const dot = {
  overdue:   "bg-[var(--color-red)]",
  due:       "bg-[#FBBF24]",
  scheduled: "bg-[--color-brand]",
  completed: "bg-[#4ADE80]",
}

const timeColor = {
  overdue:   "text-[var(--color-red)]",
  due:       "text-[--color-secondary-text]",
  scheduled: "text-[--color-secondary-text]",
  completed: "text-[#4ADE80]",
}

export default function DayDetail() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-semibold text-white">Tuesday, Feb 24</span>
        <span className="text-[11px] text-[--color-secondary-text]">4 items</span>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {dayItems.map((item) => (
          <div key={item.name} className="flex items-center gap-3 py-2.5">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot[item.type]}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-[12px] font-medium ${item.type === "completed" ? "text-[--color-secondary-text]" : "text-white"}`}>
                {item.name}
              </p>
              <p className="text-[10px] text-[--color-tertiary-text]">Mastery: {item.mastery}%</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-[10px] ${timeColor[item.type]}`}>{item.time}</span>
              <button className="text-[11px] text-[--color-brand] hover:underline whitespace-nowrap">
                {item.type === "completed" ? "Review" : "Start →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add manual revision */}
      <button
        onClick={() => setAddOpen(!addOpen)}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[--color-brand]/25 rounded-xl text-[11px] text-[--color-brand] hover:border-[--color-brand]/50 transition-all"
      >
        <RiAddLine className="text-[13px]" /> Add Revision for This Day
      </button>

      {addOpen && (
        <div className="mt-3 bg-[--color-card-dark] rounded-xl border border-white/[0.06] p-3.5 flex flex-col gap-2.5">
          <input
            placeholder="Search concepts..."
            className="w-full h-8 px-3 bg-[--color-card-mid-dark] text-[12px] text-white placeholder:text-[--color-dark-gray] rounded-lg border border-white/[0.06] outline-none focus:border-[--color-brand]/40 transition-colors"
          />
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-between h-8 px-3 bg-[--color-card-mid-dark] text-[12px] text-white rounded-lg border border-white/[0.06]">
              3:00 PM <RiArrowDownSLine className="text-[--color-dark-gray] text-[12px]" />
            </button>
            <button className="flex items-center justify-between h-8 px-3 bg-[--color-card-mid-dark] text-[12px] text-white rounded-lg border border-white/[0.06]">
              High <RiArrowDownSLine className="text-[--color-dark-gray] text-[12px]" />
            </button>
          </div>
          <button className="w-full h-8 bg-[--color-brand] text-white text-[11px] font-bold rounded-lg hover:brightness-110 transition-all">
            Add to Schedule
          </button>
        </div>
      )}
    </div>
  )
}