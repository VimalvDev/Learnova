"use client"
import { ResponsiveRadar } from "@nivo/radar"
import nivoTheme from "@/lib/nivo"

const defaultData = [
  { skill: "Accuracy",    score: 78 },
  { skill: "Speed",       score: 62 },
  { skill: "Consistency", score: 85 },
  { skill: "Retention",   score: 54 },
  { skill: "Improvement", score: 91 },
  { skill: "Engagement",  score: 70 },
]

export default function FullRadar({ data = defaultData, onClick }) {
  return (
    <ResponsiveRadar
      data={data}
      keys={["score"]}
      indexBy="skill"
      theme={{
        ...nivoTheme,
        grid: {
          line: {
            stroke: "rgba(255,255,255,0.08)",
            strokeWidth: 1,
          },
        },
      }}
      maxValue={100}
      margin={{ top: 32, right: 80, bottom: 32, left: 80 }}
      gridLevels={4}
      gridShape="circular"
      gridLabelOffset={14}
      colors={["var(--color-brand)"]}
      fillOpacity={0.1}
      borderWidth={2}
      borderColor="var(--color-brand)"
      dotSize={6}
      dotColor="var(--color-brand)"
      dotBorderWidth={2}
      dotBorderColor="#0D0D0D"
      blendMode="normal"
      animate
      tooltip={({ index, value }) => (
        <div className="bg-card-dark border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
          {index}: <span className="text-brand font-bold">{value}%</span>
        </div>
      )}
    />
  )
}