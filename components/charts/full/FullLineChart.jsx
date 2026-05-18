"use client"
import { ResponsiveLine } from "@nivo/line"
import nivoTheme from "@/lib/nivo"

const dotColors = {
  "Overall Mastery": "var(--color-brand)",
  "Quiz Accuracy":   "rgba(255,255,255,0.5)",
}

export default function FullLineChart({ data = [], visibleLines = ["Overall Mastery", "Quiz Accuracy"] }) {
  const filtered = data.filter((d) => visibleLines.includes(d.id))

  if (filtered.length === 0 || filtered.every((d) => d.data.length === 0)) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[12px] text-[#444]">No quiz data yet</p>
      </div>
    )
  }

  return (
    <ResponsiveLine
      animate
      data={filtered}
      theme={nivoTheme}
      margin={{ top: 16, right: 20, bottom: 44, left: 48 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: 100 }}
      curve="monotoneX"
      colors={filtered.map((d) => d.color)}
      lineWidth={2.5}
      pointSize={0}
      enableArea
      areaBaselineValue={0}
      areaOpacity={0.06}
      enableGridX={false}
      enableGridY
      gridYValues={[0, 25, 50, 75, 100]}
      axisLeft={{ tickSize: 0, tickPadding: 10, tickValues: [0, 25, 50, 75, 100], format: (v) => `${v}%` }}
      axisBottom={{ tickSize: 0, tickPadding: 10 }}
      layers={[
        "grid", "markers", "axes", "areas", "lines",
        ({ points }) => (
          <g>
            {points.map((point) => {
              const fill = dotColors[point.serieId] ?? "rgba(255,255,255,0.3)"
              const isOrange = point.serieId === "Overall Mastery"
              return (
                <circle
                  key={point.id}
                  cx={point.x} cy={point.y}
                  r={isOrange ? 4 : 3}
                  fill={fill}
                  stroke={isOrange ? "rgba(250,110,67,0.3)" : "transparent"}
                  strokeWidth={isOrange ? 3 : 0}
                />
              )
            })}
          </g>
        ),
        "slices", "mesh", "legends",
      ]}
      tooltip={({ point }) => (
        <div style={{ background: "#212225", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", color: "#fff", whiteSpace: "nowrap" }}>
          {point.serieId}: <span style={{ color: dotColors[point.serieId] ?? "#fff", fontWeight: 600 }}>{point.data.y}%</span>
        </div>
      )}
    />
  )
}