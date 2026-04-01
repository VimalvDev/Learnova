export default function PublicQuizPreview({ topic, onSwitchPrivate }) {
  const q1 = {
    text: "Which of the following properties cannot be guaranteed simultaneously in a distributed system?",
    options: [
      "Consistency and Availability",
      "Availability and Partition Tolerance",
      "Consistency, Availability, and Partition Tolerance",
      "Partition Tolerance only",
    ],
    correct: 2,
  }

  return (
    <div className="bg-card rounded-2xl p-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">
        Generated Quiz
      </p>
      <h2 className="text-[clamp(15px,1.8vw,17px)] font-semibold text-white mb-3">
        {topic} — 5 Questions
      </h2>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 px-3 py-2.5 bg-[#3B82F6]/[0.04] rounded-xl border border-[#3B82F6]/15 mb-5">
        <span className="text-[#3B82F6] text-[13px] flex-shrink-0 mt-0.5">ⓘ</span>
        <p className="text-[11px] text-(--color-secondary-text)">
          Generated from AI training data — not your documents. Verify before exam use.
        </p>
      </div>

      {/* Q1 visible */}
      <div className="mb-4">
        <p className="text-[11px] font-bold text-(--color-brand) mb-2">Q1</p>
        <p className="text-[13px] text-white leading-relaxed mb-3">{q1.text}</p>
        <div className="flex flex-col gap-2">
          {q1.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-card-dark rounded-xl">
              <div className="w-4 h-4 rounded-full border-2 border-white/[0.2] flex-shrink-0" />
              <span className="text-[12px] text-(--color-secondary-text)">{opt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Q2–Q3 blurred */}
      {[2, 3].map((n) => (
        <div key={n} className="mb-3" style={{ filter: "blur(3px)", opacity: 0.4, pointerEvents: "none" }}>
          <p className="text-[11px] font-bold text-(--color-brand) mb-2">Q{n}</p>
          <div className="h-4 bg-card-dark rounded w-3/4 mb-2" />
          <div className="flex flex-col gap-2">
            {[0,1,2,3].map((i) => (
              <div key={i} className="h-10 bg-card-dark rounded-xl" />
            ))}
          </div>
        </div>
      ))}

      {/* CTAs */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-(--color-card-dark)">
        <button className="flex-1 h-9 bg-(--color-brand) text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all">
          Start This Quiz →
        </button>
        <button className="h-9 px-4 bg-card-dark text-[12px] text-(--color-secondary-text) rounded-xl border border-white/[0.06] hover:border-white/[0.1] hover:text-white transition-all">
          Modify Difficulty ▾
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-(--color-brand) text-[11px]">◈</span>
        <p className="text-[11px] text-(--color-tertiary-text)">
          This quiz can be added to your course and tracked in Mastery Analytics.
        </p>
      </div>
    </div>
  )
}