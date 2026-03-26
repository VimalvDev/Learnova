"use client"

export default function AuthButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = "button",
  variant = "primary",
}) {
  const base = "w-full h-11 rounded-lg text-base font-semibold transition-all duration-150 flex items-center justify-center gap-2"

  const variants = {
    primary: "bg-brand text-white hover:brightness-110 hover:scale-[1.01] active:scale-[0.98]",
    google: "bg-card text-white border border-white/10 hover:bg-[#2A2B2F] hover:border-white/20",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((d) => (
            <div
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      ) : children}
    </button>
  )
}