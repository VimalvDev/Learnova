// components/home/deep-dives/RevisionScheduler.jsx
import RevisionCalendar from "@/components/charts/showcase/RevisionCalendar";
import Heading from "@/components/common/Heading";
import SectionHeader from "@/components/common/SectionHeader";

export default function RevisionScheduler() {
  return (
    <section
      id="revision-scheduler"
      className="pt-[8em] pb-[12em] px-[4vw] bg-card-dark relative overflow-hidden"
    >
      <Heading text="revision scheduler" />
      <SectionHeader
        num="007"
        heading="Every Revision Date Is Earned, Not Random."
        para="Spaced repetition logic. Weak topics return sooner. Strong ones give you breathing room."
      />

      <div className=" mt-[3em]">
        {/* Left */}
        <div className=" flex gap-[1em] mb-[1em] ">
          {/* Streak */}
          <div className="bg-card w-[25vw] rounded-xl p-[1.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand block mb-3">
              Current Streak
            </span>
            <div className="grid grid-cols-3 mt-[2em] gap-3">
              {[
                ["14", "Day Streak", "#FA6E43"],
                ["47", "Sessions Done", "#4ADE80"],
                ["3", "Due Today", "#FBBF24"],
              ].map(([num, label, color]) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center border"
                  style={{
                    background: `${color}10`,
                    borderColor: `${color}20`,
                  }}
                >
                  <p
                    className="text-[20px] font-black leading-none"
                    style={{ color }}
                  >
                    {num}
                  </p>
                  <p className="text-[9px] text-secondary-text mt-1 uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-card w-[30vw] rounded-xl p-[1.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand block mb-3">
              Upcoming Revisions
            </span>
            {[
              ["Today", "Normalization — 2NF & 3NF", "#F87171", "Critical"],
              [
                "Tomorrow",
                "Functional Dependency Closure",
                "#FBBF24",
                "Revision",
              ],
              ["Thu", "SQL Join Optimization", "#FA6E43", "Scheduled"],
            ].map(([day, topic, color, badge]) => (
              <div
                key={topic}
                className="flex items-center justify-between gap-5 py-2.5 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-center gap-[3em] min-w-0">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide w-[3.5em] shrink-0"
                    style={{ color }}
                  >
                    {day}
                  </span>
                  <span className="text-[12px] text-secondary-text truncate">
                    {topic}
                  </span>
                </div>

                <span
                  className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-xl shrink-0"
                  style={{ color, background: `${color}15` }}
                >
                  {badge}
                </span>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="bg-card rounded-2xl w-[20vw] p-[1.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand block mb-3">
              How It Calculates
            </span>
            {[
              ["Low score", "Returns in 1–2 days"],
              ["Medium score", "Returns in 4–7 days"],
              ["High score", "Returns in 2+ weeks"],
            ].map(([condition, result]) => (
              <div
                key={condition}
                className="flex items-center gap-[1em] justify-between py-2 border-b border-white/[0.04] last:border-0"
              >
                <span className="text-[11px] text-secondary">{condition}</span>
                <span className="text-[12px] font-semibold text-very-light">
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — calendar */}
        <div className="md:col-span-8 bg-card rounded-2xl p-[1.8em] flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                Revision Activity
              </span>
              <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
                Your Study Calendar — 2026
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              <span className="text-[10px] font-bold text-[#4ADE80]">
                On Track
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-[200px]">
            <RevisionCalendar />
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-wide">
              Less
            </span>
            <div className="flex items-center gap-1">
              {["bg-brand/20", "bg-brand/45", "bg-brand/70", "bg-brand"].map(
                (c, i) => (
                  <div key={i} className={`w-5 h-3 rounded-[3px] ${c}`} />
                ),
              )}
            </div>
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-wide">
              More
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
