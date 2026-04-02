"use client"
import { useState } from "react"
import { RiCheckLine } from "react-icons/ri"
import SettingCard   from "../shared/SettingCard"
import SectionHeader from "../shared/SectionHeader"
import ToggleRow     from "../shared/ToggleRow"

export default function DataPrivacySection() {
  const [toggles,   setToggles]   = useState({ analytics: true, history: true, aiImprove: false })
  const [email,     setEmail]     = useState("")
  const [deleteStep, setDeleteStep] = useState(0) // 0=idle 1=confirm 2=countdown
  const [countdown, setCountdown]  = useState(10)
  const toggle = (k) => setToggles(prev => ({ ...prev, [k]: !prev[k] }))

  const startDelete = () => {
    if (email !== "Vimal@university.edu") return
    setDeleteStep(2)
    let c = 10
    const t = setInterval(() => {
      c--; setCountdown(c)
      if (c === 0) { clearInterval(t) }
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-5">
      <SettingCard>
        <SectionHeader tag="Data & Privacy" title="Data Management & Privacy"
          subtitle="Your uploaded materials and performance data are stored securely." />

        {/* Data summary */}
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Your Data</p>
        <div className="grid grid-cols-3 divide-x divide-white/[0.05] mb-5">
          {[
            { label: "Documents Stored",  value: "8 files",    sub: "24.6 MB"    },
            { label: "Concepts Tracked",  value: "58 concepts",sub: "58 total"   },
            { label: "Quiz Sessions",     value: "47 sessions",sub: "All time"   },
          ].map(({ label, value, sub }) => (
            <div key={label} className="px-4 first:pl-0 last:pr-0">
              <p className="text-[9px] text-dark-gray uppercase tracking-widest mb-1">{label}</p>
              <p className="text-[14px] font-semibold text-white">{value}</p>
              <p className="text-[10px] text-tertiary-text">{sub}</p>
            </div>
          ))}
        </div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] text-tertiary-text">Storage used</span>
          <span className="text-[11px] text-secondary-text">3.2 / 5 GB</span>
        </div>
        <div className="h-1.5 bg-card-dark rounded-full overflow-hidden">
          <div className="h-full bg-(--color-brand) rounded-full" style={{ width: "64%" }} />
        </div>
      </SettingCard>

      {/* Privacy */}
      <SettingCard>
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Privacy</p>
        <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04]">
          <ToggleRow title="Allow Anonymous Usage Analytics" desc="Help improve Learnova with anonymized interaction data" value={toggles.analytics} onChange={() => toggle("analytics")} />
          <ToggleRow title="Store Exploration History (Public Mode)" desc="Keep a log of public mode queries and answers" value={toggles.history} onChange={() => toggle("history")} />
          <ToggleRow title="Allow AI Model Improvement" desc="Use anonymized queries to improve AI responses"
            value={toggles.aiImprove} onChange={() => toggle("aiImprove")} last
            extra={toggles.aiImprove && (
              <div className="flex items-start gap-2 mt-2">
                <span className="text-brand text-[11px]">◈</span>
                <p className="text-[10px] text-tertiary-text">Data is anonymized before use. No personally identifiable information is shared.</p>
              </div>
            )}
          />
        </div>
      </SettingCard>

      {/* Export */}
      <SettingCard>
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Export</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon:"📦", title:"Export All Data",     desc:"Download everything: documents, chats, quiz history, notes, mastery data", btn:"Request Export", note:"Exports are prepared within 24 hours and delivered via email." },
            { icon:"📊", title:"Export Analytics",    desc:"Performance data, mastery scores, quiz results in CSV or PDF format",       btn:"Download Now",  note:null },
          ].map(({ icon, title, desc, btn, note }) => (
            <div key={title} className="bg-card-dark rounded-xl p-4 flex flex-col gap-3">
              <span className="text-[20px]">{icon}</span>
              <div>
                <p className="text-[12px] font-semibold text-white mb-1">{title}</p>
                <p className="text-[11px] text-tertiary-text leading-relaxed">{desc}</p>
              </div>
              <button className="w-full h-9 bg-card text-white text-[11px] font-medium rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all mt-auto">
                {btn}
              </button>
              {note && <p className="text-[10px] text-tertiary-text">{note}</p>}
            </div>
          ))}
        </div>
      </SettingCard>

      {/* Danger zone */}
      <div className="bg-card rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)] border border-[var(--color-red)]/20">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-red)] mb-5">Danger Zone</p>

        {/* Clear data */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--color-red)]/10">
          <div>
            <p className="text-[12px] font-semibold text-white mb-0.5">Clear All Learning Data</p>
            <p className="text-[11px] text-tertiary-text leading-relaxed">
              Delete all quiz history, mastery scores, and revision schedules. Uploaded documents are kept.
            </p>
          </div>
          <button className="flex-shrink-0 h-8 px-3.5 text-[var(--color-red)] text-[11px] font-medium rounded-xl border border-[var(--color-red)]/30 hover:bg-[var(--color-red)]/[0.05] transition-all whitespace-nowrap">
            Clear Learning Data
          </button>
        </div>

        {/* Delete account */}
        <div className="flex items-start justify-between gap-4 pt-5">
          <div>
            <p className="text-[12px] font-semibold text-white mb-0.5">Delete Account</p>
            <p className="text-[11px] text-tertiary-text leading-relaxed">
              Permanently delete your account and all associated data. This action is irreversible.
            </p>
            <p className="text-[10px] text-[var(--color-red)] italic mt-1">This action is irreversible.</p>
          </div>
          {deleteStep === 0 && (
            <button
              onClick={() => setDeleteStep(1)}
              className="flex-shrink-0 h-8 px-3.5 bg-[var(--color-red)]/15 text-[var(--color-red)] text-[11px] font-semibold rounded-xl border border-[var(--color-red)]/40 hover:bg-[var(--color-red)]/25 transition-all whitespace-nowrap"
            >
              Delete Account
            </button>
          )}
        </div>

        {deleteStep === 1 && (
          <div className="mt-4 flex flex-col gap-2.5 p-4 bg-[var(--color-red)]/[0.04] rounded-xl border border-[var(--color-red)]/15">
            <p className="text-[11px] text-secondary-text">Type your email to confirm deletion:</p>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Vimal@university.edu"
                className="flex-1 h-9 px-3 bg-card text-[12px] text-white placeholder:text-dark-gray rounded-xl outline-none focus:ring-1 focus:ring-[var(--color-red)]/30 min-w-0"
              />
              <button
                onClick={startDelete}
                disabled={email !== "Vimal@university.edu"}
                className={`h-9 px-4 text-[11px] font-bold rounded-xl transition-all whitespace-nowrap ${
                  email === "Vimal@university.edu"
                    ? "bg-[var(--color-red)] text-white hover:brightness-110"
                    : "bg-card text-dark-gray cursor-not-allowed"
                }`}
              >
                Confirm Delete
              </button>
              <button onClick={() => setDeleteStep(0)} className="text-[11px] text-secondary-text hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {deleteStep === 2 && (
          <div className="mt-4 flex items-center justify-between gap-3 p-4 bg-[var(--color-red)]/[0.06] rounded-xl border border-[var(--color-red)]/20 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[#FBBF24] text-[14px]">⚠</span>
              <p className="text-[12px] text-white font-medium">
                Deleting account in <span className="text-[var(--color-red)] font-bold">{countdown}s</span>...
              </p>
            </div>
            <button
              onClick={() => { setDeleteStep(0); setCountdown(10) }}
              className="h-8 px-4 bg-white text-dark-gray text-[11px] font-bold rounded-xl hover:bg-white/90 transition-all"
            >
              Cancel Deletion
            </button>
          </div>
        )}

        {/* Privacy footer */}
        <div className="mt-6 pt-5 border-t border-white/[0.05] flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] text-tertiary-text">
            Your data is processed in accordance with our Privacy Policy.
            We never sell or share your personal data with third parties.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-[11px] text-brand hover:underline">Read Privacy Policy →</button>
            <button className="text-[11px] text-brand hover:underline">Read Terms of Service →</button>
          </div>
        </div>
      </div>
    </div>
  )
}