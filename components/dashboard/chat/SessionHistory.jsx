"use client"
import { useState, useEffect } from "react"
import { RiArrowLeftLine, RiChat3Line, RiTimeLine } from "react-icons/ri"

function timeAgo(dateStr) {
  const diff  = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 60)  return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  if (days  === 1) return "Yesterday"
  return `${days}d ago`
}

export default function SessionHistory({ onClose }) {
  const [sessions, setSessions] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res  = await fetch("/api/chat/sessions")
        const data = await res.json()
        setSessions(data.sessions ?? [])
      } catch {}
      finally { setLoading(false) }
    }
    fetchSessions()
  }, [])

  const grouped = sessions.reduce((acc, s) => {
    const label = timeAgo(s.created_at).includes("ago") && !timeAgo(s.created_at).includes("d ago")
      ? "Today"
      : timeAgo(s.created_at) === "Yesterday"
      ? "Yesterday"
      : new Date(s.created_at).toLocaleDateString()
    if (!acc[label]) acc[label] = []
    acc[label].push(s)
    return acc
  }, {})

  return (
    <div className="flex flex-col h-full bg-dark">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#171717] text-[#888] hover:text-white transition-colors flex-shrink-0"
        >
          <RiArrowLeftLine className="text-[14px]" />
        </button>
        <h3 className="text-[13px] font-semibold text-white">Session History</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading && (
          <p className="text-[12px] text-tertiary-text text-center py-8">Loading sessions...</p>
        )}
        {!loading && sessions.length === 0 && (
          <p className="text-[12px] text-tertiary-text text-center py-8">No sessions yet.</p>
        )}
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#444] mb-2 px-1">{date}</p>
            <div className="flex flex-col gap-2">
              {items.map((session) => (
                <div key={session.id} className="bg-[#111] rounded-xl p-3.5 hover:bg-[#151515] transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: session.mode === "private" ? "rgba(250,110,67,0.1)" : "rgba(74,222,128,0.1)" }}
                      >
                        <RiChat3Line
                          className="text-[12px]"
                          style={{ color: session.mode === "private" ? "#FA6E43" : "#4ADE80" }}
                        />
                      </div>
                      <p className="text-[12px] font-medium text-white truncate">
                        {session.session_title ?? "Untitled Session"}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#444] flex-shrink-0">{timeAgo(session.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: session.mode === "private" ? "rgba(250,110,67,0.08)" : "rgba(74,222,128,0.08)",
                        color: session.mode === "private" ? "#FA6E43" : "#4ADE80",
                      }}
                    >
                      {session.mode === "private" ? "Private" : "Public"}
                    </span>
                    <span className="text-[10px] text-[#444] flex items-center gap-1">
                      <RiTimeLine className="text-[10px]" />
                      {new Date(session.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
        <p className="text-[10px] text-[#444] text-center">{sessions.length} sessions · Auto-saved</p>
      </div>
    </div>
  )
}