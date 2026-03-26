"use client"
import { useState } from "react"
import Link from "next/link"

export default function OnboardingHeader({ step, totalSteps }) {
  const [showSkip, setShowSkip] = useState(false)

  return (
    <header className="h-[52px] flex items-center justify-between px-6 md:px-8 border-b border-white/[0.06] flex-shrink-0">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-6 h-6 bg-brand rounded-md flex items-center justify-center">
          <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
            <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-[15px] font-semibold text-white">Learnova</span>
      </Link>

      {/* Mobile step count */}
      {step > 0 && step <= 6 && (
        <span className="text-[12px] text-secondary-text lg:hidden">
          Step {step} of {totalSteps}
        </span>
      )}

      {/* Skip */}
      {step > 0 && step < 6 && (
        <div className="relative">
          <button
            onClick={() => setShowSkip(!showSkip)}
            className="text-[12px] text-secondary-text hover:text-white transition-colors"
          >
            Skip setup →
          </button>

          {showSkip && (
            <div className="absolute right-0 top-9 w-[240px] bg-[#212225] border border-white/[0.08] rounded-xl p-4 shadow-2xl z-50">
              <p className="text-[12px] text-[#888] leading-relaxed mb-3">
                Skip onboarding? You can configure these settings later.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setShowSkip(false)}
                  className="text-[12px] text-[#888] hover:text-white transition-colors"
                >
                  Stay
                </button>
                <Link
                  href="/dashboard"
                  className="text-[12px] text-brand hover:underline font-medium"
                >
                  Skip
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {(step === 0 || step >= 6) && <div />}

    </header>
  )
}
