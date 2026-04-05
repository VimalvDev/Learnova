"use client"
import { useState } from "react"
import { RiArrowLeftLine, RiCloseLine, RiArrowDownSLine } from "react-icons/ri"

const accountStats = [
  { label: "Courses created",    value: "3"          },
  { label: "Documents uploaded", value: "8"          },
  { label: "Quizzes completed",  value: "47"         },
  { label: "Total study time",   value: "12h 40m"    },
  { label: "Mastery avg",        value: "78%"        },
  { label: "Last login",         value: "Today, 3:42 PM" },
]

const courses = [
  { name: "DBMS — Semester 4",  meta: "3 docs · 47 quizzes" },
  { name: "Operating Systems",   meta: "2 docs · 12 quizzes" },
  { name: "Data Structures",     meta: "1 doc · 8 quizzes"   },
]

const recentActivity = [
  { time: "3:42 PM",   event: "Document uploaded", detail: "DBMS_Notes.pdf"   },
  { time: "2:14 PM",   event: "Quiz completed",    detail: "Score: 71%"       },
  { time: "Yesterday", event: "Login",             detail: "Chrome/macOS"     },
  { time: "Feb 22",    event: "Course created",    detail: "OS Semester 3"    },
  { time: "Feb 20",    event: "Quiz generated",    detail: "15 questions"     },
]

const planOptions = ["Free","Pro","Advanced","Custom"]

const dangerActions = [
  { label: "Suspend Account", color: "text-[#FBBF24] border-[#FBBF24]/25 hover:bg-[#FBBF24]/[0.05]" },
  { label: "Delete Account",  color: "text-[var(--color-red)] border-[var(--color-red)]/25 hover:bg-[var(--color-red)]/[0.05]" },
]

export default function UserDetailDrawer({ user, onClose }) {
  const [planOpen,     setPlanOpen]     = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(user?.plan ?? "Pro")
  const [confirmAction, setConfirmAction] = useState(null)

  if (!user) return null

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-[480px] max-w-[90vw] bg-card border-l border-white/[0.1] shadow-2xl z-50 flex flex-col"
        style={{ animation: "slideInRight 250ms ease forwards" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]  ">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[11px] text-(--color-brand) hover:underline"
          >
            <RiArrowLeftLine className="text-[13px]" /> Back to Users
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-(--color-dark-gray) hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RiCloseLine className="text-[15px]" />
          </button>
        </div>

        {/* User identity */}
        <div className="px-6 py-5 border-b border-white/[0.06]  ">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-(--color-brand) flex items-center justify-center  ">
              <span className="text-[16px] font-bold text-white">{initials}</span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-white">{user.name}</h2>
              <p className="text-[12px] text-(--color-tertiary-text)">{user.email}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-(--color-brand) bg-(--color-brand)/10 border border-(--color-brand)/20 px-2 py-0.5 rounded-lg">
                  {user.plan}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                  <span className="text-[10px] text-[#4ADE80] font-medium">Active</span>
                </div>
                <span className="text-[10px] text-(--color-tertiary-text)">
                  · Joined {user.joined}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

          {/* Account stats */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
              Account Overview
            </p>
            <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04]">
              {accountStats.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-[11px] text-(--color-tertiary-text)">{label}</span>
                  <span className="text-[12px] font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan & billing */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
              Plan & Billing
            </p>
            <div className="bg-card-dark rounded-xl p-4">
              <div className="flex flex-col gap-2 mb-3">
                {[
                  { label: "Current plan",   value: `${user.plan} · $12/month` },
                  { label: "Billing cycle",  value: "Monthly"                  },
                  { label: "Next billing",   value: "March 5, 2026"            },
                  { label: "Member since",   value: `${user.joined} (19 days)` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] text-(--color-tertiary-text)">{label}</span>
                    <span className="text-[11px] font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>

              {/* Plan change */}
              <div className="relative">
                <button
                  onClick={() => setPlanOpen(!planOpen)}
                  className="flex items-center justify-between w-full h-8 px-3 bg-card text-[11px] text-white rounded-lg border border-white/[0.06] hover:border-white/[0.1] transition-colors"
                >
                  Change Plan: <span className="font-semibold text-(--color-brand)">{selectedPlan}</span>
                  <RiArrowDownSLine className="text-(--color-dark-gray) text-[13px]" />
                </button>
                {planOpen && (
                  <div className="absolute bottom-9 left-0 w-full bg-(--color-card-mid) rounded-xl border border-white/[0.06] shadow-2xl z-10 overflow-hidden">
                    {planOptions.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setSelectedPlan(p); setPlanOpen(false) }}
                        className={`w-full text-left px-3.5 py-2.5 text-[11px] hover:bg-white/[0.04] transition-colors ${
                          selectedPlan === p ? "text-(--color-brand)" : "text-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Courses */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
              Courses
            </p>
            <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04]">
              {courses.map(({ name, meta }) => (
                <div key={name} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                  <span className="text-[13px]  ">📂</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white truncate">{name}</p>
                    <p className="text-[10px] text-(--color-tertiary-text)">{meta}</p>
                  </div>
                  <button className="text-[11px] text-(--color-brand) hover:underline  ">→</button>
                </div>
              ))}
            </div>
          </div>

          {/* Admin actions */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
              Admin Actions
            </p>
            <div className="flex flex-col gap-2">
              {["Send Email to User","Reset User Password","Upgrade / Downgrade Plan","View Full Activity Log"].map((a) => (
                <button
                  key={a}
                  className="w-full h-10 px-4 bg-card-dark text-white text-[12px] font-medium rounded-xl border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all text-left"
                >
                  {a}
                </button>
              ))}
              <div className="h-px bg-white/[0.05] my-1" />
              {dangerActions.map(({ label, color }) => (
                <div key={label}>
                  {confirmAction === label ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-card-dark rounded-xl border border-white/[0.06]">
                      <span className="text-[11px] text-(--color-secondary-text) flex-1">
                        {label}?
                      </span>
                      <button className="text-[11px] text-[var(--color-red)] font-semibold hover:underline">
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmAction(null)}
                        className="text-[11px] text-(--color-secondary-text) hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmAction(label)}
                      className={`w-full h-10 px-4 text-[12px] font-medium rounded-xl border bg-transparent transition-all text-left ${color}`}
                    >
                      {label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
              Recent Activity
            </p>
            <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04]">
              {recentActivity.map(({ time, event, detail }, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-[10px] text-(--color-tertiary-text) w-16  ">{time}</span>
                  <span className="text-[11px] font-medium text-white flex-1">{event}</span>
                  <span className="text-[11px] text-(--color-secondary-text)">{detail}</span>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-[11px] text-(--color-brand) hover:underline mt-2">
              View full log →
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(480px); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}