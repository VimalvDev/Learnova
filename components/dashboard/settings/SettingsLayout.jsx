"use client"
import { useState } from "react"
import Link from "next/link"
import { RiArrowRightSLine, RiCheckLine } from "react-icons/ri"
import SettingsNav               from "./SettingsNav"
import ProfileSection            from "./sections/ProfileSection"
import SecuritySection           from "./sections/SecuritySection"
import LearningPreferencesSection from "./sections/LearningPreferencesSection"
import AIBehaviorSection         from "./sections/AIBehaviorSection"
import NotificationsSection      from "./sections/NotificationsSection"
import DataPrivacySection        from "./sections/DataPrivacySection"

const sections = {
  profile:  ProfileSection,
  security: SecuritySection,
  learning: LearningPreferencesSection,
  ai:       AIBehaviorSection,
  notifs:   NotificationsSection,
  data:     DataPrivacySection,
}

export default function SettingsLayout() {
  const [active, setActive] = useState("profile")
  const [saved,  setSaved]  = useState(true)

  const handleSave = () => {
    setSaved(false)
    setTimeout(() => setSaved(true), 1500)
  }

  const ActiveSection = sections[active]

  return (
    <div className="w-full flex flex-col gap-0 -m-6 h-full min-h-0">

      {/* Page header */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-(--color-card) flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Link href="/dashboard" className="text-[11px] text-tertiary-text hover:text-brand transition-colors">
              Dashboard
            </Link>
            <RiArrowRightSLine className="text-dark-gray text-[12px]" />
            <span className="text-[11px] text-secondary-text">Settings</span>
          </div>
          <h1 className="text-[clamp(18px,2.2vw,24px)] font-bold text-white leading-tight">Account Settings</h1>
          <p className="text-[12px] text-tertiary-text mt-0.5">
            Manage your profile, preferences, and system behavior.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-tertiary-text mt-1">
          <RiCheckLine className="text-[#4ADE80] text-[13px]" />
          {saved ? "All changes saved · 2 minutes ago" : "Saving..."}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-[200px_1fr] flex-1 min-h-0 overflow-hidden">
        <SettingsNav active={active} onChange={setActive} />
        <div className="overflow-y-auto px-6 py-6">
          <div className="max-w-3xl">
            <ActiveSection onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  )
}