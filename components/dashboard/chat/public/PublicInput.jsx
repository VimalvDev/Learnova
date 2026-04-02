"use client"
import { useState } from "react"
import { RiArrowDownSLine, RiSendPlaneFill } from "react-icons/ri"

const formats = ["Explanation", "Definition", "Step-by-Step", "Comparison", "Summary"]
const depths  = ["Concise", "Standard", "Detailed"]

export default function PublicInput({ value, onChange, onGenerate, genType }) {
  const [format,     setFormat]     = useState("Explanation")
  const [depth,      setDepth]      = useState("Standard")
  const [fmtOpen,    setFmtOpen]    = useState(false)

  return (
    <div className="bg-card-dark rounded-xl border border-white/[0.06] focus-within:border-[#3B82F6]/30 transition-colors overflow-hidden">
      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onGenerate() } }}
        placeholder={`Enter a topic or question — e.g. "Explain the CAP theorem" or "What is memoization?"`}
        rows={3}
        className="w-full px-4 pt-4 pb-2 bg-transparent text-[13px] text-white placeholder:text-white/20 outline-none resize-none"
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-t border-white/[0.04] flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Format */}
          <div className="relative">
            <button
              onClick={() => setFmtOpen(!fmtOpen)}
              className="flex items-center gap-1.5 h-7 px-2.5 bg-card rounded-lg text-[11px] text-secondary-text hover:text-white transition-colors"
            >
              Format: <span className="text-white font-medium">{format}</span>
              <RiArrowDownSLine className="text-[12px]" />
            </button>
            {fmtOpen && (
              <div className="absolute bottom-9 left-0 w-36 bg-(--color-card-mid) rounded-xl border border-white/[0.06] shadow-2xl z-20 overflow-hidden">
                {formats.map((f) => (
                  <button key={f} onClick={() => { setFormat(f); setFmtOpen(false) }}
                    className={`w-full text-left px-3 py-2 text-[11px] hover:bg-white/[0.04] transition-colors ${format === f ? "text-brand" : "text-white"}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Depth */}
          <div className="flex items-center gap-0.5 p-0.5 bg-card rounded-lg">
            {depths.map((d) => (
              <button key={d} onClick={() => setDepth(d)}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${
                  depth === d
                    ? "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30"
                    : "text-tertiary-text hover:text-white"
                }`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-dark-gray">{value.length} / 500</span>
          <button
            onClick={onGenerate}
            disabled={!value.trim()}
            className={`flex items-center gap-1.5 h-8 px-4 text-[12px] font-bold rounded-lg transition-all ${
              value.trim() ? "bg-(--color-brand) text-white hover:brightness-110" : "bg-white/[0.05] text-dark-gray cursor-not-allowed"
            }`}
          >
            Generate <RiSendPlaneFill className="text-[12px]" />
          </button>
        </div>
      </div>
    </div>
  )
}