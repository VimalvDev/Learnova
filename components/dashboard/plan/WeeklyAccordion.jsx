"use client"
import { useState } from "react"
import { RiArrowDownSLine } from "react-icons/ri"

const weeks = [
  {
    label:    "Week 1",
    range:    "Feb 24 – Mar 2",
    days:     7,
    topics:   5,
    focus:    "Critical and prerequisite concepts",
    goal:     "Bring critical concepts from <40% to >55%",
    progress: { done: 1, total: 7 },
    items: [
      { name: "Functional Dependency", type: "Prerequisite", days: "Days 1–2", current: 61, target: 75, met: false },
      { name: "Candidate Keys",        type: "Prerequisite", days: "Day 3",    current: 78, target: 75, met: true  },
      { name: "Normalization",         type: "Critical",     days: "Days 4–5", current: 34, target: 55, met: false },
      { name: "2NF Rules",             type: "Critical",     days: "Day 6",    current: 38, target: 50, met: false },
      { name: "ER Diagrams",           type: "Revision",     days: "Day 7",    current: 74, target: 80, met: false },
    ],
    quiz:       "Day 7 · Unit Assessment Quiz · Covers Week 1 topics",
    projection: { mastery: 84, gain: 6, resolved: "2 of 3" },
    expanded:   true,
    preview:    null,
  },
  {
    label:    "Week 2",
    range:    "Mar 3 – Mar 9",
    days:     7,
    topics:   8,
    focus:    "Medium-priority concepts",
    goal:     "Full unit 1 & 2 coverage + first unit review",
    progress: { done: 0, total: 7 },
    items: [
      { name: "Transactions",    type: "Medium", days: "Day 8",  current: 68, target: 80, met: false },
      { name: "ACID Properties", type: "Medium", days: "Day 9",  current: 85, target: 90, met: false },
      { name: "Indexing",        type: "Revision",days:"Day 10", current: 71, target: 85, met: false },
      { name: "B-Trees",         type: "Medium", days: "Day 11", current: 82, target: 88, met: false },
    ],
    quiz:       "Day 14 · Full Course Mid-Point Quiz",
    projection: { mastery: 87, gain: 3, resolved: "3 of 3" },
    expanded:   false,
    preview:    "Focus: Medium-priority concepts + first full unit review",
  },
  {
    label:    "Week 3",
    range:    "Mar 10 – Mar 15",
    days:     5,
    topics:   null,
    focus:    "Full course revision, mastery consolidation, exam readiness",
    goal:     "Reach 89% overall mastery before exam",
    progress: { done: 0, total: 5 },
    items:    [],
    quiz:     "Day 19 · Final Assessment",
    projection:{ mastery: 89, gain: 11, resolved: "All" },
    expanded:  false,
    preview:   "Focus: Full course revision, mastery consolidation, exam readiness",
  },
]

const typeStyle = {
  Prerequisite: "text-[#FBBF24] bg-[#FBBF24]/10",
  Critical:     "text-[var(--color-red)] bg-[var(--color-red)]/10",
  Revision:     "text-brand bg-(--color-brand)/10",
  Medium:       "text-secondary-text bg-white/[0.05]",
}

const masteryColor = (m) =>
  m >= 80 ? "text-[#4ADE80]" : m >= 60 ? "text-brand" : m >= 40 ? "text-[#FBBF24]" : "text-[var(--color-red)]"

export default function WeeklyAccordion() {
  const [open, setOpen] = useState({ "Week 1": true })

  return (
    <div className="bg-card rounded-2xl p-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
        Weekly Overview
      </p>
      <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white mb-1">
        Study Plan by Week
      </h2>
      <p className="text-[12px] text-tertiary-text mb-5">
        Strategic allocation of topics, quizzes, and revisions across your timeline.
      </p>

      <div className="flex flex-col gap-3">
        {weeks.map((week) => {
          const isOpen = !!open[week.label]
          return (
            <div key={week.label} className="bg-card-dark rounded-xl overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setOpen(prev => ({ ...prev, [week.label]: !prev[week.label] }))}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3 flex-wrap text-left">
                  <span className="text-[13px] font-bold text-brand">{week.label}</span>
                  <span className="text-dark-gray">·</span>
                  <span className="text-[12px] text-secondary-text">{week.range}</span>
                  <span className="text-dark-gray">·</span>
                  <span className="text-[11px] text-tertiary-text">
                    {week.days} days{week.topics ? ` · ${week.topics} topics` : " · Review + Assessment"}
                  </span>
                </div>
                <RiArrowDownSLine className={`text-brand text-[14px] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Focus preview (always visible) */}
              {!isOpen && week.preview && (
                <div className="px-5 pb-3">
                  <p className="text-[11px] text-tertiary-text">Focus: {week.preview}</p>
                </div>
              )}

              {/* Progress bar */}
              {isOpen && (
                <div className="px-5 pb-3 -mt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-tertiary-text">
                      Week {week.label.split(" ")[1]} progress
                    </span>
                    <span className="text-[10px] text-tertiary-text">
                      {week.progress.done} / {week.progress.total} days
                    </span>
                  </div>
                  <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-(--color-brand) rounded-full"
                      style={{ width: `${(week.progress.done / week.progress.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-white/[0.04]">
                  {/* Focus */}
                  <div className="flex flex-col gap-0.5 my-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand/70">
                      Focus: <span className="text-white normal-case tracking-normal font-medium">{week.focus}</span>
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand/70">
                      Goal: <span className="text-white normal-case tracking-normal font-medium">{week.goal}</span>
                    </p>
                  </div>

                  {/* Topic table */}
                  {week.items.length > 0 && (
                    <div className="mb-4">
                      <div className="grid grid-cols-5 gap-2 pb-2 border-b border-white/[0.04] mb-1">
                        {["Concept","Type","Days","Current","Target"].map(h => (
                          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-dark-gray">{h}</span>
                        ))}
                      </div>
                      {week.items.map((item) => (
                        <div key={item.name} className="grid grid-cols-5 gap-2 items-center py-2.5 border-b border-white/[0.03] last:border-0">
                          <span className="text-[11px] font-medium text-white truncate">{item.name}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg w-fit ${typeStyle[item.type]}`}>
                            {item.type}
                          </span>
                          <span className="text-[10px] text-secondary-text">{item.days}</span>
                          <span className={`text-[11px] font-semibold ${masteryColor(item.current)}`}>
                            {item.current}%
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-brand">{item.target}%</span>
                            {item.met && <span className="text-[#4ADE80] text-[11px]">✓</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quiz milestone */}
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-card rounded-xl mb-4" style={{ border: "1px solid rgba(251,191,36,0.18)" }}>
                    <span className="text-[#FBBF24] text-[12px]">◆</span>
                    <span className="text-[11px] text-secondary-text">{week.quiz}</span>
                  </div>

                  {/* Projection */}
                  <div className="bg-card rounded-xl p-3.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <p className="text-[11px] text-secondary-text">
                          Estimated mastery after {week.label}:{" "}
                          <span className="text-[#4ADE80] font-bold">{week.projection.mastery}%</span>
                          <span className="text-[#4ADE80]"> (+{week.projection.gain}% overall)</span>
                        </p>
                        <p className="text-[10px] text-tertiary-text mt-0.5">
                          Critical concepts resolved: <span className="text-white font-medium">{week.projection.resolved}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}