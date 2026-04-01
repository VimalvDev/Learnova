"use client"
import Link from "next/link"
import { RiAlertLine } from "react-icons/ri"

export default function LowConfidenceMessage({ time, bestMatch, threshold }) {
  return (
    <div className="flex flex-col items-start mb-6">
      <div
        className="w-full max-w-[80%] bg-card-dark overflow-hidden"
        style={{
          borderRadius: "4px 14px 14px 14px",
          border: "1px solid rgba(251,191,36,0.12)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <RiAlertLine className="text-[#FBBF24] text-[13px]" />
            <span className="text-[12px] font-semibold text-[#FBBF24]">Low Confidence</span>
          </div>
          <span className="text-[10px] text-[#444]">{time}</span>
        </div>

        <div className="px-4 py-3">
          <p className="text-[13px] text-white/85 mb-3">
            This question is not sufficiently covered in your uploaded documents.
          </p>

          {/* Match info */}
          <div className="bg-[#2A2B2F] rounded-xl p-3 mb-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-secondary-text">Best match found</span>
              <span className="text-[11px] font-semibold text-[#F87171]">{bestMatch}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-secondary-text">Threshold required</span>
              <span className="text-[11px] font-semibold text-white">{threshold}%</span>
            </div>
            {/* Gap bar */}
            <div className="mt-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#F87171]"
                style={{ width: `${bestMatch}%` }}
              />
            </div>
          </div>

          {/* Suggestions */}
          <ul className="flex flex-col gap-1 mb-3">
            {[
              "The topic may be in a document not yet uploaded",
              "Try rephrasing using terms from your notes",
              "This concept may not be in your course scope",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[11px] text-secondary-text">
                <span className="text-[#FBBF24] flex-shrink-0 mt-0.5">·</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 text-[11px] font-medium text-[#FBBF24] rounded-lg transition-all"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}
            >
              Switch to Public Mode
            </button>
            <Link
              href="/courses/new"
              className="px-3 py-1.5 text-[11px] font-semibold text-white bg-brand rounded-lg hover:brightness-110 transition-all"
            >
              Upload Documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}