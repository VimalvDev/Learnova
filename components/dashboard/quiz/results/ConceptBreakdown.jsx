"use client"
import { useState } from "react"

export default function ConceptBreakdown({ answers, questions }) {
  const [tab, setTab] = useState("accuracy")

  // Group by concept
  const byConceptMap = {}
  answers.forEach((a) => {
    const q = questions.find((q) => q.id === a.questionId)
    if (!q) return
    const concept = q.concept ?? "General"
    if (!byConceptMap[concept]) byConceptMap[concept] = { correct: 0, total: 0, scores: [] }
    byConceptMap[concept].total++
    if (a.isCorrect) byConceptMap[concept].correct++
    byConceptMap[concept].scores.push(a.score ?? (a.isCorrect ? 100 : 0))
  })

  const concepts = Object.entries(byConceptMap).map(([name, d]) => ({
    name,
    sessionPct: Math.round((d.correct / d.total) * 100),
    correct:    d.correct,
    total:      d.total,
    avgScore:   Math.round(d.scores.reduce((s, v) => s + v, 0) / d.scores.length),
    status:     d.correct / d.total >= 0.8 ? "mastered" : d.correct / d.total >= 0.5 ? "improving" : "focus",
  }))

  const badge = {
    focus:     "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",
    improving: "bg-brand/10 text-brand border-brand/20",
    mastered:  "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20",
  }
  const badgeLabel = { focus: "⚠ Needs Focus", improving: "↑ Improving", mastered: "✓ Mastered" }

  if (concepts.length === 0) return null

  return (
    <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Concept Analysis</p>
          <h2 className="text-[16px] font-semibold text-white">Performance by Concept</h2>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {concepts.map((c) => (
          <div key={c.name} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div>
                <p className="text-[13px] font-semibold text-white">{c.name}</p>
                <p className="text-[11px] text-secondary-text mt-0.5">{c.correct}/{c.total} correct</p>
              </div>
              <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border ${badge[c.status]}`}>
                {badgeLabel[c.status]}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-[#444] w-14 shrink-0">Session</span>
              <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${c.sessionPct}%` }}
                />
              </div>
              <span className="text-[11px] text-white w-8 text-right shrink-0 font-medium">{c.sessionPct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}