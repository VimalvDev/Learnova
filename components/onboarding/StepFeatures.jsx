"use client"
import { RiFlashlightLine, RiRadarLine, RiCalendar2Line, RiPercentLine, RiListOrdered2 } from "react-icons/ri"

const features = [
  {
    key: "adaptiveDifficulty",
    icon: RiFlashlightLine,
    title: "Adaptive Quiz Difficulty",
    desc: "Quiz difficulty adjusts automatically based on your real-time accuracy and mastery scores.",
    impact: ["Higher mastery gain", "Avoids boredom"],
  },
  {
    key: "weaknessPriority",
    icon: RiRadarLine,
    title: "Weakness Prioritization",
    desc: "Quizzes and plans automatically focus on concepts where your mastery is weakest or declining.",
    impact: ["Faster recovery", "Systematic gap closing"],
  },
  {
    key: "spacedRepetition",
    icon: RiCalendar2Line,
    title: "Spaced Repetition Scheduler",
    desc: "Revision sessions are scheduled based on performance, not fixed intervals. Weak topics return sooner.",
    impact: ["Long-term retention", "Prevents decay"],
  },
  {
    key: "confidenceScore",
    icon: RiPercentLine,
    title: "Confidence Score on AI Answers",
    desc: "Every AI response shows a similarity score so you can judge answer reliability before trusting it.",
    impact: ["Transparent AI", "No guessing"],
  },
  {
    key: "prerequisiteOrder",
    icon: RiListOrdered2,
    title: "Prerequisite-Based Ordering",
    desc: "Topics are ordered so foundational concepts are mastered before advanced ones are introduced.",
    impact: ["Structured learning", "No knowledge gaps"],
  },
]

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className="w-11 h-6 rounded-full flex-shrink-0 relative transition-all duration-300"
      style={{ background: on ? "#FA6E43" : "rgba(255,255,255,0.08)" }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
        style={{ left: on ? "22px" : "2px" }}
      />
    </button>
  )
}

export default function StepFeatures({ formData, update }) {
  const allOn = Object.values(formData.features).every(Boolean)

  const toggleFeature = (key) =>
    update("features", { ...formData.features, [key]: !formData.features[key] })

  const toggleAll = () => {
    const newVal = !allOn
    update("features", Object.fromEntries(Object.keys(formData.features).map((k) => [k, newVal])))
  }

  return (
    <div className="max-w-[640px]">
      <div className="mb-6">
        <h2 className="text-[32px] lg:text-[38px] font-black text-white leading-tight mb-2">
          Configure Your Learning Intelligence.
        </h2>
        <p className="text-[14px] text-[#888891] leading-relaxed">
          These features form the core of Learnova's adaptive engine. All are recommended for first-time setup.
        </p>
      </div>

      {/* All enabled row */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[#FA6E43] text-[12px]">✓</span>
          <span className="text-[12px] text-[#888891]">All features enabled (recommended)</span>
        </div>
        <button
          onClick={toggleAll}
          className="text-[12px] text-[#555] hover:text-white transition-colors"
        >
          {allOn ? "Disable All" : "Enable All"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {features.map(({ key, icon: Icon, title, desc, impact }) => {
          const on = formData.features[key]
          return (
            <div
              key={key}
              className="flex items-start gap-4 p-5 rounded-2xl transition-all"
              style={{
                background: on ? "rgba(250,110,67,0.04)" : "#212225",
                border: on
                  ? "1px solid rgba(250,110,67,0.2)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: on ? "rgba(250,110,67,0.12)" : "rgba(255,255,255,0.04)",
                  color: on ? "#FA6E43" : "#444",
                }}
              >
                <Icon className="text-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-white mb-1">{title}</p>
                <p className="text-[12px] text-[#888891] leading-relaxed mb-2">{desc}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#555]">Impact:</span>
                  {impact.map((tag, i) => (
                    <span key={tag} className="text-[10px] font-semibold text-[#FA6E43]">
                      {tag}{i < impact.length - 1 ? " ·" : ""}
                    </span>
                  ))}
                </div>
              </div>
              <Toggle on={on} onChange={() => toggleFeature(key)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}