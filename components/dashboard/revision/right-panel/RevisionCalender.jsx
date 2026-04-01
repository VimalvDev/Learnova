"use client"
import { useState } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"

const DAYS   = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

// Sample revision data per day (1-indexed day of month)
const revisionData = {
  18: [{ type: "completed" }],
  20: [{ type: "completed" }],
  21: [{ type: "completed" }],
  22: [{ type: "completed" }],
  23: [{ type: "completed" }, { type: "scheduled" }],
  24: [{ type: "overdue" }, { type: "due" }, { type: "scheduled" }],
  25: [{ type: "scheduled" }, { type: "scheduled" }],
  26: [{ type: "scheduled" }],
  27: [{ type: "scheduled" }, { type: "scheduled" }],
}

const dotColor = {
  overdue:   "bg-[var(--color-red)]",
  due:       "bg-[#FBBF24]",
  scheduled: "bg-[--color-brand]",
  completed: "bg-[#4ADE80]",
}

export default function RevisionCalendar() {
  const [year,  setYear]  = useState(2026)
  const [month, setMonth] = useState(1) // 0-indexed, 1 = Feb
  const [selected, setSelected] = useState(24)

  const today        = 24
  const firstDay     = new Date(year, month, 1).getDay()
  const startOffset  = (firstDay === 0 ? 6 : firstDay - 1)
  const daysInMonth  = new Date(year, month + 1, 0).getDate()
  const cells        = Array.from({ length: 42 }, (_, i) => {
    const day = i - startOffset + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1) }

  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-4">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-lg text-[--color-dark-gray] hover:text-white hover:bg-white/[0.06] transition-all">
          <RiArrowLeftSLine className="text-[15px]" />
        </button>
        <span className="text-[14px] font-semibold text-white">
          {MONTHS[month]} {year}
        </span>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-lg text-[--color-dark-gray] hover:text-white hover:bg-white/[0.06] transition-all">
          <RiArrowRightSLine className="text-[15px]" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-[--color-dark-gray] py-1">{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="aspect-square" />

          const items   = revisionData[day] || []
          const isToday = day === today
          const isSel   = day === selected
          const isPast  = day < today
          const dots    = items.slice(0, 3)

          return (
            <button
              key={i}
              onClick={() => setSelected(day)}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-[12px] transition-all relative ${
                isSel
                  ? "bg-[--color-brand]/15 border border-[--color-brand] text-white font-semibold"
                  : isToday
                  ? "border border-[--color-brand]/40 bg-[--color-brand]/[0.06] text-white font-semibold"
                  : isPast
                  ? "text-[--color-dark-gray] opacity-50 hover:opacity-70"
                  : "text-[--color-secondary-text] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span className="leading-none">{day}</span>
              {dots.length > 0 && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  {dots.map((d, j) => (
                    <div key={j} className={`w-1 h-1 rounded-full ${dotColor[d.type]}`} />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
        {[
          { label: "Overdue",   color: "bg-[var(--color-red)]"  },
          { label: "Due",       color: "bg-[#FBBF24]"           },
          { label: "Scheduled", color: "bg-[--color-brand]"     },
          { label: "Done",      color: "bg-[#4ADE80]"           },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
            <span className="text-[9px] text-[--color-tertiary-text]">{label}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <p className="text-center text-[10px] text-[--color-tertiary-text] mt-2">
        This month:
        <span className="text-[#4ADE80] font-semibold mx-1">6 completed</span>·
        <span className="text-[--color-secondary-text] mx-1">4 pending</span>·
        <span className="text-[var(--color-red)] font-semibold mx-1">2 overdue</span>
      </p>
    </div>
  )
}