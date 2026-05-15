"use client";
import { RiDeleteBinLine, RiDownloadLine, RiHistoryLine } from "react-icons/ri";

export default function ChatHeader({ mode = "private" }) {
  const accentColor = mode === "public" ? "#4ADE80" : "#FA6E43";
  const isPublic = mode === "public";

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-dark">
      <div className="flex items-center gap-2.5">
        <h2 className="text-[14px] font-semibold text-white">
          {isPublic ? "Public AI Chat" : "Ask from Your Notes"}
        </h2>
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{
            background: isPublic
              ? "rgba(74,222,128,0.08)"
              : "rgba(250,110,67,0.08)",
            border: `1px solid ${isPublic ? "rgba(74,222,128,0.2)" : "rgba(250,110,67,0.2)"}`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accentColor }}
          />
          <span
            className="text-[9px] font-bold"
            style={{ color: accentColor }}
          >
            {isPublic ? "PUBLIC" : "PRIVATE"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 bg-card-dark text-[#888] text-[11px] rounded-xl hover:text-white transition-colors"
        >
          <RiDeleteBinLine className="text-[12px]" /> Clear
        </button>
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-card-dark text-[#888] text-[11px] rounded-xl hover:text-white transition-colors">
          <RiDownloadLine className="text-[12px]" /> Export
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 bg-card-dark text-[#888] text-[11px] rounded-xl hover:text-white transition-colors"
        >
          <RiHistoryLine className="text-[12px]" /> History
        </button>
      </div>
    </div>
  );
}
