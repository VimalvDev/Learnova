"use client"
import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { RiArrowLeftLine, RiBrainLine, RiArrowRightLine } from "react-icons/ri"

// Mock concepts data by unit
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

const courses = [
  { id: 1, name: "Database Management Systems" },
  { id: 2, name: "Operating Systems" },
  { id: 3, name: "Data Structures & Algorithms" },
]

export default function ConceptsListPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = parseInt(params.courseId) || params.courseId

  const course = courses.find((c) => c.id === courseId || c.id.toString() === courseId)

  if (!course) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-text mb-4">Course not found</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition"
          >
            <RiArrowLeftLine className="text-[16px]" />
            Go Back
          </button>
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
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-secondary-text hover:text-white transition mb-3"
        >
          <RiArrowLeftLine className="text-[14px]" />
          <span className="text-[13px]">Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Course Concepts</h1>
        <p className="text-secondary-text">{course.name}</p>
      </div>

      {/* Concepts by Unit */}
      <div className="space-y-6">
        {units.map((unit) => (
          <div key={unit.id}>
            <h2 className="text-lg font-bold text-white mb-3">{unit.name}</h2>

            <div className="space-y-2">
              {(conceptsByUnit[unit.id] || []).map((concept) => (
                <Link
                  key={concept.id}
                  href={`/courses/${course.id}/concepts/${concept.id}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-card-dark hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition">
                      <RiBrainLine className="text-brand text-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-white group-hover:text-brand transition">
                        {concept.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0 ml-3">
                    <div className="text-right">
                      <p
                        className={`text-[13px] font-bold ${
                          concept.mastery >= 75
                            ? "text-[#4ADE80]"
                            : concept.mastery >= 50
                              ? "text-brand"
                              : "text-[#F87171]"
                        }`}
                      >
                        {concept.mastery}%
                      </p>
                      <p className="text-[11px] text-secondary-text">Mastery</p>
                    </div>
                    <RiArrowRightLine className="text-secondary-text group-hover:text-brand transition text-[16px]" />
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
