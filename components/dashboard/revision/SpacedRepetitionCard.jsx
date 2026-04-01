const signals = [
  { title: "Mastery Score",    desc: "Lower mastery → shorter interval before next review."                             },
  { title: "Accuracy Rate",    desc: "Concepts with high error rates return sooner."                                    },
  { title: "Retention Decay",  desc: "Measured by performance gap after rest periods."                                 },
  { title: "Review History",   desc: "First-time learners get shorter intervals than concepts reviewed multiple times." },
]

const intervals = [
  { label: "Mastery 90%+", value: "Review in 14 days" },
  { label: "Mastery 70%",  value: "Review in 7 days"  },
  { label: "Mastery 50%",  value: "Review in 3 days"  },
  { label: "Mastery <40%", value: "Review in 1 day"   },
]

export default function SpacedRepetitionCard() {
  return (
    <div className="bg-card-dark rounded-2xl border border-white/[0.04] p-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-1">
        Scheduling Logic
      </p>
      <h2 className="text-[clamp(14px,1.7vw,16px)] font-semibold text-white mb-4">
        How Revision Timing is Calculated
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5">

        {/* Left — signals */}
        <div>
          <p className="text-[12px] text-[--color-secondary-text] leading-relaxed mb-4">
            Learnova uses a performance-weighted spaced repetition algorithm. Each concept's next review date is calculated from four signals:
          </p>
          <div className="flex flex-col gap-3">
            {signals.map(({ title, desc }) => (
              <div
                key={title}
                className="flex gap-3 pl-3 border-l-2 border-[--color-brand]/20"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[--color-brand] text-[11px]">◈</span>
                    <span className="text-[12px] font-semibold text-white">{title}</span>
                  </div>
                  <p className="text-[11px] text-[--color-secondary-text]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — formula */}
        <div className="bg-[--color-card-dark] rounded-xl border border-white/[0.06] p-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[--color-brand]/70 mb-3">
            Interval Formula
          </p>
          <div className="bg-[--color-card-mid-dark] rounded-lg p-3.5 mb-4 font-mono text-[11px] leading-relaxed">
            <p className="text-white mb-1">Next Review =</p>
            <p className="text-[--color-secondary-text] pl-3">Base Interval</p>
            <p className="text-[--color-secondary-text] pl-3">× <span className="text-[--color-brand]">Mastery Factor</span> (0.4)</p>
            <p className="text-[--color-secondary-text] pl-3">× <span className="text-[--color-brand]">Accuracy Weight</span> (0.3)</p>
            <p className="text-[--color-secondary-text] pl-3">− <span className="text-[--color-brand]">Error Penalty</span> (0.2)</p>
            <p className="text-[--color-secondary-text] pl-3">+ <span className="text-[--color-brand]">Recency Boost</span> (0.1)</p>
            <p className="text-[--color-tertiary-text] mt-2 text-[10px]">// updates after each session</p>
          </div>
          <div className="flex flex-col divide-y divide-white/[0.04]">
            {intervals.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2">
                <span className="text-[11px] text-[--color-tertiary-text]">{label}</span>
                <span className="text-[11px] text-[--color-secondary-text]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}