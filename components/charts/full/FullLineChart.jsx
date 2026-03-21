"use client"
import { ResponsiveLine } from "@nivo/line"
import nivoTheme from "@/lib/nivo"

const defaultData = [
  {
    id: "Overall Mastery",
    color: "#FA6E43",
    data: [
      { x: "Mar 1",  y: 52 }, { x: "Mar 5",  y: 58 },
      { x: "Mar 8",  y: 55 }, { x: "Mar 11", y: 63 },
      { x: "Mar 14", y: 68 }, { x: "Mar 17", y: 72 },
      { x: "Mar 20", y: 78 }, { x: "Mar 21", y: 84 },
    ],
  },
  {
    id: "Quiz Accuracy",
    color: "rgba(255,255,255,0.35)",
    data: [
      { x: "Mar 1",  y: 60 }, { x: "Mar 5",  y: 65 },
      { x: "Mar 8",  y: 62 }, { x: "Mar 11", y: 70 },
      { x: "Mar 14", y: 74 }, { x: "Mar 17", y: 78 },
      { x: "Mar 20", y: 82 }, { x: "Mar 21", y: 87 },
    ],
  },
  {
    id: "Revision Rate",
    color: "rgba(255,255,255,0.15)",
    data: [
      { x: "Mar 1",  y: 40 }, { x: "Mar 5",  y: 50 },
      { x: "Mar 8",  y: 45 }, { x: "Mar 11", y: 55 },
      { x: "Mar 14", y: 60 }, { x: "Mar 17", y: 65 },
      { x: "Mar 20", y: 70 }, { x: "Mar 21", y: 75 },
    ],
  },
]

// Map serie id → explicit dot color
const dotColors = {
  "Overall Mastery": "#FA6E43",
  "Quiz Accuracy":   "rgba(255,255,255,0.5)",
  "Revision Rate":   "rgba(255,255,255,0.25)",
}

export default function FullLineChart({
  data = defaultData,
  visibleLines = ["Overall Mastery", "Quiz Accuracy", "Revision Rate"],
}) {
  const filtered = data.filter((d) => visibleLines.includes(d.id))

  return (
    <ResponsiveLine
      animate
      data={filtered}
      theme={nivoTheme}
      margin={{ top: 16, right: 20, bottom: 44, left: 48 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 30, max: 100 }}
      curve="monotoneX"
      colors={filtered.map((d) => d.color)}
      lineWidth={2.5}
      pointSize={0}
      enableArea
      areaBaselineValue={30}
      areaOpacity={0.06}
      enableGridX={false}
      enableGridY
      gridYValues={[30, 50, 70, 90]}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickValues: [30, 50, 70, 90],
        format: (v) => `${v}%`,
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
      }}
      layers={[
        "grid",
        "markers",
        "axes",
        "areas",
        "lines",
        // Custom points layer
        ({ points }) => (
          <g>
            {points.map((point) => {
              const fill = dotColors[point.serieId] ?? "rgba(255,255,255,0.3)"
              const isOrange = point.serieId === "Overall Mastery"
              return (
                <circle
                  key={point.id}
                  cx={point.x}
                  cy={point.y}
                  r={isOrange ? 4 : 3}
                  fill={fill}
                  stroke={isOrange ? "rgba(250,110,67,0.3)" : "transparent"}
                  strokeWidth={isOrange ? 3 : 0}
                />
              )
            })}
          </g>
        ),
        "slices",
        "mesh",
        "legends",
      ]}
      tooltip={({ point }) => (
        <div style={{
          background: "#212225",
          borderRadius: "8px",
          padding: "6px 10px",
          fontSize: "11px",
          color: "#fff",
          whiteSpace: "nowrap",
        }}>
          {point.serieId}:{" "}
          <span style={{
            color: dotColors[point.serieId] ?? "#fff",
            fontWeight: 600,
          }}>
            {point.data.y}%
          </span>
        </div>
      )}
    />
  )
}