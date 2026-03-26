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

export default function LeftPanel({ mode = "private", onModeChange }) {
  const [course,      setCourse]     = useState(courses[0])
  const [courseOpen,  setCourseOpen] = useState(false)
  const [expandedUnit, setExpanded]  = useState(1)
  const [activeUnits, setActive]     = useState([1, 2, 3])
  const [threshold,   setThreshold]  = useState(75)

  const toggleUnit = (id) =>
    setActive((p) => p.includes(id) ? p.filter((u) => u !== id) : [...p, id])

  return (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* ── COURSE ── */}
      <div className="p-4 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-2">
          Active Course
        </p>
        <div className="relative">
          <button
            onClick={() => setCourseOpen(!courseOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-[#212225] rounded-xl hover:bg-[#2A2B2F] transition-colors"
          >
            <RiFileTextLine className="text-brand text-[13px] flex-shrink-0" />
            <span className="text-[12px] font-medium text-white flex-1 text-left truncate">{course}</span>
            <RiArrowDownSLine className="text-[#444] text-[14px] flex-shrink-0" />
          </button>
          {courseOpen && (
            <div className="absolute top-10 left-0 w-full bg-[#212225] rounded-xl shadow-2xl z-30 overflow-hidden border border-white/[0.06]">
              {courses.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCourse(c); setCourseOpen(false) }}
                  className={`w-full text-left px-3 py-2.5 text-[12px] flex items-center justify-between hover:bg-white/[0.04] transition-colors ${
                    course === c ? "text-brand" : "text-white"
                  }`}
                >
                  {c}
                  {course === c && <span className="text-[10px] text-brand">✓</span>}
                </button>
              ))}
              <div className="border-t border-white/[0.06]">
                <button className="w-full text-left px-3 py-2.5 text-[12px] text-brand flex items-center gap-2 hover:bg-white/[0.04] transition-colors">
                  <RiAddLine className="text-[13px]" /> New Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODE TOGGLE ── */}
      <div className="p-4 border-b border-white/[0.06]">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-2">
          Mode
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { id: "private", icon: RiLockLine,  label: "Private",  desc: "From your notes only" },
            { id: "public",  icon: RiGlobalLine, label: "Public",   desc: "General AI knowledge" },
          ].map(({ id, icon: Icon, label, desc }) => {
            const active = mode === id
            const color  = id === "private" ? "#FA6E43" : "#4ADE80"
            return (
              <button
                key={id}
                onClick={() => onModeChange?.(id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                style={{
                  background: active ? `${color}10` : "transparent",
                  border: `1px solid ${active ? `${color}25` : "rgba(255,255,255,0.04)"}`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: active ? `${color}18` : "rgba(255,255,255,0.04)" }}
                >
                  <Icon className="text-[13px]" style={{ color: active ? color : "#555" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold" style={{ color: active ? "#fff" : "#555" }}>{label}</p>
                  <p className="text-[10px]" style={{ color: active ? "#888" : "#333" }}>{desc}</p>
                </div>
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── SCOPE (private only) ── */}
      {mode === "private" && (
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">
              Scope
            </p>
            <button
              onClick={() => setActive(activeUnits.length ? [] : units.map(u => u.id))}
              className="text-[10px] text-brand hover:underline"
            >
              {activeUnits.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {units.map((unit) => (
              <div key={unit.id} className="bg-[#212225] rounded-xl overflow-hidden">
                <div
                  className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(expandedUnit === unit.id ? null : unit.id)}
                >
                  <RiArrowRightSLine
                    className="text-[#444] text-[13px] flex-shrink-0 transition-transform duration-200"
                    style={{ transform: expandedUnit === unit.id ? "rotate(90deg)" : "rotate(0deg)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white truncate">{unit.name}</p>
                    <p className="text-[10px] text-[#444]">{unit.docs.length} docs</p>
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
                  <div className="px-3 pb-3 pl-8 flex flex-col gap-1 border-t border-white/[0.04] pt-2">
                    {unit.docs.map((doc) => (
                      <div key={doc.name} className="flex items-start gap-2">
                        <RiFileTextLine className="text-brand/40 text-[11px] flex-shrink-0 mt-0.5" />
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
        </div>
      )}

      {/* ── CONFIDENCE THRESHOLD (private only) ── */}
      {mode === "private" && (
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">
              Confidence Threshold
            </p>
            <span className="text-[11px] font-semibold text-white">{threshold}%</span>
          </div>
          <input
            type="range" min={60} max={90} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#FA6E43" }}
          />
          <div className="flex items-center justify-between mt-1.5">
            {["Strict", "Balanced", "Loose"].map((m) => (
              <span key={m} className="text-[9px] text-[#444]">{m}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── SESSION STATS (private only) ── */}
      {mode === "private" && (
        <div className="p-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-2">
            This Session
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "Asked",      value: "4"   },
              { label: "Avg conf.",  value: "86%" },
              { label: "Sources",    value: "11"  },
              { label: "Low conf.",  value: "1"   },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#212225] rounded-xl px-3 py-2">
                <p className="text-[13px] font-semibold text-white">{value}</p>
                <p className="text-[9px] text-[#444] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PUBLIC MODE INFO ── */}
      {mode === "public" && (
        <div className="p-4">
          <div className="bg-[#212225] rounded-xl p-3.5">
            <p className="text-[11px] font-semibold text-[#4ADE80] mb-1.5">Public Mode Active</p>
            <p className="text-[10px] text-secondary-text leading-relaxed">
              Questions use general AI knowledge. Document scope and confidence scoring are disabled.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}