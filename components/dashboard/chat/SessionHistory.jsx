"use client"
import { RiArrowLeftLine, RiChat3Line, RiTimeLine } from "react-icons/ri"

const sessions = [
  {
    id: 1,
    date: "Today",
    time: "2:34 PM",
    name: "DBMS — Normalization Session",
    questions: 12,
    avgConf: 86,
    mode: "private",
    href: "#",
  },
  {
    id: 2,
    date: "Today",
    time: "11:20 AM",
    name: "DBMS — Indexing Deep Dive",
    questions: 7,
    avgConf: 91,
    mode: "private",
    href: "#",
  },
  {
    id: 3,
    date: "Yesterday",
    time: "6:12 PM",
    name: "DBMS — ER Model Review",
    questions: 8,
    avgConf: 79,
    mode: "private",
    href: "#",
  },
  {
    id: 4,
    date: "Yesterday",
    time: "2:05 PM",
    name: "General — Quantum Computing",
    questions: 5,
    avgConf: null,
    mode: "public",
    href: "#",
  },
  {
    id: 5,
    date: "Mar 20",
    time: "4:48 PM",
    name: "DBMS — Transaction Management",
    questions: 14,
    avgConf: 74,
    mode: "private",
    href: "#",
  },
  {
    id: 6,
    date: "Mar 19",
    time: "9:30 AM",
    name: "General — Data Structures Overview",
    questions: 9,
    avgConf: null,
    mode: "public",
    href: "#",
  },
]

const grouped = sessions.reduce((acc, session) => {
  if (!acc[session.date]) acc[session.date] = []
  acc[session.date].push(session)
  return acc
}, {})

export default function SessionHistory({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#171717] text-[#888] hover:text-white transition-colors flex-shrink-0"
        >
          <RiArrowLeftLine className="text-[14px]" />
        </button>
        <h3 className="text-[13px] font-semibold text-white">Session History</h3>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} className="mb-5">

            {/* Date label */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#444] mb-2 px-1">
              {date}
            </p>

            <div className="flex flex-col gap-2">
              {items.map((session) => (
                <div
                  key={session.id}
                  className="bg-[#111] rounded-xl p-3.5 hover:bg-[#151515] transition-all cursor-pointer group"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: session.mode === "private"
                            ? "rgba(250,110,67,0.1)"
                            : "rgba(74,222,128,0.1)",
                        }}
                      >
                        <RiChat3Line
                          className="text-[12px]"
                          style={{
                            color: session.mode === "private" ? "#FA6E43" : "#4ADE80",
                          }}
                        />
                      </div>
                      <p className="text-[12px] font-medium text-white truncate">
                        {session.name}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#444] flex-shrink-0">{session.time}</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5">
                      <RiChat3Line className="text-[#555] text-[11px]" />
                      <span className="text-[10px] text-[#666]">
                        {session.questions} questions
                      </span>
                    </div>

                    {session.avgConf !== null ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${session.avgConf}%`,
                              background: session.avgConf >= 80
                                ? "#FA6E43"
                                : session.avgConf >= 65
                                ? "#FBBF24"
                                : "#F87171",
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-[#666]">
                          {session.avgConf}% avg conf
                        </span>
                      </div>
                    ) : (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(74,222,128,0.08)", color: "#4ADE80" }}
                      >
                        Public
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <RiTimeLine className="text-[#444] text-[11px]" />
                      <span className="text-[10px] text-[#444]">{session.date} · {session.time}</span>
                    </div>
                    <button
                      className="text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: session.mode === "private" ? "#FA6E43" : "#4ADE80" }}
                    >
                      {session.id === 1 ? "Resume →" : "Open →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
        <p className="text-[10px] text-[#444] text-center">
          {sessions.length} sessions · Auto-saved
        </p>
      </div>

    </div>
  )
}