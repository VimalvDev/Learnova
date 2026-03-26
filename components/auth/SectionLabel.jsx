export default function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[3px] h-4 bg-brand rounded-full flex-shrink-0" />
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
        — {text}
      </span>
    </div>
  )
}