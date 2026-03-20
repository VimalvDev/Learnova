// components/home/deep-dives/WeaknessIntelligence.jsx
import WeaknessHeatmap from "@/components/charts/showcase/WeaknessHeatmap"
import Heading from "@/components/common/Heading"
import SectionHeader from "@/components/common/SectionHeader"

export default function WeaknessIntelligence() {
  return (
    <section className="py-[4em] relative overflow-hidden">
      <Heading text="weakness detection" />
      <SectionHeader
        num="004"
        heading="We Don't Just Show What's Wrong. We Show Why."
        para="Prerequisite gaps, misconceptions, speed-accuracy imbalances — all surfaced automatically."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">

        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">

          {/* Weakness types */}
          {[
            {
              icon: "⚠",
              label: "Prerequisite Gap",
              desc: "You struggle with Normalization because Functional Dependency is unmastered (54% accuracy).",
              color: "#F87171",
            },
            {
              icon: "⚡",
              label: "Speed-Accuracy Imbalance",
              desc: "You answer Graph questions fast but incorrectly — indicating guessing, not understanding.",
              color: "#FBBF24",
            },
            {
              icon: "↺",
              label: "Misconception Repeat",
              desc: "4th session where you've confused 2NF and 3NF. A targeted explanation has been queued.",
              color: "#FA6E43",
            },
          ].map(({ icon, label, desc, color }) => (
            <div key={label} className="bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.5em]">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px]"
                  style={{ background: `${color}15`, color }}
                >
                  {icon}
                </div>
                <span className="text-[12px] font-bold text-white">{label}</span>
              </div>
              <p className="text-[11px] text-[#888] leading-relaxed">{desc}</p>
            </div>
          ))}

          {/* Stat */}
          <div className="bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43] block mb-3">
              This Week
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["3", "Gaps Found"],
                ["2", "Patterns"],
                ["87%", "Accuracy after fix"],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="text-[20px] font-black text-[#FA6E43] leading-none">{num}</p>
                  <p className="text-[9px] text-[#555] mt-1 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right — heatmap */}
        <div className="md:col-span-8 bg-[#212225] border border-white/[0.06] rounded-2xl p-[1.8em] flex flex-col gap-4">

          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FA6E43]">
                Topic Mastery Over Time
              </span>
              <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
                Weakness Heatmap — Last 6 Weeks
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F87171]/10 border border-[#F87171]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
              <span className="text-[10px] font-bold text-[#F87171]">3 Weak Areas</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-wide">Low mastery</span>
            <div className="flex items-center gap-1">
              {["rgba(250,110,67,0.08)", "rgba(250,110,67,0.25)", "rgba(250,110,67,0.5)", "rgba(250,110,67,0.75)", "#FA6E43"].map((c, i) => (
                <div key={i} className="w-5 h-3 rounded-[3px]" style={{ background: c }} />
              ))}
            </div>
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-wide">High mastery</span>
          </div>

          <div className="flex-1 min-h-[320px]">
            <WeaknessHeatmap />
          </div>

          {/* Persistently weak */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.06]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#444]">Persistently Weak</span>
            {[
              ["FD Closure", "20%", "Never exceeded 20% across 6 weeks"],
              ["Indexing",   "30%", "Slow improvement, still critical"],
            ].map(([topic, score, reason]) => (
              <div key={topic} className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#F87171]/5 border border-[#F87171]/15">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F87171] flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-white">{topic}</p>
                    <p className="text-[10px] text-[#555] truncate">{reason}</p>
                  </div>
                </div>
                <span className="text-[13px] font-black text-[#F87171] flex-shrink-0">{score}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}