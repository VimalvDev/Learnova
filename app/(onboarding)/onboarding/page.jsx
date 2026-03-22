"use client"
import { useState } from "react"
import StepWelcome    from "@/components/onboarding/StepWelcome"
import StepFocus      from "@/components/onboarding/StepFocus"
import StepTimeline   from "@/components/onboarding/StepTimeline"
import StepConfidence from "@/components/onboarding/StepConfidence"
import StepFeatures   from "@/components/onboarding/StepFeatures"
import StepCourse     from "@/components/onboarding/StepCourse"
import StepProcessing from "@/components/onboarding/StepProcessing"
import StepComplete   from "@/components/onboarding/StepComplete"

const stepMeta = [
  { num: 1, label: "Learning Focus",   desc: "Subject and academic level"  },
  { num: 2, label: "Study Timeline",   desc: "Target date and daily hours" },
  { num: 3, label: "Confidence Level", desc: "Your starting difficulty"    },
  { num: 4, label: "Intelligence",     desc: "Adaptive engine settings"    },
  { num: 5, label: "First Course",     desc: "Upload your material"        },
  { num: 6, label: "Processing",       desc: "System configuration"        },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    primarySubject:     "",
    additionalSubjects: [],
    academicLevel:      "",
    studyingFor:        "",
    targetDate:         "",
    dailyHours:         2,
    studyFrom:          "09:00",
    studyTo:            "11:00",
    confidenceLevel:    "",
    features: {
      adaptiveDifficulty: true,
      weaknessPriority:   true,
      spacedRepetition:   true,
      confidenceScore:    true,
      prerequisiteOrder:  true,
    },
    courseName:   "",
    unitName:     "",
    uploadedFile: null,
  })

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  if (step === 0) return <StepWelcome onNext={next} />
  if (step === 7) return <StepComplete formData={formData} />

  const progress = Math.round(((step - 1) / 5) * 100)

  return (
    <div className="flex min-h-screen bg-[#161719] text-white">

      {/* ── SIDEBAR — fixed, never scrolls ── */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-[22vw] h-screen z-40 flex-col bg-[#111214] border-r border-white/[0.05]">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.05] flex-shrink-0">
          <div className="w-8 h-8 bg-[#FA6E43] rounded-xl flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 10 10" fill="none" className="w-4 h-4">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Learnova</p>
            <p className="text-[0.6rem] text-[#FA6E43] font-bold uppercase tracking-widest mt-0.5">
              Student Portal
            </p>
          </div>
        </div>

        {/* Step list — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#FA6E43]/60 mb-5">
            Setup Progress
          </p>
          {stepMeta.map(({ num, label, desc }) => {
            const done   = num < step
            const active = num === step
            return (
              <div key={num} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    done
                      ? "bg-[#FA6E43] text-white"
                      : active
                      ? "bg-[#FA6E43]/15 text-[#FA6E43] ring-1 ring-[#FA6E43]"
                      : "bg-white/[0.04] text-[#3a3b3f]"
                  }`}>
                    {done ? (
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    ) : num}
                  </div>
                  {num < 6 && (
                    <div className={`w-px flex-1 my-1 min-h-[2rem] ${done ? "bg-[#FA6E43]" : "bg-white/[0.06]"}`} />
                  )}
                </div>

                <div className={`pt-0.5 flex-1 ${num < 6 ? "pb-6" : "pb-0"}`}>
                  <p className={`text-sm font-medium transition-colors ${
                    active ? "text-white" : done ? "text-[#888]" : "text-[#3a3b3f]"
                  }`}>
                    {label}
                  </p>
                  <p className={`text-xs mt-0.5 transition-colors ${
                    active ? "text-[#888891]" : "text-[#2a2b2f]"
                  }`}>
                    {desc}
                  </p>
                  {done && num === 1 && formData.primarySubject && (
                    <p className="text-[0.65rem] text-[#FA6E43] font-semibold mt-1 truncate">{formData.primarySubject}</p>
                  )}
                  {done && num === 2 && (
                    <p className="text-[0.65rem] text-[#FA6E43] font-semibold mt-1">{formData.dailyHours}h / day</p>
                  )}
                  {done && num === 3 && formData.confidenceLevel && (
                    <p className="text-[0.65rem] text-[#FA6E43] font-semibold mt-1 capitalize">{formData.confidenceLevel}</p>
                  )}
                  {done && num === 5 && formData.courseName && (
                    <p className="text-[0.65rem] text-[#FA6E43] font-semibold mt-1 truncate">{formData.courseName}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar — always visible */}
        <div className="px-5 py-5 border-t border-white/[0.05] flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#444]">Step {step} of 6</span>
            <span className="text-xs font-bold text-[#FA6E43]">{progress}%</span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FA6E43] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[0.6rem] text-[#2a2b2f] mt-2">Settings are saved automatically</p>
        </div>

      </aside>

      {/* ── MAIN — offset by sidebar, flex column ── */}
      <div className="flex-1 flex flex-col lg:ml-[22vw]">

        {/* HEADER — sticky, never scrolls away ── */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 lg:px-12 h-14 border-b border-white/[0.05] bg-[#161719] flex-shrink-0">

          {/* Mobile: logo + pill */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-6 h-6 bg-[#FA6E43] rounded-md flex items-center justify-center">
              <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-bold">Learnova</span>
            <div className="flex items-center gap-1.5 ml-2">
              {stepMeta.map(({ num }) => (
                <div
                  key={num}
                  className={`rounded-full h-[5px] transition-all duration-300 ${
                    num <= step ? "bg-[#FA6E43]" : "bg-white/10"
                  } ${num === step ? "w-[18px]" : "w-[5px]"}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: step label */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA6E43]/60">
              Step {step} of 6
            </span>
            <span className="text-[#333] text-xs">—</span>
            <span className="text-xs text-[#888891]">{stepMeta[step - 1].label}</span>
          </div>

          <button
            onClick={() => setStep(7)}
            className="text-xs text-[#444] hover:text-white transition-colors ml-auto lg:ml-0"
          >
            Skip setup →
          </button>
        </header>

        {/* CONTENT — this is the only scrolling zone ── */}
        <main className="flex-1 overflow-y-auto px-8 lg:px-16 xl:px-24 py-10 pb-32">
          <div className="max-w-2xl">
            {step === 1 && <StepFocus      formData={formData} update={update} onNext={next} onBack={back} />}
            {step === 2 && <StepTimeline   formData={formData} update={update} onNext={next} onBack={back} />}
            {step === 3 && <StepConfidence formData={formData} update={update} onNext={next} onBack={back} />}
            {step === 4 && <StepFeatures   formData={formData} update={update} onNext={next} onBack={back} />}
            {step === 5 && <StepCourse     formData={formData} update={update} onNext={next} onBack={back} />}
            {step === 6 && (
              <StepProcessing
                formData={formData} update={update}
                onNext={next} onBack={back}
                onComplete={() => setStep(7)}
              />
            )}
          </div>
        </main>

        {/* FOOTER — sticky bottom, never scrolls away ── */}
        <footer className="sticky bottom-0 z-30 flex items-center justify-between px-8 lg:px-12 h-[4.5rem] border-t border-white/[0.05] bg-[#161719] flex-shrink-0">

          {/* Back — always left */}
          {step > 1 ? (
            <button
              onClick={back}
              className="flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Back
            </button>
          ) : <div />}

          {/* Continue — always right */}
          <button
            onClick={next}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#FA6E43] text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all"
          >
            {step === 6 ? "Complete Setup" : "Continue"}
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </footer>

      </div>
    </div>
  )
}
