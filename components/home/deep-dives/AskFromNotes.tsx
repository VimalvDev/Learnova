"use client"
// components/home/deep-dives/AskFromNotes.jsx
import { useRef } from "react"
import RAGChatMockup from "@/components/RAGChatMockup"
import Heading from "@/components/common/Heading"
import SectionHeader from "@/components/common/SectionHeader"
import {
  ParticleCard,
  GlobalSpotlight,
  BentoGlowStyles,
} from "@/components/home/features/MagicBentoEffects"

const GLOW = "250, 110, 67"

export default function AskFromNotes() {
  const sectionRef = useRef(null)

  const particleProps = {
    glowColor: GLOW,
    particleCount: 8,
    enableTilt: false,
    enableMagnetism: false,
    clickEffect: true,
    style: {},
  }

  return (
    <section ref={sectionRef} id="ask-your-notes" className="pt-[4em] pb-[10em] px-[4vw] bg-card-dark relative overflow-hidden">
      <BentoGlowStyles glowColor={GLOW} />
      <GlobalSpotlight
        sectionRef={sectionRef}
        glowColor={GLOW}
        spotlightRadius={600}
      />

      <Heading text="ask your notes" />
      <SectionHeader
        num="005"
        heading="AI That Only Speaks From Your Material."
        para="Every answer cites your source. Below the confidence threshold — Learnova stays silent."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">

        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">
{/* Refused answer example */}
          <ParticleCard
            {...particleProps}
            className="card card--border-glow bg-card-mid-dark rounded-xl p-[1.5em] overflow-hidden relative"
          >
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
          </ParticleCard>
          {[
            { label: "Source Citations", value: "100%", desc: "Every answer includes document name, chapter, and page number.", color: "#FA6E43" },
            { label: "Avg Confidence", value: "94%", desc: "Our RAG engine scores every answer before returning it.", color: "#4ADE80" },
            { label: "Hallucinations", value: "0%", desc: "Below threshold — Learnova says it doesn't know instead of guessing.", color: "#888" },
          ].map(({ label, value, desc, color }) => (
            <ParticleCard
              key={label}
              {...particleProps}
              className="card card--border-glow bg-card rounded-2xl p-[1.5em] flex items-start gap-4 overflow-hidden relative"
            >
              <div className="hrink-0 text-center">
                <p className="text-[22px] font-black  leading-none" style={{ color }}>{value}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white">{label}</p>
                <p className="text-[11px] text-bleed mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </ParticleCard>
          ))}

          

        </div>

        {/* Right — chat mockup */}
        <ParticleCard
          key="chat"
          {...particleProps}
          className="card card--border-glow md:col-span-8 bg-card rounded-2xl p-[1.8em] flex flex-col gap-4 overflow-hidden relative"
        >

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

        </ParticleCard>
      </div>
    </section>
  )
}