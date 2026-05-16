"use client"

export default function SimpleRAGChat() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0a] border border-white/[0.06] rounded-sm overflow-hidden">

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="h-px w-4 bg-brand/60" />
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/30">
            Source Context
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono text-brand/70 border border-brand/20 px-2 py-0.5 rounded-sm uppercase tracking-wide">
            DBMS_Notes.pdf
          </span>
          <span className="text-[9px] font-mono text-white/25 border border-white/[0.06] px-2 py-0.5 rounded-sm uppercase tracking-wide">
            Lecture_Slides.pdf
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 px-4 py-4 flex-1 overflow-hidden">

        {/* User message */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/20">
            You
          </span>
          <div className="border border-white/[0.06] rounded-sm rounded-tr-none px-3 py-2 max-w-[85%]">
            <p className="text-[10px] font-mono text-white/50 leading-relaxed">
              What is the difference between 2NF and 3NF?
            </p>
          </div>
        </div>

        {/* AI message */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/20">
            Learnova AI
          </span>
          <div className="border border-brand/15 bg-brand/[0.04] rounded-sm rounded-tl-none px-3 py-2 max-w-[90%]">
            <p className="text-[10px] font-mono text-white/55 leading-relaxed">
              2NF removes partial dependencies while 3NF removes transitive
              dependencies between non-key attributes.
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05]">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-brand rounded-full" />
                <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-white/25">
                  DBMS_Notes.pdf · Ch.4 · P.67
                </span>
              </div>
              <span className="text-[8px] font-mono text-brand border border-brand/20 px-1.5 py-0.5 rounded-sm">
                94%
              </span>
            </div>
          </div>
        </div>

        {/* User message 2 */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/20">
            You
          </span>
          <div className="border border-white/[0.06] rounded-sm rounded-tr-none px-3 py-2 max-w-[85%]">
            <p className="text-[10px] font-mono text-white/50 leading-relaxed">
              Give me an example of a 3NF violation.
            </p>
          </div>
        </div>

        {/* AI typing */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/20">
            Learnova AI
          </span>
          <div className="border border-brand/15 bg-brand/[0.04] rounded-sm rounded-tl-none px-4 py-3 flex items-center gap-1.5">
            {[0, 150, 300].map((d) => (
              <div
                key={d}
                className="w-1 h-1 rounded-full bg-brand/50 animate-bounce"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Footer input bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-t border-white/[0.06]">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 flex-1">
          Ask from your notes...
        </span>
        <div className="w-px h-3 bg-brand/40 animate-pulse" />
      </div>

    </div>
  )
}