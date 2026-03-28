const rows = [
  { concept: "SQL Joins",        before: 85, after: 91, delta: +6 },
  { concept: "ER Diagrams",      before: 74, after: 79, delta: +5 },
  { concept: "Normalization",    before: 38, after: 34, delta: -4 },
  { concept: "Functional Dep.",  before: 61, after: 61, delta:  0 },
]

export default function MasteryDelta() {
  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Mastery Updates</p>
      <h2 className="text-[16px] font-semibold text-white mb-4">How This Session Changed Your Profile</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              {["Concept", "Before", "After", "Change"].map((h) => (
                <th key={h} className="text-left text-[9px] font-bold uppercase tracking-widest text-[#444] pb-3 pr-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.concept} className={i < rows.length - 1 ? "border-b border-white/4" : ""}>
                <td className="py-3.5 pr-6 text-[12px] font-medium text-white">{r.concept}</td>
                <td className="py-3.5 pr-6 text-[12px] text-secondary-text">{r.before}%</td>
                <td className="py-3.5 pr-6 text-[12px] text-secondary-text">{r.after}%</td>
                <td className={`py-3.5 text-[12px] font-bold ${
                  r.delta > 0 ? "text-[#4ADE80]" : r.delta < 0 ? "text-[#F87171]" : "text-secondary-text"
                }`}>
                  {r.delta > 0 ? `↑ +${r.delta}%` : r.delta < 0 ? `↓ ${r.delta}%` : "→ No change"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}