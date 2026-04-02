export default function SettingCard({ children, className = "" }) {
  return (
    <div className={`bg-card rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)] ${className}`}>
      {children}
    </div>
  )
}