"use client"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  RiArrowLeftLine,
  RiBookOpenLine,
  RiFileTextLine,
  RiBrainLine,
  RiBarChart2Line,
  RiTimeLine,
  RiArrowRightLine,
} from "react-icons/ri"

// Mock data - match your courses list
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

// Mock concepts data
const conceptsByUnit = {
  1: [
    { id: "intro-to-db", name: "Introduction to Databases", mastery: 82 },
    { id: "relational-model", name: "Relational Model", mastery: 75 },
    { id: "sql-basics", name: "SQL Basics", mastery: 88 },
  ],
  2: [
    { id: "normalization", name: "Database Normalization", mastery: 70 },
    { id: "er-diagram", name: "ER Diagrams", mastery: 65 },
  ],
  3: [
    { id: "indexing", name: "Indexing & Query Optimization", mastery: 60 },
    { id: "transactions", name: "Transactions & Concurrency", mastery: 55 },
  ],
}

function MasteryRing({ pct, size = "base" }) {
  const sizeMap = {
    sm: { ring: 16, text: "9px", box: "w-10 h-10" },
    base: { ring: 22, text: "11px", box: "w-14 h-14" },
    lg: { ring: 32, text: "14px", box: "w-20 h-20" },
  }
  const { ring, text, box } = sizeMap[size]
  const circ = 2 * Math.PI * ring
  const fill = (pct / 100) * circ
  const color = pct >= 75 ? "#4ADE80" : pct >= 50 ? "var(--color-brand)" : "#F87171"

  return (
    <div className={`relative ${box} shrink-0`}>
      <svg className={`${box} -rotate-90`} viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={ring} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={ring}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ fontSize: text }} className="font-bold text-white">
          {pct}%
        </span>
      </div>
    </div>
  )
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = parseInt(params.courseId) || params.courseId

  const course = courses.find((c) => c.id === courseId || c.id.toString() === courseId)

  if (!course) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-text mb-4">Course not found</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition"
          >
            <RiArrowLeftLine className="text-[16px]" />
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const units = [
    { id: 1, name: "Unit 1: Fundamentals" },
    { id: 2, name: "Unit 2: Design" },
    { id: 3, name: "Unit 3: Advanced Topics" },
  ]

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <MasteryRing pct={course.mastery} size="lg" />
        <div className="flex-1">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-secondary-text hover:text-white transition mb-3"
          >
            <RiArrowLeftLine className="text-[14px]" />
            <span className="text-[13px]">Back to Courses</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{course.name}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[13px] text-secondary-text">{course.semester}</span>
            <span className="text-[13px] text-secondary-text">·</span>
            <span className="text-[12px] font-medium text-brand bg-brand/10 px-2.5 py-1 rounded-lg">
              {course.level}
            </span>
            <span className="text-[13px] text-secondary-text">·</span>
            <div className="flex items-center gap-1.5 text-secondary-text text-[13px]">
              <RiTimeLine className="text-[14px]" />
              {course.lastStudied}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card-dark rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <RiFileTextLine className="text-brand text-[16px]" />
            <span className="text-[11px] font-bold uppercase text-secondary-text">Documents</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {course.docsComplete}/<span className="text-secondary-text">{course.docs}</span>
          </p>
          <p className="text-[11px] text-secondary-text mt-1">{course.docsProcessing} processing</p>
        </div>

        <div className="bg-card-dark rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <RiBrainLine className="text-brand text-[16px]" />
            <span className="text-[11px] font-bold uppercase text-secondary-text">Chunks</span>
          </div>
          <p className="text-2xl font-bold text-white">{course.chunks}</p>
          <p className="text-[11px] text-secondary-text mt-1">{course.words} words</p>
        </div>

        <div className="bg-card-dark rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <RiBookOpenLine className="text-brand text-[16px]" />
            <span className="text-[11px] font-bold uppercase text-secondary-text">Units</span>
          </div>
          <p className="text-2xl font-bold text-white">{course.units}</p>
          <p className="text-[11px] text-secondary-text mt-1">sections</p>
        </div>

        <div className="bg-card-dark rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <RiBarChart2Line className="text-brand text-[16px]" />
            <span className="text-[11px] font-bold uppercase text-secondary-text">Category</span>
          </div>
          <p className="text-sm font-bold text-white">{course.category}</p>
        </div>
      </div>

      {/* Concepts by Unit */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Course Concepts</h2>

        {units.map((unit) => (
          <div key={unit.id} className="bg-card-dark rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">{unit.name}</h3>

            <div className="space-y-2">
              {(conceptsByUnit[unit.id] || []).map((concept) => (
                <Link
                  key={concept.id}
                  href={`/courses/${course.id}/concepts/${concept.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <RiBrainLine className="text-brand text-[16px] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white group-hover:text-brand transition">
                        {concept.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    <div className="text-right">
                      <p
                        className={`text-[12px] font-bold ${
                          concept.mastery >= 75
                            ? "text-[#4ADE80]"
                            : concept.mastery >= 50
                              ? "text-brand"
                              : "text-[#F87171]"
                        }`}
                      >
                        {concept.mastery}%
                      </p>
                    </div>
                    <RiArrowRightLine className="text-secondary-text group-hover:text-brand transition text-[14px]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
