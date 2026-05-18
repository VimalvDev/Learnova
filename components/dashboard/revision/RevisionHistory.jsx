export default function RevisionHistory({ items, loading }) {
  if (!loading && items.length === 0) return null

  return (
    <div className="bg-card-dark rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
            History
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white">Completed Revisions</h2>
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-2.5">
        {loading ? (
          <p className="text-[12px] text-tertiary-text py-4 text-center">Loading…</p>
        ) : (
          items.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3 bg-[#141414] rounded-xl opacity-70"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-secondary-text truncate">{item.conceptName}</p>
                  <p className="text-[10px] text-tertiary-text">{item.courseName}</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-[11px] text-[#4ADE80] font-semibold">{item.score}%</p>
                <p className="text-[10px] text-tertiary-text">
                  {new Date(item.completedAt ?? item.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}