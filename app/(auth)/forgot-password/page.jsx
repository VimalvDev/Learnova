"use client"
import { useState } from "react"
import Link from "next/link"
import AuthInput from "@/components/auth/AuthInput"
import AuthButton from "@/components/auth/AuthButton"
import SectionLabel from "@/components/auth/SectionLabel"

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState("")

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setError("")
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  if (sent) {
    return (
      <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-[#FA6E43]/10 border border-[#FA6E43]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FA6E43" className="w-7 h-7" strokeWidth="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-bold text-white">Reset link sent.</h2>
          <p className="text-[13px] text-[#888] leading-relaxed">
            Check your email at{" "}
            <span className="text-white font-semibold">{email}</span>
            <br />The link expires in 15 minutes.
          </p>
        </div>
        <div className="flex gap-3 w-full">
          {["Open Gmail →", "Open Outlook →"].map((label) => (
            <button key={label} className="flex-1 h-9 rounded-full text-[12px] font-medium text-[#888] bg-[#212225] border border-white/[0.08] hover:border-[#FA6E43] hover:text-white transition-all">
              {label}
            </button>
          ))}
        </div>
        <Link href="/login" className="text-[13px] text-[#888] hover:text-white transition-colors">
          ← Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl p-8 sm:p-10 flex flex-col gap-7 shadow-2xl">

      <div className="flex flex-col gap-3">
        <SectionLabel text="Account Recovery" />
        <div>
          <h1 className="text-[28px] font-bold text-white">Forgot your password?</h1>
          <p className="text-[14px] text-[#888] mt-1 leading-relaxed">
            Enter your email and we'll send you a secure reset link valid for 15 minutes.
          </p>
        </div>
      </div>

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />

      <div className="flex flex-col gap-4">
        <AuthButton loading={loading} onClick={handleSubmit}>
          Send Reset Link →
        </AuthButton>
        <div className="h-px bg-white/[0.06]" />
        <p className="text-center text-[13px] text-[#888]">
          Remembered your password?{" "}
          <Link href="/login" className="text-[#FA6E43] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>

    </div>
  )
}