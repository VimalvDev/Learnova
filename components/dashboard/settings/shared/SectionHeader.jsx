export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="mb-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">{tag}</p>
      <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white mb-0.5">{title}</h2>
      {subtitle && <p className="text-[12px] text-tertiary-text">{subtitle}</p>}
    </div>
  )
}