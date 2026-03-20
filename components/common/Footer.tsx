"use client";

import Link from "next/link";
import Heading from "./Heading";

export default function CTA() {
  const year = new Date().getFullYear();

  const links = [
    {
      group: "Product",
      items: ["Features", "How It Works", "Showcase", "Dashboard"],
    },
    {
      group: "Resources",
      items: ["Documentation", "API Reference", "Changelog", "Roadmap"],
    },
    {
      group: "Company",
      items: ["About", "Blog", "Careers", "Contact"],
    },
    // {
    //   group: "Legal",
    //   items: ["Privacy", "Terms", "Security", "Cookies"],
    // },
  ];

  const socials = [
    {
      label: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const stats = [
    ["12,000+", "Concepts Tracked"],
    ["+94%", "Answer Accuracy"],
    ["3.2×", "Faster Mastery"],
    ["50+", "File Formats"],
  ];

  const trust = ["Free to start"];

  return (
    <section className="relative px-[4em] py-[1.5em] bg-[#0D0D0D] overflow-hidden">
      {/* Bleed heading */}
      <Heading text={"get started"} />

      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* CTA block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-16 md:pb-20 border-b border-white/[0.06]">
          {/* Left */}
          <div className="flex flex-col gap-5 w-full lg:max-w-[700px]">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-7 bg-[#FA6E43] rounded-full" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43]">
                010
              </span>
              <span className="text-[13px] text-[#555] ml-1">CTA</span>
            </div>

            <h2 className="text-[clamp(28px,5vw,72px)] font-black text-white leading-[0.95] tracking-tight">
              Ready to Master
              <br />
              Your Subject?
            </h2>

            <p className="text-[15px] md:text-[16px] text-[#888] leading-relaxed max-w-[480px]">
              Upload your first document and let Learnova build your personal
              learning engine — free. No setup, no credit card, no friction.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              {trust.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FA6E43]" />
                  <span className="text-[12px] text-[#555] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[260px]">
            <button className="w-full px-8 py-4 bg-[#FA6E43] text-black text-[14px] font-bold rounded-xl hover:brightness-110 transition-all">
              Start Learning Free →
            </button>
            <button className="w-full px-8 py-4 bg-transparent text-white text-[14px] font-semibold rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 py-12 md:py-16 border-b border-white/[0.06]">
          {stats.map(([num, label], i) => (
            <div
              key={label}
              className={`flex flex-col gap-1.5 px-4 md:px-8 py-4 md:py-0 ${
                i !== 0 ? "border-l border-white/[0.06]" : ""
              }`}
            >
              <span className="text-[clamp(20px,3vw,40px)] font-black text-[#FA6E43] leading-none tracking-tight">
                {num}
              </span>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#444]">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 pt-12 md:pt-16">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FA6E43] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 10 10" fill="none" className="w-4 h-4">
                  <path
                    d="M2 8V4M5 8V2M8 8V5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-[17px] font-bold text-white tracking-tight">
                Learnova
              </span>
            </div>

            <p className="text-[13px] text-[#555] leading-relaxed max-w-[260px]">
              Adaptive learning intelligence for serious students. Upload your
              material — we handle the rest.
            </p>

            <div className="flex items-center gap-2">
              {socials.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-[#555] hover:text-[#FA6E43] hover:border-[#FA6E43]/30 transition-all duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {links.map(({ group, items }) => (
              <div key={group} className="flex flex-col gap-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white">
                  {group}
                </p>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-[13px] text-[#555] hover:text-white transition-colors duration-200 w-fit"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 mt-10 border-t border-white/[0.06]">
          <span className="text-[12px] text-[#444] text-center md:text-left">
            © {year} Learnova Inc. All rights reserved.
          </span>

          <div className="flex items-center gap-1.5 text-[12px] text-[#444]">
            <span>Built with</span>
            <span className="text-[#FA6E43] font-semibold">Next.js</span>
            <span>·</span>
            <span className="text-[#FA6E43] font-semibold">TypeScript</span>
            <span>·</span>
            <span className="text-[#FA6E43] font-semibold">OpenAI</span>
          </div>

          {/* Policy links — commented out for now (college project) */}
          {/* <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[12px] text-[#444] hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
