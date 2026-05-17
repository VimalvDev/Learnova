"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import {
  RiAddLine, RiBookOpenLine, RiMoreLine,
  RiFileTextLine, RiTimeLine, RiArrowRightLine,
  RiDeleteBinLine, RiEditLine,
} from "react-icons/ri"

function MasteryRing({ pct }) {
  const r    = 22
  const circ = 2 * Math.PI * r
  const fill = (pct / 100) * circ
  const color = pct >= 75 ? "#4ADE80" : pct >= 50 ? "var(--color-brand)" : "#F87171"
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-white">{pct ?? 0}%</span>
      </div>
    </div>
  )
}

function CourseCard({ course, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const mastery   = course.avg_mastery ?? 0
  const masteryBg = mastery >= 75 ? "bg-[#4ADE80]" : mastery >= 50 ? "bg-brand" : "bg-[#F87171]"

  return (
    <div className="bg-card-dark rounded-2xl p-5 hover:bg-white/[0.06] transition-all group relative">
      <div className="flex items-start gap-4">
        <MasteryRing pct={mastery} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand/80">
                  {course.subject_category ?? "General"}
                </span>
                <span className="text-tertiary-text text-[10px]">·</span>
                <span className="text-[9px] text-secondary-text capitalize">{course.difficulty_level}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white truncate">{course.course_name}</h3>
              <p className="text-[11px] text-secondary-text mt-0.5">
                {course.target_exam ?? "No exam set"} · {course.unit_count ?? 0} units
              </p>
            </div>
            <div className="relative shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#444] hover:text-white hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100"
              >
                <RiMoreLine className="text-[15px]" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-8 w-36 bg-[#2A2B2F] rounded-xl shadow-2xl z-20 overflow-hidden">
                  <Link
                    href={`/courses/${course.id}/edit`}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-white hover:bg-white/[0.04] transition-colors"
                  >
                    <RiEditLine className="text-[13px] text-[#888]" /> Edit
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(course.id) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-[#F87171] hover:bg-[#F87171]/[0.06] transition-colors"
                  >
                    <RiDeleteBinLine className="text-[13px]" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <RiFileTextLine className="text-brand/60 text-[12px]" />
              <span className="text-[11px] text-[#888]">{course.doc_count ?? 0} docs</span>
              {course.docs_processing > 0 && (
                <span className="text-[9px] text-brand bg-brand/10 px-1.5 py-0.5 rounded-full">
                  {course.docs_processing} processing
                </span>
              )}
              {course.docs_error > 0 && (
                <span className="text-[9px] text-[#F87171] bg-[#F87171]/10 px-1.5 py-0.5 rounded-full">
                  {course.docs_error} error
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <RiTimeLine className="text-[#444] text-[12px]" />
              <span className="text-[11px] text-secondary-text">
                {course.updated_at
                  ? new Date(course.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : "Never"}
              </span>
            </div>
            <span className="ml-auto text-[11px] text-secondary-text">
              {(course.total_words ?? 0).toLocaleString()} words
            </span>
          </div>

          <div className="mt-3 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${masteryBg}`}
              style={{ width: `${mastery}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-[#444]">Overall Mastery</span>
            <Link
              href={`/courses/${course.id}`}
              className="flex items-center gap-1 text-[11px] text-brand hover:underline"
            >
              Open <RiArrowRightLine className="text-[11px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-card-dark rounded-2xl p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-white/[0.06] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-white/[0.06] rounded" />
          <div className="h-4 w-48 bg-white/[0.06] rounded" />
          <div className="h-3 w-32 bg-white/[0.06] rounded" />
        </div>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState("all")
  const supabase = createClient()

  useEffect(() => { fetchCourses() }, [])

  async function fetchCourses() {
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    // 3 separate simple queries — avoids GROUP BY issues
    const [coursesRes, docsRes, unitsRes] = await Promise.all([
      supabase
        .from("courses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("documents")
        .select("course_id, status, word_count")
        .eq("user_id", user.id),
      supabase
        .from("units")
        .select("course_id")
        .eq("user_id", user.id),
    ])

    if (coursesRes.error) { console.error(coursesRes.error); setLoading(false); return }

    const docs  = docsRes.data  ?? []
    const units = unitsRes.data ?? []

    const enriched = coursesRes.data.map((c) => {
      const courseDocs  = docs.filter((d)  => d.course_id === c.id)
      const courseUnits = units.filter((u) => u.course_id === c.id)
      return {
        ...c,
        unit_count:      courseUnits.length,
        doc_count:       courseDocs.length,
        docs_processing: courseDocs.filter((d) => d.status === "processing").length,
        docs_error:      courseDocs.filter((d) => d.status === "error").length,
        total_words:     courseDocs.reduce((sum, d) => sum + (d.word_count ?? 0), 0),
        avg_mastery:     0,
      }
    })

    setCourses(enriched)
    setLoading(false)
  }

  async function handleDelete(courseId) {
    const { error } = await supabase.from("courses").delete().eq("id", courseId)
    if (!error) setCourses((prev) => prev.filter((c) => c.id !== courseId))
  }

  const filtered   = filter === "all" ? courses : courses.filter((c) => c.status === filter)
  const totalDocs  = courses.reduce((a, c) => a + (c.doc_count ?? 0), 0)
  const avgMastery = courses.length
    ? Math.round(courses.reduce((a, c) => a + (c.avg_mastery ?? 0), 0) / courses.length)
    : 0

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Learning Hub</p>
          <h1 className="text-[22px] font-bold text-white">My Courses</h1>
          <p className="text-[13px] text-secondary-text mt-0.5">
            {courses.length} courses · {totalDocs} documents indexed
          </p>
        </div>
        <Link
          href="/courses/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          <RiAddLine className="text-[15px]" /> New Course
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Courses", value: courses.length,   color: "text-white"  },
          { label: "Docs Indexed",  value: totalDocs,        color: "text-white"  },
          { label: "Avg Mastery",   value: `${avgMastery}%`, color: "text-brand"  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card-dark rounded-xl px-4 py-5">
            <p className={`text-[2em] font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-secondary-text mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mb-5 p-1 bg-card-dark rounded-xl w-fit">
        {["all", "draft", "published"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all capitalize ${
              filter === f ? "bg-[#2A2B2F] text-white" : "text-secondary-text hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          [1, 2, 3].map((i) => <SkeletonCard key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-4">
              <RiBookOpenLine className="text-brand text-[24px]" />
            </div>
            <h3 className="text-[16px] font-semibold text-white mb-1.5">No courses yet</h3>
            <p className="text-[13px] text-secondary-text mb-5 max-w-xs">
              Create your first course to start building your personalized learning engine.
            </p>
            <Link
              href="/courses/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
            >
              <RiAddLine className="text-[14px]" /> Create First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}