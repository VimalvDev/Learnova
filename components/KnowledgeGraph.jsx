export default function KnowledgeGraph() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">

      <div className="bleed-text">KNOWLEDGE GRAPH</div>

      <div className="relative z-10 mb-16">

        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-brand"></div>
          <span className="text-brand font-mono text-xl">006</span>
        </div>

        <h2 className="text-5xl font-bold">
          Visual Contextualization
        </h2>

      </div>

      <div className="bg-card rounded-card border border-white/5 h-[400px] relative overflow-hidden flex items-center justify-center">

        {/* GRAPH BACKGROUND */}

        <div className="absolute inset-0 opacity-20 pointer-events-none">

          <svg className="w-full h-full" viewBox="0 0 800 400">

            <circle cx="400" cy="200" r="10" fill="#FA6E43"/>

            <line x1="400" y1="200" x2="300" y2="100" stroke="white" strokeWidth="1"/>
            <line x1="400" y1="200" x2="500" y2="100" stroke="white" strokeWidth="1"/>
            <line x1="400" y1="200" x2="400" y2="350" stroke="white" strokeWidth="1"/>

            <circle cx="300" cy="100" r="6" fill="#FA6E43"/>
            <circle cx="500" cy="100" r="6" fill="#FA6E43"/>
            <circle cx="400" cy="350" r="6" fill="#FA6E43"/>

            <text x="415" y="205" fill="white" fontSize="12" fontWeight="bold">
              SQL JOINS
            </text>

            <text x="315" y="105" fill="white" fontSize="10">
              INNER JOIN
            </text>

            <text x="515" y="105" fill="white" fontSize="10">
              OUTER JOIN
            </text>

            <text x="415" y="355" fill="white" fontSize="10">
              RELATIONAL ALGEBRA
            </text>

          </svg>

        </div>

        {/* CONTENT */}

        <div className="z-10 text-center">

          <div className="bg-brand px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-4">
            🔬 In Development
          </div>

          <h3 className="text-3xl font-bold mb-4">
            The Knowledge Atlas
          </h3>

          <p className="text-secondary max-w-sm mx-auto">
            See how concepts from different courses connect to build a holistic
            understanding.
          </p>

        </div>

      </div>

    </section>
  )
}