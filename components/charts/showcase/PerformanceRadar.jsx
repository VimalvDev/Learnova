// components/charts/showcase/PerformanceRadar.jsx
"use client"
import { ResponsiveRadar } from "@nivo/radar"
import nivoTheme  from "@/lib/nivo"

const data = [
  { skill: "Accuracy",    score: 78 },
  { skill: "Speed",       score: 62 },
  { skill: "Consistency", score: 85 },
  { skill: "Retention",   score: 54 },
  { skill: "Improvement", score: 91 },
  { skill: "Engagement",  score: 70 },
]

export default function PerformanceRadar() {
  return (
    <ResponsiveRadar
      data={data}
      keys={["score"]}
      indexBy="skill"
      theme={{
        ...nivoTheme,
        grid: {
          line: {
            stroke: "rgba(255,255,255,0.1)",
            strokeWidth: 1,
          },
        },
      }}
      maxValue={100}
      margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
      gridLevels={4}
      gridShape="circular"
      gridLabelOffset={16}
      colors={["#FA6E43"]}
      fillOpacity={0.12}
      borderWidth={2}
      borderColor="#FA6E43"
      dotSize={7}
      dotColor="#FA6E43"
      dotBorderWidth={2}
      dotBorderColor="#1a1b1e"
      blendMode="normal"
      animate
    />
  )
}