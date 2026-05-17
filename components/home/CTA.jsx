"use client"

import Link from "next/link"
import { RiArrowRightUpLine } from "react-icons/ri"

function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dots-cta"
          x="0" y="0"
          width="28" height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-cta)" />
    </svg>
  )
}

function Crosshair({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className}>
      <line x1="8" y1="0" x2="8" y2="16" stroke="#E8500A" strokeWidth="1.2" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="#E8500A" strokeWidth="1.2" />
    </svg>
  )
}

const trust = [
  "Free to start",
  "No credit card",
  "Cancel anytime",
]

export default function CTA() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden border-t border-white/10 px-5 sm:px-8 md:px-12 lg:px-16 py-28 md:py-36">
      <DotGrid />

      {/* Top-right glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,80,10,0.1) 0%, transparent 65%)" }}
      />
      {/* Bottom-left glow */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,80,10,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-10 max-w-4xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">
            010 — Get Started
          </span>
          <div className="h-px w-8 bg-white/20" />
        </div>

        {/* Headline */}
        <h2 className="font-bebas uppercase text-[clamp(3rem,10vw,8rem)] leading-[0.88em] text-white">
          Ready to master
          <br />
          <span className="text-brand">your subject?</span>
        </h2>

        {/* Subtext */}
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/35 leading-relaxed max-w-md">
          Upload your first document and let Learnova build your personal
          learning engine. No setup, no friction.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* CTA button */}
        <div className="relative p-[8px]">
          <Crosshair className="absolute top-0 left-0 z-10" />
          <Crosshair className="absolute top-0 right-0 z-10" />
          <Crosshair className="absolute bottom-0 left-0 z-10" />
          <Crosshair className="absolute bottom-0 right-0 z-10" />
          <Link
            href="/login"
            className="group flex items-center gap-3 bg-brand text-white font-bold text-[12px] font-mono uppercase tracking-[0.22em] px-10 py-4  hover:brightness-110 transition-all"
          >
            Start learning free
            <RiArrowRightUpLine className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {trust.map((item, i) => (
            <div key={item} className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-brand rounded-full" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
                  {item}
                </span>
              </div>
              {i < trust.length - 1 && (
                <div className="h-3 w-px bg-white/10" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}