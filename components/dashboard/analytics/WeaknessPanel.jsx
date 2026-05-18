function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {[1,2,3,4].map((i) => (
        <div key={i} className="h-40 bg-white/[0.04] rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

const severityColor = {
  High:   "text-[#F87171] bg-[#F87171]/10",
  Medium: "text-[#FBBF24] bg-[#FBBF24]/10",
  Low:    "text-secondary-text bg-white/[0.06]",
}

const actionColor = {
  High:   "text-[#F87171] border-[#F87171]/30",
  Medium: "text-[#FBBF24] border-[#FBBF24]/30",
  Low:    "text-brand border-brand/30",
}

export default function WeaknessPanel({ patterns, loading }) {
  if (!loading && (!patterns || patterns.length === 0)) return null

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Weakness Intelligence</p>
        <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Detected Weakness Patterns</h2>
        <p className="text-[12px] text-tertiary-text mt-0.5">
          Identified from your error patterns, speed data, and retention history.
        </p>
      </div>

      {loading ? <Skeleton /> : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {patterns.map((p) => (
            <div key={p.title} className="bg-[#141414] rounded-xl border border-white/[0.04] p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center text-[16px]">
                    {p.icon}
                  </div>
                  <span className="text-[13px] font-semibold text-white">{p.title}</span>
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${severityColor[p.severity]}`}>
                  {p.severity}
                </span>
              </div>

              <p className="text-[12px] text-secondary-text leading-relaxed">{p.body}</p>

              {p.concepts?.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {p.concepts.map((c) => (
                    <span key={c} className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-lg">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {p.type === "speed_accuracy" && (
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: "Speed",    value: p.speedScore,    color: "bg-[#FBBF24]", max: 100 },
                    { label: "Accuracy", value: p.accuracyScore, color: "bg-[#F87171]", max: 100 },
                  ].map(({ label, value, color, max }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-[10px] text-tertiary-text w-14 shrink-0">{label}</span>
                      <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-white font-medium w-8 text-right">{value}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && patterns?.length > 0 && (
        <div className="mx-6 mb-6 flex items-center gap-2 px-4 py-3 bg-[#111] rounded-xl">
          <span className="text-brand text-[12px]">◈</span>
          <p className="text-[11px] text-secondary-text">
            <span className="text-white font-medium">{patterns.length} pattern{patterns.length !== 1 ? "s" : ""} detected</span>
            <span className="text-[#444] mx-2">·</span>
            {patterns.filter((p) => p.severity === "High").length} high priority
          </p>
        </div>
      )}
    </div>
  )
}