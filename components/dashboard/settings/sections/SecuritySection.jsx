"use client"
import { useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import SettingCard   from "../shared/SettingCard"
import SectionHeader from "../shared/SectionHeader"
import SaveRow       from "../shared/SaveRow"

const sessions = [
  { device: "Chrome · macOS",  location: "Delhi, India",  date: "Feb 24, 2026 · 3:42 PM", current: true  },
  { device: "Safari · iPhone", location: "Mumbai, India", date: "Feb 21, 2026 · 7:12 PM", current: false },
]

const logins = [
  { date: "Feb 24, 2026 3:42PM", device: "Chrome/macOS",   location: "Delhi, India",  status: "success" },
  { date: "Feb 22, 2026 9:14AM", device: "Safari/iPhone",  location: "Delhi, India",  status: "success" },
  { date: "Feb 20, 2026 11:32PM",device: "Chrome/macOS",   location: "Delhi, India",  status: "success" },
  { date: "Feb 18, 2026 8:01AM", device: "Unknown device", location: "Mumbai, India", status: "review"  },
  { date: "Feb 15, 2026 2:44PM", device: "Chrome/macOS",   location: "Delhi, India",  status: "success" },
]

function PasswordField({ label, placeholder = "••••••••" }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="text-[11px] font-medium text-tertiary-text block mb-1.5">{label}</label>
      <div className="flex items-center h-11 px-3.5 bg-card-dark rounded-xl">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[13px] text-white placeholder:text-dark-gray outline-none"
        />
        <button onClick={() => setShow(!show)} className="text-dark-gray hover:text-white transition-colors ml-2">
          {show ? <RiEyeOffLine className="text-[15px]" /> : <RiEyeLine className="text-[15px]" />}
        </button>
      </div>
    </div>
  )
}

export default function SecuritySection({ onSave }) {
  const [revoking, setRevoking] = useState(null)

  return (
    <div className="flex flex-col gap-5">

      {/* Password */}
      <SettingCard>
        <SectionHeader tag="Security" title="Account Security" />
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Password</p>
        <div className="flex flex-col gap-4 max-w-md">
          <PasswordField label="Current Password" />
          <div>
            <PasswordField label="New Password" />
            <div className="flex gap-1 mt-2">
              {["bg-[var(--color-red)]","bg-[#FBBF24]","bg-(--color-brand)","bg-[#4ADE80]"].map((c, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i < 3 ? c : "bg-white/[0.08]"}`} />
              ))}
            </div>
            <p className="text-[10px] text-[#4ADE80] mt-1">Strong</p>
          </div>
          <PasswordField label="Confirm New Password" />
        </div>
        <SaveRow label="Update Password" onSave={onSave} />
      </SettingCard>

      {/* 2FA */}
      <SettingCard>
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Two-Factor Authentication</p>
        <div className="flex items-start justify-between gap-4 p-4 bg-card-dark rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-(--color-brand)/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[14px]">🔐</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white mb-0.5">Two-Factor Authentication</p>
              <p className="text-[11px] text-tertiary-text leading-relaxed">
                Add an extra layer of security via authenticator app.
              </p>
              <span className="text-[9px] font-bold text-[#FBBF24] bg-[#FBBF24]/10 px-2 py-0.5 rounded-lg mt-1.5 inline-block">
                Not Enabled
              </span>
            </div>
          </div>
          <button className="text-[11px] text-brand hover:underline flex-shrink-0">Enable →</button>
        </div>
      </SettingCard>

      {/* Active sessions */}
      <SettingCard>
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Active Sessions</p>
        <div className="flex flex-col gap-2">
          {sessions.map((s, i) => (
            <div key={i}>
              <div className={`flex items-start justify-between gap-3 px-4 py-3.5 rounded-xl ${
                s.current
                  ? "bg-(--color-brand)/[0.06] border border-(--color-brand)/20"
                  : "bg-card-dark"
              }`}>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-medium text-white">{s.device}</span>
                    {s.current && (
                      <span className="text-[9px] font-bold text-brand bg-(--color-brand)/10 px-2 py-0.5 rounded-lg">
                        This device
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-tertiary-text">{s.location} · {s.date}</p>
                </div>
                {!s.current && (
                  <button
                    onClick={() => setRevoking(i)}
                    className="text-[11px] text-[var(--color-red)]/70 hover:text-[var(--color-red)] transition-colors flex-shrink-0"
                  >
                    Revoke
                  </button>
                )}
              </div>
              {revoking === i && (
                <div className="flex items-center gap-3 px-4 py-2 mt-1 bg-[var(--color-red)]/[0.04] rounded-xl">
                  <span className="text-[11px] text-secondary-text">Revoke this session?</span>
                  <button className="text-[11px] text-[var(--color-red)] font-medium">Yes, Revoke</button>
                  <button onClick={() => setRevoking(null)} className="text-[11px] text-secondary-text">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </SettingCard>

      {/* Login history */}
      <SettingCard>
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Recent Login Activity</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-card-dark">
                {["Date & Time","Device","Location","Status"].map(h => (
                  <th key={h} className="text-left text-[9px] font-bold uppercase tracking-widest text-dark-gray px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logins.map((l, i) => (
                <tr key={i} className={`border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors ${i === logins.length - 1 ? "border-0" : ""}`}>
                  <td className="px-4 py-3 text-[11px] text-secondary-text">{l.date}</td>
                  <td className="px-4 py-3 text-[12px] font-medium text-white">{l.device}</td>
                  <td className="px-4 py-3 text-[11px] text-tertiary-text">{l.location}</td>
                  <td className="px-4 py-3">
                    {l.status === "success" ? (
                      <span className="text-[10px] font-bold text-[#4ADE80]">✓ Success</span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#FBBF24]">⚠ Review</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="w-full text-center text-[11px] text-brand hover:underline mt-4">
          View Full Login History →
        </button>
      </SettingCard>
    </div>
  )
}