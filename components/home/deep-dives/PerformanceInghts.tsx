// components/home/deep-dives/PerformanceInsights.jsx
import PerformanceRadar from "@/components/charts/showcase/PerformanceRadar"
import Heading from "@/components/common/Heading"
import SectionHeader from "@/components/common/SectionHeader"

export default function PerformanceInsights() {
  return (
    <section id="performance-insights" className="py-[4em] relative overflow-hidden">
      <Heading text="performance insights" />
      <SectionHeader
        num="008"
        heading="See Every Dimension Of Your Learning."
        para="Accuracy, speed, retention, consistency — one radar. No guesswork."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">

        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">

          <div className="bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43] block mb-3">
              Overall Score
            </span>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-[48px] font-black text-[#FA6E43] leading-none">73</span>
              <span className="text-[16px] text-[#555] mb-2">/100</span>
            </div>
            <p className="text-[11px] text-[#888]">Above average for your subject group.</p>
          </div>

          {[
            { skill: "Accuracy",    score: 78, color: "#FA6E43" },
            { skill: "Speed",       score: 62, color: "#FA6E43" },
            { skill: "Consistency", score: 85, color: "#4ADE80" },
            { skill: "Retention",   score: 54, color: "#F87171" },
            { skill: "Improvement", score: 91, color: "#4ADE80" },
            { skill: "Engagement",  score: 70, color: "#FA6E43" },
          ].map(({ skill, score, color }) => (
            <div key={skill} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#888]">{skill}</span>
                <span className="text-[11px] font-bold" style={{ color }}>{score}%</span>
              </div>
              <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
              </div>
            </div>
          ))}

          <div className="bg-[#212225] border border-[#F87171]/15 rounded-2xl p-[1.5em] bg-[#F87171]/[0.03]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F87171] block mb-2">
              Weakest Area
            </span>
            <p className="text-[11px] text-[#888] leading-relaxed">
              <span className="text-white font-semibold">Retention</span> is your lowest at{" "}
              <span className="text-[#F87171] font-semibold">54%</span>. Learnova has scheduled
              3 spaced revision sessions this week.
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="md:col-span-8 bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.8em] flex flex-col gap-4">

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43]">
              Performance Overview
            </span>
            <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
              6 Dimensions, One View
            </h3>
            <p className="text-[12px] text-[#888] mt-1 leading-relaxed">
              Each axis represents a different dimension of your learning.
              A perfect score would fill the entire radar.
            </p>
          </div>

          <div className="flex-1 min-h-[380px]">
            <PerformanceRadar />
          </div>

        </div>
      </div>
    </section>
  )
}