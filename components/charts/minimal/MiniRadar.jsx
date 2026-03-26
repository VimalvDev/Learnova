// components/charts/minimal/MiniRadar.jsx
"use client"
import { ResponsiveRadar } from "@nivo/radar"
import nivoTheme from "@/lib/nivo"

const data = [
  { skill: "Accuracy",    score: 78 },
  { skill: "Speed",       score: 62 },
  { skill: "Consistency", score: 85 },
  { skill: "Retention",   score: 54 },
  { skill: "Improvement", score: 91 },
  { skill: "Engagement",  score: 70 },
]

export default function MiniRadar() {
  return (
    <ResponsiveRadar
      data={data}
      keys={["score"]}
      indexBy="skill"
      theme={{
        ...nivoTheme,
        grid: {
          line: {
            stroke: "rgba(255,255,255,0.12)",
            strokeWidth: 1,
          },
        },
      }}
      maxValue={100}
      margin={{ top: 28, right: 56, bottom: 28, left: 56 }}
      gridLevels={4}
      gridShape="circular"
      gridLabelOffset={12}
      colors={["var(--color-brand)"]}
      fillOpacity={0.12}
      borderWidth={2}
      borderColor="var(--color-brand)"
      dotSize={5}
      dotColor="var(--color-brand)"
      dotBorderWidth={2}
      dotBorderColor="#212225"
      blendMode="normal"
      animate
    />
  )
}