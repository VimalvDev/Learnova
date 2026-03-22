"use client"
import { useState } from "react"
import {
  RiArrowDownSLine, RiArrowRightSLine,
  RiFileTextLine, RiAddLine,
  RiLockLine, RiGlobalLine,
} from "react-icons/ri"

const courses = ["DBMS — Semester 4", "Operating Systems", "Data Structures"]

const units = [
  {
    id: 1, name: "Introduction to Databases",
    docs: [
      { name: "DBMS_Complete_Notes.pdf", pages: 42, words: 8400 },
      { name: "Unit1_Slides.pdf",        pages: 18, words: 2100 },
    ],
  },
  {
    id: 2, name: "ER Model",
    docs: [{ name: "ER_Diagrams_Notes.docx", pages: 12, words: 3100 }],
  },
  {
    id: 3, name: "Normalization",
    docs: [{ name: "Normalization_Notes.pdf", pages: 22, words: 4200 }],
  },
]

const chunks = [
  {
    rank: 1, file: "DBMS_Notes.pdf", location: "Ch.4 · P.67",
    excerpt: "...2NF requires every non-prime attribute to be fully dependent on the primary key...",
    similarity: 0.91,
  },
  {
    rank: 2, file: "Unit2_Slides.pdf", location: "Slide 14",
    excerpt: "...A relation R is in 2NF if no non-prime attribute is partially dependent...",
    similarity: 0.84,
  },
  {
    rank: 3, file: "DBMS_Notes.pdf", location: "Ch.3 · P.52",
    excerpt: "...Partial dependency occurs when a non-key attribute depends on part of a composite key...",
    similarity: 0.71,
  },
]

const sourceDocs = [
  { name: "DBMS_Complete_Notes.pdf", chunks: 84,  active: true  },
  { name: "Unit2_Slides.pdf",        chunks: 28,  active: true  },
  { name: "OS_Lecture_Notes.pdf",    chunks: 62,  active: false },
]

