const steps = [
  { num: 1, label: "Learning Focus",     desc: "Subject and academic level"      },
  { num: 2, label: "Study Timeline",     desc: "Target date and daily hours"     },
  { num: 3, label: "Confidence Level",   desc: "Your starting difficulty"        },
  { num: 4, label: "Intelligence",       desc: "Adaptive engine settings"        },
  { num: 5, label: "First Course",       desc: "Upload your study material"      },
  { num: 6, label: "Done",              desc: "System is being configured"      },
]

export default function OnboardingSidebar({ currentStep, formData }) {
  const progress = Math.round(((currentStep - 1) / (steps.length - 1)) * 100)

  return (
    <aside className="hidden lg:flex flex-col w-[280px] xl:w-[320px] flex-shrink-0 border-r border-white/[0.06] px-8 py-10 min-h-full">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FA6E43] mb-1">
          Setup Progress
        </p>
        <p className="text-[13px] text-[#666]">
          Step {currentStep} of {steps.length}
        </p>

        {/* Progress bar */}
        <div className="mt-4 w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FA6E43] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-[#444] mt-1.5 text-right">{progress}%</p>
      </div>

      {/* Step list */}
      <div className="flex flex-col gap-1 flex-1">
        {steps.map(({ num, label, desc }) => {
          const isCompleted = num < currentStep
          const isActive    = num === currentStep
          const isUpcoming  = num > currentStep

          return (
            <div
              key={num}
              className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-[#FA6E43]/[0.06] border border-[#FA6E43]/20" : "border border-transparent"
              }`}
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#FA6E43] text-white"
                      : isActive
                      ? "bg-[#FA6E43]/20 border-2 border-[#FA6E43] text-[#FA6E43]"
                      : "bg-white/[0.04] border border-white/[0.08] text-[#444]"
                  }`}
                >
                  {isCompleted ? (
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    num
                  )}
                </div>
                {/* Connector line */}
                {num < steps.length && (
                  <div
                    className="w-px h-6 transition-all duration-300"
                    style={{ background: num < currentStep ? "#FA6E43" : "rgba(255,255,255,0.06)" }}
                  />
                )}
              </div>

              {/* Step text */}
              <div className="min-w-0 pb-4">
                <p className={`text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : isCompleted ? "text-[#888]" : "text-[#444]"
                }`}>
                  {label}
                </p>
                <p className={`text-[11px] mt-0.5 transition-colors duration-200 ${
                  isActive ? "text-[#888]" : "text-[#3a3b3f]"
                }`}>
                  {desc}
                </p>

                {/* Show filled data for completed steps */}
                {isCompleted && num === 1 && formData.primarySubject && (
                  <p className="text-[10px] text-[#FA6E43] mt-1 font-medium truncate">
                    {formData.primarySubject}
                  </p>
                )}
                {isCompleted && num === 2 && formData.targetDate && (
                  <p className="text-[10px] text-[#FA6E43] mt-1 font-medium">
                    {formData.dailyHours}h/day · {new Date(formData.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                )}
                {isCompleted && num === 3 && formData.confidenceLevel && (
                  <p className="text-[10px] text-[#FA6E43] mt-1 font-medium capitalize">
                    {formData.confidenceLevel}
                  </p>
                )}
                {isCompleted && num === 5 && formData.courseName && (
                  <p className="text-[10px] text-[#FA6E43] mt-1 font-medium truncate">
                    {formData.courseName}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-6 pt-6 border-t border-white/[0.06]">
        <p className="text-[11px] text-[#3a3b3f] leading-relaxed">
          Your settings are saved automatically as you progress through each step.
        </p>
      </div>

    </aside>
  )
}