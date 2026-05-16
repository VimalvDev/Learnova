"use client"
import { useRef } from "react"
import MasteryBarChart from "@/components/charts/showcase/MasteryBarChart"
import {
  ParticleCard,
  GlobalSpotlight,
  BentoGlowStyles,
} from "@/components/home/features/MagicBentoEffects"

const GLOW = "250, 110, 67"

function Crosshair({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className}>
      <line x1="8" y1="0" x2="8" y2="16" stroke="#E8500A" strokeWidth="1.2" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="#E8500A" strokeWidth="1.2" />
    </svg>
  )
}

function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots-mastery" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-mastery)" />
    </svg>
  )
}

function EditorialCard({ children, className = "", colSpan = "", particleProps = {} }) {
  return (
    <div className={`relative p-[8px] ${colSpan}`}>
      <Crosshair className="absolute top-0 left-0 z-20" />
      <Crosshair className="absolute top-0 right-0 z-20" />
      <Crosshair className="absolute bottom-0 left-0 z-20" />
      <Crosshair className="absolute bottom-0 right-0 z-20" />
      <ParticleCard
        {...particleProps}
        className={`card card--border-glow w-full h-full flex flex-col rounded-sm border border-white/10 bg-[#0f0f0f] ${className}`}
        style={{
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-intensity": "0",
          "--glow-radius": "200px",
        }}
      >
        {children}
      </ParticleCard>
    </div>
  )
}

const signals = [
  {
    label: "Accuracy",
    value: "40%",
    weight: 40,
    desc: "Heaviest weight — measures raw correctness across all attempts.",
  },
  {
    label: "Speed Factor",
    value: "20%",
    weight: 20,
    desc: "Fast correct answers signal deeper understanding.",
  },
  {
    label: "Error Penalty",
    value: "25%",
    weight: 25,
    desc: "Recurring errors on the same concept reduce your score.",
  },
  {
    label: "Recency Boost",
    value: "15%",
    weight: 15,
    desc: "Recent correct answers boost — recent errors lower it.",
  },
]

export default function MasteryScoring() {
  const sectionRef = useRef(null)

  const particleProps = {
    glowColor: GLOW,
    particleCount: 8,
    enableTilt: false,
    enableMagnetism: false,
    clickEffect: true,
  }

  return (
    <section
      ref={sectionRef}
      id="mastery-scoring"
      className="relative bg-[#0a0a0a] overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16 pt-20 pb-24"
    >
      <DotGrid />

      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,80,10,0.08) 0%, transparent 70%)" }}
      />

      <BentoGlowStyles glowColor={GLOW} />
      <GlobalSpotlight sectionRef={sectionRef} glowColor={GLOW} spotlightRadius={600} />

      {/* ── SECTION HEADING ── */}
      <div className="relative z-10 mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">
            003 — Scoring Engine
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-end">
          <h2 className="font-bebas uppercase text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.9em] text-white">
            Your score isn't a grade.
            <br />
            <span className="text-brand">it's a living</span> calculation.
          </h2>
          <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/35 leading-relaxed lg:text-right pb-1">
            Four weighted signals. Updated after every session.
          </p>
        </div>

        <div className="w-full h-px bg-white/10 mt-8" />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-2">

        {/* ── LEFT COLUMN ── */}
        <div className="md:col-span-4 flex flex-col gap-2">

          {/* Formula card */}
          <EditorialCard particleProps={particleProps}>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-brand/60 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-brand">
                  Scoring Formula
                </span>
              </div>
              <div className="border border-white/[0.06] rounded-sm bg-[#0a0a0a] p-4 font-mono text-[11px] leading-[1.9em]">
                <span className="text-brand">Mastery</span>
                <span className="text-white/30"> = </span>
                <span className="text-white/50">(Accuracy</span>
                <span className="text-white"> × 0.4</span>
                <span className="text-white/50">)</span>
                <br />
                <span className="text-white/30 pl-4">+ </span>
                <span className="text-white/50">(Speed</span>
                <span className="text-white"> × 0.2</span>
                <span className="text-white/50">)</span>
                <br />
                <span className="text-white/30 pl-4">− </span>
                <span className="text-white/50">(Error</span>
                <span className="text-white"> × 0.25</span>
                <span className="text-white/50">)</span>
                <br />
                <span className="text-white/30 pl-4">+ </span>
                <span className="text-white/50">(Recency</span>
                <span className="text-white"> × 0.15</span>
                <span className="text-white/50">)</span>
              </div>
            </div>
          </EditorialCard>

          {/* Signal cards */}
          {signals.map(({ label, value, weight, desc }) => (
            <EditorialCard key={label} particleProps={particleProps}>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-px w-6 bg-brand/60 shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/60 truncate">
                      {label}
                    </span>
                  </div>
                  <span className="font-bebas text-xl text-brand shrink-0">
                    {value}
                  </span>
                </div>

                {/* Weight bar */}
                <div className="w-full h-px bg-white/[0.06] relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-brand"
                    style={{ width: `${weight}%` }}
                  />
                </div>

                <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-white/30 leading-relaxed">
                  {desc}
                </p>
              </div>
            </EditorialCard>
          ))}
        </div>

        {/* ── RIGHT COLUMN — bar chart ── */}
        <EditorialCard
          colSpan="md:col-span-8"
          className="min-h-[600px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">

            {/* Card header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-6 bg-brand/60 shrink-0" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-brand">
                    Live Mastery Scores
                  </span>
                </div>
                <h3 className="font-bebas uppercase text-[clamp(1.3rem,2vw,1.9rem)] text-white leading-tight tracking-wide">
                  Concept-Level Breakdown
                </h3>
              </div>
              <span className="text-[clamp(2rem,4vw,3.5rem)] font-bebas text-white/[0.04] leading-none select-none shrink-0">
                01
              </span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label: "Mastered (75%+)",    opacity: "1" },
                { label: "In Progress (50–74%)", opacity: "0.55" },
                { label: "Critical (<50%)",     opacity: "0.2" },
              ].map(({ label, opacity }) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-[2px] bg-brand shrink-0"
                    style={{ opacity }}
                  />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/30">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-white/[0.06]" />

            {/* Chart */}
            <div className="flex-1 min-h-[400px]">
              <MasteryBarChart />
            </div>
          </div>
        </EditorialCard>

      </div>
    </section>
  )
}