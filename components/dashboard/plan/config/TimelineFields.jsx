"use client"
import { useState } from "react"
import { RiCalendarLine } from "react-icons/ri"

export default function TimelineFields({ targetDate, daysRemaining, onChange }) {
  const isTight = daysRemaining < 7
  const daysColor = isTight ? "text-[var(--color-red)]" : "text-[#4ADE80]"

  return (
    <div>
      <p className="text-[12px] text-secondary-text mb-3">
        When do you need to be ready?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Target date */}
        <div>
          <label className="text-[11px] font-medium text-tertiary-text block mb-1.5">
            Target Date
          </label>
          <div className="flex items-center justify-between h-11 px-3.5 bg-card-dark rounded-xl cursor-pointer hover:bg-(--color-card-mid) transition-colors">
            <span className="text-[13px] text-white">{targetDate}</span>
            <RiCalendarLine className="text-brand text-[15px]" />
          </div>
        </div>

        {/* Days remaining */}
        <div>
          <label className="text-[11px] font-medium text-tertiary-text block mb-1.5">
            Time Available
          </label>
          <div className="flex items-center justify-center h-11 px-3.5 bg-card-dark rounded-xl">
            <span className={`text-[13px] font-semibold ${daysColor}`}>
              {daysRemaining} days remaining
            </span>
          </div>
          {isTight && (
            <p className="text-[10px] text-[var(--color-red)] mt-1">⚠ Very tight timeline</p>
          )}
        </div>
      </div>

      {/* Urgency note */}
      <div className="mt-3 flex items-start gap-2 px-3.5 py-3 bg-card-dark rounded-xl">
        <span className="text-brand text-[12px] flex-shrink-0 mt-0.5">◈</span>
        <p className="text-[11px] text-secondary-text leading-relaxed">
          {daysRemaining} days is sufficient for 58 concepts at moderate intensity.
          Weak topics will be front-loaded in the first 7 days.
        </p>
      </div>
    </div>
  )
}