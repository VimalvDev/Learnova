import MiniBarChart from "@/components/charts/minimal/MiniBarChart";
import MiniLineChart from "@/components/charts/minimal/MiniLineChart";
import MiniCalendar from "@/components/charts/minimal/MiniCalendar";
import MiniRadar from "@/components/charts/minimal/MiniRadar";
import MiniHeatmap from "@/components/charts/minimal/MiniHeatmap";
import SimpleRAGChat from "@/components/RAGChatMockup";
import FeatureCard from "@/components/home/features/FeatureCard";
import { TbGridDots } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";

import Tags from "@/components/home/features/Tags";
import Heading from "@/components/common/Heading";
import SectionHeader from "@/components/common/SectionHeader";

export default function Features() {
  return (
    <section className="py-[4em] relative overflow-hidden" id="features">
      <Heading text="our features" />
      <SectionHeader
        num="001"
        heading="Everything You Need To Master Your Learning Path."
        para="Not just a quiz app. A complete adaptive intelligence system built around your uploaded material."
      />

      <div className="grid grid-cols-1 mt-[3em] md:grid-cols-12 gap-[1em]">
        {/* ── ROW 1 ── */}

        {/* Card 1 — Mastery Scoring */}
        <div className="md:col-span-7 bg-card border border-white/6 rounded-2xl overflow-hidden relative flex flex-col min-h-[520px] hover:border-white/12 transition-all duration-300">
  <div className="absolute top-4 right-4 opacity-10 z-0">
            <TbGridDots className="text-white text-2xl" />
          </div>          <div className="p-[2em] flex flex-col h-full gap-4 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                  Featured Feature
                </span>
                <h3 className="text-[clamp(1.2rem,2vw,1.7rem)] font-bold text-white mt-1 leading-tight">
                  Concept Mastery Scoring Engine
                </h3>
                <p className="text-xs text-bleed mt-1.5 leading-relaxed max-w-[380px]">
                  Dynamic mastery score calculated from accuracy, speed,
                  first-attempt correctness, and recency decay.
                </p>
              </div>
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/[0.05] leading-none select-none flex-shrink-0">
                01
              </span>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
              <MiniBarChart />
            </div>
            <div className="flex items-center justify-between pt-[1em] border-t border-white/[0.06]">
              <Tags tags={["Accuracy", "Speed", "Recency", "First Attempt"]} />
              <MdArrowOutward />
            </div>
          </div>
        </div>

        {/* Card 2 — Weakness Intelligence */}
        <div className="md:col-span-5 bg-card border border-white/6 rounded-2xl overflow-hidden relative flex flex-col min-h-[520px] hover:border-white/12 transition-all duration-300">
  <div className="absolute top-4 right-4 opacity-10 z-0">
            <TbGridDots className="text-white text-2xl" />
          </div>          <div className="p-[2em] flex flex-col h-full gap-4 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                  Intelligence Core
                </span>
                <h3 className="text-[clamp(1.2rem,2vw,1.7rem)] font-bold text-white mt-1 leading-tight">
                  Weakness Intelligence Engine
                </h3>
                <p className="text-xs text-bleed mt-1.5 leading-relaxed">
                  Identifies prerequisite gaps, misconception patterns, and
                  speed-accuracy imbalances — not just low scores.
                </p>
              </div>
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/[0.05] leading-none select-none flex-shrink-0">
                02
              </span>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
              <MiniLineChart />
            </div>
            <div className="flex items-center justify-between pt-[1em] border-t border-white/[0.06]">
              <Tags tags={["Prereq Gaps", "Misconceptions", "Patterns"]} />
              <MdArrowOutward />
            </div>
          </div>
        </div>

        {/* ── ROW 2 ── */}

        {/* Card 3 — Ask Your Notes — col-span-4 */}
        <FeatureCard
          num="03"
          colSpan="md:col-span-4"
          title="Ask Your Notes"
          desc="AI answers sourced strictly from your documents. Every response cites the source."
          tags={["RAG", "Citations", "Confidence"]}
          chart={
            <div className="h-full min-h-[280px]">
              <SimpleRAGChat />
            </div>
          }
        />

        {/* Card 4 — Adaptive Quiz — col-span-4 */}

        <FeatureCard
          num="04"
          colSpan="md:col-span-4"
          title="Adaptive Quiz Engine"
          desc="Difficulty adjusts in real time based on your mastery score. No static banks. Ever."
          tags={["Adaptive", "Real-time", "Dynamic"]}
          chart={
            <div className="h-full min-h-[280px]">
              <MiniHeatmap />
            </div>
          }
        />

        <FeatureCard
          num="05"
          colSpan="md:col-span-4"
          minHeight="min-h-[480px]"
          title="Performance Insights"
          desc="Accuracy, speed, retention, consistency — one radar. No guesswork."
          tags={["Radar", "6 Dimensions", "Trends"]}
          chart={
            <div className="h-full min-h-[300px]">
              <MiniRadar />
            </div>
          }
        />

        {/* ── ROW 3 ── */}

        <div className="md:col-span-10 bg-[#212225] border border-white/[0.06] rounded-2xl overflow-hidden relative flex flex-col min-h-[360px] hover:border-white/[0.12] transition-all duration-300">
          <div className="absolute top-4 right-4 opacity-10 z-0">
            <TbGridDots className="text-white text-2xl" />
          </div>
          <div className="p-[1.8em] flex flex-col h-full gap-4 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                  06
                </span>
                <h3 className="text-[clamp(1rem,1.8vw,1.4rem)] font-bold text-white mt-1 leading-tight">
                  Spaced Revision Scheduler
                </h3>
                <p className="text-[12px] text-[#888] mt-1.5 leading-relaxed">
                  Revision dates earned not random. Weak topics return sooner.
                </p>
              </div>
              <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white/[0.05] leading-none select-none flex-shrink-0">
                06
              </span>
            </div>
            <div className="flex-1 w-full ">
              <MiniCalendar />
            </div>
            <div className="flex items-center justify-between pt-[1em] border-t border-white/[0.06]">
              <Tags tags={["Spaced Rep", "Scheduler", "Streaks"]} />
              <div className="w-[2.8em] h-[2.8em] rounded-xl bg-brand flex items-center justify-center cursor-pointer hover:brightness-110 transition-all hover:scale-105">
                <MdArrowOutward className="text-black text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
