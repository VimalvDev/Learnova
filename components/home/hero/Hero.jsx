import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";

function Crosshair({ className = "" }) {
  return (
    <svg
      width="16"
      height="16"
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function RuleLabel({ label, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px w-8 bg-white/20" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
        {label}
      </span>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="flex flex-col gap-1 border border-white/10 p-4 rounded-sm">
      <span className="text-2xl font-bebas text-white tracking-wide">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-mono leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-dark overflow-hidden flex flex-col"
    >
      <DotGrid />

      {/* Radial glow */}
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,80,10,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

      {/* ── CONTENT WRAPPER — fills full height below navbar ── */}
      <div className="relative z-10 flex flex-col flex-1 pt-24 md:pt-28 px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Top label row */}
        <div className="flex items-center justify-end mb-6 md:mb-8">
          <RuleLabel label="Adaptive Learning Intelligence" />
        </div>

        {/* ── MAIN GRID — grows to fill available space ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-stretch">
          {/* LEFT — headline block */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              {/* Pre-label */}
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <HiOutlineSparkles className="text-brand text-sm" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-white/40">
                  &lt; Learn · Retain · Master &gt;
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-bebas uppercase leading-[0.88em] text-white
                           text-[clamp(3.2rem,10.5vw,8.5rem)]
                           mb-6 md:mb-8"
              >
                The smarter <br className="hidden sm:block" />
                way to <span className="text-brand">learn,</span>
                <br />
                <span className="text-brand">retain,</span> and
                <br />
                <span className="text-brand">master</span> anything
              </h1>
            </div>

            {/* Bottom of left — subtext + CTA */}
            <div className="flex flex-col gap-5 pb-6">
              <div className="w-full max-w-[520px] h-px bg-white/10" />
              <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
                <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed max-w-[320px] font-mono uppercase tracking-wide">
                  Upload your notes. AI maps every concept, finds your gaps, and
                  schedules exactly when to revise.
                </p>
                <div className="flex items-center gap-4 shrink-0">
                  <Link
                    href="/login"
                    className="group flex items-center gap-2 bg-brand text-white text-xs font-mono uppercase tracking-[0.15em] px-5 py-3 rounded-sm hover:bg-brand/90 transition-colors"
                  >
                    Start learning
                    <RiArrowRightUpLine className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="#features"
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/35 hover:text-white/70 transition-colors"
                  >
                    See features
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — stat panel, full height */}
          <div className="hidden lg:flex flex-col justify-between gap-3 border border-white/10 p-5 rounded-sm relative self-stretch">
            <Crosshair className="absolute -top-2 -left-2" />
            <Crosshair className="absolute -top-2 -right-2" />
            <Crosshair className="absolute -bottom-2 -left-2" />
            <Crosshair className="absolute -bottom-2 -right-2" />

            <RuleLabel label="Platform metrics" className="mb-2" />

            <StatItem value="100%" label="Answers from your notes only" />
            <StatItem value="3×" label="Faster retention vs re-reading" />
            <StatItem value="Real-time" label="Mastery score per concept" />
            <StatItem value="Auto" label="Weakness & gap detection" />

            {/* Spacer pushes footer text to bottom */}

            <div className="pt-3 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-mono leading-relaxed">
                We turn your materials into
                <br />
                clarity, confidence &amp; mastery.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile stat pills */}
        <div className="flex lg:hidden gap-3 mt-6 overflow-x-auto pb-1">
          {[
            { v: "3×", l: "Faster retention" },
            { v: "Auto", l: "Gap detection" },
            { v: "100%", l: "Your notes only" },
          ].map((s) => (
            <div
              key={s.l}
              className="shrink-0 border border-white/10 px-4 py-3 rounded-sm flex flex-col gap-1"
            >
              <span className="text-xl font-bebas text-white">{s.v}</span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-mono whitespace-nowrap">
                {s.l}
              </span>
            </div>
          ))}
        </div>

        {/* ── TICKER STRIP — pinned to very bottom ── */}
        <div className="relative mt-6 border-t border-white/10 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
          <div className="flex animate-ticker whitespace-nowrap py-3">
            {[
              "Concept Mastery Engine",
              "Adaptive Quiz Engine",
              "Weakness Intelligence",
              "Smart Revision Scheduler",
              "Visual Knowledge Graph",
              "Ask From Your Notes",
              "AI Confidence Scoring",
              "Notes Summarizer",
              "Concept Mastery Engine",
              "Adaptive Quiz Engine",
              "Weakness Intelligence",
              "Smart Revision Scheduler",
              "Visual Knowledge Graph",
              "Ask From Your Notes",
              "AI Confidence Scoring",
              "Notes Summarizer",
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] font-mono text-white/25 px-6"
              >
                <span className="text-brand">✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
