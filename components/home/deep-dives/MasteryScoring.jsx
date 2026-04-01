// components/home/deep-dives/MasteryScoring.jsx
import MasteryBarChart from "@/components/charts/showcase/MasteryBarChart";
import Heading from "@/components/common/Heading";
import SectionHeader from "@/components/common/SectionHeader";

export default function MasteryScoring() {
  return (
    <section
      id="mastery-scoring"
      className="pt-[4em] pb-[10em] md:px-[4vw] bg-card-dark relative overflow-hidden"
    >
      <Heading text="mastery scoring" />
      <SectionHeader
        num="003"
        heading="Your Score Isn't A Grade. It's A Living Calculation."
        para="Four weighted signals. Updated after every session."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1em] mt-[3em]">
        {/* Left — insight card-darks */}
        <div className="md:col-span-4 flex flex-col gap-[1em]">
          {/* Formula card-dark */}
          <div className="bg-card-dark rounded-xl p-[.5em]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand block mb-3">
              Scoring Formula
            </span>
            <div className="bg-card rounded-xl p-4 flex flex-wrap    font-mono text-[12px] text-[#888] leading-relaxed">
              <div className="text-brand fl ">
                <span>Mastery</span>
              </div>

              <div>
                =(Accuracy
                <span className="text-white"> × 0.4</span>)
              </div>

              <div>
                + (Speed
                <span className="text-white"> × 0.2</span>)
              </div>

              <div>
                −(Error
                <span className="text-white"> × 0.25</span>)
              </div>

              <div>
                +(Recency
                <span className="text-white"> × 0.15</span>)
              </div>
            </div>
          </div>

          {/* Signal card-darks */}
          {[
            {
              label: "Accuracy",
              value: "40%",
              desc: "Heaviest weight — measures raw correctness across all attempts.",
              color: "#FA6E43",
            },
            {
              label: "Speed Factor",
              value: "20%",
              desc: "Fast correct answers signal deeper understanding.",
              color: "#FA6E43",
            },
            {
              label: "Error Penalty",
              value: "25%",
              desc: "Recurring errors on the same concept reduce your score.",
              color: "#F87171",
            },
            {
              label: "Recency Boost",
              value: "15%",
              desc: "Recent correct answers boost your score — recent errors lower it.",
              color: "#FBBF24",
            },
          ].map(({ label, value, desc, color }) => (
            <div
              key={label}
              className="bg-card-dark rounded-xl p-[.5em] flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-black"
                style={{ background: `${color}15`, color }}
              >
                {value}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">{label}</p>
                <p className="text-[11px] text-[#888] mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — full bar chart */}
        <div className="md:col-span-8 bg-card rounded-xl p-[1.8em] flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                Live Mastery Scores
              </span>
              <h3 className="text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-white mt-1">
                Concept-Level Breakdown
              </h3>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4">
            {[
              { color: "var(--color-brand)", label: "Mastered (75%+)" },
              {
                color:
                  "color-mix(in srgb, var(--color-brand) 60%, transparent)",
                label: "In Progress (50–74%)",
              },
              {
                color:
                  "color-mix(in srgb, var(--color-brand) 30%, transparent)",
                label: "Critical (<50%)",
              },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: color }}
                />
                <span className="text-[10px] text-secondary-text">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-[400px]">
            <MasteryBarChart />
          </div>
        </div>
      </div>
    </section>
  );
}
