"use client";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import nivoTheme from "@/lib/nivo";

const data = [
  {
    id: "Normalization",
    data: [
      { x: "Week 1", y: 22 },
      { x: "Week 2", y: 35 },
      { x: "Week 3", y: 28 },
      { x: "Week 4", y: 41 },
      { x: "Week 5", y: 34 },
      { x: "Week 6", y: 52 },
    ],
  },
  {
    id: "SQL Joins",
    data: [
      { x: "Week 1", y: 55 },
      { x: "Week 2", y: 62 },
      { x: "Week 3", y: 70 },
      { x: "Week 4", y: 75 },
      { x: "Week 5", y: 82 },
      { x: "Week 6", y: 91 },
    ],
  },
  {
    id: "Transactions",
    data: [
      { x: "Week 1", y: 40 },
      { x: "Week 2", y: 38 },
      { x: "Week 3", y: 45 },
      { x: "Week 4", y: 42 },
      { x: "Week 5", y: 50 },
      { x: "Week 6", y: 48 },
    ],
  },
  {
    id: "Indexing",
    data: [
      { x: "Week 1", y: 15 },
      { x: "Week 2", y: 20 },
      { x: "Week 3", y: 18 },
      { x: "Week 4", y: 25 },
      { x: "Week 5", y: 22 },
      { x: "Week 6", y: 30 },
    ],
  },
  {
    id: "FD Closure",
    data: [
      { x: "Week 1", y: 10 },
      { x: "Week 2", y: 12 },
      { x: "Week 3", y: 15 },
      { x: "Week 4", y: 11 },
      { x: "Week 5", y: 18 },
      { x: "Week 6", y: 20 },
    ],
  },
];

export default function WeaknessHeatmap() {
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
      }}      margin={{ top: 24, right: 12, bottom: 32, left: 100 }}
      minValue={0}
      maxValue={100}
      borderRadius={5}
      borderWidth={3}
      borderColor="#1a1b1e"
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
      hoverTarget="cell"
      axisTop={{
        tickSize: 0,
        tickPadding: 8,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
      }}
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
