export default function ExamContext({ value, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-[11px] font-medium text-(--color-tertiary-text)">Exam or Goal Context</label>
        <span className="text-[9px] text-(--color-dark-gray) bg-white/[0.04] px-1.5 py-0.5 rounded-full">Optional</span>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Final exam — covers all units, 60% MCQ, 40% written"
        className="w-full h-11 px-3.5 bg-card-dark text-[12px] text-white placeholder:text-(--color-dark-gray) rounded-xl outline-none focus:ring-1 focus:ring-(--color-brand)/30 transition-all"
      />
      <p className="text-[10px] text-(--color-tertiary-text) mt-1.5">
        Providing context allows the system to weight topics by likely exam relevance.
      </p>
    </div>
  )
}