"use client"
import { useState } from "react"
import SettingCard   from "../shared/SettingCard"
import SectionHeader from "../shared/SectionHeader"
import ToggleRow     from "../shared/ToggleRow"
import SaveRow       from "../shared/SaveRow"

const depths = [
  { id:"concise",  label:"Concise",  desc:"Short definitions and key points. Ideal for quick review."            },
  { id:"balanced", label:"Balanced", desc:"Clear explanation with structured breakdown and one example."          },
  { id:"detailed", label:"Detailed", desc:"Full academic explanation with multiple examples and edge cases."      },
]

export default function AIBehaviorSection({ onSave }) {
  const [depth,    setDepth]    = useState("balanced")
  const [threshold,setThreshold]= useState(75)
  const [toggles,  setToggles]  = useState({
    strict: true, confidence: true, followup: true, citations: true,
    publicMode: true, manualSwitch: true, saveHistory: false,
  })

  const toggle = (k) => setToggles(prev => ({ ...prev, [k]: !prev[k] }))

  const thresholdNote =
    threshold < 65 ? { text: "⚠ Low threshold may allow inaccurate answers.", color: "text-[#FBBF24]" }
    : threshold > 85 ? { text: "⚠ High threshold may block many valid answers.", color: "text-[#FBBF24]" }
    : { text: "◈ Recommended range for most learners.", color: "text-brand" }

  return (
    <SettingCard>
      <SectionHeader tag="AI Settings" title="AI Behavior Controls"
        subtitle="Configure how the AI generates answers, recommendations, and feedback." />

      {/* Response behavior */}
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Response Behavior</p>
      <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04] mb-6">
        {[
          { k:"strict",     icon:"🔒", title:"Strict Document Mode",              desc:"AI answers restricted to your uploaded documents only." },
          { k:"confidence", icon:"📊", title:"Show Confidence Score",             desc:"Display similarity percentage on every AI response."    },
          { k:"followup",   icon:"💬", title:"Auto-Suggest Follow-up Questions",  desc:"Show 3 related questions after each AI response."       },
          { k:"citations",  icon:"📄", title:"Always Show Source Citations",       desc:"Display document name, chapter, and page with answers." },
        ].map(({ k, icon, title, desc }, i, arr) => (
          <ToggleRow key={k} title={`${icon}  ${title}`} desc={desc}
            value={toggles[k]} onChange={() => toggle(k)}
            last={i === arr.length - 1}
          />
        ))}
      </div>

      {/* Explanation depth */}
      <div className="h-px bg-card-dark my-5" />
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Explanation Depth</p>
      <div className="mb-2">
        <label className="text-[11px] font-medium text-tertiary-text block mb-2">Preferred Explanation Depth</label>
        <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl mb-3">
          {depths.map(d => (
            <button key={d.id} onClick={() => setDepth(d.id)}
              className={`flex-1 py-2 text-[11px] font-medium rounded-lg transition-all ${
                depth === d.id ? "bg-(--color-brand) text-white" : "text-tertiary-text hover:text-white"
              }`}>{d.label}</button>
          ))}
        </div>
        <p className="text-[11px] text-tertiary-text">
          {depths.find(d => d.id === depth)?.desc}
        </p>
      </div>

      {/* Confidence threshold */}
      <div className="h-px bg-card-dark my-5" />
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Confidence Threshold</p>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-medium text-tertiary-text">Minimum Confidence to Return Answer</label>
          <span className="text-[12px] font-bold text-white">{threshold}%</span>
        </div>
        <p className="text-[10px] text-tertiary-text mb-3">
          If similarity score falls below this threshold, Learnova will refuse to answer rather than guess.
        </p>
        <div className="relative h-1.5 mb-3">
          <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
          <div className="absolute left-0 top-0 h-full bg-(--color-brand) rounded-full"
            style={{ width: `${((threshold - 50) / 45) * 100}%` }}
          />
          <input type="range" min={50} max={95} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-(--color-brand) rounded-full border-2 border-(--color-card) pointer-events-none"
            style={{ left: `${((threshold - 50) / 45) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-dark-gray mb-2">
          <span>Permissive (60%)</span><span>Balanced (75%)</span><span>Strict (90%)</span>
        </div>
        <p className={`text-[11px] font-medium ${thresholdNote.color}`}>{thresholdNote.text}</p>
      </div>

      {/* Public mode */}
      <div className="h-px bg-card-dark my-5" />
      <p className="text-[9px] font-bold uppercase tracking-widest text-dark-gray mb-4">Public Mode</p>
      <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04] mb-6">
        {[
          { k:"publicMode",   title:"Enable Public Mode",                    desc:"Allow questions beyond your uploaded documents"                },
          { k:"manualSwitch", title:"Require Manual Switch to Public Mode",  desc:"Don't auto-suggest switching when confidence is low"           },
          { k:"saveHistory",  title:"Save Public Mode Explorations to History",desc:"Log all public mode queries in exploration log"              },
        ].map(({ k, title, desc }, i, arr) => (
          <ToggleRow key={k} title={title} desc={desc}
            value={toggles[k]} onChange={() => toggle(k)}
            last={i === arr.length - 1}
          />
        ))}
      </div>

      <SaveRow label="Save AI Settings" onSave={onSave} />

      <div className="mt-4 flex items-start gap-2 bg-card-dark rounded-xl px-4 py-3">
        <span className="text-brand text-[11px] flex-shrink-0 mt-0.5">◈</span>
        <p className="text-[11px] text-tertiary-text leading-relaxed">
          AI settings apply globally across all courses. Changes take effect immediately on next query.
        </p>
      </div>
    </SettingCard>
  )
}