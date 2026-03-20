"use client"
import { useState } from "react"
import Link from "next/link"

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helper,
  rightLabel,
  rightLabelHref,
  showToggle = false,
  rightIcon = null,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = showToggle ? (showPassword ? "text" : "password") : type

  return (
    <div className="flex flex-col gap-1.5">

      {/* Label row */}
      {(label || rightLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-[12px] font-medium text-[#888]">
              {label}
            </label>
          )}
          {rightLabel && (
            <Link
              href={rightLabelHref || "#"}
              className="text-[12px] text-[#FA6E43] hover:underline"
            >
              {rightLabel}
            </Link>
          )}
        </div>
      )}

      {/* Input wrapper */}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-[44px] px-[14px] bg-[#141414] border rounded-lg text-[14px] text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[#FA6E43] focus:ring-[3px] focus:ring-[#FA6E43]/20 ${error ? "border-[#F87171]" : "border-white/[0.08]"} ${showToggle || rightIcon ? "pr-10" : ""}`}
        />

        {/* Eye toggle */}
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}

        {/* Right icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Helper */}
      {helper && !error && (
        <p className="text-[11px] text-[#444]">{helper}</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-[12px] text-[#F87171]">⚠ {error}</p>
      )}

    </div>
  )
}