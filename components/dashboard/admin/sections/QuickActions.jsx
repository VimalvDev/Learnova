"use client"
import { useState } from "react"
import { RiMailSendLine, RiArchiveLine, RiStethoscopeLine, RiDeleteBinLine } from "react-icons/ri"

const actions = [
  {
    id:    "broadcast",
    icon:  RiMailSendLine,
    title: "Send Broadcast",
    desc:  "Email all users or a specific segment",
    btn:   "Compose →",
    warn:  false,
  },
  {
    id:    "export",
    icon:  RiArchiveLine,
    title: "Export Data",
    desc:  "Full platform data dump · GDPR compliant",
    btn:   "Export →",
    warn:  false,
  },
  {
    id:    "diagnostics",
    icon:  RiStethoscopeLine,
    title: "Run Diagnostics",
    desc:  "System health scan and error check",
    btn:   "Run →",
    warn:  false,
  },
  {
    id:    "cache",
    icon:  RiDeleteBinLine,
    title: "Clear AI Cache",
    desc:  "Reset embeddings cache layer",
    btn:   "Clear →",
    warn:  true,
  },
]

export default function QuickActions() {
  const [confirming, setConfirming] = useState(null)

  return (
    <div className="bg-card rounded-2xl p-5">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Quick Actions</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map(({ id, icon: Icon, title, desc, btn, warn }) => (
          <div
            key={id}
            className={`flex flex-col gap-3 p-4 bg-card-dark rounded-xl border transition-all ${
              warn ? "border-[#FBBF24]/15 hover:border-[#FBBF24]/30" : "border-white/[0.04] hover:border-white/[0.08]"
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-(--color-brand)/10 flex items-center justify-center">
              <Icon className={`text-[16px] ${warn ? "text-[#FBBF24]" : "text-brand"}`} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-white mb-0.5">{title}</p>
              <p className="text-[10px] text-tertiary-text leading-relaxed">{desc}</p>
            </div>

            {confirming === id ? (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-[#FBBF24]">Clear cache? This will temporarily increase response times.</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setConfirming(null)}
                    className="flex-1 h-7 bg-(--color-brand) text-white text-[10px] font-bold rounded-lg hover:brightness-110 transition-all"
                  >
                    Confirm
                  </button>
                  <button onClick={() => setConfirming(null)} className="text-[10px] text-secondary-text hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => warn ? setConfirming(id) : null}
                className="text-[11px] text-brand font-medium hover:underline text-left"
              >
                {btn}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}