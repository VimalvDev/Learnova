export default function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-[56px] bg-[#111113] border-r border-white/[0.08]"
      style={{ background: "linear-gradient(135deg, #111113 0%, rgba(250,110,67,0.02) 100%)" }}
    >

      {/* Top */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 10 10" fill="none" className="w-4 h-4">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[18px] font-semibold text-white tracking-tight">Learnova</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="w-[3px] h-3 bg-brand rounded-full" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">— Auth</span>
        </div>
      </div>

      {/* Middle */}
      <div className="flex flex-col gap-8">

        <div className="flex items-center gap-2">
          <div className="w-[3px] h-3 bg-brand rounded-full" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Adaptive Learning Intelligence
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[36px] font-bold text-white leading-[1.1]">
            Build Mastery,<br />
            Not <span className="text-brand">Memorization.</span>
          </h2>
          <p className="text-[15px] text-[#888] leading-[1.7] max-w-[360px]">
            Learnova transforms your study materials into a personalized
            learning engine — tracking mastery at concept level, not
            just completion.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            "Confidence-scored AI answers from your documents",
            "Concept-level mastery tracking and scoring",
            "Adaptive quizzes with smart revision scheduling",
          ].map((feat) => (
            <div key={feat} className="flex items-start gap-3">
              <span className="text-brand text-[14px] flex-shrink-0 mt-0.5">→</span>
              <span className="text-[14px] text-[#888]">{feat}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {[
            ["97.8%", "Avg Mastery Rate"],
            ["3.2×",  "Faster Retention"],
          ].map(([num, label]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-[3px] h-8 bg-brand rounded-full" />
              <div>
                <p className="text-[22px] font-bold text-brand leading-none">{num}</p>
                <p className="text-[11px] uppercase tracking-widest text-[#888] mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex">
            {["A", "R", "M", "S"].map((initial, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-[#2A2B2F] border-2 border-[#111113] flex items-center justify-center text-[11px] font-bold text-white"
                style={{ marginLeft: i !== 0 ? "-6px" : "0" }}
              >
                {initial}
              </div>
            ))}
          </div>
          <span className="text-[13px] text-[#888]">Joined by 12,000+ serious learners</span>
        </div>
        <p className="text-[13px] text-[#888] ml-1">
          <span className="text-[#FBBF24]">★</span> 4.9 / 5 · Rated by students at top universities
        </p>
      </div>

    </div>
  )
}