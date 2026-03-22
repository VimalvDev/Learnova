"use client"

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    desc: "Starting from the basics. Little or no prior knowledge of this subject. I need foundational structure first.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
        <path d="M12 2v10M12 22v-4M4.93 4.93l7.07 7.07M19.07 4.93l-7.07 7.07" />
      </svg>
    ),
  },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "I have some foundation but gaps remain. I want to strengthen understanding and fill in missing concepts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
        <rect x="2" y="14" width="4" height="7" />
        <rect x="9" y="9" width="4" height="12" />
        <rect x="16" y="4" width="4" height="17" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "advanced",
    title: "Advanced",
    desc: "I'm familiar with most concepts and reviewing for an exam or reinforcing mastery before a deadline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2">
        <rect x="2" y="14" width="4" height="7" />
        <rect x="9" y="9" width="4" height="12" />
        <rect x="16" y="4" width="4" height="17" />
      </svg>
    ),
  },
]

export default function StepConfidence({ formData, update }) {
  return (
    <div className="max-w-[640px]">

      {/* Heading — replaces StepLabel */}
      <div className="mb-8">
        <h2 className="text-[32px] lg:text-[38px] font-black text-white leading-tight mb-2">
          How Familiar Are You?
        </h2>
        <p className="text-[14px] text-[#888891] leading-relaxed">
          This calibrates your starting difficulty level and initial mastery baseline.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {levels.map(({ id, title, desc, icon }) => {
          const selected = formData.confidenceLevel === id
          return (
            <button
              key={id}
              onClick={() => update("confidenceLevel", id)}
              className="w-full text-left flex items-start gap-4 p-5 rounded-2xl transition-all duration-200"
              style={{
                background: selected ? "rgba(250,110,67,0.06)" : "#212225",
                border: selected
                  ? "1.5px solid rgba(250,110,67,0.4)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: selected ? "rgba(250,110,67,0.15)" : "rgba(255,255,255,0.04)",
                  color: selected ? "#FA6E43" : "#555",
                }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[15px] font-semibold mb-1 transition-colors"
                  style={{ color: selected ? "#fff" : "#C0C0C0" }}
                >
                  {title}
                </p>
                <p className="text-[13px] text-[#888891] leading-relaxed">{desc}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                style={{
                  background: selected ? "#FA6E43" : "transparent",
                  border: selected
                    ? "1.5px solid #FA6E43"
                    : "1.5px solid rgba(255,255,255,0.12)",
                }}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Note */}
      <div
        className="flex items-start gap-2.5 px-4 py-3.5 rounded-xl text-[12px] text-[#888891] leading-relaxed"
        style={{ background: "#212225", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="text-[#FA6E43] flex-shrink-0 mt-0.5">◈</span>
        <span>
          This sets your starting quiz difficulty only. Learnova recalibrates automatically as you progress.
        </span>
      </div>

      {/* No StepFooter — page.jsx footer handles Back + Continue */}

    </div>
  )
}