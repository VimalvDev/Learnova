export default function Pricing() {
  return (
    <section
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      id="pricing"
    >
      <div className="bleed-text">PRICING</div>

      <div className="relative z-10 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-brand"></div>
          <span className="text-brand font-mono text-xl">007</span>
        </div>

        <h2 className="text-5xl font-bold">
          Invest in Your Intelligence
        </h2>
      </div>

      <div className="space-y-4 z-10 relative">

        {/* STARTER PLAN */}

        <div className="bg-card p-8 rounded-card border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">

          <div>
            <h3 className="text-xl font-bold">Starter</h3>
            <p className="text-secondary text-sm">
              Perfect for occasional learners.
            </p>
          </div>

          <div className="flex-1 md:px-12">
            <ul className="flex flex-wrap gap-4 text-xs font-bold text-white/60">

              <li className="flex items-center gap-2">
                ✓ 3 Documents/mo
              </li>

              <li className="flex items-center gap-2">
                ✓ Basic Analytics
              </li>

              <li className="flex items-center gap-2">
                ✓ Community Access
              </li>

            </ul>
          </div>

          <div className="flex items-center gap-8">

            <span className="text-3xl font-extrabold">
              $0 <span className="text-sm font-normal text-secondary">/mo</span>
            </span>

            <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-lg font-bold hover:bg-white/10 transition-all">
              Select
            </button>

          </div>

        </div>

        {/* PRO PLAN */}

        <div className="bg-card p-8 rounded-card border-2 border-brand flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">

          <div className="absolute top-0 right-0 bg-brand px-4 py-1 text-[10px] font-bold uppercase text-white">
            Most Popular
          </div>

          <div>
            <h3 className="text-xl font-bold">Pro Mastery</h3>

            <p className="text-secondary text-sm">
              Everything you need to excel.
            </p>
          </div>

          <div className="flex-1 md:px-12">
            <ul className="flex flex-wrap gap-4 text-xs font-bold text-white/90">

              <li className="flex items-center gap-2">
                ✓ Unlimited Documents
              </li>

              <li className="flex items-center gap-2">
                ✓ Advanced Mastery Insights
              </li>

              <li className="flex items-center gap-2">
                ✓ Knowledge Atlas
              </li>

              <li className="flex items-center gap-2">
                ✓ Priority RAG Access
              </li>

            </ul>
          </div>

          <div className="flex items-center gap-8">

            <span className="text-3xl font-extrabold">
              $12 <span className="text-sm font-normal text-secondary">/mo</span>
            </span>

            <button className="bg-brand text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
              Go Pro
            </button>

          </div>

        </div>

        {/* INSTITUTION PLAN */}

        <div className="bg-card p-8 rounded-card border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">

          <div>
            <h3 className="text-xl font-bold">Institution</h3>

            <p className="text-secondary text-sm">
              For schools and learning centers.
            </p>
          </div>

          <div className="flex-1 md:px-12">
            <ul className="flex flex-wrap gap-4 text-xs font-bold text-secondary">

              <li className="flex items-center gap-2">
                ✓ SSO Integration
              </li>

              <li className="flex items-center gap-2">
                ✓ Admin Dashboards
              </li>

              <li className="flex items-center gap-2">
                ✓ Dedicated Support
              </li>

            </ul>
          </div>

          <div className="flex items-center gap-8">

            <span className="text-3xl font-extrabold">
              Custom
            </span>

            <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-lg font-bold hover:bg-white/10 transition-all">
              Contact Us
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}