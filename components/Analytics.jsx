export default function Analytics() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden bg-card/10">

      <div className="bleed-text">SMART ANALYTICS</div>

      <div className="relative z-10 mb-16">

        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-brand"></div>
          <span className="text-brand font-mono text-xl">005</span>
        </div>

        <h2 className="text-5xl font-bold">
          Data-Driven Progress
        </h2>

      </div>

      <div className="bg-card p-10 rounded-card border border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

        {/* ACTIVITY GRID */}

        <div className="lg:col-span-1">

          <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">
            Activity Frequency
          </h4>

          <div className="grid grid-cols-6 gap-2">

            <div className="aspect-square bg-brand/20 rounded"></div>
            <div className="aspect-square bg-brand/40 rounded"></div>
            <div className="aspect-square bg-brand/80 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/20 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>

            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand rounded"></div>
            <div className="aspect-square bg-brand/90 rounded"></div>
            <div className="aspect-square bg-brand/40 rounded"></div>
            <div className="aspect-square bg-brand/20 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>

            <div className="aspect-square bg-brand/40 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/60 rounded"></div>
            <div className="aspect-square bg-brand/30 rounded"></div>
            <div className="aspect-square bg-brand/80 rounded"></div>
            <div className="aspect-square bg-brand/20 rounded"></div>

            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>

            <div className="aspect-square bg-brand/20 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>

            <div className="aspect-square bg-brand/40 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>
            <div className="aspect-square bg-brand/20 rounded"></div>
            <div className="aspect-square bg-brand/10 rounded"></div>

          </div>

        </div>

        {/* RETENTION BARS */}

        <div className="lg:col-span-1 space-y-4">

          <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">
            Retention History (24 Days)
          </h4>

          <div className="flex items-end gap-1 h-32">

            <div className="flex-1 bg-brand/20 rounded-t h-[20%]"></div>
            <div className="flex-1 bg-brand/30 rounded-t h-[40%]"></div>
            <div className="flex-1 bg-brand/40 rounded-t h-[30%]"></div>
            <div className="flex-1 bg-brand/60 rounded-t h-[60%]"></div>
            <div className="flex-1 bg-brand/80 rounded-t h-[80%]"></div>
            <div className="flex-1 bg-brand rounded-t h-[95%]"></div>
            <div className="flex-1 bg-brand/70 rounded-t h-[70%]"></div>
            <div className="flex-1 bg-brand/50 rounded-t h-[50%]"></div>
            <div className="flex-1 bg-brand/90 rounded-t h-[90%]"></div>
            <div className="flex-1 bg-brand rounded-t h-[100%]"></div>

          </div>

        </div>

        {/* GAUGE */}

        <div className="lg:col-span-1 text-center">

          <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">
            Overall Proficiency
          </h4>

          <div className="inline-block relative">

            <svg className="w-32 h-32">

              <circle
                cx="64"
                cy="64"
                r="56"
                fill="transparent"
                stroke="#212225"
                strokeWidth="8"
              />

              <circle
                cx="64"
                cy="64"
                r="56"
                fill="transparent"
                stroke="#FA6E43"
                strokeDasharray="351.8"
                strokeDashoffset="77"
                strokeWidth="8"
              />

            </svg>

            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">
              78%
            </div>

          </div>

          <p className="mt-4 text-sm text-secondary">
            You are in the top 5% of all users this month.
          </p>

        </div>

      </div>

    </section>
  )
}