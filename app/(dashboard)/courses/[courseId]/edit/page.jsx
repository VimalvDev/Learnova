"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { RiArrowRightSLine, RiSendPlaneLine } from "react-icons/ri"
import UploadArea   from "@/components/dashboard/courses/UploadArea"
import UnitsManager from "@/components/dashboard/courses/UnitsManager"

const categories = [
  "Computer Science", "Mathematics", "Physics",
  "Engineering", "Medicine", "Law", "Business", "Languages", "Custom...",
]
const durations = ["1 Week", "2 Weeks", "1 Month", "3 Months", "Custom"]

export default function EditCoursePage() {
  const { courseId } = useParams()
  const router       = useRouter()
  const supabase     = createClient()

  const [loading,      setLoading]      = useState(true)
  const [saving,       setSaving]       = useState(false)
  const [uploadCount,  setUploadCount]  = useState(0)
  const [error,        setError]        = useState(null)
  const [success,      setSuccess]      = useState(false)

  const [name,        setName]       = useState("")
  const [category,    setCategory]   = useState("Computer Science")
  const [level,       setLevel]      = useState("Intermediate")
  const [description, setDesc]       = useState("")
  const [goal,        setGoal]       = useState("")
  const [duration,    setDuration]   = useState("3 Months")
  const [status,      setStatus]     = useState("draft")
  const [catOpen,     setCatOpen]    = useState(false)
  const [durOpen,     setDurOpen]    = useState(false)

  useEffect(() => { fetchCourse() }, [courseId])

  async function fetchCourse() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single()

    if (error || !data) { router.push("/courses"); return }

    setName(data.course_name        ?? "")
    setCategory(data.subject_category ?? "Computer Science")
    setLevel(
      data.difficulty_level
        ? data.difficulty_level.charAt(0).toUpperCase() + data.difficulty_level.slice(1)
        : "Intermediate"
    )
    setDesc(data.description        ?? "")
    setGoal(data.target_exam        ?? "")
    setDuration(data.estimated_duration ?? "3 Months")
    setStatus(data.status           ?? "draft")
    setLoading(false)
  }

  async function handleSave() {
    if (!name.trim()) { setError("Course name is required."); return }
    setSaving(true)
    setError(null)
    setSuccess(false)

    const { error } = await supabase
      .from("courses")
      .update({
        course_name:        name.trim(),
        subject_category:   category,
        difficulty_level:   level.toLowerCase(),
        description:        description.trim() || null,
        target_exam:        goal.trim() || null,
        estimated_duration: duration,
      })
      .eq("id", courseId)

    setSaving(false)
    if (error) { setError(error.message); return }
    setSuccess(true)
  }

  async function handlePublish() {
    const { error } = await supabase
      .from("courses")
      .update({ status: "published" })
      .eq("id", courseId)
    if (!error) router.push("/courses")
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between pb-6 mb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Link href="/courses" className="text-[12px] text-secondary-text hover:text-brand transition-colors">
              My Courses
            </Link>
            <RiArrowRightSLine className="text-tertiary-text text-[13px]" />
            <span className="text-[12px] text-[#888]">Edit Course</span>
          </div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Edit Course</h1>
          <p className="text-[13px] text-[#666] mt-1">Update your course information and documents.</p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] rounded-lg">
            <div className={`w-1.5 h-1.5 rounded-full ${status === "published" ? "bg-[#4ADE80]" : "bg-[#FBBF24]"}`} />
            <span className="text-[11px] text-[#888] capitalize">{status}</span>
          </div>
          {status !== "published" && (
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
            >
              <RiSendPlaneLine className="text-[14px]" />
              Publish Course
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {/* Course Info Form */}
        <div className="bg-[#171717] rounded-2xl p-6">
          <div className="mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand/80 block mb-1">
              Course Setup
            </span>
            <h2 className="text-[17px] font-semibold text-white/90">Course Information</h2>
            <p className="text-[12px] text-[#666] mt-0.5">
              Update your course details below.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* Course Name */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-medium text-[#888]">Course Name</label>
                <span className="text-[10px] text-[#444]">{name.length} / 80</span>
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 80))}
                placeholder="e.g. Database Management Systems — Semester 4"
                className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-brand/40 transition-all"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <label className="text-[11px] font-medium text-[#888] block mb-1.5">Subject Category</label>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white flex items-center justify-between outline-none focus:ring-1 focus:ring-brand/40 transition-all"
              >
                <span>{category}</span>
                <span className="text-secondary-text text-[11px]">▾</span>
              </button>
              {catOpen && (
                <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a] rounded-xl shadow-2xl z-20 overflow-hidden">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCategory(c); setCatOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/[0.04] transition-colors flex items-center justify-between ${
                        category === c ? "text-brand" : "text-white"
                      }`}
                    >
                      {c}
                      {category === c && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-[11px] font-medium text-[#888] block mb-1.5">Difficulty Level</label>
              <div className="flex items-center gap-1 p-1 bg-[#111] rounded-xl">
                {["Beginner", "Intermediate", "Advanced"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`flex-1 py-2 text-[11px] font-medium rounded-lg transition-all ${
                      level === l ? "bg-brand text-white" : "text-secondary-text hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <label className="text-[11px] font-medium text-[#888]">Description</label>
                  <span className="text-[9px] text-[#444] bg-white/[0.04] px-1.5 py-0.5 rounded-full">Optional</span>
                </div>
                <span className="text-[10px] text-[#444]">{description.length} / 400</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDesc(e.target.value.slice(0, 400))}
                placeholder="Describe what this course covers and your learning objectives..."
                rows={3}
                className="w-full px-3.5 py-3 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-brand/40 transition-all resize-y min-h-[80px]"
              />
            </div>

            {/* Goal */}
            <div>
              <label className="text-[11px] font-medium text-[#888] block mb-1.5">Target Exam or Goal</label>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Final Semester Exam, GRE"
                className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-brand/40 transition-all"
              />
            </div>

            {/* Duration */}
            <div className="relative">
              <label className="text-[11px] font-medium text-[#888] block mb-1.5">Estimated Duration</label>
              <button
                onClick={() => setDurOpen(!durOpen)}
                className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white flex items-center justify-between outline-none focus:ring-1 focus:ring-brand/40 transition-all"
              >
                <span>{duration}</span>
                <span className="text-secondary-text text-[11px]">▾</span>
              </button>
              {durOpen && (
                <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a] rounded-xl shadow-2xl z-20 overflow-hidden">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDuration(d); setDurOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-white/[0.04] transition-colors flex items-center justify-between ${
                        duration === d ? "text-brand" : "text-white"
                      }`}
                    >
                      {d}
                      {duration === d && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {error   && <p className="text-[12px] text-[#F87171] mt-4">{error}</p>}
          {success && <p className="text-[12px] text-[#4ADE80] mt-4">✓ Course updated successfully.</p>}

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.04]">
            <p className="text-[11px] text-[#444] flex items-center gap-1.5">
              <span className="text-brand">◈</span>
              Changes are saved immediately.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/courses" className="text-[12px] text-[#666] hover:text-white transition-colors">
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        {/* Upload more documents */}
        <UploadArea
          courseId={courseId}
          onUploadComplete={() => setUploadCount((n) => n + 1)}
        />

        {/* Units & documents */}
        <UnitsManager
          key={uploadCount}
          courseId={courseId}
        />

      </div>
    </div>
  )
}