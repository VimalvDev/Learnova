// components/charts/showcase/AdaptiveLineChart.jsx
"use client"
import { ResponsiveLine } from "@nivo/line"
import nivoTheme  from "@/lib/nivo"

const data = [
  {
    id: "Mastery Score",
    color: "var(--color-brand)",
    data: [
      { x: "Quiz 1",  y: 30 },
      { x: "Quiz 2",  y: 42 },
      { x: "Quiz 3",  y: 38 },
      { x: "Quiz 4",  y: 55 },
      { x: "Quiz 5",  y: 50 },
      { x: "Quiz 6",  y: 68 },
      { x: "Quiz 7",  y: 72 },
      { x: "Quiz 8",  y: 80 },
    ],
  },
  {
    id: "Difficulty",
    color: "rgba(255,255,255,0.3)",
    data: [
      { x: "Quiz 1",  y: 20 },
      { x: "Quiz 2",  y: 25 },
      { x: "Quiz 3",  y: 22 },
      { x: "Quiz 4",  y: 35 },
      { x: "Quiz 5",  y: 40 },
      { x: "Quiz 6",  y: 52 },
      { x: "Quiz 7",  y: 58 },
      { x: "Quiz 8",  y: 65 },
    ],
  },
]

export default function AdaptiveLineChart() {
  return (
    <ResponsiveLine
      data={data}
      theme={nivoTheme}
      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: 100 }}
      curve="monotoneX"
      colors={["var(--color-brand)", "rgba(255,255,255,0.25)"]}
      lineWidth={2}
      pointSize={7}
      pointColor={{ from: "color" }}
      pointBorderWidth={2}
      pointBorderColor="#1a1b1e"
      enableArea
      areaOpacity={0.06}
      enableGridX={false}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickValues: [0, 25, 50, 75, 100],
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateY: 46,
          itemWidth: 120,
          itemHeight: 14,
          itemTextColor: "#555",
          symbolSize: 8,
          symbolShape: "circle",
        },
      ]}
      tooltip={({ point }) => (
        <div className="bg-[#1a1b1e] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
          {point.serieId}: <span className="text-brand font-bold">{point.data.y}%</span>
        </div>
      )}
    />
  )
}