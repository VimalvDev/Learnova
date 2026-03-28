"use client"
import { useState } from "react"
import {
  RiFileTextLine, RiUploadCloud2Line, RiFilterLine,
  RiSearchLine, RiCheckLine, RiTimeLine,
  RiAlertLine, RiDeleteBinLine, RiEyeLine, RiRefreshLine,
} from "react-icons/ri"
import UploadArea      from "@/components/dashboard/courses/UploadArea"
import ProcessingQueue from "@/components/dashboard/courses/ProcessingQueue"

const allDocs = [
  { id: 1, name: "DBMS_Complete_Notes.pdf",   course: "Database Management Systems", type: "PDF",  size: "3.2 MB", pages: 42, words: 8400,  chunks: 84,  status: "complete",   uploaded: "2h ago"    },
  { id: 2, name: "Intro_Slides.pdf",           course: "Database Management Systems", type: "PDF",  size: "1.1 MB", pages: 18, words: 2200,  chunks: 34,  status: "processing", uploaded: "1h ago"    },
  { id: 3, name: "ER_Diagrams_Notes.docx",     course: "Database Management Systems", type: "DOCX", size: "0.8 MB", pages: 12, words: 3100,  chunks: 31,  status: "complete",   uploaded: "Yesterday" },
  { id: 4, name: "OS_Lecture_Notes.pdf",       course: "Operating Systems",           type: "PDF",  size: "2.4 MB", pages: 31, words: 6800,  chunks: 68,  status: "complete",   uploaded: "Yesterday" },
  { id: 5, name: "Scanned_Handout.jpg",        course: "Operating Systems",           type: "IMG",  size: "5.1 MB", pages: 8,  words: 0,     chunks: 0,   status: "error",      uploaded: "2d ago"    },
  { id: 6, name: "DSA_Full_Notes.pdf",         course: "Data Structures & Algorithms",type: "PDF",  size: "4.2 MB", pages: 56, words: 12400, chunks: 124, status: "complete",   uploaded: "3d ago"    },
  { id: 7, name: "Sorting_Algorithms.pdf",     course: "Data Structures & Algorithms",type: "PDF",  size: "1.8 MB", pages: 22, words: 4100,  chunks: 41,  status: "complete",   uploaded: "3d ago"    },
  { id: 8, name: "Trees_and_Graphs.pdf",       course: "Data Structures & Algorithms",type: "PDF",  size: "2.1 MB", pages: 28, words: 5600,  chunks: 56,  status: "complete",   uploaded: "4d ago"    },
]

const statusConfig = {
  complete:   { color: "text-[#4ADE80]",  bg: "bg-[#4ADE80]/10",  label: "Complete",    icon: RiCheckLine   },
  processing: { color: "text-brand",  bg: "bg-brand/10",  label: "Processing",  icon: RiTimeLine    },
  error:      { color: "text-[#F87171]",  bg: "bg-[#F87171]/10",  label: "Error",       icon: RiAlertLine   },
}

const typeColors = {
  PDF:  "bg-[#F87171]/15 text-[#F87171]",
  DOCX: "bg-brand/15 text-brand",
  IMG:  "bg-[#4ADE80]/15 text-[#4ADE80]",
}

