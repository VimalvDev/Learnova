export default function PasswordStrength({ password }) {
  const getStrength = () => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const strength = getStrength()

  const labels = ["", "Weak", "Fair", "Strong", "Very Strong"]
  const colors = ["", "#F87171", "#FBBF24", "#FA6E43", "#4ADE80"]

  if (!password) return null

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full transition-all duration-300"
            style={{
              background: i <= strength ? colors[strength] : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
      <p className="text-[11px]" style={{ color: colors[strength] }}>
        {labels[strength]}
      </p>
    </div>
  )
}