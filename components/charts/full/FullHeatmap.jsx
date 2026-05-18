"use client"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import nivoTheme from "@/lib/nivo"

export default function FullHeatmap({ data = [], onClick }) {
  if (data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[12px] text-[#444]">No mastery data yet</p>
      </div>
    )
  }

  return (
    <ResponsiveHeatMap
      data={data}
      theme={{
        ...nivoTheme,
        labels: { text: { fontSize: 11, fontWeight: 400, fill: "rgba(255,255,255,0.7)" } },
      }}
      margin={{ top: 24, right: 12, bottom: 32, left: 110 }}
      minValue={0}
      maxValue={100}
      borderRadius={5}
      borderWidth={3}
      borderColor="var(--color-card)"
      hoverTarget="cell"
      onClick={(cell) => onClick && onClick(cell)}
      colors={{
        type: "sequential",
        colors: [
          "color-mix(in srgb, var(--color-brand) 12%, transparent)",
          "color-mix(in srgb, var(--color-brand) 78%, transparent)",
          "var(--color-brand)",
        ],
      }}
      emptyColor="#2A2B2F"
      labelTextColor="#C0C0C0"
      axisTop={{ tickSize: 0, tickPadding: 8 }}
      axisLeft={{ tickSize: 0, tickPadding: 10 }}
      axisRight={null}
      axisBottom={null}
      tooltip={({ cell }) => (
        <div style={{ background: "#212225", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", color: "#fff", whiteSpace: "nowrap" }}>
          <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{cell.serieId}</span>
          {" · "}{cell.data.x}: {cell.value}%
        </div>
      )}
    />
  )
}