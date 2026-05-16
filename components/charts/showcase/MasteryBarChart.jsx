"use client"
import { ResponsiveBar } from "@nivo/bar"

const data = [
  { topic: "SQL",        mastery: 80 },
  { topic: "Python",     mastery: 60 },
  { topic: "Java",       mastery: 45 },
  { topic: "Networking", mastery: 91 },
  { topic: "Postgres",   mastery: 20 },
  { topic: "Algorithms", mastery: 55 },
]

const theme = {
  background: "transparent",
  text: { fontSize: 10, fill: "rgba(255,255,255,0.25)", fontFamily: "monospace" },
  axis: {
    ticks: { text: { fontSize: 10, fill: "rgba(255,255,255,0.25)", fontFamily: "monospace" } },
  },
  grid: { line: { stroke: "rgba(255,255,255,0.04)", strokeWidth: 1 } },
}

function masteryColor(v) {
  if (v >= 75) return "rgba(232,80,10,1)"
  if (v >= 50) return "rgba(232,80,10,0.6)"
  if (v >= 25) return "rgba(232,80,10,0.3)"
  return "rgba(232,80,10,0.12)"
}

export default function MasteryBarChart() {
  return (
    <ResponsiveBar
      data={data}
      keys={["mastery"]}
      indexBy="topic"
      theme={theme}
      layout="vertical"
      maxValue={100}
 colors={(bar) => {
        const v = bar.data.mastery;

        if (v >= 75) return "var(--color-brand)";
        if (v >= 50)
          return "color-mix(in srgb, var(--color-brand) 65%, transparent)";
        if (v >= 25)
          return "color-mix(in srgb, var(--color-brand) 35%, transparent)";

        return "color-mix(in srgb, var(--color-brand) 15%, transparent)";
      }}      margin={{ top: 8, right: 8, bottom: 36, left: 36 }}
      padding={0.2}
      borderRadius={2}
      label={(d) => `${d.value}%`}
      labelTextColor="rgba(255,255,255,0.8)"
      labelSkipHeight={20}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
        tickValues: [0, 25, 50, 75, 100],
        format: (v) => `${v}%`,
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
      }}
      enableGridX={false}
      enableGridY
      gridYValues={[0, 25, 50, 75, 100]}
      animate
      motionConfig="gentle"
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
              fill="rgba(255,255,255,0.03)"
              rx={2}
            />
          )),
        "bars",
        "markers",
        "legends",
      ]}
      tooltip={({ data, value }) => (
        <div
          style={{
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "2px",
            padding: "6px 10px",
            fontSize: "10px",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.5)",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {data.topic}:{" "}
          <span style={{ color: "#E8500A" }}>{value}%</span>
        </div>
      )}
    />
  )
}