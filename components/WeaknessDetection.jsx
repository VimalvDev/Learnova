import WeaknessHeatmap from "@/components/charts/WeaknessHeatmap";

export default function WeaknessDetection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-card/30 relative overflow-hidden">
      <div className="bleed-text">WEAKNESS INTELLIGENCE</div>

      <div className="relative z-10 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-brand"></div>
          <span className="text-brand font-mono text-xl">003</span>
        </div>

        <h2 className="text-5xl font-bold">No Blind Spots Allowed</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* LEFT SIDE ALERTS */}

        <div className="lg:col-span-5 space-y-6">
          {/* Alert 1 */}

          <div className="flex gap-4 p-6 bg-dark/40 rounded-card border border-white/5 items-start">
            <div className="text-brand">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            </div>

            <div>
              <h4 className="font-bold mb-1">Knowledge Gaps Found</h4>

              <p className="text-secondary text-sm">
                You struggle with 'Recursive Functions' when applied to data
                structures.
              </p>
            </div>
          </div>

          {/* Alert 2 */}

          <div className="flex gap-4 p-6 bg-dark/40 rounded-card border border-white/5 items-start">
            <div className="text-yellow-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
            </div>

            <div>
              <h4 className="font-bold mb-1">Fading Recall</h4>

              <p className="text-secondary text-sm">
                Linear Algebra fundamentals are dropping below the 60%
                threshold.
              </p>
            </div>
          </div>

          {/* Alert 3 */}

          <div className="flex gap-4 p-6 bg-dark/40 rounded-card border border-white/5 items-start">
            <div className="text-brand">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
              </svg>
            </div>

            <div>
              <h4 className="font-bold mb-1">Application Weakness</h4>

              <p className="text-secondary text-sm">
                High theory recall but low success rate on practical code
                examples.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE HEATMAP */}

        <div className="lg:col-span-7">
          <WeaknessHeatmap />
          {/* <div className="bg-card p-10 rounded-card border border-white/5">

            <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-8">
              Concept Topic Heatmap
            </h4>

            <div className="grid grid-cols-5 gap-3">

              <div className="aspect-square bg-brand rounded-sm"></div>
              <div className="aspect-square bg-brand/80 rounded-sm"></div>
              <div className="aspect-square bg-brand rounded-sm"></div>
              <div className="aspect-square bg-brand/60 rounded-sm"></div>
              <div className="aspect-square bg-brand/90 rounded-sm"></div>

              <div className="aspect-square bg-brand/40 rounded-sm"></div>
              <div className="aspect-square bg-brand/70 rounded-sm"></div>
              <div className="aspect-square bg-white/10 rounded-sm"></div>
              <div className="aspect-square bg-brand/20 rounded-sm"></div>
              <div className="aspect-square bg-brand rounded-sm"></div>

              <div className="aspect-square bg-brand/50 rounded-sm"></div>
              <div className="aspect-square bg-brand rounded-sm"></div>
              <div className="aspect-square bg-white/5 rounded-sm"></div>
              <div className="aspect-square bg-brand/30 rounded-sm"></div>
              <div className="aspect-square bg-brand/60 rounded-sm"></div>

              <div className="aspect-square bg-brand rounded-sm"></div>
              <div className="aspect-square bg-brand/90 rounded-sm"></div>
              <div className="aspect-square bg-brand/80 rounded-sm"></div>
              <div className="aspect-square bg-brand/70 rounded-sm"></div>
              <div className="aspect-square bg-brand rounded-sm"></div>

            </div>

            {/* Legend */}

          {/* <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-secondary">

              <span>LOW MASTERY</span>

              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/5"></div>
                <div className="w-2 h-2 bg-brand/30"></div>
                <div className="w-2 h-2 bg-brand/60"></div>
                <div className="w-2 h-2 bg-brand"></div>
              </div>

              <span>EXPERT</span>

            </div> */}

          {/* </div> */}
        </div>
      </div>
    </section>
  );
}
