"use client"
import { RiUserLine, RiLockLine, RiBookOpenLine, RiRobot2Line, RiBellLine, RiShieldLine, RiExternalLinkLine } from "react-icons/ri"

const navItems = [
  { id: "profile",     icon: RiUserLine,     label: "Profile"              },
  { id: "security",    icon: RiLockLine,     label: "Security"             },
  { id: "learning",    icon: RiBookOpenLine, label: "Learning Preferences" },
  { id: "ai",          icon: RiRobot2Line,   label: "AI Behavior"          },
  { id: "notifs",      icon: RiBellLine,     label: "Notifications"        },
  { id: "data",        icon: RiShieldLine,   label: "Data & Privacy"       },
]

export default function SettingsNav({ active, onChange }) {
  return (
    <div className="flex flex-col h-full bg-card-dark border-r border-(--color-card) py-4 px-2">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 px-2 mb-2">
        Settings
      </p>

      <div className="flex flex-col gap-0.5 flex-1">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex items-center gap-3 h-10 px-3 rounded-xl text-[12px] font-medium transition-all text-left w-full relative ${
                isActive
                  ? "bg-(--color-brand)/[0.08] text-white"
                  : "text-secondary-text hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-(--color-brand) rounded-r" />
              )}
              <Icon className={`text-[15px] flex-shrink-0 ${isActive ? "text-brand" : "text-dark-gray"}`} />
              {label}
            </button>
          )
        })}

        <div className="my-2 h-px bg-white/[0.05]" />

        <button className="flex items-center gap-3 h-10 px-3 rounded-xl text-[12px] font-medium text-brand bg-(--color-brand)/[0.06] hover:bg-(--color-brand)/[0.1] transition-all w-full">
          <RiExternalLinkLine className="text-[15px]" /> Upgrade Plan
        </button>
      </div>

      {/* Account summary */}
      <div className="mt-4 pt-4 border-t border-(--color-card) px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-(--color-brand) flex items-center justify-center flex-shrink-0">
            <span className="text-[12px] font-bold text-white">AR</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-white truncate">Vimal Rahman</p>
            <p className="text-[10px] text-tertiary-text truncate">Vimal@university.edu</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-[9px] font-bold text-secondary-text bg-card px-2 py-0.5 rounded-lg border border-white/[0.04]">
            Free Plan
          </span>
        </div>
      </div>
    </div>
  )
}