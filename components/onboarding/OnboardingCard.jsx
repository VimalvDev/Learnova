export default function Onboardingcard-dark({ children }) {
  return (
    <div
      className="w-full bg-card-dark border border-white/[0.06] rounded-2xl p-8 md:p-10"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)" }}
    >
      {children}
    </div>
  )
}