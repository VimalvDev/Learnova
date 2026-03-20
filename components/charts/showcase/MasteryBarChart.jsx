
// components/charts/showcase/MasteryBarChart.jsx
"use client"
import { ResponsiveBar } from "@nivo/bar"
import nivoTheme  from "@/lib/nivo"

const data = [
  { topic: "SQL",              mastery: 91 },
  { topic: "Python",           mastery: 78 },
  { topic: "Java",             mastery: 62 },
  { topic: "Networking",       mastery: 45 },
  { topic: "Normalization",    mastery: 34 },
  { topic: "Transactions",     mastery: 28 },
  { topic: "Graph Traversal",  mastery: 55 },
  { topic: "Indexing",         mastery: 40 },
]

export default function MasteryBarChart() {
  return (
    <ResponsiveBar
      data={data}
      keys={["mastery"]}
      indexBy="topic"
      theme={nivoTheme}
      layout="horizontal"
      maxValue={100}
      colors={({ data }) =>
        data.mastery >= 75
          ? "#FA6E43"
          : data.mastery >= 50
          ? "rgba(250,110,67,0.6)"
          : "rgba(250,110,67,0.3)"
      }
      margin={{ top: 8, right: 60, bottom: 8, left: 120 }}
      padding={0.35}
      borderRadius={4}
      label={(d) => `${d.value}%`}
      labelTextColor="#ffffff"
      labelSkipWidth={24}
      axisLeft={{
        tickSize: 0,
        tickPadding: 12,
      }}
      axisBottom={null}
      gridXValues={[0, 25, 50, 75, 100]}
      tooltip={({ data, value }) => (
        <div className="bg-[#1a1b1e] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
          {data.topic}: <span className="text-[#FA6E43] font-bold">{value}%</span>
        </div>
      )}
    />
  )
}