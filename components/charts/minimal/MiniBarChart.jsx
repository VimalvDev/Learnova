// components/charts/minimal/MiniBarChart.jsx
"use client"
import { ResponsiveBar } from "@nivo/bar"
import nivoTheme from "@/lib/nivo"

const data = [
  { topic: "SQL",        mastery: 80 },
  { topic: "Python",     mastery: 60 },
  { topic: "Java",       mastery: 45 },
  { topic: "Networking", mastery: 91 },
  { topic: "Postgres",   mastery: 20 },
]

export default function MiniBarChart() {
  return (
    <ResponsiveBar
      data={data}
      keys={["mastery"]}
      indexBy="topic"
      theme={nivoTheme}
      maxValue={100}
      colors={["#FA6E43"]}
      margin={{ top: 20, right: 0, bottom: 30, left: 30 }}
      padding={0.05}
      borderRadius={6}
      label={(d) => `${d.value}%`}
      labelTextColor="#ffffff"
      axisLeft={{ tickSize: 0, tickPadding: 10 }}
      axisBottom={{ tickSize: 0, tickPadding: 12 }}
      layers={[
        "grid",
        "axes",
        ({ bars }) =>
          bars.map((bar) => (
            <rect
              key={`${bar.key}-bg`}
              x={bar.x}
              y={0}
              width={bar.width}
              height={bar.y + bar.height}
              fill="#1a1820"
              rx={14}
            />
          )),
        "bars",
        "markers",
        "legends",
      ]}
    />
  )
}