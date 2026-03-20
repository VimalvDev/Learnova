export default function RagShowcase() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">

      <div className="bleed-text">OUR PROCESS</div>

      <div className="relative z-10 mb-16">

        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-brand"></div>
          <span className="text-brand font-mono text-xl">004</span>
        </div>

        <h2 className="text-5xl font-bold">
          Intelligent Retrieval
        </h2>

      </div>

      <div className="bg-card rounded-card border border-white/5 overflow-hidden z-10 relative">

        <div className="grid grid-cols-1 lg:grid-cols-4">

          {/* CHAT AREA */}

          <div className="lg:col-span-3 p-8 border-r border-white/5 min-h-[500px] flex flex-col">

            <div className="flex-1 space-y-6 overflow-y-auto mb-6">

              {/* AI MESSAGE */}

              <div className="flex gap-4">

                <div className="w-8 h-8 bg-brand rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-white">
                  LN
                </div>

                <div className="bg-white/5 p-4 rounded-xl rounded-tl-none max-w-[80%] text-sm leading-relaxed">
                  Based on your uploaded chapter "Fluid Dynamics", the Reynolds
                  number is a dimensionless quantity that helps predict flow
                  patterns. Would you like a practice problem or a summary?
                </div>

              </div>

              {/* USER MESSAGE */}

              <div className="flex gap-4 flex-row-reverse">

                <div className="w-8 h-8 bg-white/10 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs">
                  U
                </div>

                <div className="bg-brand p-4 rounded-xl rounded-tr-none max-w-[80%] text-sm text-white font-medium">
                  Explain the difference between laminar and turbulent flow
                  using the provided PDF.
                </div>

              </div>

              {/* AI MESSAGE */}

              <div className="flex gap-4">

                <div className="w-8 h-8 bg-brand rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-white">
                  LN
                </div>

                <div className="bg-white/5 p-4 rounded-xl rounded-tl-none max-w-[80%] text-sm leading-relaxed">
                  Laminar flow is characterized by smooth, parallel layers
                  (Page 42, Para 3), whereas turbulent flow involves chaotic
                  changes in pressure and velocity (Page 45, Figure 2.1).
                </div>

              </div>

            </div>

            {/* INPUT AREA */}

            <div className="bg-dark/50 border border-white/10 p-3 rounded-lg flex items-center gap-4">

              <input
                type="text"
                placeholder="Ask anything about your notes..."
                className="bg-transparent border-none focus:ring-0 text-sm flex-1"
              />

              <button className="bg-brand text-white px-4 py-1.5 rounded-md text-xs font-bold uppercase">
                Send
              </button>

            </div>

          </div>

          {/* RIGHT SIDE STATS */}

          <div className="lg:col-span-1 p-8 flex flex-col justify-center space-y-12">

            <div>
              <div className="text-5xl font-extrabold text-brand mb-1">
                94%
              </div>

              <div className="text-xs font-bold text-secondary uppercase tracking-widest">
                Source Accuracy
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-brand mb-1">
                30s
              </div>

              <div className="text-xs font-bold text-secondary uppercase tracking-widest">
                Analysis Time
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-brand mb-1">
                0%
              </div>

              <div className="text-xs font-bold text-secondary uppercase tracking-widest">
                Hallucination Rate
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}