export default function RightPanel({ mode = "private", onModeChange }) {
  const isPrivate = mode === "private"

  const [course,       setCourse]      = useState(courses[0])
  const [courseOpen,   setCourseOpen]  = useState(false)
  const [expandedUnit, setExpanded]    = useState(null)
  const [activeUnits,  setActiveUnits] = useState([1, 2, 3])
  const [threshold,    setThreshold]   = useState(75)
  const [scopeOpen,    setScopeOpen]   = useState(true)
  const [sourcesOpen,  setSourcesOpen] = useState(true)

  const toggleUnit = (id) =>
    setActiveUnits((p) => p.includes(id) ? p.filter((u) => u !== id) : [...p, id])

  return (
    <div className="flex flex-col h-full  divide-y divide-white/[0.06]">

      {/* ── COURSE ── */}
      <div className="p-3">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70 mb-2">
          Course
        </p>
        <div className="relative">
          <button
            onClick={() => setCourseOpen(!courseOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-[#212225] rounded-xl hover:bg-[#2A2B2F] transition-colors"
          >
            <RiFileTextLine className="text-[#FA6E43] text-[12px] flex-shrink-0" />
            <span className="text-[11px] font-medium text-white flex-1 text-left truncate">{course}</span>
            <RiArrowDownSLine className="text-[#444] text-[13px] flex-shrink-0" />
          </button>
          {courseOpen && (
            <div className="absolute top-10 left-0 w-full bg-[#212225] rounded-xl shadow-2xl z-30 overflow-hidden border border-white/[0.06]">
              {courses.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCourse(c); setCourseOpen(false) }}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between hover:bg-white/[0.04] transition-colors ${
                    course === c ? "text-[#FA6E43]" : "text-white"
                  }`}
                >
                  {c}
                  {course === c && <span className="text-[9px] text-[#FA6E43]">✓</span>}
                </button>
              ))}
              <div className="border-t border-white/[0.06]">
                <button className="w-full text-left px-3 py-2 text-[11px] text-[#FA6E43] flex items-center gap-2 hover:bg-white/[0.04] transition-colors">
                  <RiAddLine className="text-[12px]" /> New Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODE ── */}
      <div className="p-3">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70 mb-2">
          Mode
        </p>
        <div className="flex gap-1.5">
          {[
            { id: "private", icon: RiLockLine,   label: "Private", color: "text-[#FA6E43]", activeBg: "bg-[#FA6E43]/10 border-[#FA6E43]/20" },
            { id: "public",  icon: RiGlobalLine, label: "Public",  color: "text-[#4ADE80]", activeBg: "bg-[#4ADE80]/10 border-[#4ADE80]/20" },
          ].map(({ id, icon: Icon, label, color, activeBg }) => {
            const active = mode === id
            return (
              <button
                key={id}
                onClick={() => onModeChange?.(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border transition-all text-[11px] font-medium ${
                  active
                    ? `${activeBg} ${color}`
                    : "bg-transparent border-white/[0.06] text-[#444] hover:text-white hover:border-white/[0.1]"
                }`}
              >
                <Icon className="text-[12px]" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── SCOPE (private only) ── */}
      {isPrivate && (
        <div className="p-3">
          <button
            onClick={() => setScopeOpen(!scopeOpen)}
            className="w-full flex items-center justify-between mb-2"
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70">
              Scope
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveUnits(activeUnits.length ? [] : units.map(u => u.id))
                }}
                className="text-[9px] text-[#FA6E43] hover:underline"
              >
                {activeUnits.length ? "Deselect All" : "Select All"}
              </button>
              <RiArrowDownSLine
                className="text-[#444] text-[12px] transition-transform duration-200"
                style={{ transform: scopeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </div>
          </button>
          {scopeOpen && (
            <div className="flex flex-col gap-1">
              {units.map((unit) => (
                <div key={unit.id} className="bg-[#212225] rounded-xl overflow-hidden">
                  <div
                    className="flex items-center gap-2 px-2.5 py-2 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    onClick={() => setExpanded(expandedUnit === unit.id ? null : unit.id)}
                  >
                    <RiArrowRightSLine
                      className="text-[#444] text-[12px] flex-shrink-0 transition-transform duration-200"
                      style={{ transform: expandedUnit === unit.id ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-white truncate">{unit.name}</p>
                      <p className="text-[9px] text-[#444]">{unit.docs.length} docs</p>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleUnit(unit.id) }}
                      className="w-7 h-3.5 rounded-full flex-shrink-0 cursor-pointer relative transition-all"
                      style={{ background: activeUnits.includes(unit.id) ? "#FA6E43" : "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full shadow transition-all duration-200"
                        style={{ left: activeUnits.includes(unit.id) ? "14px" : "2px" }}
                      />
                    </div>
                  </div>
                  {expandedUnit === unit.id && (
                    <div className="px-3 pb-2.5 pl-7 flex flex-col gap-1 border-t border-white/[0.04] pt-2">
                      {unit.docs.map((doc) => (
                        <div key={doc.name} className="flex items-start gap-1.5">
                          <RiFileTextLine className="text-[#FA6E43]/40 text-[10px] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] text-[#888] leading-tight">{doc.name}</p>
                            <p className="text-[9px] text-[#444]">{doc.pages}p · {doc.words.toLocaleString()} words</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── CONFIDENCE THRESHOLD (private only) ── */}
      {isPrivate && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70">
              Confidence Threshold
            </p>
            <span className="text-[11px] font-semibold text-white">{threshold}%</span>
          </div>
          <input
            type="range" min={60} max={90} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer accent-[#FA6E43]"
          />
          <div className="flex items-center justify-between mt-1">
            {["Strict", "Balanced", "Loose"].map((m) => (
              <span key={m} className="text-[9px] text-[#444]">{m}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── RETRIEVED SOURCES (private only) ── */}
      {isPrivate && (
        <div className="p-3">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="w-full flex items-center justify-between mb-2"
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70">
              Retrieved Sources
            </p>
            <RiArrowDownSLine
              className="text-[#444] text-[12px] transition-transform duration-200"
              style={{ transform: sourcesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
          {sourcesOpen && (
            <div className="flex flex-col gap-1.5">
              {chunks.map((chunk) => {
                const color = chunk.similarity >= 0.85 ? "#FA6E43" : "#FBBF24"
                return (
                  <div
                    key={chunk.rank}
                    className="bg-[#212225] rounded-xl p-2.5 cursor-pointer hover:bg-[#2A2B2F] transition-all"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-[#FA6E43]/10 text-[#FA6E43]">
                        #{chunk.rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-white truncate">{chunk.file}</p>
                        <p className="text-[9px] text-[#444]">{chunk.location}</p>
                      </div>
                      <span className="text-[10px] font-semibold flex-shrink-0" style={{ color }}>
                        {chunk.similarity}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#555] leading-relaxed italic line-clamp-2">
                      {chunk.excerpt}
                    </p>
                    <div className="mt-1.5 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${chunk.similarity * 100}%`, background: color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── ACTIVE SOURCES (private only) ── */}
      {isPrivate && (
        <div className="p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70 mb-2">
            Active Sources
          </p>
          <div className="bg-[#212225] rounded-xl overflow-hidden">
            {sourceDocs.map(({ name, chunks: c, active }) => (
              <div key={name} className="flex items-center gap-2 px-2.5 py-2 border-b border-white/[0.04] last:border-0">
                <RiFileTextLine className="text-[#FA6E43]/40 text-[11px] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-white truncate">{name}</p>
                  <p className="text-[9px] text-[#444]">{c} chunks</p>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? "bg-[#4ADE80]" : "bg-[#333]"}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SESSION STATS (private only) ── */}
      {isPrivate && (
        <div className="p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA6E43]/70 mb-2">
            This Session
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "Asked",     value: "4"   },
              { label: "Avg conf.", value: "86%" },
              { label: "Sources",   value: "11"  },
              { label: "Low conf.", value: "1"   },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#212225] rounded-xl px-2.5 py-2">
                <p className="text-[13px] font-semibold text-white">{value}</p>
                <p className="text-[9px] text-[#444] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PUBLIC MODE INFO ── */}
      {!isPrivate && (
        <div className="p-3">
          <div className="bg-[#212225] rounded-xl p-3">
            <p className="text-[11px] font-semibold text-[#4ADE80] mb-1.5">Public Mode Active</p>
            <p className="text-[10px] text-[#555] leading-relaxed">
              Answers from general AI knowledge. Document retrieval and confidence scoring are disabled.
            </p>
            <button
              onClick={() => onModeChange?.("private")}
              className="mt-2.5 w-full py-1.5 text-[11px] font-semibold text-white bg-[#FA6E43] rounded-lg hover:brightness-110 transition-all"
            >
              Switch to Private Mode
            </button>
          </div>
        </div>
      )}

    </div>
  )
}