export default function ExplorationHistory({ history = [], onSelect }) {
  if (history.length === 0) {
    return (
      <div className="p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Exploration Log</p>
        <p className="text-[11px] text-tertiary-text mt-2">No topics explored yet.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Exploration Log</p>
      <h3 className="text-[13px] font-semibold text-white mb-3">Recent Topics</h3>
      <div className="flex flex-col divide-y divide-white/[0.03]">
        {history.map((topic, i) => (
          <button
            key={topic + i}
            onClick={() => onSelect(topic)}
            className="flex items-center justify-between py-2 hover:bg-white/[0.02] -mx-1 px-1 rounded transition-colors group"
          >
            <span className="text-[11px] font-medium text-white group-hover:text-brand transition-colors truncate">
              {topic}
            </span>
            <span className="text-[10px] text-tertiary-text shrink-0 ml-2">
              {i === 0 ? "Just now" : `${i + 1} ago`}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}