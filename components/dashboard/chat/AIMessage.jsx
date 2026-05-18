"use client"
import { useState } from "react"
import MarkdownMessage from "./MarkdownMessage"
import { RiFileCopyLine, RiThumbUpLine, RiThumbDownLine, RiAlertLine } from "react-icons/ri"

export default function AIMessage({ message, mode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isLowConf = message.isLowConf
  const isError   = message.isError

  return (
    <div className="flex flex-col gap-2 max-w-[85%]">
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-semibold text-brand">Learnova AI</span>
        <span className="text-[10px] text-tertiary-text">{message.time}</span>
        {isLowConf && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FBBF24]/10 rounded-full">
            <RiAlertLine className="text-[#FBBF24] text-[10px]" />
            <span className="text-[9px] font-bold text-[#FBBF24]">LOW CONFIDENCE</span>
          </div>
        )}
      </div>

      <div
        className={`rounded-2xl rounded-tl-sm px-5 py-4 ${
          isError   ? "bg-red-500/[0.06] border border-red-500/20"
          : isLowConf ? "bg-[#FBBF24]/[0.04] border border-[#FBBF24]/15"
          : "bg-card"
        }`}
      >
        <MarkdownMessage content={message.content} />

        {/* Confidence bar — private mode only */}
        {mode === "private" && message.confidence !== null && message.confidence !== undefined && (
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.06]">
            <span className="text-[10px] text-tertiary-text shrink-0">Confidence</span>
            <div className="flex-1 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${message.confidence}%`,
                  background: message.confidence >= 70 ? "#FA6E43" : message.confidence >= 50 ? "#FBBF24" : "#F87171",
                }}
              />
            </div>
            <span
              className="text-[11px] font-bold shrink-0"
              style={{
                color: message.confidence >= 70 ? "#FA6E43" : message.confidence >= 50 ? "#FBBF24" : "#F87171",
              }}
            >
              {message.confidence}%
            </span>
          </div>
        )}

        {/* Low confidence note */}
        {isLowConf && (
          <div className="mt-3 pt-3 border-t border-[#FBBF24]/10">
            <p className="text-[11px] text-[#FBBF24]/70">
              Low match in your documents. Consider switching to Public Mode for a general answer.
            </p>
          </div>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-tertiary-text hover:text-white transition-colors"
        >
          <RiFileCopyLine className="text-[12px]" />
          {copied ? "Copied!" : "Copy"}
        </button>
        <button className="text-tertiary-text hover:text-white transition-colors">
          <RiThumbUpLine className="text-[13px]" />
        </button>
        <button className="text-tertiary-text hover:text-white transition-colors">
          <RiThumbDownLine className="text-[13px]" />
        </button>
      </div>
    </div>
  )
}