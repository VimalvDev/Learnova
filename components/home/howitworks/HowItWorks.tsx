"use client";

import Heading from "@/components/common/Heading";
import SectionHeader from "@/components/common/SectionHeader";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

type Step = {
  num: string;
  title: string;
  description: string;
  tags: string[];
};

const rightSteps: Step[] = [
  {
    num: "01",
    title: "Upload Your Materials",
    description:
      "Drop PDFs, PPTs, or images. Our engine parses every detail and builds your personal knowledge base automatically.",
    tags: ["PDF", "DOCX", "Images", "Handwritten"],
  },
  {
    num: "03",
    title: "Get Adaptive Quizzes",
    description:
      "Engage with adaptive quizzes that adjust to your exact knowledge level. Ask questions directly from your material.",
    tags: ["Adaptive Quizzing", "Contextual Q&A", "AI-Powered"],
  },
];

const leftSteps: Step[] = [
  {
    num: "02",
    title: "AI Structures Learning",
    description:
      "Our system organizes your content into interconnected concepts, prerequisites, and learning paths tailored to mastery.",
    tags: ["Knowledge Graph", "Concept Mapping", "Personalized Paths"],
  },
  {
    num: "04",
    title: "Track Your Mastery",
    description:
      "Visual analytics show exactly what you know, what's fading, and what needs revision — concept by concept.",
    tags: ["Mastery Analytics", "Spaced Repetition", "Performance Insights"],
  },
];

export default function HowItWorks() {
  const segmentRefs = useRef<HTMLDivElement[]>([]);
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);

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

  return (
    <section
      id="how-it-works"
      className="pt-[8em] relative overflow-hidden px-[1vw] md:px-[4vw] bg-card-mid-dark"
    >
      <Heading text="how it works" />
      <SectionHeader
        num="002"
        heading="From static notes to dynamic mastery in minutes"
        para="Upload once — Learnova handles everything else."
      />

      <div
        className="pb-[4em] relative flex justify-center overflow-hidden px-[1vw] md:px-[4vw]"
        id="how-it-works"
      >
        <div className="flex flex-col md:flex-row">
          <div>
            {leftSteps.map((step, index) => (
              <div key={index} className="max-w-lg h-60 md:mb-[10em] md:mt-45">
                <div className="text-[1em] font-bold uppercase tracking-widest text-brand mb-[1em]">
                  {step.num}
                </div>
                <h3 className="text-[clamp(1.4rem,3.5vw,4rem)] text-white leading-[1em]  capitalize  font-bold">
                  {step.title}
                </h3>

                <p className="mt-6 text-bleed text-[14px]">
                  {step.description}
                </p>
                <div className="w-full h-px  bg-white/[0.06] my-[1em]" />

                {/* Tags */}
                <div className="flex flex-wrap justify-start gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] text-secondary-text font-bold uppercase tracking-wider group-hover:border-brand/20 group-hover:text-fbrand/60 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex flex-col items-center">
            <div className="size-4 bg-brand" />

            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  ref={(el) => {
                    if (el) segmentRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="relative w-0.5 mx-10 h-60 bg-card-mid overflow-hidden"
                >
                  <div
                    style={{ height: `${progress[i] * 100}%` }}
                    className="absolute top-0 left-0 w-full bg-brand"
                  />
                </div>
                <div
                  className={`size-4 ${progress[i] > 0.95 ? "bg-brand" : "bg-card-mid"}`}
                />
              </div>
            ))}
          </div>

          <div>
            {rightSteps.map((step, index) => (
              <div
                key={index}
                className={`max-w-lg h-60 ${index === 0 ? "" : "md:mt-50"}`}
              >
                <div className="text-[1em] font-bold uppercase tracking-widest text-brand mb-[1em]">
                  {step.num}
                </div>
                <h3 className="text-[clamp(1.4rem,3.5vw,4rem)] text-white leading-[1em]  capitalize  font-bold">
                  {step.title}
                </h3>

                <p className="mt-6 text-bleed text-[14px]">
                  {step.description}
                </p>
                <div className="w-full h-px  bg-white/[0.06] my-[1em]" />

                {/* Tags */}
                <div className="flex flex-wrap justify-start gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] text-secondary-text font-bold uppercase tracking-wider group-hover:border-brand/20 group-hover:text-fbrand/60 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
