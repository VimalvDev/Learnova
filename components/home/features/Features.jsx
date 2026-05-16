"use client"
import { useRef } from "react"
import { MdArrowOutward } from "react-icons/md"
import Tags from "@/components/home/features/Tags"
import MiniBarChart from "@/components/charts/minimal/MiniBarChart"
import MiniLineChart from "@/components/charts/minimal/MiniLineChart"
import MiniCalendar from "@/components/charts/minimal/MiniCalendar"
import MiniRadar from "@/components/charts/minimal/MiniRadar"
import MiniHeatmap from "@/components/charts/minimal/MiniHeatmap"
import SimpleRAGChat from "@/components/RAGChatMockup"
import {
  ParticleCard,
  GlobalSpotlight,
  BentoGlowStyles,
} from "@/components/home/features/MagicBentoEffects"

const GLOW = "250, 110, 67"

function Crosshair({ className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <line x1="8" y1="0" x2="8" y2="16" stroke="#E8500A" strokeWidth="1.2" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="#E8500A" strokeWidth="1.2" />
    </svg>
  )
}

function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dots-feat"
          x="0"
          y="0"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-feat)" />
    </svg>
  )
}

// KEY FIX: outer wrapper div has relative + padding so crosshairs
// are inside it and never clipped by ParticleCard's overflow-hidden
function EditorialCard({ children, className = "", colSpan = "", particleProps = {} }) {
  return (
    <div className={`relative p-[8px] ${colSpan}`}>
      {/* Crosshairs sit on the outer wrapper — never clipped */}
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

function CardHeader({ num, label, title, desc }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-6 bg-brand/60 shrink-0" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-brand truncate">
            {label}
          </span>
        </div>
        <h3 className="font-bebas uppercase text-[clamp(1.3rem,2vw,1.9rem)] text-white leading-tight tracking-wide">
          {title}
        </h3>
        <p className="text-[11px] font-mono text-white/35 mt-1.5 leading-relaxed uppercase tracking-wide max-w-[380px]">
          {desc}
        </p>
      </div>
      <span className="text-[clamp(2rem,4vw,3.5rem)] font-bebas text-white/[0.04] leading-none select-none shrink-0">
        {num}
      </span>
    </div>
  )
}

function CardFooter({ tags, link }) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
      <div className="flex-1 min-w-0 mr-3">
        <Tags tags={tags} />
      </div>
      <a
        href={link}
        className="w-9 h-9 shrink-0 rounded-sm bg-brand flex items-center justify-center hover:brightness-110 transition-all hover:scale-105"
      >
        <MdArrowOutward className="text-black text-base" />
      </a>
    </div>
  )
}

