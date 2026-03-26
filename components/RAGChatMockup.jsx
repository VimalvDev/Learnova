export default function SimpleRAGChat() {
  return (
    <div className="w-full h-full bg-[#1a1b1e] rounded-xl border border-white/[0.06] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-text">
            RAG Context Chat
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
          94% confidence
        </div>
      </div>

      {/* Source pill */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04]">
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">Source:</span>
        <span className="text-[9px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full border border-brand/15">
          DBMS_Notes.pdf
        </span>
        <span className="text-[9px] font-bold text-secondary-text bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
          Lecture_Slides.pdf
        </span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 px-4 py-4 flex-1 overflow-hidden">

 {/* User — RIGHT */}
<div className="flex flex-col items-end gap-1">
  <span className="text-[9px] font-bold uppercase tracking-widest text-[#444] px-1">You</span>
  <div className="self-end max-w-[80%] bg-white/[0.05] rounded-xl rounded-tr-[3px] px-3 py-2 text-[11px] text-[#aaa]">
    What is the difference between 2NF and 3NF?
  </div>
</div>

{/* AI — LEFT */}
<div className="flex flex-col items-start gap-1">
  <span className="text-[9px] font-bold uppercase tracking-widest text-[#444] px-1">Learnova AI</span>
  <div className="self-start max-w-[85%] bg-brand/[0.08] border border-brand/15 rounded-xl rounded-tl-[3px] px-3 py-2 text-[11px] text-[#ccc] leading-relaxed">
    2NF removes partial dependencies while 3NF removes transitive
    dependencies between non-key attributes.
    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
      <div className="flex items-center gap-1.5 text-[9px] text-[#444]">
        <div className="w-1 h-1 rounded-full bg-brand" />
        DBMS_Notes.pdf · Ch.4 · P.67
      </div>
      <span className="text-[9px] font-bold text-[#4ADE80] bg-[#4ADE80]/10 px-1.5 py-0.5 rounded-full">
        94%
      </span>
    </div>
  </div>
</div>

{/* User — RIGHT */}
<div className="flex flex-col items-end gap-1">
  <span className="text-[9px] font-bold uppercase tracking-widest text-[#444] px-1">You</span>
  <div className="self-end max-w-[80%] bg-white/[0.05] rounded-xl rounded-tr-[3px] px-3 py-2 text-[11px] text-[#aaa]">
    Give me an example of a 3NF violation.
  </div>
</div>

{/* AI typing — LEFT */}
<div className="flex flex-col items-start gap-1">
  <span className="text-[9px] font-bold uppercase tracking-widest text-[#444] px-1">Learnova AI</span>
  <div className="self-start bg-brand/[0.08] border border-brand/15 rounded-xl rounded-tl-[3px] px-4 py-3 flex items-center gap-1.5">
    {[0, 150, 300].map((d) => (
      <div
        key={d}
        className="w-1.5 h-1.5 rounded-full bg-brand/60 animate-bounce"
        style={{ animationDelay: `${d}ms` }}
      />
    ))}
  </div>
</div>

      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06]">
        <div className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[10px] text-[#444]">
          Ask anything from your notes...
        </div>
        <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center flex-shrink-0 cursor-pointer hover:brightness-110 transition-all">
          <svg viewBox="0 0 14 14" fill="none" className="w-[45%] h-[45%]">
            <path d="M12 7L2 2l2.5 5L2 12l10-5z" fill="#000" />
          </svg>
        </div>
      </div>

    </div>
  )
}