"use client"
import { useRouter } from "next/navigation"
import { RiCheckLine, RiBrainLine, RiCalendarTodoLine, RiChat3Line, RiArrowRightLine } from "react-icons/ri"

export default function StepComplete({ formData }) {
  const router = useRouter()

  const summary = [
    { label: "Subject",      value: formData.primarySubject   || "DBMS — Semester 4" },
    { label: "Daily Study",  value: `${formData.dailyHours}h / day`                  },
    { label: "Confidence",   value: formData.confidenceLevel  || "Intermediate"      },
    { label: "Course",       value: formData.courseName       || "My First Course"   },
  ]

  const unlocked = [
    { icon: RiBrainLine,        label: "Adaptive Quiz Engine"      },
    { icon: RiCalendarTodoLine, label: "Spaced Revision Scheduler" },
    { icon: RiChat3Line,        label: "Ask Your Notes"            },
  ]

  return (
    <div className="min-h-screen bg-[#161719] flex flex-col">

      {/* Header */}
      <header className="h-[56px] flex items-center px-6 lg:px-12 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 10 10" fill="none" className="w-3.5 h-3.5">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-white">Learnova</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* Left */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12 lg:py-0">
          <div className="max-w-[480px]">

            {/* Success badge */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
              style={{ background: "rgba(250,110,67,0.12)", border: "1.5px solid rgba(250,110,67,0.3)" }}
            >
              <RiCheckLine className="text-brand text-[32px]" />
            </div>

            <h1 className="text-[40px] lg:text-[48px] font-black text-white leading-tight mb-4">
              You're all set.
            </h1>
            <p className="text-[15px] text-[#888891] leading-relaxed mb-10">
              Your learning system has been configured. Learnova is ready to track your
              mastery and generate personalised content from your material.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 h-[50px] bg-brand text-white text-[14px] font-bold rounded-2xl hover:brightness-110 transition-all flex items-center gap-2"
              >
                Go to Dashboard
                <RiArrowRightLine className="text-[16px]" />
              </button>
              <button
                onClick={() => router.push("/courses")}
                className="px-6 h-[50px] bg-[#212225] text-[#C0C0C0] text-[13px] font-medium rounded-2xl hover:text-white hover:bg-[#2a2b2f] transition-all"
              >
                Upload a document first
              </button>
            </div>

          </div>
        </div>

        {/* Right — summary + features */}
        <div className="hidden lg:flex w-[420px] xl:w-[480px] flex-shrink-0 flex-col justify-center px-12 xl:px-16 py-16 border-l border-white/[0.05] gap-6">

          {/* Summary card */}
          <div className="bg-[#212225] rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/[0.05]">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand/70">
                Your Setup Summary
              </p>
            </div>
            {summary.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i < summary.length - 1 ? "border-b border-white/[0.05]" : ""
                }`}
              >
                <span className="text-[12px] text-secondary-text">{label}</span>
                <span className="text-[13px] font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Unlocked features */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand/70 mb-3">
              Features Unlocked
            </p>
            <div className="flex flex-col gap-2.5">
              {unlocked.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 bg-[#212225] rounded-xl"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-brand text-[15px]" />
                  </div>
                  <span className="text-[13px] text-[#C0C0C0]">{label}</span>
                  <RiCheckLine className="text-[#4ADE80] text-[14px] ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}