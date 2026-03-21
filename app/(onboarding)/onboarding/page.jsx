"use client"
import { useState } from "react"
import OnboardingHeader from "@/components/onboarding/OnboardingHeader"
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar"
import StepWelcome from "@/components/onboarding/StepWelcome"
import StepFocus from "@/components/onboarding/StepFocus"
import StepTimeline from "@/components/onboarding/StepTimeline"
import StepConfidence from "@/components/onboarding/StepConfidence"
import StepFeatures from "@/components/onboarding/StepFeatures"
import StepCourse from "@/components/onboarding/StepCourse"
import StepProcessing from "@/components/onboarding/StepProcessing"
import StepComplete from "@/components/onboarding/StepComplete"

export default function OnboardingPage() {
  const [step, setStep]           = useState(0)
  const [direction, setDirection] = useState("forward")

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

  const next = () => { setDirection("forward"); setStep((s) => s + 1) }
  const back = () => { setDirection("back");   setStep((s) => s - 1) }

  const stepProps = { formData, update, onNext: next, onBack: back, direction }

  const showSidebar = step >= 1 && step <= 6

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <OnboardingHeader step={step} totalSteps={6} />

      <div className="flex-1 flex">

        {/* Left sidebar — only during steps 1-6 */}
        {showSidebar && (
          <OnboardingSidebar currentStep={step} formData={formData} />
        )}

        {/* Main content */}
        <div className={`flex-1 flex items-center justify-center px-6 py-8 ${!showSidebar ? "w-full" : ""}`}>
          <div className="w-full max-w-[540px]">
            {step === 0 && <StepWelcome {...stepProps} />}
            {step === 1 && <StepFocus {...stepProps} />}
            {step === 2 && <StepTimeline {...stepProps} />}
            {step === 3 && <StepConfidence {...stepProps} />}
            {step === 4 && <StepFeatures {...stepProps} />}
            {step === 5 && <StepCourse {...stepProps} />}
            {step === 6 && <StepProcessing {...stepProps} onComplete={() => setStep(7)} />}
            {step === 7 && <StepComplete formData={formData} />}
          </div>
        </div>

      </div>
    </div>
  )
}