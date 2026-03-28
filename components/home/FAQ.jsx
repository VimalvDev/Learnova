"use client";

import { useState } from "react";
import UpText from "../animation/UpText";
import SectionHeader from "../common/SectionHeader";
import Heading from "../common/Heading";
import BackgroundPaths from "./hero/BackgroundPaths";

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
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative py-[8em] px-[3em] overflow-hidden bg-dark"
    >

      <Heading text="have doubts?" />

      <div className=" relative z-10">
        {/* Section header */}

        <SectionHeader
          num="009"
          heading="Simple answers to help you get started faster."
          para="Everything you need to know before uploading your first document."
        />

        {/* FAQ + card-dark grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* FAQ list */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border  transition-all duration-300 overflow-hidden ${
                  open === i
                    ? "border-brand/25 bg-brand/5"
                    : "border-white/6 bg-card-dark hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center cursor-pointer justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className={`text-base font-semibold transition-colors duration-200 ${open === i ? "text-white" : "text-bleed"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      open === i ? "bg-brand rotate-45" : "bg-white/5"
                    }`}
                  >
                    <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                      <path
                        d="M7 2v10M2 7h10"
                        stroke={open === i ? "#000" : "#888"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-[14px] text-[#888] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right card-dark */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            {/* Help card-dark */}
            <div className="self-start bg-card-dark rounded-2xl border border-white/6 p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Background dots grid */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(250,110,67,0.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-card-dark/0 via-card-dark/50 to-card-dark" />
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-5">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <circle
                      cx="10"
                      cy="10"
                      r="7.5"
                      stroke="#FA6E43"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 7v4M10 13v.5"
                      stroke="#FA6E43"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h4 className="text-[18px] font-bold text-white mb-2">
                  Still have questions?
                </h4>
                <p className="text-[13px] text-secondary-text leading-relaxed">
                  Our support team is here to help you get the most out of
                  Learnova's adaptive learning system.
                </p>
              </div>

              <div className="relative z-10 flex flex-col gap-3 mt-8">
                <button className="w-full py-3 rounded-xl bg-brand text-black text-[13px] font-bold hover:brightness-110 transition-all">
                  Visit Help Center →
                </button>
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/[0.06] text-white text-[13px] font-semibold hover:bg-white/8 transition-all">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Quick stat card-dark */}
            <div className="bg-card-dark rounded-2xl border border-white/[0.06] px-6 py-5 flex items-center justify-between">
              {[
                ["99.9%", "Uptime SLA"],
                ["&lt;30s", "Avg Response"],
                ["24/7", "Support"],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p
                    className="text-[20px] font-black text-brand leading-none"
                    dangerouslySetInnerHTML={{ __html: num }}
                  />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
