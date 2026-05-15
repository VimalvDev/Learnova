"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthInput from "@/components/auth/AuthInput"
import AuthButton from "@/components/auth/AuthButton"
import PasswordStrength from "@/components/auth/PasswordStrength"
import SectionLabel from "@/components/auth/SectionLabel"
import { createClient } from "@/utils/supabase/client"

export default function SignupPage() {
  const [name, setName]               = useState("")
  const [email, setEmail]             = useState("")
  const [password, setPassword]       = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading]         = useState(false)
  const [errors, setErrors]           = useState({})
  const [globalError, setGlobalError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const validate = () => {
    const e = {}
    if (!name.trim())
      e.name = "Full name is required."
    if (!email || !/\S+@\S+\.\S+/.test(email))
      e.email = "Please enter a valid email address."
    if (!password || password.length < 6)
      e.password = "Password must be at least 6 characters."
    if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match."
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }

    setErrors({})
    setGlobalError("")
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    setLoading(false)

    if (error) {
      setGlobalError(error.message)
      return
    }

    // New user → go to onboarding
    router.push('/onboarding')
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="john@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <div className="flex flex-col gap-1">
          <AuthInput
            label="Password"
            showToggle
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <PasswordStrength password={password} />
        </div>

        <AuthInput
          label="Confirm Password"
          showToggle
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          rightIcon={
            confirmPassword && password === confirmPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" className="w-4 h-4" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null
          }
        />
      </div>

      {globalError && (
        <p className="text-xs text-red -mt-2">⚠ {globalError}</p>
      )}

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