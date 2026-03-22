"use client"
import { useRouter } from "next/navigation"
import { RiTimeLine, RiBrainLine, RiCalendarTodoLine, RiChat3Line } from "react-icons/ri"

const features = [
  { icon: RiBrainLine,        title: "Adaptive Mastery",    desc: "Tracks understanding across every concept automatically."  },
  { icon: RiCalendarTodoLine, title: "Spaced Revision",     desc: "Schedules review sessions based on your performance."      },
  { icon: RiChat3Line,        title: "Ask Your Notes",      desc: "AI answers questions directly from your uploaded material." },
]

export default function StepWelcome({ onNext }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#161719] flex flex-col">

      {/* Header */}
      <header className="h-[56px] flex items-center justify-between px-6 lg:px-12 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#FA6E43] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 10 10" fill="none" className="w-3.5 h-3.5">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-white">Learnova</span>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-[12px] text-[#555] hover:text-white transition-colors"
        >
          Skip setup →
        </button>
      </header>

      {/* Main — two column on large, single on mobile */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* Left — hero text */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12 lg:py-0">

          <div className="max-w-[520px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FA6E43]/10 rounded-full mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FA6E43] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FA6E43]">
                Setup — 4–6 minutes
              </span>
            </div>

            <h1 className="text-[42px] lg:text-[52px] font-black text-white leading-[1.1] mb-5">
              Welcome to<br />
              <span className="text-[#FA6E43]">Learnova.</span>
            </h1>

            <p className="text-[15px] text-[#888891] leading-relaxed mb-8 max-w-[420px]">
              Before you start, we need a few minutes to configure your learning system.
              Your answers shape how Learnova tracks mastery, generates quizzes,
              and schedules revision.
            </p>

            {/* What we'll set up */}
            <div className="flex flex-col gap-2.5 mb-10">
              {[
                "Learning profile & study timeline",
                "Adaptive intelligence settings",
                "First course and document upload",
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                    style={{ background: "rgba(250,110,67,0.15)", color: "#FA6E43" }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[14px] text-[#C0C0C0]">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={onNext}
                className="px-8 h-[50px] bg-[#FA6E43] text-white text-[14px] font-bold rounded-2xl hover:brightness-110 transition-all flex items-center gap-2"
              >
                Begin Setup
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-[13px] text-[#555] hover:text-white transition-colors"
              >
                Skip — go to dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Right — feature cards, hidden on mobile */}
        <div className="hidden lg:flex w-[420px] xl:w-[480px] flex-shrink-0 flex-col justify-center px-12 xl:px-16 py-16 border-l border-white/[0.05]">

          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FA6E43]/70 mb-6">
            What You'll Unlock
          </p>

          <div className="flex flex-col gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#212225] border border-white/[0.05]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FA6E43]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#FA6E43] text-[18px]" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white mb-1">{title}</p>
                  <p className="text-[12px] text-[#888891] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/[0.05]">
            {[
              { value: "12k+",    label: "Students"  },
              { value: "4.9★",    label: "Rating"    },
              { value: "2 min",   label: "Avg setup" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-[18px] font-black text-white">{value}</p>
                <p className="text-[11px] text-[#555]">{label}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  )
}