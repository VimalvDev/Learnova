export default function HeroImage() {
  return (
    <div className="relative w-full h-full z-30">
      <div className="rounded-xl overflow-hidden border border-white/8 w-full h-full bg-card">

        {/* Window bar */}
        <div className="flex items-center gap-2 px-[2%] py-[1%] bg-light-black">
          <div className="flex gap-1.5">
            <div className="w-[1%] aspect-square rounded-full bg-[#FF5F57]" />
            <div className="w-[1%] aspect-square rounded-full bg-[#FEBC2E]" />
            <div className="w-[1%] aspect-square rounded-full bg-[#28C840]" />
          </div>
          <div className="mx-auto bg-white/5 rounded-md px-3 py-1 text-[1.2cqw] text-dark-gray">
            learnova.app/dashboard
          </div>
          <div className="w-[5%]" />
        </div>

        {/* Inner grid — takes remaining height after window bar */}
        <div className="grid h-[calc(100%-40px)]" style={{ gridTemplateColumns: "18% 82%" }}>

          {/* Sidebar */}
          <div className="flex flex-col gap-[1%] p-[3%] border-r border-white/10 h-full overflow-hidden">

            <div className="flex items-center gap-2 pb-[4%] mb-[2%] border-b border-white/10">
              <div className="w-[15%] aspect-square rounded-[25%] bg-brand flex items-center justify-center shrink-0">
                <svg viewBox="0 0 10 10" fill="none" className="w-[60%] h-[60%]">
                  <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[1.4cqw] font-bold text-white truncate">Learnova</span>
            </div>

            <p className="text-[1cqw] font-bold uppercase tracking-widest text-dark-gray mt-[2%]">Study</p>
            {["Dashboard", "My Courses", "RAG Chat", "Quizzes"].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-[6%] px-[8%] py-[3%] rounded-lg text-[1.2cqw] truncate ${
                  i === 0 ? "bg-brand/10 text-brand" : "text-secondary-text"
                }`}
              >
                <div className={`w-[6%] aspect-square rounded-full shrink-0 ${i === 0 ? "bg-brand" : "bg-current"}`} />
                {item}
              </div>
            ))}

            <p className="text-[1cqw] font-bold uppercase tracking-widest text-dark-gray mt-[4%]">Insights</p>
            {["Analytics", "Revision Plan", "Knowledge Map"].map((item) => (
              <div key={item} className="flex items-center gap-[6%] px-[8%] py-[3%] rounded-lg text-[1.2cqw] text-secondary-text">
                <div className="w-[6%] aspect-square rounded-full shrink-0 bg-current" />
                <span className="truncate">{item}</span>
              </div>
            ))}

            <div className="mt-auto p-[6%] rounded-lg border border-brand/15 bg-brand/8">
              <p className="text-[1cqw] font-bold uppercase tracking-widest text-brand mb-[4%]">Next Quiz</p>
              <p className="text-[1.2cqw] font-medium text-[#ccc]">Normalization</p>
              <p className="text-[1cqw] text-secondary-text mt-[2%]">In 2 hours</p>
            </div>
          </div>

          {/* Main */}
          <div className="flex flex-col h-full min-w-0">

            {/* Top bar */}
            <div className="flex items-center justify-between px-[2%] py-[1.5%] border-b border-white/5">
              <div>
                <p className="text-[1.4cqw] font-semibold text-white">Mastery Overview</p>
                <p className="text-[1cqw] text-secondary-text mt-[1%]">Database Systems · Week 4</p>
              </div>
              <div className="flex items-center gap-2 text-[1cqw] font-bold uppercase tracking-widest text-[#4ADE80]">
                <div className="w-[0.8cqw] h-[0.8cqw] rounded-full bg-[#4ADE80] animate-pulse" />
                Live
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-[1%] p-[1.5%] h-full">

              {/* Gauge */}
              <div className="flex flex-col items-center gap-[3%] p-[3%] rounded-xl border border-white/5 bg-[#1a1b1e]">
                <p className="text-[1cqw] font-bold uppercase tracking-widest text-secondary-text self-start">Overall</p>
                <svg viewBox="0 0 80 80" className="w-[35%] h-auto">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-brand)" strokeWidth="7"
                    strokeDasharray="201.1" strokeDashoffset="50.3"
                    strokeLinecap="round" transform="rotate(-90 40 40)" />
                  <text x="40" y="37" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Inter">84%</text>
                  <text x="40" y="49" textAnchor="middle" fill="#555" fontSize="7" fontFamily="Inter">Mastery</text>
                </svg>
                <div className="flex gap-[6%] w-full justify-center">
                  {[["12","text-[#4ADE80]","Mastered"],["4","text-[#FBBF24]","Review"],["2","text-[#F87171]","Critical"]].map(([num,color,label]) => (
                    <div key={label} className="text-center">
                      <p className={`text-[1.4cqw] font-bold ${color}`}>{num}</p>
                      <p className="text-[0.9cqw] text-[#444]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concept bars */}
              <div className="flex flex-col gap-[3%] p-[3%] rounded-xl border border-white/5 bg-[#1a1b1e]">
                <p className="text-[1cqw] font-bold uppercase tracking-widest text-secondary-text">Concepts</p>
                {[
                  ["SQL Joins",       91, "bg-brand",     "text-brand",     "Mastered", "text-[#4ADE80]", "bg-[#4ADE80]/10"],
                  ["Functional Dep.", 67, "bg-[#FBBF24]", "text-[#FBBF24]", "Revision", "text-[#FBBF24]", "bg-[#FBBF24]/10"],
                  ["Normalization",   34, "bg-[#F87171]", "text-[#F87171]", "Critical", "text-[#F87171]", "bg-[#F87171]/10"],
                  ["Indexing",        78, "bg-brand",     "text-brand",     "Revision", "text-[#FBBF24]", "bg-[#FBBF24]/10"],
                ].map(([name, pct, barBg, barText, label, labelText, labelBg]) => (
                  <div key={name} className="flex flex-col gap-[2%]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[1.1cqw] text-[#888] truncate">{name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[1.1cqw] font-bold ${barText}`}>{pct}%</span>
                        <span className={`text-[0.9cqw] font-bold uppercase tracking-wide px-[0.4em] py-[0.15em] rounded-full ${labelText} ${labelBg}`}>
                          {label}
                        </span>
                      </div>
                    </div>
                    <div className="h-[0.3cqw] rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full ${barBg}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Revision */}
              <div className="col-span-2 flex items-center justify-between gap-4 p-[2%] rounded-xl border border-white/5 bg-[#1a1b1e]">
                <div className="min-w-0">
                  <p className="text-[1cqw] font-bold uppercase tracking-widest text-brand mb-[2%]">Next Revision</p>
                  <p className="text-[1.2cqw] font-semibold text-white truncate">Normalization — 2NF & 3NF</p>
                  <div className="flex items-center gap-2 mt-[2%]">
                    <div className="w-[0.6cqw] h-[0.6cqw] rounded-full bg-[#FBBF24] shrink-0" />
                    <span className="text-[1cqw] text-secondary-text truncate">Today · 3:00 PM · Spaced repetition</span>
                  </div>
                </div>
                <div className="flex flex-col items-center p-[2%] rounded-lg border border-brand/15 bg-brand/8 shrink-0">
                  <span className="text-[2cqw] font-black text-brand leading-none">3</span>
                  <span className="text-[0.9cqw] text-secondary-text mt-[4%]">due today</span>
                </div>
              </div>

              {/* Chat */}
              <div className="col-span-2 flex flex-col gap-[2%] p-[2%] rounded-xl border border-white/5 bg-[#1a1b1e]">
                <div className="flex items-center justify-between">
                  <p className="text-[1cqw] font-bold uppercase tracking-widest text-secondary-text">RAG Context Chat</p>
                  <span className="text-[1cqw] font-bold px-[0.6em] py-[0.2em] rounded-full text-brand bg-brand/10">
                    94% confidence
                  </span>
                </div>
                <div className="text-[1.1cqw] text-[#aaa] px-[1.5%] py-[1%] self-start max-w-[75%] bg-white/5 rounded-lg rounded-tl-xs">
                  What is the difference between 2NF and 3NF?
                </div>
                <div className="text-[1.1cqw] text-[#ccc] px-[1.5%] py-[1%] self-end max-w-[80%] leading-relaxed bg-brand/8 border border-brand/15 rounded-lg rounded-br-xs">
                  Based on <span className="text-brand font-semibold">DBMS_Notes.pdf</span> — 2NF eliminates
                  partial dependencies while 3NF eliminates transitive dependencies.
                  <div className="flex items-center gap-2 mt-[3%] pt-[3%] border-t border-white/5 text-[0.9cqw] text-[#444]">
                    <div className="w-[0.5cqw] h-[0.5cqw] rounded-full bg-brand shrink-0" />
                    SOURCE: DBMS_Notes.pdf · Ch.4, Page 67
                  </div>
                </div>
                <div className="flex gap-[1%] mt-auto">
                  <div className="flex-1 rounded-lg px-[1.5%] py-[1%] text-[1.1cqw] text-dark-gray bg-white/4 border border-white/5">
                    Ask a follow-up question...
                  </div>
                  <div className="w-[4%] aspect-square rounded-lg bg-brand flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 14 14" fill="none" className="w-[50%] h-[50%]">
                      <path d="M12 7L2 2l2.5 5L2 12l10-5z" fill="#000" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}