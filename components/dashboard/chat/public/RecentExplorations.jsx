const recents = ["CAP Theorem", "Memoization", "Binary Search", "Dijkstra's Algorithm", "TCP/IP Stack"]

export default function RecentExplorations({ onSelect }) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
        Recent Explorations
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {recents.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className="px-3 py-1.5 bg-card-dark text-[11px] text-(--color-secondary-text) rounded-lg border border-white/[0.04] hover:border-white/[0.1] hover:text-white transition-all"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}