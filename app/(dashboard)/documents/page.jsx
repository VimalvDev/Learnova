"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  RiFileTextLine, RiUploadCloud2Line, RiSearchLine,
  RiCheckLine, RiTimeLine, RiAlertLine,
  RiDeleteBinLine, RiEyeLine, RiCloseLine,
  RiArrowRightLine,
} from "react-icons/ri"
import UploadArea from "@/components/dashboard/courses/UploadArea"

const statusConfig = {
  complete:   { color: "text-[#4ADE80]", bg: "bg-[#4ADE80]/10", label: "Complete",   icon: RiCheckLine  },
  processing: { color: "text-brand",     bg: "bg-brand/10",     label: "Processing", icon: RiTimeLine   },
  error:      { color: "text-[#F87171]", bg: "bg-[#F87171]/10", label: "Error",      icon: RiAlertLine  },
}

const typeColors = {
  pdf:  "bg-[#F87171]/15 text-[#F87171]",
  docx: "bg-brand/15 text-brand",
  txt:  "bg-[#4ADE80]/15 text-[#4ADE80]",
}

// ── Text Preview Modal ──────────────────────────────────────────
function TextPreviewModal({ doc, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-[#141414] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold text-white truncate">{doc.file_name}</h2>
            <p className="text-[11px] text-secondary-text mt-0.5">
              {doc.file_type?.toUpperCase()}
              {doc.word_count  > 0 && ` · ${doc.word_count.toLocaleString()} words`}
              {doc.chunk_count > 0 && ` · ${doc.chunk_count} chunks`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-secondary-text hover:text-white hover:bg-white/[0.06] transition-all shrink-0 ml-4"
          >
            <RiCloseLine className="text-[16px]" />
          </button>
        </div>

        {/* Extracted text */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {doc.extracted_text ? (
            <p className="text-[13px] text-secondary-text leading-relaxed whitespace-pre-wrap">
              {doc.extracted_text}
            </p>
          ) : (
            <p className="text-[13px] text-secondary-text text-center py-8">
              No extracted text available.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.06] shrink-0">
          <p className="text-[11px] text-[#444]">
            This is the text Learnova extracted and uses for AI chat and quiz generation.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Doc Row ─────────────────────────────────────────────────────
function DocRow({ doc, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showPreview,   setShowPreview]   = useState(false)
  const [fullDoc,       setFullDoc]       = useState(null)
  const s    = statusConfig[doc.status] ?? statusConfig.complete
  const Icon = s.icon
  const supabase = createClient()

  async function handleView() {
    // Fetch full doc including extracted_text (not included in list query)
    const { data } = await supabase
      .from("documents")
      .select("*")
      .eq("id", doc.id)
      .single()
    if (data) { setFullDoc(data); setShowPreview(true) }
  }

  return (
    <>
      {showPreview && fullDoc && (
        <TextPreviewModal doc={fullDoc} onClose={() => setShowPreview(false)} />
      )}

      <div className="flex items-center gap-4 py-3 border-b border-white/[0.04] last:border-0 group">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${typeColors[doc.file_type] ?? "bg-white/[0.06] text-white"}`}>
          <RiFileTextLine className="text-[14px]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white truncate">{doc.file_name}</p>
          <p className="text-[10px] text-secondary-text mt-0.5">
            {doc.file_type?.toUpperCase()}
            {doc.page_count  > 0 && ` · ${doc.page_count} pages`}
            {doc.word_count  > 0 && ` · ${doc.word_count.toLocaleString()} words`}
            {doc.chunk_count > 0 && ` · ${doc.chunk_count} chunks`}
          </p>
        </div>

        <div className="hidden md:block shrink-0">
          <span className="text-[10px] text-secondary-text bg-white/[0.04] px-2 py-1 rounded-lg truncate max-w-[160px] block">
            {doc.courses?.course_name ?? "—"}
          </span>
        </div>

        <div className="hidden sm:block text-[10px] text-secondary-text shrink-0 max-w-[120px] truncate">
          {doc.units?.unit_name ?? "—"}
        </div>

        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 ${s.bg}`}>
          <Icon className={`text-[11px] ${s.color}`} />
          <span className={`text-[10px] font-medium ${s.color}`}>{s.label}</span>
        </div>

        <span className="text-[11px] text-[#444] hidden lg:block shrink-0">
          {new Date(doc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#888]">Delete?</span>
              <button onClick={() => onDelete(doc.id)} className="text-[10px] text-[#F87171] hover:underline">Yes</button>
              <button onClick={() => setConfirmDelete(false)} className="text-[10px] text-secondary-text hover:underline">No</button>
            </div>
          ) : (
            <>
              <button
                onClick={handleView}
                className="text-secondary-text hover:text-white transition-colors"
                title="View extracted text"
              >
                <RiEyeLine className="text-[15px]" />
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-secondary-text hover:text-[#F87171] transition-colors"
                title="Delete document"
              >
                <RiDeleteBinLine className="text-[15px]" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// ── Upload Modal ─────────────────────────────────────────────────
function UploadModal({ courses, onClose, onComplete }) {
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const selected = courses.find((c) => c.id === selectedCourseId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-[#141414] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-[15px] font-semibold text-white">Upload Document</h2>
            <p className="text-[11px] text-secondary-text mt-0.5">
              {selectedCourseId ? `Uploading to: ${selected?.course_name}` : "Select a course first"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-secondary-text hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RiCloseLine className="text-[16px]" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!selectedCourseId ? (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand/70 mb-3">Select Course</p>
              {courses.length === 0 ? (
                <p className="text-[13px] text-secondary-text py-6 text-center">No courses yet. Create a course first.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className="flex items-center justify-between px-4 py-3.5 bg-[#1a1a1a] hover:bg-white/[0.06] rounded-xl transition-all group text-left"
                    >
                      <div>
                        <p className="text-[13px] font-medium text-white">{course.course_name}</p>
                        <p className="text-[11px] text-secondary-text mt-0.5">
                          {course.subject_category ?? "General"} · {course.difficulty_level}
                        </p>
                      </div>
                      <RiArrowRightLine className="text-secondary-text group-hover:text-brand transition-colors text-[15px] shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedCourseId(null)}
                className="text-[11px] text-secondary-text hover:text-white transition-colors mb-4 flex items-center gap-1"
              >
                ← Change course
              </button>
              <UploadArea
                courseId={selectedCourseId}
                onUploadComplete={() => { onComplete(); onClose() }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/[0.04] animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-white/[0.06] shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-48 bg-white/[0.06] rounded" />
        <div className="h-2.5 w-32 bg-white/[0.06] rounded" />
      </div>
      <div className="h-3 w-24 bg-white/[0.06] rounded hidden md:block" />
      <div className="h-6 w-20 bg-white/[0.06] rounded" />
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function DocumentsPage() {
  const [docs,          setDocs]          = useState([])
  const [courses,       setCourses]       = useState([])
  const [loading,       setLoading]       = useState(true)
  const [search,        setSearch]        = useState("")
  const [statusFilter,  setStatusFilter]  = useState("all")
  const [courseFilter,  setCourseFilter]  = useState("all")
  const [showModal,     setShowModal]     = useState(false)
  const supabase = createClient()

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [docsRes, coursesRes] = await Promise.all([
      supabase
        .from("documents")
        .select("id, file_name, file_type, page_count, word_count, chunk_count, status, course_id, unit_id, created_at, courses(course_name), units(unit_name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("courses")
        .select("id, course_name, subject_category, difficulty_level")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ])

    if (docsRes.data)    setDocs(docsRes.data)
    if (coursesRes.data) setCourses(coursesRes.data)
    setLoading(false)
  }

  async function handleDelete(docId) {
    const { error } = await supabase.from("documents").delete().eq("id", docId)
    if (!error) setDocs((prev) => prev.filter((d) => d.id !== docId))
  }

  const filtered = docs.filter((d) => {
    const matchSearch = d.file_name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || d.status === statusFilter
    const matchCourse = courseFilter === "all" || d.course_id === courseFilter
    return matchSearch && matchStatus && matchCourse
  })

  const total      = docs.length
  const complete   = docs.filter((d) => d.status === "complete").length
  const processing = docs.filter((d) => d.status === "processing").length
  const errors     = docs.filter((d) => d.status === "error").length

  return (
    <div>
      {showModal && (
        <UploadModal
          courses={courses}
          onClose={() => setShowModal(false)}
          onComplete={fetchAll}
        />
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Knowledge Base</p>
          <h1 className="text-[22px] font-bold text-white">Documents</h1>
          <p className="text-[13px] text-secondary-text mt-0.5">{total} documents indexed</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          <RiUploadCloud2Line className="text-[15px]" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Documents", value: total,      color: "text-white"     },
          { label: "Complete",        value: complete,   color: "text-[#4ADE80]" },
          { label: "Processing",      value: processing, color: "text-brand"     },
          { label: "Errors",          value: errors,     color: "text-[#F87171]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card-dark rounded-xl px-4 py-3">
            <p className={`text-[18px] font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-secondary-text mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] h-9 px-3 bg-card-dark rounded-xl focus-within:ring-1 focus-within:ring-brand/40 transition-all">
          <RiSearchLine className="text-[#444] text-[14px] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="flex-1 bg-transparent text-[12px] text-white placeholder:text-white/20 outline-none"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
          {["all", "complete", "processing", "error"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 text-[11px] font-medium rounded-lg capitalize transition-all ${
                statusFilter === s ? "bg-[#2A2B2F] text-white" : "text-secondary-text hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="h-9 px-3 bg-card-dark text-[12px] text-white rounded-xl outline-none cursor-pointer"
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.course_name}</option>
          ))}
        </select>
      </div>

      <div className="bg-card-dark rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-2.5 border-b border-white/[0.06]">
          <div className="w-9 shrink-0" />
          <span className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#444]">Document</span>
          <span className="hidden md:block w-[160px] text-[10px] font-bold uppercase tracking-widest text-[#444]">Course</span>
          <span className="hidden sm:block w-[120px] text-[10px] font-bold uppercase tracking-widest text-[#444]">Unit</span>
          <span className="w-24 text-[10px] font-bold uppercase tracking-widest text-[#444]">Status</span>
          <span className="hidden lg:block w-16 text-[10px] font-bold uppercase tracking-widest text-[#444]">Added</span>
          <div className="w-16 shrink-0" />
        </div>

        <div className="px-4">
          {loading ? (
            [1,2,3,4].map((i) => <SkeletonRow key={i} />)
          ) : filtered.length > 0 ? (
            filtered.map((doc) => (
              <DocRow key={doc.id} doc={doc} onDelete={handleDelete} />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-[13px] text-secondary-text">
                {docs.length === 0 ? "No documents yet. Upload your first document." : "No documents match your filters."}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 px-1">
        <p className="text-[11px] text-[#444]">Showing {filtered.length} of {total} documents</p>
      </div>
    </div>
  )
}