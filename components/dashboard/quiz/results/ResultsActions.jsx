import Link from "next/link"

export default function ResultsActions({ onRestart, masteryDeltas }) {
  const criticalConcepts = (masteryDeltas ?? []).filter((m) => m.after < 40)
  const needsRevision    = (masteryDeltas ?? []).filter((m) => m.after >= 40 && m.after < 65)

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-4">
      {/* Revision scheduled */}
      {(criticalConcepts.length > 0 || needsRevision.length > 0) && (
        <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-brand text-[12px]">◈</span>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">Revision Scheduled</p>
          </div>
          <div className="h-px bg-white/[0.04] mb-3" />
          <div className="flex flex-col gap-2">
            {criticalConcepts.map((m) => (
              <div key={m.conceptId} className="flex items-center justify-between">
                <span className="text-[12px] text-white truncate mr-2">Concept</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-secondary-text">Tomorrow</span>
                  <div className="w-2 h-2 rounded-full bg-[#F87171]" />
                </div>
              </div>
            ))}
            {needsRevision.map((m) => (
              <div key={m.conceptId} className="flex items-center justify-between">
                <span className="text-[12px] text-white truncate mr-2">Concept</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-secondary-text">In 3 days</span>
                  <div className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04] flex flex-col gap-2.5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Next Steps</p>
        <button
          onClick={onRestart}
          className="w-full py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          Take Another Quiz
        </button>
        <Link
          href="/revision"
          className="w-full py-2.5 text-center bg-card text-white text-[12px] font-medium rounded-xl hover:bg-[#1c1c1c] transition-all"
        >
          View Revision Schedule
        </Link>
        <Link
          href="/dashboard"
          className="w-full py-2 text-secondary-text hover:text-white text-[11px] transition-colors text-center"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}