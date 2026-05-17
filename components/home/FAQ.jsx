"use client"

import { useState } from "react"

const faqs = [
  {
    q: "How does the adaptive engine actually work?",
    a: "Learnova scores every concept using four signals — accuracy, response speed, first-attempt correctness, and recency decay. Each quiz session updates your scores in real time and adjusts the next question's difficulty automatically.",
  },
  {
    q: "Is my data used for model training?",
    a: "No. Your uploaded documents are isolated to your personal RAG instance only. We never train public models on user data. Your notes stay yours.",
  },
  {
    q: "What file formats are supported?",
    a: "PDF, DOCX, TXT, and scanned image files via OCR. Handwritten notes work too as long as they're reasonably legible. More formats are on the roadmap.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT answers from general training data and can hallucinate. Learnova only answers from your uploaded documents, shows a confidence score on every response, and refuses to answer if the threshold isn't met.",
  },
  {
    q: "Can I export my mastery progress?",
    a: "Yes. You can export your full mastery report as a PDF or CSV from the dashboard at any time. This includes concept scores, revision history, and performance trends.",
  },
  {
    q: "How does spaced repetition scheduling work?",
    a: "After every quiz session, Learnova calculates the optimal next review date for each concept based on your score. Weak concepts resurface sooner. Strong ones give you more breathing room.",
  },
]

function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dots-faq"
          x="0" y="0"
          width="28" height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-faq)" />
    </svg>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="faq"
      className="relative bg-[#0a0a0a] overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16 pt-20 pb-24"
    >
      <DotGrid />

      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,80,10,0.08) 0%, transparent 70%)" }}
      />

      {/* ── SECTION HEADING ── */}
      <div className="relative z-10 mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">
            009 — Common Questions
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-end">
          <h2 className="font-bebas uppercase text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.9em] text-white">
            Simple answers to help you
            <br />
            <span className="text-brand">get started</span> faster.
          </h2>
          <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/35 leading-relaxed lg:text-right pb-1">
            Everything you need to know before uploading your first document.
          </p>
        </div>

        <div className="w-full h-px bg-white/10 mt-8" />
      </div>

      {/* ── ACCORDION — full width ── */}
      <div className="relative z-10 flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-sm overflow-hidden transition-colors duration-300 ${
              open === i
                ? "border-brand/20 bg-brand/[0.03]"
                : "border-white/[0.06] bg-[#0f0f0f] hover:border-white/10"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 leading-relaxed">
                {faq.q}
              </span>

              <div
                className={`w-6 h-6 shrink-0 border rounded-sm flex items-center justify-center transition-all duration-300 ${
                  open === i
                    ? "border-brand/40 bg-brand/10 rotate-45"
                    : "border-white/10 bg-transparent"
                }`}
              >
                <svg viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5">
                  <path
                    d="M7 2v10M2 7h10"
                    stroke={open === i ? "#E8500A" : "rgba(255,255,255,0.3)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                open === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-5">
                <div className="w-full h-px bg-white/[0.05] mb-4" />
                <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/30 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}