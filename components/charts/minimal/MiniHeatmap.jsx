// components/charts/minimal/MiniHeatmap.jsx
"use client"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import nivoTheme  from "@/lib/nivo"

const data = [
  {
    id: "Normalization",
    data: [
      { x: "W1", y: 22 }, { x: "W2", y: 35 },
      { x: "W3", y: 28 }, { x: "W4", y: 41 },
    ],
  },
  {
    id: "SQL Joins",
    data: [
      { x: "W1", y: 55 }, { x: "W2", y: 62 },
      { x: "W3", y: 70 }, { x: "W4", y: 82 },
    ],
  },
  {
    id: "Transactions",
    data: [
      { x: "W1", y: 40 }, { x: "W2", y: 38 },
      { x: "W3", y: 45 }, { x: "W4", y: 50 },
    ],
  },
  {
    id: "Indexing",
    data: [
      { x: "W1", y: 15 }, { x: "W2", y: 20 },
      { x: "W3", y: 18 }, { x: "W4", y: 30 },
    ],
  },
]

export default function MiniHeatmap() {
  return (
    <ResponsiveHeatMap
      data={data}
      theme={nivoTheme}
      margin={{ top: 20, right: 10, bottom: 30, left: 10 }}
      minValue={0}
      maxValue={100}
      borderRadius={6}
      borderWidth={3}
      borderColor="#212225"
     colors={{
        type: "sequential",
        colors: [
          "rgba(250,110,67,0.12)",
          "rgba(250,110,67,0.78)",
          "#FA6E43",
        ],
      }}
      labelTextColor="#ffffff"
      emptyColor="#2a2b2f"
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
      }}
      tooltip={({ cell }) => (
        <div className="bg-[#1a1b1e] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
          <span className="text-[#FA6E43] font-bold">{cell.serieId}</span> · {cell.data.x}: {cell.value}%
        </div>
      )}
    />
  )
}