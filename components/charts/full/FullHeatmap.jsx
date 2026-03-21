"use client";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import nivoTheme from "@/lib/nivo";

const defaultData = [
  {
    id: "Normalization",
    data: [
      { x: "Week 1", y: 18 },
      { x: "Week 2", y: 35 },
      { x: "Week 3", y: 29 },
      { x: "Week 4", y: 44 },
      { x: "Week 5", y: 38 },
      { x: "Week 6", y: 51 },
    ],
  },
  {
    id: "SQL Joins",
    data: [
      { x: "Week 1", y: 82 },
      { x: "Week 2", y: 74 },
      { x: "Week 3", y: 91 },
      { x: "Week 4", y: 68 },
      { x: "Week 5", y: 88 },
      { x: "Week 6", y: 79 },
    ],
  },
  {
    id: "Transactions",
    data: [
      { x: "Week 1", y: 55 },
      { x: "Week 2", y: 42 },
      { x: "Week 3", y: 61 },
      { x: "Week 4", y: 38 },
      { x: "Week 5", y: 70 },
      { x: "Week 6", y: 48 },
    ],
  },
  {
    id: "Indexing",
    data: [
      { x: "Week 1", y: 63 },
      { x: "Week 2", y: 88 },
      { x: "Week 3", y: 71 },
      { x: "Week 4", y: 92 },
      { x: "Week 5", y: 58 },
      { x: "Week 6", y: 85 },
    ],
  },
  {
    id: "FD Closure",
    data: [
      { x: "Week 1", y: 31 },
      { x: "Week 2", y: 14 },
      { x: "Week 3", y: 47 },
      { x: "Week 4", y: 22 },
      { x: "Week 5", y: 39 },
      { x: "Week 6", y: 28 },
    ],
  },
]

export default function FullHeatmap({ data = defaultData, onClick }) {
  return (
    <ResponsiveHeatMap
      data={data}
      theme={{
        ...nivoTheme,
        labels: {
          text: {
            fontSize: 11,
            fontWeight: 400,
            fill: "rgba(255,255,255,0.7)",
          },
        },
      }}
      margin={{ top: 24, right: 12, bottom: 32, left: 110 }}
      minValue={0}
      maxValue={100}
      borderRadius={5}
      borderWidth={3}
      borderColor="#1a1b1e"
      hoverTarget="cell"
      onClick={(cell) => onClick && onClick(cell)}
      colors={{
        type: "sequential",
        colors: ["rgba(250,110,67,0.12)", "rgba(250,110,67,0.78)", "#FA6E43"],
      }}
      emptyColor="#2A2B2F"
      labelTextColor="#C0C0C0"
      axisTop={{ tickSize: 0, tickPadding: 8 }}
      axisLeft={{ tickSize: 0, tickPadding: 10 }}
      axisRight={null}
      axisBottom={null}
tooltip={({ cell }) => (
  <div style={{
    background: "#212225",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "11px",
    color: "#fff",
    whiteSpace: "nowrap",
  }}>
    <span style={{ color: "#FA6E43", fontWeight: 600 }}>{cell.serieId}</span>
    {" · "}
    {cell.data.x}: {cell.value}%
  </div>
)}
    />
  );
}
