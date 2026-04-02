"use client"
import { useState } from "react"
import SettingCard   from "../shared/SettingCard"
import SectionHeader from "../shared/SectionHeader"
import ToggleRow     from "../shared/ToggleRow"
import SaveRow       from "../shared/SaveRow"

const diffLevels = ["Auto","Easy","Medium","Hard"]
const qPresets   = [5, 10, 15, 20]
const qTypes     = ["Multiple Choice","True/False","Short Answer","Fill in Blank"]

export default function LearningPreferencesSection({ onSave }) {
  const [diff,      setDiff]      = useState("Auto")
  const [count,     setCount]     = useState(15)
  const [types,     setTypes]     = useState(["Multiple Choice","True/False"])
  const [hours,     setHours]     = useState(2.5)
  const [reminder,  setReminder]  = useState("Daily")
  const [toggles,   setToggles]   = useState({
    adaptive: true, weak: true, prereq: true, autoPlan: false, explain: false,
  })

  const toggleType = (t) =>
    setTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggle = (k) => setToggles(prev => ({ ...prev, [k]: !prev[k] }))

  const hoursPct = ((hours - 0.5) / 5.5) * 100
  const countPct = ((count - 5) / 25) * 100

  return (
    <div className="flex flex-col gap-5">
      <SettingCard>
        <SectionHeader tag="Learning Preferences" title="Study Configuration"
          subtitle="Controls how Learnova structures your quizzes, schedules, and daily plans." />

        {/* Quiz difficulty */}
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Quiz Settings</p>
        <div className="flex flex-col gap-5 mb-6">
          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-2">Default Difficulty Mode</label>
            <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
              {diffLevels.map(d => (
                <button key={d} onClick={() => setDiff(d)}
                  className={`flex-1 py-2 text-[11px] font-medium rounded-lg transition-all ${
                    diff === d ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
                  }`}>{d}</button>
              ))}
            </div>
          </div>

          {/* Question count slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-medium text-tertiary-text">Default Questions per Quiz</label>
              <span className="text-[12px] font-bold text-white">{count}</span>
            </div>
            <div className="relative h-1.5 mb-3">
              <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
              <div className="absolute left-0 top-0 h-full bg-(--color-brand) rounded-full" style={{ width: `${countPct}%` }} />
              <input type="range" min={5} max={30} value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-(--color-brand) rounded-full border-2 border-(--color-card) pointer-events-none"
                style={{ left: `${countPct}%` }}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {qPresets.map(p => (
                <button key={p} onClick={() => setCount(p)}
                  className={`px-3 py-1 text-[10px] rounded-lg border transition-all ${
                    count === p
                      ? "border-(--color-brand) text-brand bg-(--color-brand)/[0.08]"
                      : "border-white/[0.06] text-tertiary-text hover:border-white/[0.1] hover:text-white"
                  }`}>{p}</button>
              ))}
            </div>
          </div>

          {/* Question types */}
          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-2">Preferred Question Types</label>
            <div className="grid grid-cols-2 gap-2">
              {qTypes.map(t => {
                const on = types.includes(t)
                return (
                  <button key={t} onClick={() => toggleType(t)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                      on ? "border-(--color-brand)/40 bg-(--color-brand)/[0.05]" : "border-white/[0.06] bg-card-dark hover:border-white/[0.1]"
                    }`}>
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all ${
                      on ? "bg-(--color-brand) border-(--color-brand)" : "border-white/[0.2]"
                    }`}>
                      {on && <span className="text-white text-[9px] font-bold">✓</span>}
                    </div>
                    <span className={`text-[11px] font-medium ${on ? "text-white" : "text-secondary-text"}`}>{t}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Study schedule */}
        <div className="h-px bg-card-dark my-5" />
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Study Schedule</p>
        <div className="flex flex-col gap-5 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-medium text-tertiary-text">Study Hours Per Day</label>
              <span className="text-[12px] font-bold text-white">{hours}h</span>
            </div>
            <div className="relative h-1.5 mb-2">
              <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
              <div className="absolute left-0 top-0 h-full bg-(--color-brand) rounded-full" style={{ width: `${hoursPct}%` }} />
              <input type="range" min={0.5} max={6} step={0.5} value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-(--color-brand) rounded-full border-2 border-(--color-card) pointer-events-none"
                style={{ left: `${hoursPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-dark-gray">
              <span>Light (1h)</span><span>Moderate (2.5h)</span><span>Intensive (4h+)</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-2">Preferred Study Window</label>
            <div className="grid grid-cols-2 gap-3">
              {[["From","09:00 AM"],["To","11:00 AM"]].map(([l, v]) => (
                <div key={l}>
                  <label className="text-[10px] text-tertiary-text block mb-1">{l}</label>
                  <div className="h-11 px-3.5 bg-card-dark rounded-xl flex items-center text-[13px] text-secondary-text">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-2">Revision Reminders</label>
            <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl w-fit">
              {["Daily","Every 2 Days","Weekly","Off"].map(r => (
                <button key={r} onClick={() => setReminder(r)}
                  className={`px-3 py-1.5 text-[10px] font-medium rounded-lg transition-all ${
                    reminder === r ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
                  }`}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Smart toggles */}
        <div className="h-px bg-card-dark my-5" />
        <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Adaptive Settings</p>
        <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04]">
          {[
            { k:"adaptive", title:"Enable Adaptive Difficulty",        desc:"Quizzes automatically adjust to your mastery level"         },
            { k:"weak",     title:"Prioritize Weak Topics",            desc:"Always front-load critical concepts in quizzes"             },
            { k:"prereq",   title:"Include Prerequisite Ordering",     desc:"Study foundational concepts before advanced ones"           },
            { k:"autoPlan", title:"Auto-Generate Learning Plan",       desc:"Rebuild plan automatically after each quiz session"         },
            { k:"explain",  title:"Explanation Mode After Incorrect",  desc:"Show detailed explanations after wrong quiz answers"        },
          ].map(({ k, title, desc }, i, arr) => (
            <ToggleRow key={k} title={title} desc={desc}
              value={toggles[k]} onChange={() => toggle(k)}
              last={i === arr.length - 1}
            />
          ))}
        </div>

        <SaveRow label="Save Learning Preferences" onSave={onSave} />
      </SettingCard>
    </div>
  )
}