export default function Features() {
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
      id="features"
      className="relative bg-[#0a0a0a] overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16 pt-20 pb-24"
    >
      <DotGrid />

      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,80,10,0.08) 0%, transparent 70%)",
        }}
      />

      <BentoGlowStyles glowColor={GLOW} />
      <GlobalSpotlight
        sectionRef={sectionRef}
        glowColor={GLOW}
        spotlightRadius={600}
      />

      {/* ── SECTION HEADING ── */}
      <div className="relative z-10 mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">
            001 — Platform Capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-end">
          <h2 className="font-bebas uppercase text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.9em] text-white">
            Everything you need to
            <br />
            <span className="text-brand">master</span> your learning path.
          </h2>
          <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/35 leading-relaxed lg:text-right pb-1">
            Not just a quiz app. A complete adaptive intelligence system built
            around your uploaded material.
          </p>
        </div>

        <div className="w-full h-px bg-white/10 mt-8" />
      </div>

      {/* ── BENTO GRID ── */}
      {/* 
        NOTE: gap-3 here becomes visual gap minus the p-[8px] padding
        on each card wrapper, so effective visual gap = gap - (8px * 2) = ~4px
        Use gap-5 to get ~a 4px visual gap, or gap-6 for ~8px.
        Adjust to taste.
      */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2">

        {/* Card 1 — Mastery Scoring */}
        <EditorialCard
          colSpan="sm:col-span-2 md:col-span-7"
          className="min-h-[500px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">
            <CardHeader
              num="01"
              label="Featured Feature"
              title="Concept Mastery Scoring Engine"
              desc="Dynamic mastery score calculated from accuracy, speed, first-attempt correctness, and recency decay."
            />
            <div className="flex-1 w-full min-h-[280px]">
              <MiniBarChart />
            </div>
            <CardFooter
              tags={["Accuracy", "Speed", "Recency", "First Attempt"]}
              link="#mastery-scoring"
            />
          </div>
        </EditorialCard>

        {/* Card 2 — Weakness Intelligence */}
        <EditorialCard
          colSpan="sm:col-span-2 md:col-span-5"
          className="min-h-[500px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">
            <CardHeader
              num="02"
              label="Intelligence Core"
              title="Weakness Intelligence Engine"
              desc="Identifies prerequisite gaps, misconception patterns, and speed-accuracy imbalances — not just low scores."
            />
            <div className="flex-1 w-full min-h-[280px]">
              <MiniLineChart />
            </div>
            <CardFooter
              tags={["Prereq Gaps", "Misconceptions", "Patterns"]}
              link="#weakness-intelligence"
            />
          </div>
        </EditorialCard>

        {/* Card 3 — Ask Your Notes */}
        <EditorialCard
          colSpan="sm:col-span-1 md:col-span-4"
          className="min-h-[460px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">
            <CardHeader
              num="03"
              label="RAG System"
              title="Ask Your Notes"
              desc="AI answers sourced strictly from your documents. Every response cites the source."
            />
            <div className="flex-1 min-h-[260px]">
              <SimpleRAGChat />
            </div>
            <CardFooter
              tags={["RAG", "Citations", "Confidence"]}
              link="#ask-your-notes"
            />
          </div>
        </EditorialCard>

        {/* Card 4 — Adaptive Quiz */}
        <EditorialCard
          colSpan="sm:col-span-1 md:col-span-4"
          className="min-h-[460px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">
            <CardHeader
              num="04"
              label="Quiz Engine"
              title="Adaptive Quiz Engine"
              desc="Difficulty adjusts in real time based on your mastery score. No static banks. Ever."
            />
            <div className="flex-1 min-h-[260px]">
              <MiniHeatmap />
            </div>
            <CardFooter
              tags={["Adaptive", "Real-time", "Dynamic"]}
              link="#adaptive-quiz"
            />
          </div>
        </EditorialCard>

        {/* Card 5 — Performance Insights */}
        <EditorialCard
          colSpan="sm:col-span-2 md:col-span-4"
          className="min-h-[460px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">
            <CardHeader
              num="05"
              label="Analytics"
              title="Performance Insights"
              desc="Accuracy, speed, retention, consistency — one radar. No guesswork."
            />
            <div className="flex-1 min-h-[260px]">
              <MiniRadar />
            </div>
            <CardFooter
              tags={["Radar", "6 Dimensions", "Trends"]}
              link="#performance-insights"
            />
          </div>
        </EditorialCard>

        {/* Card 6 — Spaced Revision Scheduler */}
        <EditorialCard
          colSpan="sm:col-span-2 md:col-span-12"
          className="min-h-[340px]"
          particleProps={particleProps}
        >
          <div className="flex flex-col h-full gap-4 p-5 sm:p-6">
            <CardHeader
              num="06"
              label="Spaced Repetition"
              title="Spaced Revision Scheduler"
              desc="Revision dates earned not random. Weak topics return sooner. Strong topics give breathing room."
            />
            <div className="flex-1 w-full min-h-[220px]">
              <MiniCalendar />
            </div>
            <CardFooter
              tags={["Spaced Rep", "Scheduler", "Streaks"]}
              link="#revision-scheduler"
            />
          </div>
        </EditorialCard>

      </div>
    </section>
  )
}