"use client"
import { useState } from "react"
import { RiMoreLine, RiSearchLine, RiArrowUpDownLine } from "react-icons/ri"

const users = [
  { name: "Alex Rahman",   email: "alex@university.edu",  plan: "Pro",  status: "active",    joined: "Feb 5, 2026",  lastActive: "Today",       courses: 3 },
  { name: "Sara Khan",     email: "sara@campus.edu",       plan: "Free", status: "active",    joined: "Jan 22, 2026", lastActive: "Yesterday",   courses: 1 },
  { name: "John Williams", email: "john@example.com",      plan: "Pro",  status: "active",    joined: "Dec 14, 2025", lastActive: "Today",       courses: 5 },
  { name: "Priya Sharma",  email: "priya@college.in",      plan: "Free", status: "churned",   joined: "Nov 3, 2025",  lastActive: "32 days ago", courses: 2 },
  { name: "Mark Chen",     email: "mark@uni.edu",          plan: "Pro",  status: "suspended", joined: "Oct 18, 2025", lastActive: "12 days ago", courses: 4 },
]

const planStyle = {
  Pro:      "text-brand bg-(--color-brand)/10",
  Free:     "text-secondary-text bg-card border border-white/[0.06]",
  Advanced: "text-[#4ADE80] bg-[#4ADE80]/10",
}

const statusDot = {
  active:    "bg-[#4ADE80]",
  churned:   "bg-(--color-dark-gray)",
  suspended: "bg-[#FBBF24]",
}
const statusLabel = {
  active:    "text-[#4ADE80]",
  churned:   "text-dark-gray",
  suspended: "text-[#FBBF24]",
}
const statusText = {
  active: "Active", churned: "Churned", suspended: "Suspended",
}

const filters = ["All","Active","Free","Pro","Advanced","Churned"]

function RowMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-dark-gray hover:text-white hover:bg-white/[0.06] transition-all">
        <RiMoreLine className="text-[14px]" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 w-44 bg-(--color-card-mid) rounded-xl border border-white/[0.06] shadow-2xl z-20 overflow-hidden">
          {["View Profile","View Courses","Send Email","Reset Password","Upgrade Plan"].map(o => (
            <button key={o} onClick={() => setOpen(false)}
              className="w-full text-left px-3.5 py-2.5 text-[11px] text-secondary-text hover:bg-white/[0.04] hover:text-white transition-colors">
              {o}
            </button>
          ))}
          <div className="h-px bg-white/[0.05] my-1" />
          <button onClick={() => setOpen(false)} className="w-full text-left px-3.5 py-2.5 text-[11px] text-[#FBBF24] hover:bg-[#FBBF24]/[0.06] transition-colors">Suspend Account</button>
          <button onClick={() => setOpen(false)} className="w-full text-left px-3.5 py-2.5 text-[11px] text-[var(--color-red)] hover:bg-[var(--color-red)]/[0.06] transition-colors">Delete Account</button>
        </div>
      )}
    </div>
  )
}

export default function UserManagementTable() {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "All" || u.plan === filter || u.status === filter.toLowerCase()
    return matchSearch && matchFilter
  })

  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-card-dark">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">User Management</p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white mb-0.5">Registered Users</h2>
        <p className="text-[12px] text-tertiary-text">2,847 total users · 1,203 active in last 7 days</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-card-dark border-b border-white/[0.04] flex-wrap">
        <div className="flex items-center gap-2 h-9 px-3 bg-card rounded-xl border border-white/[0.06] w-56 focus-within:border-(--color-brand)/30 transition-colors">
          <RiSearchLine className="text-dark-gray text-[13px] flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or plan..."
            className="flex-1 bg-transparent text-[11px] text-white placeholder:text-dark-gray outline-none" />
        </div>
        <div className="flex items-center gap-1 p-1 bg-card rounded-xl border border-white/[0.04]">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-all ${
                filter === f ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
              }`}>{f}</button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1.5 h-8 px-3 bg-card text-[11px] text-secondary-text rounded-xl border border-white/[0.06] hover:text-white transition-colors">
          <RiArrowUpDownLine className="text-[12px]" /> Sort: Last Active
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 px-5 py-2.5 bg-card-dark border-b border-white/[0.04]">
        {["User","Plan","Status","Joined","Last Active","Courses","Actions"].map(h => (
          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-dark-gray">{h}</span>
        ))}
      </div>

      {filtered.map((u, i) => (
        <div key={u.email}
          className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center px-5 py-3.5 hover:bg-white/[0.01] transition-colors ${
            i < filtered.length - 1 ? "border-b border-white/[0.03]" : ""
          } ${u.status === "churned" ? "opacity-60" : ""} ${u.status === "suspended" ? "bg-[#FBBF24]/[0.015]" : ""}`}>

          {/* User */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-(--color-brand) flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-white">
              {u.name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-white truncate">{u.name}</p>
              <p className="text-[10px] text-tertiary-text truncate">{u.email}</p>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg w-fit ${planStyle[u.plan]}`}>{u.plan}</span>

          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[u.status]}`} />
            <span className={`text-[11px] font-medium ${statusLabel[u.status]}`}>{statusText[u.status]}</span>
          </div>

          <span className="text-[11px] text-secondary-text">{u.joined}</span>

          <span className={`text-[11px] ${u.status === "churned" ? "text-[var(--color-red)]/70" : "text-secondary-text"}`}>
            {u.lastActive}
          </span>

          <span className="text-[11px] text-secondary-text text-center">{u.courses}</span>

          <div className="flex items-center gap-1">
            <button className="text-[11px] text-brand hover:underline">View</button>
            <RowMenu />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between px-5 py-3.5 bg-card-dark border-t border-white/[0.04]">
        <span className="text-[11px] text-tertiary-text">Showing {filtered.length} of 2,847 users</span>
        <div className="flex items-center gap-1.5">
          {["←","1","2","3","...","114","→"].map((p, i) => (
            <button key={i} className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] transition-all ${
              p === "1" ? "bg-(--color-brand) text-white font-bold" : "text-tertiary-text hover:text-white hover:bg-white/[0.04]"
            }`}>{p}</button>
          ))}
        </div>
        <span className="text-[11px] text-tertiary-text">25 per page</span>
      </div>
    </div>
  )
}