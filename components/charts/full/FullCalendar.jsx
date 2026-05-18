"use client"
import { ResponsiveCalendar } from "@nivo/calendar"
import nivoTheme from "@/lib/nivo"

export default function FullCalendar({ data = [], from, to, onClick }) {
  const now = new Date()
  const calFrom = from ?? `${now.getFullYear()}-01-01`
  const calTo   = to   ?? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()).padStart(2, "0")}`

  return (
    <ResponsiveCalendar
      data={data}
      theme={nivoTheme}
      from={calFrom}
      to={calTo}
      emptyColor="#212225"
      colors={[
        "color-mix(in srgb, var(--color-brand) 20%, transparent)",
        "color-mix(in srgb, var(--color-brand) 45%, transparent)",
        "color-mix(in srgb, var(--color-brand) 70%, transparent)",
        "var(--color-brand)",
      ]}
      margin={{ top: 25, right: 0, bottom: 0, left: 0 }}
      yearSpacing={0}
      yearLegend={() => ""}
      monthBorderWidth={0}
      monthLegendOffset={10}
      dayBorderWidth={2}
      dayBorderColor="#171717"
      dayRadius={2}
      onClick={(day) => onClick && onClick(day)}
      tooltip={({ day, value }) => (
        <div style={{ background: "#212225", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", color: "#fff", whiteSpace: "nowrap" }}>
          {day}: <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{value} sessions</span>
        </div>
      )}
    />
  )
}