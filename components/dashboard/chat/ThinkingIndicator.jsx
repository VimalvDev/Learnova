"use client"
import { useEffect, useState } from "react"

const stages = [
  "Searching your documents...",
  "Retrieving top sections...",
  "Generating answer...",
]

export default function ThinkingIndicator({ isPublic = false }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t = setInterval(() =>
      setStage((s) => (s < stages.length - 1 ? s + 1 : s)), 1200
    )
    return () => clearInterval(t)
  }, [])

  const color = isPublic ? "#4ADE80" : "#FA6E43"

  return (
    <div className="flex flex-col items-start gap-1 mb-5">
      <div
        className="px-4 py-3 bg-[#171717] flex items-center gap-3"
        style={{ borderRadius: "14px 14px 14px 4px" }}
      >
        <span className="text-[12px] text-[#888]">
          {isPublic ? "Generating answer..." : stages[stage]}
        </span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: color,
                animation: `chatPulse 1.2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes chatPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}