// components/home/deep-dives/WeaknessIntelligence.jsx
import WeaknessHeatmap from "@/components/charts/showcase/WeaknessHeatmap";
import Heading from "@/components/common/Heading";
import SectionHeader from "@/components/common/SectionHeader";
import { GoAlertFill } from "react-icons/go";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRepeat } from "react-icons/fa6";

export default function WeaknessIntelligence() {
  return (
    <section
      id="weakness-intelligence"
      className="pt-[8em] pb-[12em] bg-card-dark px-[4vw] relative overflow-hidden"
    >
      <Heading text="weakness detection" />
      <SectionHeader
        num="004"
        heading="We Don't Just Show What's Wrong. We Show Why."
        para="Prerequisite gaps, misconceptions, speed-accuracy imbalances — all surfaced automatically."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">
        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">
          {/* Stat */}
          <div className="bg-card-mid rounded-xl p-[1.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand block mb-3">
              This Week
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["3", "Gaps Found"],
                ["2", "Patterns"],
                ["87%", "Accuracy after fix"],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="text-[20px] font-black text-brand leading-none">
                    {num}
                  </p>
                  <p className="text-[9px] text-secondary-text mt-1 uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Weakness types */}
          {[
            {
              icon: <GoAlertFill />,
              label: "Prerequisite Gap",
              desc: "You struggle with Normalization because Functional Dependency is unmastered (54% accuracy).",
              color: "#F87171",
            },
            {
              icon: <AiFillThunderbolt />,

              label: "Speed-Accuracy Imbalance",
              desc: "You answer Graph questions fast but incorrectly — indicating guessing, not understanding.",
              color: "#FBBF24",
            },
            {
              icon: <FaRepeat />,
              label: "Misconception Repeat",
              desc: "4th session where you've confused 2NF and 3NF. A targeted explanation has been queued.",
              color: "var(--color-brand)",
            },
          ].map(({ icon, label, desc, color }) => (
            <div key={label} className="bg-card rounded-xl p-[1.5em]">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px]"
                  style={{ color }}
                >
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center"
                    style={{
                      background: `color-mix(in srgb, ${color} 20%, var(--color-dark))`,
                    }}
                  >
                    {icon}
                  </div>
                </div>
                <span className="text-[14px] font-bold text-white">
                  {label}
                </span>
              </div>
              <p className="text-[12px] text-bleed leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Right — heatmap */}
        <div className="md:col-span-8 bg-card rounded-xl p-[1.8em] flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                Topic Mastery Over Time
              </span>
              <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
                Weakness Heatmap — Last 6 Weeks
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F87171]/10 border border-[#F87171]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
              <span className="text-[10px] font-bold text-[#F87171]">
                3 Weak Areas
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-dark-gray font-bold uppercase tracking-wide">
              Low mastery
            </span>

            <div className="flex items-center gap-1">
              {[
                "bg-brand/10",
                "bg-brand/25",
                "bg-brand/50",
                "bg-brand/75",
                "bg-brand",
              ].map((c, i) => (
                <div key={i} className={`w-5 h-3 rounded-[3px] ${c}`} />
              ))}
            </div>

            <span className="text-[10px] text-dark-gray font-bold uppercase tracking-wide">
              High mastery
            </span>
          </div>

          <div className="flex-1 min-h-[320px]">
            <WeaknessHeatmap />
          </div>

          {/* Persistently weak */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.06]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#444]">
              Persistently Weak
            </span>
            {[
              ["FD Closure", "20%", "Never exceeded 20% across 6 weeks"],
              ["Indexing", "30%", "Slow improvement, still critical"],
            ].map(([topic, score, reason]) => (
              <div
                key={topic}
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#F87171]/5 border border-[#F87171]/15"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F87171] flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-white">
                      {topic}
                    </p>
                    <p className="text-[10px] text-secondary-text truncate">
                      {reason}
                    </p>
                  </div>
                </div>
                <span className="text-[13px] font-black text-[#F87171] flex-shrink-0">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