function DocRow({ doc }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const s = statusConfig[doc.status]
  const Icon = s.icon

  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/[0.04] last:border-0 group">
      {/* Type badge */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[doc.type] ?? "bg-white/[0.06] text-white"}`}>
        <RiFileTextLine className="text-[14px]" />
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-white truncate">{doc.name}</p>
        <p className="text-[10px] text-secondary-text mt-0.5">
          {doc.type} · {doc.size} · {doc.pages} pages
          {doc.words > 0 && ` · ${doc.words.toLocaleString()} words`}
          {doc.chunks > 0 && ` · ${doc.chunks} chunks`}
        </p>
      </div>

      {/* Course tag */}
      <div className="hidden md:block flex-shrink-0">
        <span className="text-[10px] text-secondary-text bg-white/[0.04] px-2 py-1 rounded-lg truncate max-w-[140px] block">
          {doc.course}
        </span>
      </div>

      {/* Status */}
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0 ${s.bg}`}>
        <Icon className={`text-[11px] ${s.color}`} />
        <span className={`text-[10px] font-medium ${s.color}`}>{s.label}</span>
      </div>

      {/* Uploaded */}
      <span className="text-[11px] text-[#444] flex-shrink-0 hidden lg:block">{doc.uploaded}</span>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888]">Delete?</span>
            <button className="text-[10px] text-[#F87171] hover:underline">Yes</button>
            <button onClick={() => setConfirmDelete(false)} className="text-[10px] text-secondary-text hover:underline">No</button>
          </div>
        ) : (
          <>
            <button className="text-secondary-text hover:text-white transition-colors">
              <RiEyeLine className="text-[15px]" />
            </button>
            <button className="text-secondary-text hover:text-white transition-colors">
              <RiRefreshLine className="text-[15px]" />
            </button>
            <button onClick={() => setConfirmDelete(true)} className="text-secondary-text hover:text-[#F87171] transition-colors">
              <RiDeleteBinLine className="text-[15px]" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function DocumentsPage() {
  const [search,     setSearch]     = useState("")
  const [statusFilter, setStatus]   = useState("all")
  const [courseFilter, setCourse]   = useState("all")
  const [showUpload, setShowUpload] = useState(false)

  const courses = [...new Set(allDocs.map((d) => d.course))]

  const filtered = allDocs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || d.status === statusFilter
    const matchCourse = courseFilter === "all" || d.course === courseFilter
    return matchSearch && matchStatus && matchCourse
  })

  const totalWords  = allDocs.filter(d => d.status === "complete").reduce((a, d) => a + d.words, 0)
  const totalChunks = allDocs.filter(d => d.status === "complete").reduce((a, d) => a + d.chunks, 0)

  return (
    <div >

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">Knowledge Base</p>
          <h1 className="text-[22px] font-bold text-white">Documents</h1>
          <p className="text-[13px] text-secondary-text mt-0.5">
            {allDocs.length} documents · {totalWords.toLocaleString()} words indexed
          </p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          <RiUploadCloud2Line className="text-[15px]" />
          Upload Documents
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Documents", value: allDocs.length,                                         color: "text-white"      },
          { label: "Complete",        value: allDocs.filter(d => d.status === "complete").length,    color: "text-[#4ADE80]"  },
          { label: "Processing",      value: allDocs.filter(d => d.status === "processing").length,  color: "text-brand"  },
          { label: "Errors",          value: allDocs.filter(d => d.status === "error").length,       color: "text-[#F87171]"  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card-dark rounded-xl px-4 py-3">
            <p className={`text-[18px] font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-secondary-text mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Upload area — collapsible */}
      {showUpload && (
        <div className="mb-6">
          <UploadArea />
          <ProcessingQueue />
        </div>
      )}

      {/* Filters + search */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px] h-9 px-3 bg-card-dark rounded-xl border border-white/[0.06] focus-within:border-brand/40 transition-colors">
          <RiSearchLine className="text-[#444] text-[14px] flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="flex-1 bg-transparent text-[12px] text-white placeholder:text-white/20 outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl">
          {["all", "complete", "processing", "error"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 text-[11px] font-medium rounded-lg capitalize transition-all ${
                statusFilter === s
                  ? "bg-[#2A2B2F] text-white"
                  : "text-secondary-text hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Course filter */}
        <select
          value={courseFilter}
          onChange={(e) => setCourse(e.target.value)}
          className="h-9 px-3 bg-card-dark text-[12px] text-white rounded-xl border border-white/[0.06] outline-none cursor-pointer"
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Documents table */}
      <div className="bg-card-dark rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-b border-white/[0.06]">
          <div className="w-9 flex-shrink-0" />
          <span className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#444]">Document</span>
          <span className="hidden md:block w-[140px] text-[10px] font-bold uppercase tracking-widest text-[#444]">Course</span>
          <span className="w-24 text-[10px] font-bold uppercase tracking-widest text-[#444]">Status</span>
          <span className="hidden lg:block w-16 text-[10px] font-bold uppercase tracking-widest text-[#444]">Uploaded</span>
          <div className="w-20 flex-shrink-0" />
        </div>

        {/* Rows */}
        <div className="px-4">
          {filtered.length > 0 ? (
            filtered.map((doc) => <DocRow key={doc.id} doc={doc} />)
          ) : (
            <div className="py-12 text-center">
              <p className="text-[13px] text-secondary-text">No documents match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom summary */}
      <div className="flex items-center justify-between mt-4 px-1">
        <p className="text-[11px] text-[#444]">
          Showing {filtered.length} of {allDocs.length} documents
        </p>
        <p className="text-[11px] text-[#444]">
          {totalChunks.toLocaleString()} chunks · {totalWords.toLocaleString()} words indexed
        </p>
      </div>

    </div>
  )
}