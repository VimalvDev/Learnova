export default function MasteryDelta({ masteryDeltas, questions }) {
  if (!masteryDeltas?.length) return null

  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
      <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Mastery Updates</p>
      <h2 className="text-[16px] font-semibold text-white mb-4">How This Session Changed Your Profile</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Concept", "Before", "After", "Change"].map((h) => (
                <th key={h} className="text-left text-[9px] font-bold uppercase tracking-widest text-[#444] pb-3 pr-6">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {masteryDeltas.map((r, i) => {
              const q = questions.find((q) => q.conceptId === r.conceptId)
              const name = q?.concept ?? `Concept ${i + 1}`
              return (
                <tr key={r.conceptId ?? i} className={i < masteryDeltas.length - 1 ? "border-b border-white/[0.04]" : ""}>
                  <td className="py-3.5 pr-6 text-[12px] font-medium text-white">{name}</td>
                  <td className="py-3.5 pr-6 text-[12px] text-secondary-text">{r.before}%</td>
                  <td className="py-3.5 pr-6 text-[12px] text-secondary-text">{r.after}%</td>
                  <td className={`py-3.5 text-[12px] font-bold ${r.delta > 0 ? "text-[#4ADE80]" : r.delta < 0 ? "text-[#F87171]" : "text-secondary-text"}`}>
                    {r.delta > 0 ? `↑ +${r.delta}%` : r.delta < 0 ? `↓ ${r.delta}%` : "→ No change"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}