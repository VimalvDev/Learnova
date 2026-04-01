const history = [
  { topic: "CAP Theorem",          when: "Just now"   },
  { topic: "Memoization",          when: "1h ago"     },
  { topic: "Binary Search Trees",  when: "Yesterday"  },
  { topic: "Dijkstra's Algorithm", when: "2 days ago" },
  { topic: "TCP/IP Stack",         when: "3 days ago" },
  { topic: "Hash Tables",          when: "4 days ago" },
]

export default function ExplorationHistory({ onSelect }) {
  return (
    <div className="p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">Exploration Log</p>
      <h3 className="text-[13px] font-semibold text-white mb-3">Recent Topics</h3>

      <div className="flex flex-col divide-y divide-white/[0.03]">
        {history.map(({ topic, when }) => (
          <button
            key={topic}
            onClick={() => onSelect(topic)}
            className="flex items-center justify-between py-2 hover:bg-white/[0.02] -mx-1 px-1 rounded transition-colors group"
          >
            <span className="text-[11px] font-medium text-white group-hover:text-(--color-brand) transition-colors">
              {topic}
            </span>
            <span className="text-[10px] text-(--color-tertiary-text)">{when}</span>
          </button>
        ))}
      </div>

      <button className="w-full text-center text-[11px] text-(--color-brand) hover:underline mt-3">
        View Full History →
      </button>
    </div>
  )
}