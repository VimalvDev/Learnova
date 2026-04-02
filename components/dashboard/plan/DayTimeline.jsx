"use client"
import { useState } from "react"
import { RiTimeLine, RiArrowDownSLine } from "react-icons/ri"

const sessionTypeEdge = {
  review:   "bg-(--color-brand)",
  quiz:     "bg-[#FBBF24]",
  revision: "bg-[#4ADE80]",
  chat:     "bg-(--color-dark-gray)",
}

const days = [
  {
    type: "completed",
    label: "Day 0", date: "Mon, Feb 23",
    summary: "✓ All complete · +4% mastery gain",
    sessions: [],
  },
  {
    type: "active",
    label: "Day 1", date: "Tuesday, Feb 24", est: "2h 30m",
    sessions: [
      { type: "review",   title: "Review Functional Dependency",       sub: "Concept review · Priority: High",         duration: "30 min" },
      { type: "quiz",     title: "Practice 5 Easy Questions — Func. Dep.", sub: "Adaptive quiz · Easy difficulty",      duration: "20 min" },
      { type: "revision", title: "Revision Session — Candidate Keys",  sub: "Scheduled spaced repetition",             duration: "15 min" },
      { type: "chat",     title: "AI Chat — Clarify doubts",           sub: "Suggested: 3–5 questions from notes",     duration: "25 min" },
    ],
  },
  {
    type: "upcoming",
    label: "Day 2", date: "Wed, Feb 25", est: "2h 15m",
    sessions: [
      { type: "review",   title: "Deep Dive — Normalization Basics",   sub: "Concept review · Priority: Critical",     duration: "45 min" },
      { type: "quiz",     title: "Practice Quiz — Normalization",       sub: "Adaptive quiz · Easy difficulty",         duration: "20 min" },
      { type: "revision", title: "Revision — Functional Dependency",    sub: "Spaced repetition follow-up",             duration: "15 min" },
    ],
  },
  {
    type: "buffer",
    label: "Day 5", date: "Sat, Feb 28",
    summary: "Buffer Day · Catch-up or rest",
    sessions: [],
  },
  {
    type: "milestone",
    label: "Day 7", date: "Mon, Mar 2", est: "45 min",
    title: "Unit Assessment Quiz",
    sub: "Adaptive · 15 questions · Medium difficulty",
    sessions: [],
  },
]

function SessionRow({ session, checked, onCheck }) {
  return (
    <div
      className={`flex items-start gap-3 py-3 border-b border-white/[0.03] last:border-0 ${checked ? "opacity-50" : ""}`}
    >
      {/* Left type accent */}
      <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${sessionTypeEdge[session.type]}`} />

      {/* Checkbox */}
      <button
        onClick={onCheck}
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
          checked
            ? "bg-(--color-brand) border-(--color-brand)"
            : "border-white/[0.2] bg-transparent"
        }`}
      />

      <div className="flex-1 min-w-0">
        <p className={`text-[12px] font-medium ${checked ? "line-through text-secondary-text" : "text-white"}`}>
          {session.title}
        </p>
        <p className="text-[10px] text-tertiary-text mt-0.5">{session.sub}</p>
      </div>
      <span className="text-[11px] text-secondary-text flex-shrink-0">{session.duration}</span>
    </div>
  )
}

