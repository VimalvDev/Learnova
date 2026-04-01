const clusters = [
  { icon: "💾", title: "Databases",        topics: "Normalization, ACID, Transactions, SQL",  count: 6 },
  { icon: "🔢", title: "Algorithms",       topics: "Sorting, Graph, DP, Complexity Theory",   count: 8 },
  { icon: "🔗", title: "Networks",         topics: "TCP/IP, DNS, HTTP, OSI Model, Routing",   count: 5 },
  { icon: "⚙",  title: "Operating Systems",topics: "Scheduling, Memory, Processes, Threads",  count: 7 },
]

const gaps = [
  "CAP Theorem",
  "Two-Phase Locking",
  "Deadlock Detection",
  "Distributed Transactions",
]

export default function EmptyState({ onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5">

      {/* Subject clusters */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
          Explore by Subject
        </p>
        <div className="grid grid-cols-2 gap-3">
          {clusters.map(({ icon, title, topics, count }) => (
            <button
              key={title}
              className="flex flex-col items-start gap-2 p-4 bg-card-dark rounded-xl border border-white/[0.04] text-left hover:border-white/[0.1] hover:-translate-y-px transition-all"
            >
              <span className="text-[18px]">{icon}</span>
              <p className="text-[13px] font-semibold text-white">{title}</p>
              <p className="text-[10px] text-(--color-tertiary-text) leading-relaxed">{topics}</p>
              <p className="text-[10px] text-(--color-brand) font-medium">{count} suggested topics</p>
            </button>
          ))}
        </div>
      </div>

      {/* Gap detection */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-2">
          Topics Not in Your Docs
        </p>
        <p className="text-[11px] text-(--color-tertiary-text) leading-relaxed mb-3">
          These concepts appear in standard DBMS curricula but are not in your uploaded documents.
        </p>
        <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.03]">
          {gaps.map((topic) => (
            <button
              key={topic}
              onClick={() => onSelect(topic)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[12px] font-medium text-white text-left">{topic}</span>
              <span className="text-[9px] font-bold text-[#FBBF24] bg-[#FBBF24]/10 px-2 py-0.5 rounded-lg flex-shrink-0">
                Not uploaded
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}