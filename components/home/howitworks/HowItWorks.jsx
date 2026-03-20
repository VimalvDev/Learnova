import Heading from "@/components/common/Heading";
import UpText from "../../animation/UpText";
import SectionHeader from "@/components/common/SectionHeader";

export default function HowItWorks() {
  const StepsData = [
    {
      icon: "",
      heading: "",
      desc: "",
      tags: [],
    },
  ];
  return (
    <section className="py-[4em] relative overflow-hidden" id="how-it-works">
      <Heading text={"how it works?"} />

      <SectionHeader
        num="002"
        heading="From static notes to dynamic mastery in minutes"
        para="Upload once — Learnova handles everything else."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[.8em] relative z-10">
        {/* Step 1 */}
       {/* Step 1 */}
<div className="bg-[#212225] border border-white/[0.06] p-[2em] relative rounded-2xl hover:border-[#FA6E43]/30 hover:bg-[#FA6E43]/[0.04] duration-300 transition-all group">

  {/* Step number */}
  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43] mb-[2em]">
    01
  </div>

  {/* Icon + Heading row */}
  <div className="flex justify-between items-start mb-[1.2em]">
    <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1em] uppercase text-white font-bold relative z-20 max-w-[70%]">
      Upload Materials
    </h3>
    <div className="text-[#FA6E43] group-hover:scale-110 transition-transform duration-300">
      <svg className="w-[2.5em]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </div>

  {/* Description */}
  <p className="text-[#888] text-[14px] leading-relaxed mb-[1.8em] relative z-20">
    Drop PDFs, PPTs, or images. Our engine parses every detail
    and builds your personal knowledge base automatically.
  </p>

  {/* Divider */}
  <div className="w-full h-px bg-white/[0.06] mb-[1.2em]" />

  {/* Tags */}
  <div className="flex flex-wrap gap-2">
    {["PDF", "DOCX", "Images", "Handwritten"].map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] text-[#555] font-bold uppercase tracking-wider group-hover:border-[#FA6E43]/20 group-hover:text-[#FA6E43]/60 transition-colors duration-300"
      >
        {tag}
      </span>
    ))}
  </div>

</div>

{/* Step 2 */}
<div className="bg-[#212225] border border-white/[0.06] p-[2em] relative rounded-2xl hover:border-[#FA6E43]/30 hover:bg-[#FA6E43]/[0.04] duration-300 transition-all group">

  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43] mb-[2em]">
    02
  </div>

  <div className="flex justify-between items-start mb-[1.2em]">
    <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1em] uppercase text-white font-bold relative z-20 max-w-[70%]">
      Dynamic Learning
    </h3>
    <div className="text-[#FA6E43] group-hover:scale-110 transition-transform duration-300">
      <svg className="w-[2.5em]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </div>

  <p className="text-[#888] text-[14px] leading-relaxed mb-[1.8em] relative z-20">
    Engage with adaptive quizzes that adjust to your exact
    knowledge level. Ask questions directly from your material.
  </p>

  <div className="w-full h-px bg-white/[0.06] mb-[1.2em]" />

  <div className="flex flex-wrap gap-2">
    {["Adaptive Quizzes", "RAG Chat", "Summaries"].map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] text-[#555] font-bold uppercase tracking-wider group-hover:border-[#FA6E43]/20 group-hover:text-[#FA6E43]/60 transition-colors duration-300"
      >
        {tag}
      </span>
    ))}
  </div>

</div>

{/* Step 3 */}
<div className="bg-[#212225] border border-white/[0.06] p-[2em] relative rounded-2xl hover:border-[#FA6E43]/30 hover:bg-[#FA6E43]/[0.04] duration-300 transition-all group">

  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43] mb-[2em]">
    03
  </div>

  <div className="flex justify-between items-start mb-[1.2em]">
    <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1em] uppercase text-white font-bold relative z-20 max-w-[70%]">
      Track Mastery
    </h3>
    <div className="text-[#FA6E43] group-hover:scale-110 transition-transform duration-300">
      <svg className="w-[2.5em]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </div>

  <p className="text-[#888] text-[14px] leading-relaxed mb-[1.8em] relative z-20">
    Visual analytics show exactly what you know, what's fading,
    and what needs revision — concept by concept.
  </p>

  <div className="w-full h-px bg-white/[0.06] mb-[1.2em]" />

  <div className="flex flex-wrap gap-2">
    {["Mastery Score", "Analytics", "Spaced Repetition"].map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] text-[#555] font-bold uppercase tracking-wider group-hover:border-[#FA6E43]/20 group-hover:text-[#FA6E43]/60 transition-colors duration-300"
      >
        {tag}
      </span>
    ))}
  </div>

</div>
      </div>
    </section>
  );
}
