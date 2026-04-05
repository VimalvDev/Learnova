"use client"
import { useState } from "react"
import { RiMoreLine } from "react-icons/ri"

const planStyle = {
  Pro:      "text-(--color-brand) bg-(--color-brand)/10 border border-(--color-brand)/20",
  Free:     "text-(--color-secondary-text) bg-card border border-white/[0.06]",
  Advanced: "text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/20",
}

const statusConfig = {
  active:    { dot: "bg-[#4ADE80]",           text: "text-[#4ADE80]",           label: "Active"    },
  inactive:  { dot: "bg-(--color-dark-gray)",  text: "text-(--color-dark-gray)", label: "Inactive"  },
  suspended: { dot: "bg-[#FBBF24]",           text: "text-[#FBBF24]",           label: "Suspended" },
  churned:   { dot: "bg-[var(--color-red)]",   text: "text-[var(--color-red)]",  label: "Churned"   },
  new:       { dot: "bg-[#4ADE80]",           text: "text-[#4ADE80]",           label: "Active"    },
}

const lastActiveColor = (lastActive) => {
  if (lastActive === "Today" || lastActive === "Just joined") return "text-(--color-secondary-text)"
  if (lastActive.includes("14 days") || lastActive.includes("12 days")) return "text-[#FBBF24]"
  if (lastActive.includes("32 days") || lastActive.includes("31 days")) return "text-[var(--color-red)]/60"
  return "text-(--color-secondary-text)"
}

function RowMenu({ status, onAction }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-(--color-dark-gray) hover:text-white hover:bg-white/[0.06] transition-all"
      >
        <RiMoreLine className="text-[14px]" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-8 w-44 bg-(--color-card-mid) rounded-xl border border-white/[0.06] shadow-2xl z-30 overflow-hidden"
          onMouseLeave={() => setOpen(false)}
        >
          {["View Profile","View Courses","Send Email","Reset Password","Upgrade Plan"].map((o) => (
            <button
              key={o}
              onClick={() => { onAction?.(o); setOpen(false) }}
              className="w-full text-left px-3.5 py-2.5 text-[11px] text-(--color-secondary-text) hover:bg-white/[0.04] hover:text-white transition-colors"
            >
              {o}
            </button>
          ))}
          <div className="h-px bg-white/[0.05] my-1" />
          <button
            onClick={() => { onAction?.("Suspend"); setOpen(false) }}
            className="w-full text-left px-3.5 py-2.5 text-[11px] text-[#FBBF24] hover:bg-[#FBBF24]/[0.06] transition-colors"
          >
            {status === "suspended" ? "Unsuspend Account" : "Suspend Account"}
          </button>
          <button
            onClick={() => { onAction?.("Delete"); setOpen(false) }}
            className="w-full text-left px-3.5 py-2.5 text-[11px] text-[var(--color-red)] hover:bg-[var(--color-red)]/[0.06] transition-colors"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  )
}

export default function UserTableRow({ user, selected, onSelect, onView }) {
  const sc = statusConfig[user.status] ?? statusConfig.active

  const rowClass = [
    "grid items-center px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors",
    user.status === "churned"   ? "opacity-50" : "",
    user.status === "suspended" ? "bg-[#FBBF24]/[0.015]" : "",
    selected                    ? "bg-(--color-brand)/[0.03]" : "",
  ].join(" ")

  const gridCols = "grid-cols-[2.5rem_2.5rem_1fr_6rem_8rem_8rem_8rem_5rem_8rem_8rem]"

  return (
    <div className={`${rowClass} ${gridCols}`}>

      {/* Checkbox */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => onSelect?.(user.id)}
          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
            selected ? "bg-brand border-brand" : "border-white/2"
          }`}
        >
          {selected && <span className="text-white text-[9px] font-bold">✓</span>}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-white">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
      </div>

      {/* Name / Email */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-[12px] font-medium text-white truncate">{user.name}</p>
          {user.status === "new" && (
            <span className="text-[9px] font-bold text-(--color-brand) bg-(--color-brand)/[0.12] px-1.5 py-0.5 rounded-md  ">
              New
            </span>
          )}
        </div>
        <p className="text-[10px] text-(--color-tertiary-text) truncate">{user.email}</p>
      </div>

      {/* Plan */}
      <div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${planStyle[user.plan] ?? planStyle.Free}`}>
          {user.plan}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full   ${sc.dot}`} />
        <span className={`text-[11px] font-medium ${sc.text}`}>{sc.label}</span>
      </div>

      {/* Joined */}
      <span className="text-[11px] text-(--color-secondary-text)">{user.joined}</span>

      {/* Last Active */}
      <span className={`text-[11px] ${lastActiveColor(user.lastActive)}`}>
        {user.lastActive}
      </span>

      {/* Courses */}
      <span className="text-[11px] text-(--color-secondary-text) text-center">{user.courses}</span>

      {/* Mastery */}
      <div>
        {user.mastery != null ? (
          <div className="flex items-center gap-1.5">
            <div className="w-12 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-(--color-brand) rounded-full" style={{ width: `${user.mastery}%` }} />
            </div>
            <span className="text-[11px] font-medium text-white">{user.mastery}%</span>
          </div>
        ) : (
          <span className="text-[11px] text-(--color-dark-gray)">—</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 justify-end">
        {user.status === "suspended" ? (
          <button className="text-[11px] text-[#FBBF24] hover:underline">Unsuspend</button>
        ) : (
          <button onClick={() => onView?.(user)} className="text-[11px] text-(--color-brand) hover:underline">
            View
          </button>
        )}
        <RowMenu status={user.status} onAction={(a) => console.log(a, user.id)} />
      </div>
    </div>
  )
}