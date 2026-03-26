// components/charts/showcase/RevisionCalendar.jsx
"use client"
import { ResponsiveCalendar } from "@nivo/calendar"
import nivoTheme  from "@/lib/nivo"

const data = [
  { day: "2026-01-05", value: 2 },
  { day: "2026-01-06", value: 4 },
  { day: "2026-01-12", value: 3 },
  { day: "2026-01-19", value: 5 },
  { day: "2026-01-26", value: 2 },
  { day: "2026-02-02", value: 4 },
  { day: "2026-02-03", value: 6 },
  { day: "2026-02-09", value: 3 },
  { day: "2026-02-10", value: 7 },
  { day: "2026-02-16", value: 5 },
  { day: "2026-02-17", value: 8 },
  { day: "2026-02-23", value: 4 },
  { day: "2026-02-24", value: 6 },
  { day: "2026-03-01", value: 5 },
  { day: "2026-03-02", value: 8 },
  { day: "2026-03-03", value: 10 },
  { day: "2026-03-04", value: 7 },
  { day: "2026-03-05", value: 9 },
  { day: "2026-03-06", value: 6 },
  { day: "2026-03-07", value: 8 },
  { day: "2026-03-08", value: 10 },
  { day: "2026-03-09", value: 9 },
  { day: "2026-03-10", value: 7 },
  { day: "2026-03-11", value: 10 },
  { day: "2026-03-12", value: 8 },
  { day: "2026-04-01", value: 3 },
  { day: "2026-04-06", value: 4 },
  { day: "2026-04-13", value: 5 },
  { day: "2026-04-20", value: 3 },
  { day: "2026-05-04", value: 5 },
  { day: "2026-05-05", value: 7 },
  { day: "2026-05-11", value: 6 },
  { day: "2026-05-12", value: 8 },
]

export default function RevisionCalendar() {
  return (
    <ResponsiveCalendar
      data={data}
      theme={nivoTheme}
      from="2026-01-01"
      to="2026-05-31"
      emptyColor="#2a2b2f"
    colors={[
  "color-mix(in srgb, var(--color-brand) 20%, transparent)",
  "color-mix(in srgb, var(--color-brand) 45%, transparent)",
  "color-mix(in srgb, var(--color-brand) 70%, transparent)",
  "var(--color-brand)",
]}
      margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
      yearSpacing={0}
      monthBorderWidth={0}
      dayBorderWidth={2}
      dayBorderColor="#1a1b1e"
      tooltip={({ day, value }) => (
        <div className="bg-[#1a1b1e] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
          {day}: <span className="text-brand font-bold">{value} sessions</span>
        </div>
      )}
    />
  )
}