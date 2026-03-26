"use client";
import { ResponsiveBar } from "@nivo/bar";
import nivoTheme from "@/lib/nivo";

const defaultData = [
  { topic: "Normalization", mastery: 42 },
  { topic: "Transactions", mastery: 62 },
  { topic: "ACID", mastery: 80 },
  { topic: "2NF / 3NF", mastery: 34 },
  { topic: "FD Closure", mastery: 55 },
  { topic: "SQL Joins", mastery: 91 },
  { topic: "ER Diagrams", mastery: 74 },
  { topic: "Indexing", mastery: 85 },
];

export default function FullBarChart({ data = defaultData, onClick }) {
  return (
    <ResponsiveBar
      data={data}
      keys={["mastery"]}
      indexBy="topic"
      theme={{
        ...nivoTheme,
        axis: {
          ticks: {
            text: {
              fill: "#555",
              fontSize: 10,
              fontWeight: 400,
            },
          },
        },
        labels: {
          text: {
            fill: "rgba(255,255,255,0.75)",
            fontSize: 10,
            fontWeight: 500,
          },
        },
      }}
      layout="vertical"
      maxValue={100}
      onClick={(bar) => onClick && onClick(bar.data)}
      colors={(bar) => {
        const v = bar.data.mastery;
        if (v >= 75) return "var(--color-brand)";
        if (v >= 50)
          return "color-mix(in srgb, var(--color-brand) 65%, transparent)";
        if (v >= 25)
          return "color-mix(in srgb, var(--color-brand) 35%, transparent)";
        return "color-mix(in srgb, var(--color-brand) 15%, transparent)";
      }}
      margin={{ top: 8, right: 8, bottom: 64, left: 36 }}
      padding={0.15}
      borderRadius={6}
      label={(d) => `${d.value}%`}
      labelTextColor="rgba(255,255,255,0.75)"
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
        tickRotation: -35,
      }}
      enableGridX={false}
      enableGridY
      gridYValues={[0, 25, 50, 75, 100]}
      animate
      motionConfig="gentle"
      tooltip={({ data, value }) => (
        <div
          style={{
            background: "#212225",
            borderRadius: "8px",
            padding: "6px 10px",
            fontSize: "11px",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          {data.topic}:{" "}
          <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{value}%</span>
        </div>
      )}
    />
  );
}
