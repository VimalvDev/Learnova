"use client"
import { useState } from "react"
import Link from "next/link"
import {
  RiAddLine, RiBookOpenLine, RiMoreLine,
  RiFileTextLine, RiTimeLine, RiArrowRightLine,
  RiDeleteBinLine, RiEditLine,
} from "react-icons/ri"

const courses = [
  {
    id: 1,
    name: "Database Management Systems",
    semester: "Semester 4",
    category: "Computer Science",
    level: "Intermediate",
    mastery: 72,
    docs: 5,
    docsComplete: 3,
    docsProcessing: 1,
    docsError: 1,
    chunks: 312,
    words: 24640,
    lastStudied: "2 hours ago",
    units: 3,
  },
  {
    id: 2,
    name: "Operating Systems",
    semester: "Semester 4",
    category: "Computer Science",
    level: "Advanced",
    mastery: 45,
    docs: 2,
    docsComplete: 2,
    docsProcessing: 0,
    docsError: 0,
    chunks: 148,
    words: 11200,
    lastStudied: "Yesterday",
    units: 2,
  },
  {
    id: 3,
    name: "Data Structures & Algorithms",
    semester: "Semester 3",
    category: "Computer Science",
    level: "Intermediate",
    mastery: 88,
    docs: 4,
    docsComplete: 4,
    docsProcessing: 0,
    docsError: 0,
    chunks: 224,
    words: 18900,
    lastStudied: "3 days ago",
    units: 4,
  },
]

function MasteryRing({ pct }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const fill = (pct / 100) * circ
  const color = pct >= 75 ? "#4ADE80" : pct >= 50 ? "var(--color-brand)"  : "var(--color-red)"
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
        <span className="text-[11px] font-bold text-white">{pct}%</span>
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const masteryColor = course.mastery >= 75 ? "text-[#4ADE80]" : course.mastery >= 50 ? "text-brand" : "text-[#F87171]"
  const masteryBg    = course.mastery >= 75 ? "bg-[#4ADE80]" : course.mastery >= 50 ? "bg-brand" : "bg-[#F87171]"

  return (
    <div className="bg-card-dark rounded-2xl p-5 hover:bg-white/6 transition-all group relative ">
      <div className="flex items-start gap-4">
        <MasteryRing pct={course.mastery} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand/80">
                  {course.category}
                </span>
                <span className="text-tertiary-text text-[10px]">·</span>
                <span className="text-[9px] text-secondary-text">{course.level}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white truncate">{course.name}</h3>
              <p className="text-[11px] text-secondary-text mt-0.5">{course.semester} · {course.units} units</p>
            </div>
            <div className="relative shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#444] hover:text-white hover:bg-white/6 transition-all opacity-0 group-hover:opacity-100"
              >
                <RiMoreLine className="text-[15px]" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-8 w-36 bg-[#2A2B2F] rounded-xl shadow-2xl z-20 overflow-hidden border border-white/6">
                  <Link
                    href={`/dashboard/courses/${course.id}/edit`}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-white hover:bg-white/4 transition-colors"
                  >
                    <RiEditLine className="text-[13px] text-[#888]" /> Edit
                  </Link>
                  <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-[#F87171] hover:bg-[#F87171]/6 transition-colors">
                    <RiDeleteBinLine className="text-[13px]" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <RiFileTextLine className="text-brand/60 text-[12px]" />
              <span className="text-[11px] text-[#888]">{course.docs} docs</span>
              {course.docsProcessing > 0 && (
                <span className="text-[9px] text-brand bg-brand/10 px-1.5 py-0.5 rounded-full">
                  {course.docsProcessing} processing
                </span>
              )}
              {course.docsError > 0 && (
                <span className="text-[9px] text-[#F87171] bg-[#F87171]/10 px-1.5 py-0.5 rounded-full">
                  {course.docsError} error
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <RiTimeLine className="text-[#444] text-[12px]" />
              <span className="text-[11px] text-secondary-text">{course.lastStudied}</span>
            </div>
            <span className="ml-auto text-[11px] text-secondary-text">{course.words.toLocaleString()} words</span>
          </div>

          <div className="mt-3 h-0.75 bg-white/6 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${masteryBg}`}
              style={{ width: `${course.mastery}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-[#444]">Overall Mastery</span>
            <Link
              href={`/dashboard/courses/${course.id}`}
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

export default function CoursesPage() {
  const [filter, setFilter] = useState("all")
  const totalWords = courses.reduce((a, c) => a + c.words, 0)
  const avgMastery = Math.round(courses.reduce((a, c) => a + c.mastery, 0) / courses.length)

  return (
    <div className="">

      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Learning Hub</p>
          <h1 className="text-[22px] font-bold text-white">My Courses</h1>
          <p className="text-[13px] text-secondary-text mt-0.5">
            {courses.length} courses · {courses.reduce((a, c) => a + c.docs, 0)} documents indexed
          </p>
        </div>
        <Link
          href="/courses/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          <RiAddLine className="text-[15px]" /> New Course
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Courses",   value: courses.length,                       color: "text-white"     },
          { label: "Docs Indexed",    value: courses.reduce((a,c)=>a+c.docs,0),    color: "text-white"     },
          { label: "Total Words",     value: totalWords.toLocaleString(),           color: "text-white"     },
          { label: "Avg Mastery",     value: `${avgMastery}%`,                     color: "text-brand" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card-dark hover:bg-white/6 rounded-xl px-4 py-3">
            <p className={`text-[18px] font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-secondary-text mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mb-5 p-1 bg-card rounded-xl w-fit">
        {["all", "active", "completed"].map((f) => (
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
        {courses.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>

      {courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-4">
            <RiBookOpenLine className="text-brand text-[24px]" />
          </div>
          <h3 className="text-[16px] font-semibold text-white mb-1.5">No courses yet</h3>
          <p className="text-[13px] text-secondary-text mb-5 max-w-xs">
            Create your first course to start building your personalized learning engine.
          </p>
          <Link
            href="/dashboard/courses/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
          >
            <RiAddLine className="text-[14px]" /> Create First Course
          </Link>
        </div>
      )}
    </div>
  )
}