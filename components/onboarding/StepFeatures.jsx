"use client"
import OnboardingCard from "./OnboardingCard"
import StepLabel from "./StepLabel"
import StepFooter from "./StepFooter"

const featureList = [
  {
    key: "adaptiveDifficulty",
    title: "Adaptive Quiz Difficulty",
    desc: "Quiz difficulty adjusts automatically based on your real-time accuracy and mastery scores.",
    impact: "Higher mastery gain · Avoids boredom",
    icon: "⚡",
  },
  {
    key: "weaknessPriority",
    title: "Weakness Prioritization",
    desc: "Quizzes and plans automatically focus on concepts where your mastery is weakest or declining.",
    impact: "Faster recovery · Systematic gap closing",
    icon: "◎",
  },
  {
    key: "spacedRepetition",
    title: "Spaced Repetition Scheduler",
    desc: "Revision sessions are scheduled based on performance, not fixed intervals. Weak topics return sooner.",
    impact: "Long-term retention · Prevents decay",
    icon: "📅",
  },
  {
    key: "confidenceScore",
    title: "Confidence Score on AI Answers",
    desc: "Every AI response shows a similarity score so you can judge answer reliability before trusting it.",
    impact: "Transparent AI · No guessing",
    icon: "%",
  },
  {
    key: "prerequisiteOrder",
    title: "Prerequisite-Aware Learning Order",
    desc: "Foundational concepts are always covered before advanced ones, even if you upload materials out of order.",
    impact: "Structured progression · No gaps",
    icon: "⛓",
  },
]

export default function StepFeatures({ formData, update, onNext, onBack }) {
  const allOn = Object.values(formData.features).every(Boolean)

  const toggle = (key) =>
    update("features", { ...formData.features, [key]: !formData.features[key] })

  const toggleAll = () => {
    const val = !allOn
    const newFeatures = {}
    featureList.forEach(({ key }) => { newFeatures[key] = val })
    update("features", newFeatures)
  }

  return (
    <OnboardingCard>

      <StepLabel text="Step 4 of 6 — Intelligence Features" />

      <h2 className="text-[22px] font-bold text-white">Configure Your Learning Intelligence</h2>
      <p className="text-[13px] text-[#888] mt-1 mb-5 leading-relaxed">
        These features form the core of Learnova's adaptive engine.
        All are recommended for first-time setup.
      </p>

      {/* Select all row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[12px] text-[#888]">
          <span className="text-[#4ADE80]">✓</span>
          {allOn ? "All features enabled (recommended)" : "Some features disabled"}
        </div>
        <button
          onClick={toggleAll}
          className="text-[12px] text-[#555] hover:text-white transition-colors"
        >
          {allOn ? "Disable All" : "Enable All"}
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        {featureList.map(({ key, title, desc, impact, icon }) => {
          const enabled = formData.features[key]
          return (
            <div
              key={key}
              className={`flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#2A2B2F] transition-all duration-200 ${
                !enabled ? "opacity-50" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#FA6E43]/10 flex items-center justify-center flex-shrink-0 text-[14px]">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white">{title}</p>
                <p className="text-[12px] text-[#888] mt-0.5 leading-relaxed">{desc}</p>
                <p className="text-[11px] text-[#4ADE80] mt-1.5">
                  <span className="text-[#666]">Impact: </span>{impact}
                </p>
              </div>
              {/* Toggle */}
              <button
                onClick={() => toggle(key)}
                className={`w-10 h-6 rounded-full flex-shrink-0 mt-0.5 transition-all duration-200 relative ${
                  enabled ? "bg-[#FA6E43]" : "bg-[#3a3b3f]"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                    enabled ? "left-5" : "left-1"
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>

      <StepFooter onNext={onNext} onBack={onBack} />

    </OnboardingCard>
  )
}