"use client"
import { useEffect, useState } from "react"

export default function WeakConceptPreview({ courseId }) {
  const [concepts, setConcepts] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!courseId) { setLoading(false); return }
    async function fetch_() {
      try {
        const res  = await fetch(`/api/quiz/weak-concepts?courseId=${courseId}`)
        const data = await res.json()
        setConcepts(data.concepts ?? [])
      } finally { setLoading(false) }
    }
    fetch_()
  }, [courseId])

  if (loading) return <p className="text-[11px] text-secondary-text">Loading...</p>

  if (concepts.length === 0) {
    return (
      <p className="text-[11px] text-secondary-text">
        No mastery data yet. Take your first quiz to see weak areas.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] text-secondary-text mb-1">This quiz will focus on your weakest areas:</p>
      {concepts.map((c) => {
        const color     = c.score < 40 ? "bg-[#F87171]"  : c.score < 65 ? "bg-[#FBBF24]" : "bg-brand"
        const textColor = c.score < 40 ? "text-[#F87171]": c.score < 65 ? "text-[#FBBF24]": "text-brand"
        return (
          <div key={c.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                <span className="text-[12px] text-white">{c.name}</span>
              </div>
              <span className={`text-[11px] font-semibold ${textColor}`}>{c.score}%</span>
            </div>
            <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${c.score}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}