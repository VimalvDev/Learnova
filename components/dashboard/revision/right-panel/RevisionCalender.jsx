"use client"
import { useState } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"

const DAYS   = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const dotColor = {
  overdue:   "bg-[#F87171]",
  due:       "bg-[#FBBF24]",
  upcoming:  "bg-brand",
  completed: "bg-[#4ADE80]",
}

// Priority: overdue > due > upcoming > completed
function getDayStatus(statuses) {
  if (statuses.includes("overdue"))   return "overdue"
  if (statuses.includes("due"))       return "due"
  if (statuses.includes("upcoming"))  return "upcoming"
  if (statuses.includes("completed")) return "completed"
  return null
}

export default function RevisionCalendar({ calendarMap = {} }) {
  const now   = new Date()
  const [year,  setYear]  = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const today       = now.getDate()
  const currentYear = now.getFullYear()
  const currentMon  = now.getMonth()

  const firstDay    = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells       = Array.from({ length: 42 }, (_, i) => {
    const day = i - startOffset + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })

  const prev = () => { if (month === 0) { setYear((y) => y - 1); setMonth(11) } else setMonth((m) => m - 1) }
  const next = () => { if (month === 11) { setYear((y) => y + 1); setMonth(0) } else setMonth((m) => m + 1) }

  // Build day → status map for current month view
  const dayStatusMap = {}
  Object.entries(calendarMap).forEach(([dateStr, statuses]) => {
    const d = new Date(dateStr)
    if (d.getFullYear() === year && d.getMonth() === month) {
      dayStatusMap[d.getDate()] = getDayStatus(statuses)
    }
  })

  return (
    <div className="bg-card-dark rounded-2xl p-4">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-lg text-[#444] hover:text-white hover:bg-white/[0.06] transition-all">
          <RiArrowLeftSLine className="text-[15px]" />
        </button>
        <span className="text-[14px] font-semibold text-white">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-lg text-[#444] hover:text-white hover:bg-white/[0.06] transition-all">
          <RiArrowRightSLine className="text-[15px]" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-[#444] py-1">{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="aspect-square" />

          const status  = dayStatusMap[day]
          const isToday = day === today && year === currentYear && month === currentMon
          const isPast  = new Date(year, month, day) < new Date(currentYear, currentMon, today)

          return (
            <div
              key={i}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-[12px] transition-all ${
                isToday
                  ? "border border-brand/60 bg-brand/[0.08] text-white font-semibold"
                  : isPast
                  ? "text-[#444]"
                  : "text-secondary-text"
              }`}
            >
              <span className="leading-none">{day}</span>
              {status && (
                <div className={`w-1 h-1 rounded-full mt-0.5 ${dotColor[status]}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
        {[
          { label: "Overdue",   color: "bg-[#F87171]" },
          { label: "Due",       color: "bg-[#FBBF24]" },
          { label: "Scheduled", color: "bg-brand"     },
          { label: "Done",      color: "bg-[#4ADE80]" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
            <span className="text-[9px] text-tertiary-text">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}