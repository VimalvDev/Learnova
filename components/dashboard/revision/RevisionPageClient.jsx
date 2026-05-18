"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { RiArrowRightSLine, RiBookOpenLine, RiArrowDownSLine } from "react-icons/ri"
import StatsStrip        from "./StatsStrip"
import TodayFocus        from "./TodayFocus"
import UpcomingList      from "./UpcomingList"
import RevisionHistory   from "./RevisionHistory"
import RevisionCalendar  from "./right-panel/RevisionCalender"

export default function RevisionPageClient({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0] ?? null)
  const [courseOpen,     setCourseOpen]     = useState(false)
  const [data,           setData]           = useState(null)
  const [loading,        setLoading]        = useState(true)

  const fetchData = useCallback(async (courseId) => {
    setLoading(true)
    try {
      const url = courseId ? `/api/revision?courseId=${courseId}` : "/api/revision"
      const res  = await fetch(url)
      const json = await res.json()
      setData(json)
    } catch {}
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    fetchData(selectedCourse?.id ?? null)
  }, [selectedCourse])

  const handleComplete = async (revisionId) => {
    await fetch("/api/revision/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revisionId }),
    })
    fetchData(selectedCourse?.id ?? null)
  }

  const items       = data?.items       ?? []
  const stats       = data?.stats       ?? {}
  const calendarMap = data?.calendarMap ?? {}

  const todayStr   = new Date().toISOString().slice(0, 10)
  const todayItems = items.filter((i) => i.status === "overdue" || i.status === "due")
  const upcoming   = items.filter((i) => i.status === "upcoming")
  const history    = items.filter((i) => i.isCompleted)

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-start justify-between pb-2 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Link href="/dashboard" className="text-[12px] text-tertiary-text hover:text-brand transition-colors">
              Dashboard
            </Link>
            <RiArrowRightSLine className="text-[#444] text-[13px]" />
            <span className="text-[12px] text-secondary-text">Revision Planner</span>
          </div>
          <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
            Revision Planner
          </h1>
          <p className="text-[clamp(12px,1.3vw,14px)] text-tertiary-text mt-1">
            Spaced repetition scheduling based on your mastery scores.
          </p>
        </div>

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

      {/* Stats */}
      <StatsStrip stats={stats} loading={loading} />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">

        {/* Left */}
        <div className="flex flex-col gap-5">
          <TodayFocus
            items={todayItems}
            loading={loading}
            onComplete={handleComplete}
            courseId={selectedCourse?.id}
          />
          <UpcomingList
            items={upcoming}
            loading={loading}
            onComplete={handleComplete}
            courseId={selectedCourse?.id}
          />
          <RevisionHistory items={history} loading={loading} />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 xl:sticky xl:top-4">
          <RevisionCalendar calendarMap={calendarMap} />
        </div>
      </div>
    </div>
  )
}