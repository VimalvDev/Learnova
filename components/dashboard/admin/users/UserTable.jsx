"use client"
import { useState } from "react"
import UserTableRow  from "./UserTableRow"
import BulkActionBar from "./BulkActionBar"
import UserFilterBar from "./UserFilterBar"

const users = [
  { id: 1, name: "Alex Rahman",    email: "alex@university.edu",  plan: "Pro",      status: "active",    joined: "Feb 5 '26",   lastActive: "Today",        courses: 3, mastery: 78  },
  { id: 2, name: "Sara Khan",      email: "sara@campus.edu",       plan: "Free",     status: "active",    joined: "Jan 22 '26",  lastActive: "Yesterday",    courses: 1, mastery: null },
  { id: 3, name: "John Williams",  email: "john@example.com",      plan: "Pro",      status: "active",    joined: "Dec 14 '25",  lastActive: "Today",        courses: 5, mastery: 64  },
  { id: 4, name: "Nadia Ahmed",    email: "nadia@student.io",      plan: "Free",     status: "new",       joined: "Apr 2 '26",   lastActive: "Just joined",  courses: 0, mastery: null },
  { id: 5, name: "Priya Sharma",   email: "priya@college.in",      plan: "Free",     status: "inactive",  joined: "Nov 3 '25",   lastActive: "14 days ago",  courses: 2, mastery: 41  },
  { id: 6, name: "Mark Chen",      email: "mark@uni.edu",          plan: "Pro",      status: "suspended", joined: "Oct 18 '25",  lastActive: "12 days ago",  courses: 4, mastery: null },
  { id: 7, name: "David Park",     email: "david@learn.com",       plan: "Free",     status: "churned",   joined: "Aug 9 '25",   lastActive: "32 days ago",  courses: 1, mastery: null },
  { id: 8, name: "Amira Hassan",   email: "amira@knowledge.co",    plan: "Advanced", status: "active",    joined: "Jan 5 '26",   lastActive: "Today",        courses: 7, mastery: 91  },
]

const gridCols = "grid-cols-[2.5rem_2.5rem_1fr_6rem_8rem_8rem_8rem_5rem_8rem_8rem]"

export default function UserTable({ onViewUser }) {
  const [selected, setSelected] = useState(new Set())
  const [allSelected, setAllSelected] = useState(false)

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set())
      setAllSelected(false)
    } else {
      setSelected(new Set(users.map((u) => u.id)))
      setAllSelected(true)
    }
  }

  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      <UserFilterBar/>

      {/* Table header */}
      <div className={`grid items-center px-5 py-3 bg-card-dark border-b border-white/[0.06] ${gridCols}`}>
        <div className="flex items-center justify-center">
          <button
            onClick={toggleAll}
            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
              allSelected ? "bg-(--color-brand) border-(--color-brand)" : "border-white/[0.2]"
            }`}
          >
            {allSelected && <span className="text-white text-[9px] font-bold">✓</span>}
          </button>
        </div>
        <div />
        {["Name / Email","Plan","Status","Joined","Last Active","Courses","Mastery","Actions"].map((h) => (
          <span key={h} className="text-[9px] font-bold uppercase tracking-widest text-(--color-dark-gray)">
            {h}
          </span>
        ))}
      </div>

      {/* Bulk action bar */}
      <BulkActionBar count={selected.size} onClear={() => { setSelected(new Set()); setAllSelected(false) }} />

      {/* Rows */}
      {users.map((user) => (
        <UserTableRow
          key={user.id}
          user={user}
          selected={selected.has(user.id)}
          onSelect={toggleRow}
          onView={onViewUser}
        />
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-card-dark border-t border-white/[0.04] flex-wrap gap-3">
        <span className="text-[11px] text-(--color-tertiary-text)">
          Showing 1–25 of 2,847 users
        </span>
        <div className="flex items-center gap-1">
          {["←","1","2","3","...","114","→"].map((p, i) => (
            <button
              key={i}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] transition-all ${
                p === "1"
                  ? "bg-(--color-brand) text-white font-bold"
                  : "text-(--color-tertiary-text) hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-(--color-tertiary-text)">
          <span>25 per page</span>
          <button className="text-(--color-dark-gray)">▾</button>
        </div>
      </div>
    </div>
  )
}