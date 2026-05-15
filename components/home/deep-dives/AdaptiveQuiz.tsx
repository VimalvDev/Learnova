// components/home/deep-dives/AdaptiveQuiz.jsx
"use client"
import { useRef } from "react"
import AdaptiveLineChart from "@/components/charts/showcase/AdaptiveLineChart";
import Heading from "@/components/common/Heading";
import SectionHeader from "@/components/common/SectionHeader";
import {
  ParticleCard,
  GlobalSpotlight,
  BentoGlowStyles,
} from "@/components/home/features/MagicBentoEffects"

const GLOW = "250, 110, 67"

export default function AdaptiveQuiz() {
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
    <section
      ref={sectionRef}
      id="adaptive-quiz"
      className="pt-[4em] pb-[10em] px-[4vw] bg-card-dark relative overflow-hidden"
    >
      <BentoGlowStyles glowColor={GLOW} />
      <GlobalSpotlight
        sectionRef={sectionRef}
        glowColor={GLOW}
        spotlightRadius={600}
      />

      <Heading text="adaptive quiz" />
      <SectionHeader
        num="006"
        heading="Questions That Get Harder As You Get Better."
        para="Difficulty adjusts in real time. No static question banks. Ever."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">
        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">
          <ParticleCard
            key="stats"
            {...particleProps}
            className="card card--border-glow bg-card-mid-dark rounded-2xl p-[1.5em] overflow-hidden relative"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand block mb-3">
              Session Stats
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["47", "Quizzes taken"],
                ["3.2×", "Faster mastery"],
                ["91%", "Accuracy last week"],
                ["2", "Static questions"],
              ].map(([num, label]) => (
                <div key={label} className="bg-card rounded-xl p-3 text-center">
                  <p className="text-[18px] font-black text-brand leading-none">
                    {num}
                  </p>
                  <p className="text-[9px] text-secondary-text mt-1 uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </ParticleCard>
          {[
            {
              label: "Score High",
              outcome: "Harder questions",
              color: "#FA6E43",
              icon: "↑",
            },
            {
              label: "Struggle",
              outcome: "Explanation mode before retesting",
              color: "#FBBF24",
              icon: "?",
            },
            {
              label: "Perfect Run",
              outcome: "Skip to next concept",
              color: "#4ADE80",
              icon: "→",
            },
          ].map(({ label, outcome, color, icon }) => (
            <ParticleCard
              key={label}
              {...particleProps}
              className="card card--border-glow bg-card rounded-2xl p-[1.5em] flex items-center gap-4 overflow-hidden relative"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black  "
                style={{ background: `${color}15`, color }}
              >
                {icon}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white">{label}</p>
                <p className="text-[11px] text-[#888] mt-0.5">{outcome}</p>
              </div>
            </ParticleCard>
          ))}
        </div>

        {/* Right */}
        <ParticleCard
          key="chart"
          {...particleProps}
          className="card card--border-glow md:col-span-8 bg-card rounded-2xl p-[1.8em] flex flex-col gap-4 overflow-hidden relative"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
              Adaptive Difficulty vs Mastery
            </span>
            <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
              Both Lines Rise Together
            </h3>
            <p className="text-[12px] text-[#888] mt-1 leading-relaxed">
              As your mastery improves, Learnova raises the difficulty to match.
              The gap between lines shows how adaptive the engine is.
            </p>
          </div>

          <div className="flex-1 min-h-100">
            <AdaptiveLineChart />
          </div>
        </ParticleCard>
      </div>
    </section>
  );
}
