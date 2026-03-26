"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthInput from "@/components/auth/AuthInput"
import AuthButton from "@/components/auth/AuthButton"
import PasswordStrength from "@/components/auth/PasswordStrength"
import SectionLabel from "@/components/auth/SectionLabel"

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm]       = useState({ name: "", email: "", university: "", password: "", confirm: "" })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Please enter your full name."
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email address."
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters."
    if (form.password !== form.confirm) e.confirm = "Passwords do not match."
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    // Demo — skip email verification, go straight to onboarding
    setTimeout(() => router.push("/onboarding"), 1200)
  }

  return (
    <div className="bg-light-black border border-white/6 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 shadow-2xl">

      <div className="flex flex-col gap-3">
        <SectionLabel text="New Account" />
        <div>
          <h1 className="text-3xl font-bold text-white">Create Your Account.</h1>
          <p className="text-sm text-bleed mt-1">
            Already have an account?{" "}
            <Link href="/login" className="text-brand hover:underline font-medium">
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
            placeholder="Min. 6 characters"
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
          <span className="text-brand hover:underline cursor-pointer">Terms of Service</span>
          {" "}and{" "}
          <span className="text-brand hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

    </div>
  )
}