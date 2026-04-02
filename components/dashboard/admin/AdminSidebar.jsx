"use client"
import { useState } from "react"
import {
  RiDashboardLine, RiLineChartLine, RiRobot2Line, RiServerLine,
  RiGroupLine, RiBookOpenLine, RiFileTextLine, RiTestTubeLine,
  RiListCheck2, RiErrorWarningLine, RiArchiveLine,
  RiSettings3Line, RiLockLine, RiKeyLine,
} from "react-icons/ri"

const sections = [
  {
    label: "Monitoring",
    items: [
      { id: "overview",   icon: RiDashboardLine, label: "Overview"          },
      { id: "analytics",  icon: RiLineChartLine, label: "Platform Analytics" },
      { id: "ai",         icon: RiRobot2Line,    label: "AI Usage Monitor"  },
      { id: "health",     icon: RiServerLine,    label: "System Health"     },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "users",    icon: RiGroupLine,    label: "Users"      },
      { id: "courses",  icon: RiBookOpenLine, label: "Courses"    },
      { id: "docs",     icon: RiFileTextLine, label: "Documents"  },
      { id: "quiz",     icon: RiTestTubeLine, label: "Quiz Engine" },
    ],
  },
  {
    label: "Reports",
    items: [
      { id: "activity", icon: RiListCheck2,      label: "Activity Logs" },
      { id: "errors",   icon: RiErrorWarningLine, label: "Error Logs"   },
      { id: "exports",  icon: RiArchiveLine,      label: "Data Exports" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { id: "settings", icon: RiSettings3Line, label: "Platform Settings" },
      { id: "security", icon: RiLockLine,      label: "Security Config"  },
      { id: "api",      icon: RiKeyLine,       label: "API Keys"         },
    ],
  },
]

export default function AdminSidebar() {
  const [active, setActive] = useState("overview")

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full bg-card-dark border-r border-(--color-card) overflow-y-auto">
      <div className="flex-1 px-3 py-5">
        {sections.map((sec) => (
          <div key={sec.label} className="mb-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 px-2 mb-1.5">
              {sec.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {sec.items.map(({ id, icon: Icon, label }) => {
                const isActive = active === id
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`relative flex items-center gap-3 h-9 px-3 rounded-xl text-[12px] font-medium transition-all text-left w-full ${
                      isActive
                        ? "bg-(--color-brand)/[0.08] text-white"
                        : "text-secondary-text hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-(--color-brand) rounded-r" />
                    )}
                    <Icon className={`text-[14px] flex-shrink-0 ${isActive ? "text-brand" : "text-dark-gray"}`} />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Environment info */}
      <div className="mx-3 mb-4 p-3 bg-card rounded-xl border border-white/[0.04]">
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Environment", value: "Production", valueClass: "text-[var(--color-red)] bg-[var(--color-red)]/10 px-1.5 py-0.5 rounded-md text-[9px] font-bold" },
            { label: "Version",     value: "v1.4.2",     valueClass: "text-[11px] font-medium text-white" },
            { label: "Last deploy", value: "Feb 24, 2026",valueClass: "text-[11px] text-secondary-text" },
          ].map(({ label, value, valueClass }) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-tertiary-text">{label}</span>
              <span className={valueClass}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}