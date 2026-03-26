export default function ProcessingSummary() {
  return (
    <div className="bg-[#171717] rounded-2xl p-5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand/80 block mb-1">
        Processing Summary
      </span>
      <h3 className="text-[15px] font-semibold text-white/90 mb-4">Course Overview</h3>

      <div className="flex flex-col gap-0">
        {[
          {
            label: "Total Documents",
            value: "5 files",
            extra: (
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="text-[10px] text-[#4ADE80]">✓ 3 complete</span>
                <span className="text-[10px] text-brand">⟳ 1 processing</span>
                <span className="text-[10px] text-[#F87171]">✗ 1 error</span>
              </div>
            ),
          },
          { label: "Total Words",    value: "24,640 words"         },
          { label: "Semantic Chunks", value: "312 chunks generated" },
        ].map(({ label, value, extra }) => (
          <div key={label} className="py-3 border-b border-white/[0.04] last:border-0">
            <p className="text-[10px] uppercase tracking-widest text-secondary-text mb-1">{label}</p>
            <p className="text-[14px] font-semibold text-white">{value}</p>
            {extra}
          </div>
        ))}

        {/* Embeddings with bar */}
        <div className="py-3">
          <p className="text-[10px] uppercase tracking-widest text-secondary-text mb-1">Vector Embeddings</p>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[14px] font-semibold text-white">312 / 312</p>
            <span className="text-[10px] text-[#4ADE80]">✓</span>
          </div>
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      <div className="mt-4 py-2.5 px-3 bg-brand/8 rounded-xl text-center">
        <p className="text-[12px] text-brand font-medium">
          <span className="text-brand">◈</span> Knowledge base 60% ready
        </p>
      </div>
    </div>
  )
}