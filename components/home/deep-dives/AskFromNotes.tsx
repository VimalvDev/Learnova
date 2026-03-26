// components/home/deep-dives/AskFromNotes.jsx
import RAGChatMockup from "@/components/RAGChatMockup"
import Heading from "@/components/common/Heading"
import SectionHeader from "@/components/common/SectionHeader"

export default function AskFromNotes() {
  return (
    <section id="ask-your-notes" className="py-[4em] relative overflow-hidden">
      <Heading text="ask your notes" />
      <SectionHeader
        num="005"
        heading="AI That Only Speaks From Your Material."
        para="Every answer cites your source. Below the confidence threshold — Learnova stays silent."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">

        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">

          {[
            { label: "Source Citations", value: "100%", desc: "Every answer includes document name, chapter, and page number.", color: "#FA6E43" },
            { label: "Avg Confidence", value: "94%", desc: "Our RAG engine scores every answer before returning it.", color: "#4ADE80" },
            { label: "Hallucinations", value: "0", desc: "Below threshold — Learnova says it doesn't know instead of guessing.", color: "#888" },
          ].map(({ label, value, desc, color }) => (
            <div key={label} className="bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.5em] flex items-start gap-4">
              <div className="flex-shrink-0 text-center">
                <p className="text-[22px] font-black leading-none" style={{ color }}>{value}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white">{label}</p>
                <p className="text-[11px] text-[#888] mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}

          {/* Refused answer example */}
          <div className="bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.5em]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FBBF24]">
                Low Confidence — Blocked
              </span>
            </div>
            <p className="text-[11px] text-secondary-text leading-relaxed italic">
              "What's in tomorrow's exam?" — This information is not available in your uploaded documents.
              Confidence threshold not met.
            </p>
          </div>

        </div>

        {/* Right — chat mockup */}
        <div className="md:col-span-8 bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.8em] flex flex-col gap-4">

          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                Context Chat
              </span>
              <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
                Ask Anything From Your Notes
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4ADE80]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              AI Active
            </div>
          </div>

          <div className="flex-1 min-h-[400px]">
            <RAGChatMockup />
          </div>

        </div>
      </div>
    </section>
  )
}