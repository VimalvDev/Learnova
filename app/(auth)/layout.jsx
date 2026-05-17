function DotGrid({ id }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

const features = [
  "Confidence-scored AI answers from your documents",
  "Concept-level mastery tracking and scoring",
  "Adaptive quizzes with smart revision scheduling",
]

const stats = [
  { num: "97.8%", label: "Avg Mastery Rate" },
  { num: "3.2×",  label: "Faster Retention" },
]

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">

      {/* ── LEFT — editorial dark panel ── */}
      <section className="hidden md:flex md:w-1/2 flex-col justify-between relative overflow-hidden bg-[#0a0a0a] border-r border-white/[0.06] px-14 py-14">
        <DotGrid id="dots-auth-left" />

        {/* Glow */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,80,10,0.08) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-px w-6 bg-brand/60" />
          <span className="font-bebas uppercase text-xl text-white tracking-widest">
            Learnova
          </span>
        </div>

        {/* Middle */}
        <div className="relative z-10 flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-brand/60 shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-brand">
              Adaptive Learning Intelligence
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bebas uppercase text-[clamp(2.4rem,4vw,3.8rem)] text-white leading-[0.9em]">
              Build mastery,
              <br />
              not <span className="text-brand">memorization.</span>
            </h1>
            <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/30 leading-relaxed max-w-[340px]">
              The adaptive learning platform built around your uploaded material.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {features.map((feat) => (
              <div key={feat} className="flex items-start gap-3">
                <div className="h-px w-4 bg-brand/60 shrink-0 mt-[6px]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/35 leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-white/[0.06]" />

          <div className="flex items-center gap-10">
            {stats.map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-bebas text-3xl text-brand leading-none">{num}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex flex-col gap-2">
          <div className="w-full h-px bg-white/[0.06] mb-4" />
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/20">
            © {new Date().getFullYear()} Learnova. All rights reserved.
          </p>
        </div>
      </section>

      {/* ── RIGHT — form area ── */}
      <section className="w-full md:w-1/2 bg-[#0a0a0a] flex items-center justify-center p-6 sm:p-12 min-h-screen relative overflow-hidden">
        <DotGrid id="dots-auth-right" />

        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,80,10,0.07) 0%, transparent 70%)" }}
        />

        {/* Mobile logo */}
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-center border-b border-white/[0.06] md:hidden z-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-brand/60" />
            <span className="font-bebas uppercase text-lg text-white tracking-widest">Learnova</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-md mt-14 md:mt-0">
          {children}
        </div>
      </section>

    </main>
  )
}