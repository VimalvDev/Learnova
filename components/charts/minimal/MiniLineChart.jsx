// components/charts/minimal/MiniLineChart.jsx
"use client"
import { ResponsiveLine } from "@nivo/line"
import nivoTheme  from "@/lib/nivo"

const data = [
  {
    id: "mastery",
    data: [
      { x: "Quiz 1", y: 30 },
      { x: "Quiz 2", y: 45 },
      { x: "Quiz 3", y: 38 },
      { x: "Quiz 4", y: 62 },
      { x: "Quiz 5", y: 58 },
      { x: "Quiz 6", y: 75 },
    ],
  },
]

export default function MiniLineChart() {
  return (
    <ResponsiveLine
      data={data}
      theme={nivoTheme}
      margin={{ top: 10, right: 10, bottom: 21, left: 20 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: 100 }}
      curve="monotoneX"
      colors={["var(--color-brand)"]}
      lineWidth={2}
      pointSize={6}
      pointColor="var(--color-brand)"
      pointBorderWidth={2}
      pointBorderColor="#212225"
      enableArea
      areaOpacity={0.08}
      enableGridX={false}
      axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: [0, 50, 100] }}
      axisBottom={{ tickSize: 0, tickPadding: 8 }}
      tooltip={({ point }) => (
        <div className="bg-[#1a1b1e] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
          {point.data.x}: <span className="text-brand font-bold">{point.data.y}%</span>
        </div>
      )}
    />
  )
}