"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { RiArrowRightSLine, RiArrowDownSLine, RiBookOpenLine, RiTimeLine } from "react-icons/ri"
import OverviewCards    from "./OverviewCards"
import ConceptTable     from "./ConceptTable"
import WeaknessPanel    from "./WeaknessPanel"
import PerformanceTrend from "./PerformanceTrend"
import ConceptHeatmap   from "./ConceptHeatmap"
import ActionPlan       from "./ActionPlan"

export default function AnalyticsClient({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0] ?? null)
  const [courseOpen,     setCourseOpen]     = useState(false)
  const [data,           setData]           = useState(null)
  const [loading,        setLoading]        = useState(true)

  useEffect(() => {
    async function fetch_() {
      setLoading(true)
      try {
        const url  = selectedCourse ? `/api/analytics?courseId=${selectedCourse.id}` : "/api/analytics"
        const res  = await fetch(url)
        const json = await res.json()
        setData(json)
      } catch {}
      finally { setLoading(false) }
    }
    fetch_()
  }, [selectedCourse])

  const lastUpdated = data?.overview?.lastUpdated
    ? new Date(data.overview.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null

  return (
    <div className="max-w-330 mx-auto flex flex-col gap-5 py-4">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 pb-5 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Link href="/dashboard" className="text-[12px] text-tertiary-text hover:text-brand transition-colors">
              Dashboard
            </Link>
            <RiArrowRightSLine className="text-[#444] text-[13px]" />
            <span className="text-[12px] text-secondary-text">Analytics</span>
          </div>
          <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
            Mastery Analytics
          </h1>
          <p className="text-[clamp(12px,1.3vw,14px)] text-tertiary-text mt-1">
            Concept-level performance across your quiz history.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Course selector */}
            {courses.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setCourseOpen(!courseOpen)}
                  className="flex items-center gap-2 h-9 px-3 bg-card-dark text-[12px] text-white rounded-xl hover:bg-[#1c1c1c] transition-all"
                >
                  <RiBookOpenLine className="text-brand text-[13px]" />
                  <span className="max-w-[160px] truncate">{selectedCourse?.course_name ?? "All Courses"}</span>
                  <RiArrowDownSLine className="text-[#444] text-[13px]" />
                </button>
                {courseOpen && (
                  <div className="absolute top-10 right-0 w-56 bg-[#1e1e1e] rounded-xl shadow-2xl z-20 overflow-hidden border border-white/[0.06]">
                    {courses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCourse(c); setCourseOpen(false) }}
                        className={`w-full text-left px-3.5 py-2.5 text-[12px] hover:bg-white/[0.04] transition-colors flex items-center justify-between ${
                          selectedCourse?.id === c.id ? "text-brand" : "text-white"
                        }`}
                      >
                        {c.course_name}
                        {selectedCourse?.id === c.id && <span className="text-[10px]">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {lastUpdated && (
            <div className="flex items-center gap-1.5 text-[11px] text-tertiary-text">
              <RiTimeLine className="text-[12px]" />
              Last updated: Today at {lastUpdated} · Refreshes after each quiz
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      {!loading && data?.overview?.quizCount === 0 && (
        <div className="bg-card-dark rounded-2xl p-12 flex flex-col items-center text-center">
          <span className="text-[32px] mb-4">📊</span>
          <h2 className="text-[16px] font-semibold text-white mb-2">No quiz data yet</h2>
          <p className="text-[13px] text-tertiary-text mb-6 max-w-sm">
            Take your first quiz to see mastery scores, performance trends, and weakness analysis.
          </p>
          <Link
            href="/dashboard/quizzes"
            className="px-6 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl hover:brightness-110 transition-all"
          >
            Go to Quiz Center →
          </Link>
        </div>
      )}

      {(loading || (data?.overview?.quizCount ?? 0) > 0) && (
        <>
          <OverviewCards overview={data?.overview} loading={loading} />
          <PerformanceTrend trendData={data?.trendData} quizTrend={data?.quizTrend} loading={loading} />
          <ConceptTable rows={data?.conceptRows} loading={loading} courseId={selectedCourse?.id} />
          <WeaknessPanel patterns={data?.patterns} loading={loading} />
          <ConceptHeatmap cells={data?.heatmapCells} loading={loading} />
          <ActionPlan patterns={data?.patterns} overview={data?.overview} loading={loading} courseId={selectedCourse?.id} />
        </>
      )}
    </div>
  )
}