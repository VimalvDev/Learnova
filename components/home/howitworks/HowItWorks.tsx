"use client";

import { useEffect, useRef, useState } from "react";
import {
  ParticleCard,
  GlobalSpotlight,
  BentoGlowStyles,
} from "@/components/home/features/MagicBentoEffects";

const GLOW = "250, 110, 67";

type Step = {
  num: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const leftSteps: Step[] = [
  {
    num: "02",
    title: "AI Structures Learning",
    description:
      "Our system organizes your content into interconnected concepts, prerequisites, and learning paths tailored to mastery.",
    tags: ["Knowledge Graph", "Concept Mapping", "Personalized Paths"],
    href: "#ai-structures",
  },
  {
    num: "04",
    title: "Track Your Mastery",
    description:
      "Visual analytics show exactly what you know, what's fading, and what needs revision — concept by concept.",
    tags: ["Mastery Analytics", "Spaced Repetition", "Performance Insights"],
    href: "#track-mastery",
  },
];

const rightSteps: Step[] = [
  {
    num: "01",
    title: "Upload Your Materials",
    description:
      "Drop PDFs, PPTs, or images. Our engine parses every detail and builds your personal knowledge base automatically.",
    tags: ["PDF", "DOCX", "Images", "Handwritten"],
    href: "#upload-materials",
  },
  {
    num: "03",
    title: "Get Adaptive Quizzes",
    description:
      "Engage with adaptive quizzes that adjust to your exact knowledge level. Ask questions directly from your material.",
    tags: ["Adaptive Quizzing", "Contextual Q&A", "AI-Powered"],
    href: "#adaptive-quizzes",
  },
];

function Crosshair({ className = "" }: { className?: string }) {
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
  );
}

function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dots-hiw"
          x="0"
          y="0"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-hiw)" />
    </svg>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <a
      href={step.href}
      className="group relative flex flex-col gap-4 border border-white/10 rounded-sm bg-[#0f0f0f] p-5 sm:p-6 hover:border-white/20 transition-colors duration-300"
    >
      {/* Corner crosshairs */}
      <Crosshair className="absolute -top-[7px] -left-[7px] z-10" />
      <Crosshair className="absolute -top-[7px] -right-[7px] z-10" />
      <Crosshair className="absolute -bottom-[7px] -left-[7px] z-10" />
      <Crosshair className="absolute -bottom-[7px] -right-[7px] z-10" />

      {/* Number + title */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-brand/60 shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-brand">
              Step {step.num}
            </span>
          </div>
          <h3 className="font-bebas uppercase text-[clamp(1.4rem,2.5vw,2.2rem)] text-white leading-tight tracking-wide">
            {step.title}
          </h3>
        </div>
        <span className="text-[clamp(2rem,4vw,3.2rem)] font-bebas text-white/[0.04] leading-none select-none shrink-0">
          {step.num}
        </span>
      </div>

      {/* Description */}
      <p className="text-[11px] font-mono text-white/35 leading-relaxed uppercase tracking-wide">
        {step.description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] font-mono text-white/40 uppercase tracking-wider group-hover:border-brand/20 group-hover:text-brand/60 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function HowItWorks() {
  const segmentRefs = useRef<HTMLDivElement[]>([]);
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const updated = segmentRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const start = windowHeight * 0.6;
        const end = windowHeight * 0.2;
        let percent = (start - rect.top) / (start - end);
        percent = Math.min(Math.max(percent, 0), 1);
        return percent;
      });
      setProgress(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const particleProps = {
    glowColor: GLOW,
    particleCount: 8,
    enableTilt: false,
    enableMagnetism: false,
    clickEffect: true,
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#0a0a0a] overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16 pt-20 pb-24"
    >
      <DotGrid />

      {/* Radial glow accent */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,80,10,0.08) 0%, transparent 70%)",
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
            002 — Process Flow
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-end">
          <h2 className="font-bebas uppercase text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.9em] text-white">
            From static notes to
            <br />
            <span className="text-brand">dynamic mastery</span> in minutes.
          </h2>
          <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/35 leading-relaxed lg:text-right pb-1">
            Upload once — Learnova handles everything else.
          </p>
        </div>

        <div className="w-full h-px bg-white/10 mt-8" />
      </div>

      {/* ── STEPS LAYOUT ── */}
      <div className="relative z-10">

        {/* ── DESKTOP: two columns + center timeline ── */}
        <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] gap-x-6">

          {/* Left column — steps 02, 04 */}
          <div className="flex flex-col gap-6 pt-32">
            {leftSteps.map((step) => (
              <div key={step.num} className="mb-24 last:mb-0">
                <StepCard step={step} />
              </div>
            ))}
          </div>

          {/* Center timeline */}
          <div className="flex flex-col items-center pt-4">
            {/* Top dot */}
            <div className="w-3 h-3 bg-brand shrink-0" />

            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  ref={(el) => {
                    if (el) segmentRefs.current[i] = el;
                  }}
                  className="relative w-px mx-auto bg-white/10 overflow-hidden"
                  style={{ height: "220px" }}
                >
                  <div
                    style={{ height: `${progress[i] * 100}%` }}
                    className="absolute top-0 left-0 w-full bg-brand transition-all duration-100"
                  />
                </div>
                <div
                  className="w-3 h-3 shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor:
                      progress[i] > 0.95
                        ? "#E8500A"
                        : "rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right column — steps 01, 03 */}
          <div className="flex flex-col gap-6">
            {rightSteps.map((step) => (
              <div key={step.num} className="mb-24 last:mb-0">
                <StepCard step={step} />
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: single column, numbered order ── */}
        <div className="flex md:hidden flex-col gap-4">
          {[...leftSteps, ...rightSteps]
            .sort((a, b) => parseInt(a.num) - parseInt(b.num))
            .map((step) => (
              <StepCard key={step.num} step={step} />
            ))}
        </div>

      </div>
    </section>
  );
}