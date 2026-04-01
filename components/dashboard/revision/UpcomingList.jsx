"use client"
import { useState } from "react"
import {
  RiMoreLine, RiArrowDownSLine, RiArrowRightSLine,
} from "react-icons/ri"

const tabs    = ["This Week", "Next 2 Weeks", "All Upcoming"]
const filters = ["All", "High Priority", "Overdue", "Pending", "Completed"]

const groups = [
  {
    label: "Today, Feb 24",
    count: 4,
    collapsed: false,
    items: [
      { name: "Normalization",       course: "DBMS", priority: "critical", due: "Feb 24 · 3PM", mastery: 34, status: "pending"   },
      { name: "Functional Dep.",     course: "DBMS", priority: "high",     due: "Feb 24 · 5PM", mastery: 61, status: "pending"   },
      { name: "ER Diagrams",         course: "DBMS", priority: "medium",   due: "Feb 24 · 5PM", mastery: 74, status: "pending"   },
      { name: "SQL Joins",           course: "DBMS", priority: "low",      due: "Feb 24",        mastery: 91, status: "completed" },
    ],
  },
  {
    label: "Tomorrow, Feb 25",
    count: 2,
    collapsed: false,
    items: [
      { name: "Transaction Mgmt",    course: "DBMS", priority: "high",   due: "Feb 25",  mastery: 68, status: "pending" },
      { name: "B-Trees",             course: "DBMS", priority: "medium", due: "Feb 25",  mastery: 82, status: "pending" },
    ],
  },
  {
    label: "Feb 26–27",
    count: 3,
    collapsed: false,
    items: [
      { name: "Indexing",            course: "DBMS", priority: "medium", due: "Feb 26",  mastery: 71, status: "pending" },
      { name: "ACID Properties",     course: "DBMS", priority: "low",    due: "Feb 27",  mastery: 85, status: "pending" },
      { name: "Graph Traversal",     course: "DBMS", priority: "high",   due: "Feb 27",  mastery: 48, status: "pending" },
    ],
  },
  {
    label: "Next Week",
    count: 5,
    collapsed: true,
    items: [],
  },
]

const priorityStyle = {
  critical: "text-[var(--color-red)] bg-[var(--color-red)]/10 border-[var(--color-red)]/20",
  high:     "text-[#FBBF24] bg-[#FBBF24]/10 border-[#FBBF24]/20",
  medium:   "text-[--color-brand] bg-[--color-brand]/10 border-[--color-brand]/20",
  low:      "text-[--color-secondary-text] bg-white/[0.05] border-white/[0.08]",
}

const priorityLabel = { critical: "Critical", high: "High", medium: "Medium", low: "Low" }

const masteryColor = (m) =>
  m >= 80 ? "text-[#4ADE80]" : m >= 60 ? "text-[--color-brand]" : m >= 40 ? "text-[#FBBF24]" : "text-[var(--color-red)]"

const masteryBar = (m) =>
  m >= 80 ? "bg-[#4ADE80]" : m >= 60 ? "bg-[--color-brand]" : m >= 40 ? "bg-[#FBBF24]" : "bg-[var(--color-red)]"

function RowMenu() {
  const [open, setOpen] = useState(false)
  const options = ["Reschedule", "Mark Complete", "Skip This Session", "View Concept Details", "Remove from Schedule"]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-[--color-dark-gray] hover:text-white hover:bg-white/[0.06] transition-all"
      >
        <RiMoreLine className="text-[14px]" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 w-44 bg-[--color-card-mid] rounded-xl border border-white/[0.06] shadow-2xl z-20 overflow-hidden">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => setOpen(false)}
              className={`w-full text-left px-3.5 py-2.5 text-[11px] hover:bg-[--color-brand]/[0.06] hover:text-white transition-colors ${
                o === "Remove from Schedule" ? "text-[var(--color-red)]" : "text-[--color-secondary-text]"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function UpcomingList() {
  const [tab,     setTab]     = useState("This Week")
  const [filter,  setFilter]  = useState("All")
  const [collapsed, setCollapsed] = useState({ "Next Week": true })

  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
              Upcoming Schedule
            </p>
            <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Revision Queue</h2>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[--color-card-dark] rounded-xl border border-white/[0.06]">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all whitespace-nowrap ${
                  tab === t ? "bg-[--color-brand] text-white" : "text-[--color-tertiary-text] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-[10px] font-medium rounded-lg border transition-all ${
                filter === f
                  ? "bg-[--color-brand] text-white border-[--color-brand]"
                  : "text-[--color-secondary-text] border-white/[0.06] bg-[--color-card-dark] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 px-5 py-2.5 bg-[--color-card-dark] border-b border-white/[0.04]">
        {["Concept", "Course", "Priority", "Due Date", "Mastery", "Actions"].map((h) => (
          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-[--color-dark-gray]">{h}</span>
        ))}
      </div>

      {groups.map((group) => (
        <div key={group.label}>
          {/* Date group header */}
          <div
            className="flex items-center gap-3 px-5 py-2.5 bg-[--color-card-mid-dark] cursor-pointer hover:bg-white/[0.01] transition-colors"
            onClick={() => setCollapsed((p) => ({ ...p, [group.label]: !p[group.label] }))}
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[--color-tertiary-text] whitespace-nowrap flex-shrink-0">
              {group.label}
            </span>
            <span className="text-[10px] text-[--color-dark-gray] flex-shrink-0">{group.count} items</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
            {collapsed[group.label]
              ? <RiArrowRightSLine className="text-[--color-dark-gray] text-[13px] flex-shrink-0" />
              : <RiArrowDownSLine  className="text-[--color-dark-gray] text-[13px] flex-shrink-0" />
            }
          </div>

          {/* Rows */}
          {!collapsed[group.label] && group.items.map((item, i) => (
            <div
              key={item.name}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors ${
                item.status === "completed" ? "opacity-55" : ""
              }`}
            >
              <div>
                <p className={`text-[12px] font-medium ${item.status === "completed" ? "text-[--color-secondary-text]" : "text-white"}`}>
                  {item.name}
                </p>
                <p className="text-[10px] text-[--color-tertiary-text] mt-0.5">Chapter 4 · DBMS</p>
              </div>
              <span className="text-[11px] text-[--color-secondary-text]">{item.course}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border w-fit ${priorityStyle[item.priority]}`}>
                {priorityLabel[item.priority]}
              </span>
              <span className="text-[11px] text-[--color-secondary-text]">{item.due}</span>
              <div>
                <div className="h-[3px] w-14 bg-white/[0.06] rounded-full overflow-hidden mb-1">
                  <div className={`h-full rounded-full ${masteryBar(item.mastery)}`} style={{ width: `${item.mastery}%` }} />
                </div>
                <span className={`text-[11px] font-semibold ${masteryColor(item.mastery)}`}>{item.mastery}%</span>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "completed" ? (
                  <button className="text-[11px] text-[--color-brand] hover:underline whitespace-nowrap">Review Again</button>
                ) : (
                  <button className="text-[11px] text-[--color-brand] hover:underline">Start</button>
                )}
                <RowMenu />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}