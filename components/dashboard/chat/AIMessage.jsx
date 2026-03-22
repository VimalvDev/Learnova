"use client"
import { useState } from "react"
import {
  RiThumbUpLine, RiThumbDownLine,
  RiFileCopyLine, RiBookmarkLine, RiExternalLinkLine,
  RiFileTextLine,
} from "react-icons/ri"

export default function AIMessage({ message, isPublic = false }) {
  const [liked,   setLiked]   = useState(null)
  const [saved,   setSaved]   = useState(false)
  const [showSave, setShowSave] = useState(false)

  const accentColor = isPublic ? "#4ADE80" : "#FA6E43"
  const confColor =
    message.confidence >= 85 ? "#FA6E43"
    : message.confidence >= 65 ? "#FBBF24"
    : "#F87171"

  const handleSave = () => {
    setSaved(true)
    setShowSave(true)
    setTimeout(() => setShowSave(false), 2500)
  }

  return (
    <div className="flex flex-col items-start gap-1 mb-6">
      <div
        className="w-full max-w-[80%] bg-[#212225] overflow-hidden"
        style={{
          borderRadius: "4px 14px 14px 14px",
          border: isPublic
            ? "1px solid rgba(74,222,128,0.1)"
            : "1px solid rgba(255,255,255,0.06)",
        }}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold" style={{ color: accentColor }}>
              Learnova AI
            </span>
            {isPublic && (
              <span
                className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(74,222,128,0.1)", color: "#4ADE80" }}
              >
                Public
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#444]">{message.time}</span>
        </div>

        {/* Public notice */}
        {isPublic && (
          <div className="px-4 pt-3">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-3"
              style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              <span className="text-[9px] text-[#4ADE80] font-medium">General AI Knowledge</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-4 py-3 text-[13px] text-white/85 leading-relaxed space-y-2.5">
          {message.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          {message.bullets?.length > 0 && (
            <ul className="flex flex-col gap-1.5 mt-1">
              {message.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full bg-[#FA6E43]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Citations */}
        {!isPublic && message.sources?.length > 0 && (
          <div className="px-4 py-2.5 border-t border-white/[0.04] flex flex-col gap-1">
            {message.sources.map((src, i) => (
              <div key={i} className="flex items-center gap-2 cursor-pointer group">
                <RiFileTextLine className="text-[#FA6E43]/50 text-[11px] flex-shrink-0" />
                <span className="text-[10px] text-[#555] group-hover:text-[#FA6E43] transition-colors">
                  {src}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Public footnote */}
        {isPublic && (
          <div className="px-4 py-2 border-t border-white/[0.04]">
            <p className="text-[10px] text-[#444]">
              Not sourced from your documents.
            </p>
          </div>
        )}

        {/* Confidence bar */}
        {!isPublic && message.confidence && (
          <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center gap-3">
            <span className="text-[10px] text-[#444]">Confidence</span>
            <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden max-w-[100px]">
              <div
                className="h-full rounded-full"
                style={{ width: `${message.confidence}%`, background: confColor }}
              />
            </div>
            <span className="text-[11px] font-semibold" style={{ color: confColor }}>
              {message.confidence}%
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center gap-3">
          <button
            onClick={() => setLiked(true)}
            style={{ color: liked === true ? "#FA6E43" : "#444" }}
            className="transition-colors"
          >
            <RiThumbUpLine className="text-[14px]" />
          </button>
          <button
            onClick={() => setLiked(false)}
            style={{ color: liked === false ? "#F87171" : "#444" }}
            className="transition-colors"
          >
            <RiThumbDownLine className="text-[14px]" />
          </button>
          <div className="w-px h-3 bg-white/[0.06]" />
          <button
            onClick={() => navigator.clipboard?.writeText(message.paragraphs?.join(" ") ?? "")}
            className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-[#FA6E43] transition-colors"
          >
            <RiFileCopyLine className="text-[12px]" /> Copy
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-[#FA6E43] transition-colors"
          >
            <RiBookmarkLine className="text-[12px]" /> Save
          </button>
          {!isPublic && (
            <button className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-[#FA6E43] transition-colors ml-auto">
              <RiExternalLinkLine className="text-[12px]" /> Sources
            </button>
          )}
        </div>
      </div>

      {showSave && (
        <p className="text-[10px] text-[#4ADE80] px-1">✓ Saved to notes</p>
      )}
    </div>
  )
}