export default function DayTimeline() {
  const [expandedDays, setExpandedDays] = useState(new Set(["Day 1"]))
  const [checked, setChecked] = useState({})
  const [view, setView] = useState("Detailed")

  const toggleDay  = (label) => setExpandedDays(prev => {
    const next = new Set(prev)
    next.has(label) ? next.delete(label) : next.add(label)
    return next
  })
  const toggleCheck = (dayLabel, idx) => {
    const key = `${dayLabel}-${idx}`
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="bg-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
            Daily Timeline
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">
            Day-by-Day Study Roadmap
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-7 px-3 text-[10px] text-secondary-text bg-card-dark rounded-lg hover:text-white transition-colors">
            Expand All
          </button>
          <button className="h-7 px-3 text-[10px] text-secondary-text bg-card-dark rounded-lg hover:text-white transition-colors">
            Collapse All
          </button>
          <div className="flex items-center gap-0.5 p-0.5 bg-card-dark rounded-lg">
            {["Compact", "Detailed"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${
                  view === v ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-5">
        {/* Vertical spine */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />

        <div className="flex flex-col gap-3">
          {days.map((day) => {
            const isExpanded = expandedDays.has(day.label)
            const sessionsChecked = (day.sessions || []).filter((_, i) => checked[`${day.label}-${i}`]).length
            const totalSessions   = (day.sessions || []).length

            return (
              <div key={day.label} className="relative">
                {/* Connector dot */}
                <div className={`absolute -left-5 top-4 w-2.5 h-2.5 rounded-full border-2 border-(--color-card) -translate-x-1/2 z-10 ${
                  day.type === "completed"  ? "bg-[#4ADE80]"
                  : day.type === "active"  ? "bg-(--color-brand) ring-2 ring-(--color-brand)/30"
                  : day.type === "buffer"  ? "bg-(--color-dark-gray)"
                  : day.type === "milestone" ? "rotate-45 rounded-none bg-[#FBBF24]"
                  : "bg-(--color-dark-gray)"
                }`} />

                {/* Completed day */}
                {day.type === "completed" && (
                  <div className="bg-card-dark rounded-xl px-4 py-3 opacity-70">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-secondary-text">{day.label}</span>
                        <span className="text-dark-gray">·</span>
                        <span className="text-[11px] text-tertiary-text">{day.date}</span>
                      </div>
                      <span className="text-[11px] text-[#4ADE80]">{day.summary}</span>
                    </div>
                  </div>
                )}

                {/* Active day */}
                {day.type === "active" && (
                  <div className="bg-card-dark rounded-xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-(--color-brand) rounded-l-xl" />
                    <div className="pl-4 pr-4 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-brand">{day.label}</span>
                          <span className="text-dark-gray">·</span>
                          <span className="text-[12px] text-secondary-text">{day.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-tertiary-text">
                          <RiTimeLine className="text-[12px]" />
                          <span className="text-[11px]">Est: {day.est}</span>
                        </div>
                      </div>
                      {day.sessions.map((s, i) => (
                        <SessionRow
                          key={i} session={s}
                          checked={!!checked[`${day.label}-${i}`]}
                          onCheck={() => toggleCheck(day.label, i)}
                        />
                      ))}
                    </div>
                    {/* Day progress */}
                    <div className="px-4 py-3 border-t border-white/[0.04]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-tertiary-text">
                          {sessionsChecked} / {totalSessions} sessions completed
                        </span>
                      </div>
                      <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-(--color-brand) rounded-full transition-all"
                          style={{ width: totalSessions ? `${(sessionsChecked / totalSessions) * 100}%` : "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Upcoming day */}
                {day.type === "upcoming" && (
                  <div className="bg-card-dark rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleDay(day.label)}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[12px] font-semibold text-secondary-text">{day.label}</span>
                        <span className="text-dark-gray">·</span>
                        <span className="text-[11px] text-tertiary-text">{day.date}</span>
                        <span className="text-dark-gray">·</span>
                        <span className="text-[11px] text-tertiary-text">
                          {day.sessions.length} sessions · Est: {day.est}
                        </span>
                      </div>
                      <RiArrowDownSLine
                        className={`text-brand text-[14px] transition-transform flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/[0.04]">
                        {day.sessions.map((s, i) => (
                          <SessionRow
                            key={i} session={s}
                            checked={!!checked[`${day.label}-${i}`]}
                            onCheck={() => toggleCheck(day.label, i)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Buffer day */}
                {day.type === "buffer" && (
                  <div className="rounded-xl px-4 py-3.5" style={{ border: "1px dashed rgba(255,255,255,0.08)", background: "transparent" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-dark-gray">{day.label}</span>
                      <span className="text-dark-gray">·</span>
                      <span className="text-[12px] text-dark-gray font-medium">Buffer Day</span>
                      <span className="text-dark-gray">·</span>
                      <span className="text-[11px] text-tertiary-text">Catch-up or rest</span>
                    </div>
                    <p className="text-[10px] text-tertiary-text mt-1">
                      Use this day to revisit any incomplete sessions from the week.
                    </p>
                  </div>
                )}

                {/* Milestone */}
                {day.type === "milestone" && (
                  <div className="bg-card-dark rounded-xl px-4 py-3.5" style={{ border: "1px solid rgba(251,191,36,0.2)" }}>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[12px] font-semibold text-secondary-text">{day.label}</span>
                      <span className="text-dark-gray">·</span>
                      <span className="text-[12px] font-semibold text-white">{day.title}</span>
                      <span className="text-[9px] font-bold text-[#FBBF24] bg-[#FBBF24]/10 px-2 py-0.5 rounded-lg">
                        ◆ Milestone
                      </span>
                    </div>
                    <p className="text-[11px] text-tertiary-text">{day.sub} · Est: {day.est}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-center gap-2 bg-card-dark rounded-xl px-4 py-3.5 text-center ml-0">
          <span className="text-brand">◈</span>
          <p className="text-[11px] text-secondary-text">
            End of Plan · Target Date: March 15, 2026 ·{" "}
            <span className="text-[#4ADE80] font-semibold">Projected: 89% (+11%)</span>
          </p>
        </div>
      </div>
    </div>
  )
}