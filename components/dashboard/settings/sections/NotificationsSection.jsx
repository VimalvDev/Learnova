"use client"
import { useState } from "react"
import { RiArrowDownSLine } from "react-icons/ri"
import SettingCard   from "../shared/SettingCard"
import SectionHeader from "../shared/SectionHeader"
import ToggleRow     from "../shared/ToggleRow"
import SaveRow       from "../shared/SaveRow"

export default function NotificationsSection({ onSave }) {
  const [delivery, setDelivery] = useState("Both")
  const [toggles,  setToggles]  = useState({
    revisions: true, weakness: true, quiz: true, plan: false,
    weeklyReport: true, monthlyReport: false,
    docProcessed: true, updates: false,
  })
  const toggle = (k) => setToggles(prev => ({ ...prev, [k]: !prev[k] }))

  return (
    <SettingCard>
      <SectionHeader tag="Notifications" title="Notification Preferences"
        subtitle="Control when and how Learnova notifies you about your learning activity." />

      {/* Learning alerts */}
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Learning Alerts</p>
      <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04] mb-6">
        <ToggleRow title="Revision Reminders" desc="Notify when concepts are due for review"
          value={toggles.revisions} onChange={() => toggle("revisions")}
          extra={toggles.revisions && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-tertiary-text">Frequency:</span>
              <button className="flex items-center gap-1 h-6 px-2 bg-card rounded-lg text-[10px] text-secondary-text">
                Daily <RiArrowDownSLine className="text-[11px]" />
              </button>
            </div>
          )}
        />
        <ToggleRow title="Weakness Alerts" desc="Alert when a new weakness pattern is detected" value={toggles.weakness} onChange={() => toggle("weakness")} />
        <ToggleRow title="Quiz Performance Notifications" desc="Notify after each quiz with score summary" value={toggles.quiz} onChange={() => toggle("quiz")} />
        <ToggleRow title="Learning Plan Reminders" desc="Daily reminder to follow your active study plan" value={toggles.plan} onChange={() => toggle("plan")} last />
      </div>

      {/* Progress reports */}
      <div className="h-px bg-card-dark my-5" />
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Progress Reports</p>
      <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04] mb-6">
        <ToggleRow title="Weekly Progress Report" desc="Summary of mastery changes, quizzes, and streaks"
          value={toggles.weeklyReport} onChange={() => toggle("weeklyReport")}
          extra={toggles.weeklyReport && (
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {[["Delivery","Email"],["Day","Sunday"]].map(([l, v]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-tertiary-text">{l}:</span>
                  <button className="flex items-center gap-1 h-6 px-2 bg-card rounded-lg text-[10px] text-secondary-text">
                    {v} <RiArrowDownSLine className="text-[11px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        />
        <ToggleRow title="Monthly Mastery Summary" desc="Deep analytics report for the past month" value={toggles.monthlyReport} onChange={() => toggle("monthlyReport")} last />
      </div>

      {/* System */}
      <div className="h-px bg-card-dark my-5" />
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">System</p>
      <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04] mb-6">
        <ToggleRow title="Document Processing Complete" desc="Notify when uploaded documents finish processing" value={toggles.docProcessed} onChange={() => toggle("docProcessed")} />
        <ToggleRow title="Product Updates & Changelog" desc="New features and improvements to Learnova" value={toggles.updates} onChange={() => toggle("updates")} />
        <ToggleRow
          title="Security Alerts"
          desc="New login, password change, or suspicious activity — cannot be disabled"
          value={true}
          locked
          lockedTip="Security alerts cannot be disabled for account safety."
          last
        />
      </div>

      {/* Delivery method */}
      <div className="flex flex-col gap-3 p-4 bg-card-dark rounded-xl mb-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="text-[12px] font-medium text-white">Delivery method</span>
          <div className="flex items-center gap-1 p-1 bg-card rounded-xl">
            {["In-app","Email","Both"].map(d => (
              <button key={d} onClick={() => setDelivery(d)}
                className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all ${
                  delivery === d ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
                }`}>{d}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-secondary-text">Vimal@university.edu</span>
          <button className="text-[11px] text-brand hover:underline">Change →</button>
        </div>
      </div>

      <SaveRow label="Save Notification Settings" onSave={onSave} />
    </SettingCard>
  )
}