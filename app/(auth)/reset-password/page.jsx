"use client"
import { useState } from "react"
import Link from "next/link"
import AuthInput from "@/components/auth/AuthInput"
import AuthButton from "@/components/auth/AuthButton"
import PasswordStrength from "@/components/auth/PasswordStrength"
import SectionLabel from "@/components/auth/SectionLabel"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm]   = useState("")
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [success, setSuccess]   = useState(false)
  const expired = false

  const handleSubmit = () => {
    const e = {}
    if (!password || password.length < 8) e.password = "Password must be at least 8 characters."
    if (password !== confirm) e.confirm = "Passwords do not match."
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1500)
  }

  if (expired) {
    return (
      <div className="bg-light-black border border-white/6 rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" className="w-7 h-7" strokeWidth="1.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">This reset link has expired.</h2>
          <p className="text-sm text-bleed mt-2 leading-relaxed">
            Reset links are valid for 15 minutes only. Please request a new one.
          </p>
        </div>
        <Link href="/forgot-password" className="text-xs text-brand hover:underline">
          Request a new link →
        </Link>
        <Link href="/login" className="text-xs text-bleed hover:text-white transition-colors">
          ← Back to login
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="bg-light-black border border-white/6 rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" className="w-7 h-7" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Password updated.</h2>
          <p className="text-sm text-bleed mt-2 leading-relaxed">
            Your new password is active. You can now log in to your Learnova account.
          </p>
        </div>
        <Link
          href="/login"
          className="w-full h-11 rounded-xl bg-brand text-white text-base font-semibold flex items-center justify-center hover:brightness-110 transition-all"
        >
          Go to Login →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-light-black border border-white/6 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 shadow-2xl">

      {/* Secure pill */}
      <div className="w-fit px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mx-auto">
        <span className="text-xs text-brand font-medium">
          🔒 Secure Reset Link · Valid for 15 minutes
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel text="Password Reset" />
        <div>
          <h1 className="text-3xl font-bold text-white">Set a New Password.</h1>
          <p className="text-sm text-bleed mt-1">
            Choose a strong password for your Learnova account.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <AuthInput
            label="New Password"
            showToggle
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <PasswordStrength password={password} />
        </div>
        <AuthInput
          label="Confirm New Password"
          showToggle
          placeholder="Re-enter your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          rightIcon={
            confirm && password === confirm ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" className="w-4 h-4" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <AuthButton loading={loading} onClick={handleSubmit}>
          Update Password →
        </AuthButton>
        <Link href="/login" className="text-center text-xs text-bleed hover:text-white transition-colors">
          ← Back to login
        </Link>
      </div>

    </div>
  )
}