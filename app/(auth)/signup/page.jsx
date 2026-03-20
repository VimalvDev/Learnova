"use client"
import { useState } from "react"
import Link from "next/link"
import AuthInput from "@/components/auth/AuthInput"
import AuthButton from "@/components/auth/AuthButton"
import PasswordStrength from "@/components/auth/PasswordStrength"
import SectionLabel from "@/components/auth/SectionLabel"

export default function SignupPage() {
  const [form, setForm]         = useState({ name: "", email: "", university: "", password: "", confirm: "" })
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Please enter your full name."
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email address."
    if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters."
    if (form.password !== form.confirm) e.confirm = "Passwords do not match."
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 2000)
  }

  if (submitted) {
    return (
      <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#FA6E43]/10 border border-[#FA6E43]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FA6E43" className="w-8 h-8" strokeWidth="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-bold text-white">Check your inbox.</h2>
          <p className="text-[14px] text-[#888] leading-relaxed">
            We've sent a verification link to{" "}
            <span className="text-white font-semibold">{form.email}</span>
          </p>
        </div>
        <button className="text-[13px] text-[#FA6E43] hover:underline">
          Didn't receive it? Resend email →
        </button>
        <Link href="/login" className="text-[13px] text-[#888] hover:text-white transition-colors">
          ← Back to login
        </Link>
        <p className="text-[12px] text-[#444]">12,000+ students already learning on Learnova.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl p-8 sm:p-10 flex flex-col gap-6 shadow-2xl">

      <div className="flex flex-col gap-3">
        <SectionLabel text="New Account" />
        <div>
          <h1 className="text-[28px] font-bold text-white">Create Your Account.</h1>
          <p className="text-[14px] text-[#888] mt-1">
            Already have an account?{" "}
            <Link href="/login" className="text-[#FA6E43] hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          value={form.name}
          onChange={update("name")}
          error={errors.name}
        />
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="john@university.edu"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />
        <AuthInput
          label="University or Institution (optional)"
          placeholder="e.g. Delhi University, IIT Bombay"
          value={form.university}
          onChange={update("university")}
          helper="Helps us tailor your learning experience."
        />
        <div className="flex flex-col gap-1">
          <AuthInput
            label="Password"
            showToggle
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={update("password")}
            error={errors.password}
          />
          <PasswordStrength password={form.password} />
        </div>
        <AuthInput
          label="Confirm Password"
          showToggle
          placeholder="Re-enter your password"
          value={form.confirm}
          onChange={update("confirm")}
          error={errors.confirm}
          rightIcon={
            form.confirm && form.password === form.confirm ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" className="w-4 h-4" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <AuthButton loading={loading} onClick={handleSubmit}>
          Create Account →
        </AuthButton>
        <p className="text-center text-[12px] text-[#888] leading-relaxed">
          By creating an account, you agree to our{" "}
          <span className="text-[#FA6E43] hover:underline cursor-pointer">Terms of Service</span>
          {" "}and{" "}
          <span className="text-[#FA6E43] hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

    </div>
  )
}