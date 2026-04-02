"use client"
import { useState } from "react"

const logs = [
  { time: "3:42:14 PM", user: "alex@university.edu", event: "Document uploaded",   resource: "DBMS_Notes.pdf",     status: "success" },
  { time: "3:41:02 PM", user: "sara@campus.edu",      event: "Quiz generated",     resource: "OS Unit 3",          status: "success" },
  { time: "3:38:47 PM", user: "System",               event: "Embedding completed",resource: "312 chunks",         status: "success" },
  { time: "3:35:21 PM", user: "john@example.com",     event: "Login",              resource: "Chrome/macOS",       status: "success" },
  { time: "3:31:09 PM", user: "System",               event: "OCR processed",      resource: "Handwritten_1.jpg",  status: "success" },
  { time: "3:28:44 PM", user: "mark@uni.edu",         event: "API call",           resource: "RAG Query",          status: "success" },
  { time: "3:24:17 PM", user: "System",               event: "Email failed",       resource: "Delivery attempt",   status: "failed"  },
  { time: "3:19:53 PM", user: "System",               event: "Quiz completed",     resource: "DBMS Unit 2",        status: "success" },
]

const filters = ["All","Uploads","Quizzes","Auth","Errors","API"]

export default function ActivityLog() {
  const [filter, setFilter] = useState("All")

  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between px-6 py-5 border-b border-card-dark flex-wrap gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Activity Log</p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Recent Platform Events</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 text-[11px] text-secondary-text bg-card-dark rounded-lg border border-white/[0.06] hover:text-white transition-colors">
            ↓ Download Log
          </button>
          <select className="h-8 px-2 bg-card-dark text-[11px] text-secondary-text rounded-lg border border-white/[0.06] outline-none cursor-pointer">
            <option>All Events ▾</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 px-5 py-3 bg-card-dark border-b border-white/[0.04] flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all ${
              filter === f ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
            }`}>{f}</button>
        ))}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_1fr] gap-3 px-5 py-2.5 bg-card-dark border-b border-white/[0.04]">
        {["Timestamp","User","Event","Resource","Status"].map(h => (
          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-dark-gray">{h}</span>
        ))}
      </div>

      {logs.map((l, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_1fr] gap-3 items-center px-5 py-3 hover:bg-white/[0.01] transition-colors cursor-pointer ${
            i < logs.length - 1 ? "border-b border-white/[0.03]" : ""
          } ${l.status === "failed" ? "bg-[var(--color-red)]/[0.02]" : ""}`}
        >
          <span className="text-[11px] text-tertiary-text font-mono">{l.time}</span>
          <span className={`text-[11px] truncate ${l.user === "System" ? "text-tertiary-text italic" : "text-secondary-text"}`}>
            {l.user}
          </span>
          <span className="text-[12px] font-medium text-white">{l.event}</span>
          <span className="text-[11px] text-secondary-text truncate">{l.resource}</span>
          <span className={`text-[11px] font-medium ${l.status === "success" ? "text-[#4ADE80]" : "text-[var(--color-red)]"}`}>
            {l.status === "success" ? "✓ Success" : "✗ Failed"}
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between px-5 py-3.5 bg-card-dark border-t border-white/[0.04]">
        <span className="text-[11px] text-tertiary-text">Showing last 50 events · Auto-updating</span>
        <div className="flex items-center gap-3">
          <button className="text-[11px] text-brand hover:underline">Load More</button>
          <span className="text-dark-gray">·</span>
          <button className="text-[11px] text-brand hover:underline">Jump to Error</button>
        </div>
      </div>
    </div>
  )
}