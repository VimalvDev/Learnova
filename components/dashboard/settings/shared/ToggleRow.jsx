export default function ToggleRow({
  title, desc, value, onChange,
  locked = false, lockedTip = "",
  extra = null,
  last = false,
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 px-4 py-4 ${!last ? "border-b border-white/[0.04]" : ""}`}
      title={locked ? lockedTip : ""}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-white">{title}</p>
        <p className="text-[11px] text-tertiary-text mt-0.5 leading-relaxed">{desc}</p>
        {extra && <div className="mt-2">{extra}</div>}
      </div>
      <button
        onClick={() => !locked && onChange?.(!value)}
        disabled={locked}
        className={`w-8 h-4 rounded-full flex-shrink-0 relative transition-all duration-200 mt-0.5 ${
          locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${value ? "bg-(--color-brand)" : "bg-white/[0.1]"}`}
      >
        <div
          className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-200"
          style={{ left: value ? "17px" : "2px" }}
        />
      </button>
    </div>
  )
}