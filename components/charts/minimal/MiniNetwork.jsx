// components/charts/minimal/MiniNetwork.jsx
"use client"
import { ResponsiveNetwork } from "@nivo/network"
import nivoTheme  from "@/lib/nivo"

const data = {
  nodes: [
    { id: "SQL",           group: "mastered",  value: 22 },
    { id: "Joins",         group: "mastered",  value: 16 },
    { id: "Normalization", group: "critical",  value: 18 },
    { id: "2NF",           group: "critical",  value: 14 },
    { id: "Indexes",       group: "revision",  value: 16 },
    { id: "Transactions",  group: "revision",  value: 14 },
    { id: "3NF",           group: "unstudied", value: 12 },
  ],
  links: [
    { source: "SQL",           target: "Joins",         distance: 80  },
    { source: "SQL",           target: "Normalization",  distance: 90  },
    { source: "SQL",           target: "Indexes",        distance: 80  },
    { source: "SQL",           target: "Transactions",   distance: 85  },
    { source: "Normalization", target: "2NF",            distance: 65  },
    { source: "2NF",           target: "3NF",            distance: 60  },
  ],
}

const nodeColors = {
  mastered:  "#FA6E43",
  revision:  "#FBBF24",
  critical:  "#F87171",
  unstudied: "#3a3b3f",
}

export default function MiniNetwork() {
  return (
    <ResponsiveNetwork
      data={data}
      theme={nivoTheme}
      margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
      linkDistance={(e) => e.distance}
      centeringStrength={0.5}
      repulsivity={10}
      iterations={100}
      nodeSize={(n) => n.value}
      nodeColor={(n) => nodeColors[n.group]}
      nodeBorderWidth={0}
      linkThickness={1.5}
      linkColor={{ from: "source.color", modifiers: [["opacity", 0.3]] }}
      nodeLabel="id"
      labelTextColor={(n) =>
        n.group === "unstudied" ? "rgba(255,255,255,0.3)" : "#000"
      }
      animate
      motionConfig="gentle"
    />
  )
}