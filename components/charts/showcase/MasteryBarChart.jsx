"use client";
import { ResponsiveBar } from "@nivo/bar";
import nivoTheme from "@/lib/nivo";

const data = [
  { topic: "SQL", mastery: 80 },
  { topic: "Python", mastery: 60 },
  { topic: "Java", mastery: 45 },
  { topic: "Networking", mastery: 91 },
  { topic: "Postgres", mastery: 20 },
  { topic: "Algorithms", mastery: 55 },
];

export default function TopicBarChart() {
  return (
    <ResponsiveBar
      data={data}
      keys={["mastery"]}
      indexBy="topic"
      theme={nivoTheme}
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
      }}
      margin={{ top: 8, right: 8, bottom: 36, left: 32 }}
      padding={0.15}
      borderRadius={6}
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
              fill="var(--color-card-mid)"
              rx={14}
            />
          )),
        "bars",
        "markers",
        "legends",
      ]}
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
          <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>
            {value}%
          </span>
        </div>
      )}
    />
  );
}
