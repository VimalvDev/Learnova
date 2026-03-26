export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">

      {/* Left — orange branding */}
      <section className="hidden md:flex md:w-1/2 bg-brand flex-col justify-between items-start p-12 relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center shrink-0">
            <svg viewBox="0 0 10 10" fill="none" className="w-4 h-4">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-black font-bold text-xl tracking-tight">Learnova</span>
        </div>

        {/* Center text */}
        <div className="relative z-10">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-black leading-tight max-w-sm">
            Build <span className="text-white">Mastery</span>,<br />
            Not Memorization.
          </h1>
          <p className="text-black/70 text-lg mt-4 max-w-xs">
            The adaptive learning platform built around your uploaded material.
          </p>
        </div>

        {/* Bottom */}
        <div className="relative z-10 text-black/50 text-sm">
          © {new Date().getFullYear()} Learnova Inc.
        </div>

      </section>

      {/* Right — form */}
      <section className="w-full md:w-1/2 bg-dark flex items-center justify-center p-6 sm:p-12 min-h-screen">

        {/* Mobile logo */}
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-center border-b border-white/6 bg-dark/90 backdrop-blur md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center">
              <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Learnova</span>
          </div>
        </div>

        <div className="w-full max-w-md mt-14 md:mt-0">
          {children}
        </div>

      </section>

    </main>
  )
}
