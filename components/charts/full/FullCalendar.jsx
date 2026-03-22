"use client"
import { ResponsiveCalendar } from "@nivo/calendar"
import nivoTheme from "@/lib/nivo"

const defaultData = [
  { day: "2026-01-05", value: 2 }, { day: "2026-01-06", value: 4 },
  { day: "2026-01-12", value: 3 }, { day: "2026-01-19", value: 5 },
  { day: "2026-01-26", value: 2 }, { day: "2026-02-02", value: 4 },
  { day: "2026-02-03", value: 6 }, { day: "2026-02-09", value: 3 },
  { day: "2026-02-10", value: 7 }, { day: "2026-02-16", value: 5 },
  { day: "2026-02-17", value: 8 }, { day: "2026-02-23", value: 4 },
  { day: "2026-02-24", value: 6 }, { day: "2026-03-01", value: 5 },
  { day: "2026-03-02", value: 8 }, { day: "2026-03-03", value: 10 },
  { day: "2026-03-04", value: 7 }, { day: "2026-03-05", value: 9 },
  { day: "2026-03-06", value: 6 }, { day: "2026-03-08", value: 10 },
  { day: "2026-03-10", value: 8 }, { day: "2026-03-12", value: 9 },
  { day: "2026-03-14", value: 10 },{ day: "2026-03-17", value: 7 },
  { day: "2026-03-19", value: 8 }, { day: "2026-03-21", value: 6 },
  { day: "2026-04-01", value: 3 }, { day: "2026-04-06", value: 4 },
  { day: "2026-04-13", value: 5 }, { day: "2026-04-20", value: 3 },
  { day: "2026-05-04", value: 5 }, { day: "2026-05-05", value: 7 },
  { day: "2026-05-11", value: 6 }, { day: "2026-05-12", value: 8 },
]

export default function FullCalendar({
  data    = defaultData,
  from    = "2026-01-01",
  to      = "2026-05-31",
  onClick,
}) {
  return (
    <ResponsiveCalendar
      data={data}
      theme={nivoTheme}
      from={from}
      to={to}
      emptyColor="#212225"
      colors={[
        "rgba(250,110,67,0.2)",
        "rgba(250,110,67,0.45)",
        "rgba(250,110,67,0.7)",
        "#FA6E43",
      ]}
      margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
      yearSpacing={0}
      yearLegend={() => ""}
      monthBorderWidth={0}
      monthLegendOffset={10}
      dayBorderWidth={2}
      dayBorderColor="#171717"
      dayRadius={2}
      onClick={(day) => onClick && onClick(day)}
      tooltip={({ day, value }) => (
        <div style={{
          background:   "#212225",
          borderRadius: "8px",
          padding:      "6px 10px",
          fontSize:     "11px",
          color:        "#fff",
          whiteSpace:   "nowrap",
        }}>
          {day}:{" "}
          <span style={{ color: "#FA6E43", fontWeight: 600 }}>
            {value} sessions
          </span>
        </div>
      )}
    />
  )
}