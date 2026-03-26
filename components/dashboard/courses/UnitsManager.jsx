"use client"
import { useState } from "react"
import {
  RiDraggable, RiAddLine, RiArrowDownSLine,
  RiEditLine, RiFileCopyLine, RiDeleteBinLine,
  RiFileTextLine, RiEyeLine, RiRefreshLine,
  RiUploadLine,
} from "react-icons/ri"

const initialUnits = [
  {
    id: 1,
    name: "Introduction to Databases",
    files: [
      { id: 1, name: "DBMS_Complete_Notes.pdf",  type: "PDF",  size: "3.2 MB", pages: 42, words: 8400, status: "complete",    progress: 100, chunks: 84  },
      { id: 2, name: "Intro_Slides.pdf",          type: "PDF",  size: "1.1 MB", pages: 18, words: 2200, status: "processing",  progress: 68,  chunks: 34  },
    ],
    expanded: true,
  },
  {
    id: 2,
    name: "ER Model",
    files: [
      { id: 3, name: "ER_Diagrams_Notes.docx",   type: "DOCX", size: "0.8 MB", pages: 12, words: 3100, status: "complete",    progress: 100, chunks: 31  },
    ],
    expanded: false,
  },
  {
    id: 3,
    name: "Normalization",
    files: [],
    expanded: false,
  },
]

const statusConfig = {
  complete:    { color: "#4ADE80", label: "Complete"     },
  processing:  { color: "#FA6E43", label: "Processing"   },
  error:       { color: "#F87171", label: "Error"        },
  queued:      { color: "#888",    label: "Queued"       },
}

const typeColors = {
  PDF:  "rgba(248,113,113,0.15)",
  DOCX: "rgba(250,110,67,0.15)",
  IMG:  "rgba(74,222,128,0.15)",
}

function FileRow({ file }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const status = statusConfig[file.status]

  return (
    <div className={`py-3 border-b border-white/[0.04] last:border-0 ${
      file.status === "complete" ? "opacity-100" : "opacity-90"
    }`}>
      <div className="flex items-start gap-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: typeColors[file.type] ?? "rgba(255,255,255,0.05)" }}
        >
          <RiFileTextLine className="text-[13px] text-white/70" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-white">{file.name}</p>
          <p className="text-[10px] text-secondary-text mt-0.5">
            {file.type} · {file.size} · {file.pages} pages · {file.words.toLocaleString()} words
          </p>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px]" style={{ color: status.color }}>{status.label}</span>
              <span className="text-[10px] text-[#444]">{file.progress}%</span>
            </div>
            <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${file.progress}%`, background: status.color }}
              />
            </div>
            {file.status === "complete" && (
              <p className="text-[10px] text-secondary-text mt-1">
                Chunks: {file.chunks} · Embeddings: ✓
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#888]">Delete?</span>
              <button className="text-[10px] text-[#F87171] hover:underline">Yes</button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-[10px] text-[#888] hover:underline"
              >
                No
              </button>
            </div>
          ) : (
            <>
              <button className="text-secondary-text hover:text-white transition-colors">
                <RiEyeLine className="text-[14px]" />
              </button>
              <button className="text-secondary-text hover:text-white transition-colors">
                <RiRefreshLine className="text-[14px]" />
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-secondary-text hover:text-[#F87171] transition-colors"
              >
                <RiDeleteBinLine className="text-[14px]" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function UnitsManager() {
  const [units, setUnits] = useState(initialUnits)

  const toggleUnit = (id) =>
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, expanded: !u.expanded } : u))
    )

  const addUnit = () =>
    setUnits((prev) => [
      ...prev,
      { id: Date.now(), name: `Unit ${prev.length + 1}`, files: [], expanded: true },
    ])

  return (
    <div className="bg-[#171717] rounded-2xl p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand/80 block mb-1">
            Course Structure
          </span>
          <h2 className="text-[17px] font-semibold text-white/90">Units & Modules</h2>
          <p className="text-[12px] text-[#666] mt-0.5">
            Organize your material into logical units.
          </p>
        </div>
        <button
          onClick={addUnit}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#111] text-white text-[12px] font-medium rounded-xl hover:bg-[#1a1a1a] transition-all"
        >
          <RiAddLine className="text-brand text-[15px]" />
          Add Unit
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {units.map((unit) => (
          <div key={unit.id} className="bg-[#111] rounded-2xl overflow-hidden">

            {/* Unit header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/[0.02] transition-colors group"
              onClick={() => toggleUnit(unit.id)}
            >
              <RiDraggable className="text-tertiary-text text-[16px] flex-shrink-0 cursor-grab" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-brand">
                    Unit {units.indexOf(unit) + 1}
                  </span>
                  <span className="text-tertiary-text text-[10px]">·</span>
                  <span className="text-[13px] font-medium text-white">{unit.name}</span>
                </div>
                <p className="text-[11px] text-secondary-text mt-0.5">
                  {unit.files.length} {unit.files.length === 1 ? "file" : "files"}
                  {unit.files.filter((f) => f.status === "processing").length > 0 && (
                    <span className="text-brand ml-1.5">
                      · {unit.files.filter((f) => f.status === "processing").length} processing
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] text-[#666] hover:text-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] text-[#666] hover:text-white transition-colors"
                >
                  Duplicate
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-secondary-text hover:text-[#F87171] transition-colors"
                >
                  <RiDeleteBinLine className="text-[15px]" />
                </button>
              </div>
              <RiArrowDownSLine
                className="text-[#444] text-[18px] flex-shrink-0 transition-transform duration-200"
                style={{ transform: unit.expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </div>

            {/* Expanded content */}
            {unit.expanded && (
              <div className="px-4 pb-4 pt-1 border-t border-white/[0.04] ml-7">
                {unit.files.length > 0 ? (
                  unit.files.map((file) => <FileRow key={file.id} file={file} />)
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-[12px] text-secondary-text mb-2">
                      No documents in this unit yet.
                    </p>
                    <button className="text-[12px] text-brand hover:underline">
                      + Upload to this unit
                    </button>
                  </div>
                )}
                <button className="mt-3 w-full py-2.5 border border-dashed border-brand/20 rounded-xl text-[12px] text-brand/70 hover:border-brand/40 hover:text-brand transition-all flex items-center justify-center gap-2">
                  <RiUploadLine className="text-[14px]" />
                  Upload to Unit {units.indexOf(unit) + 1}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#444] mt-4 flex items-center gap-1.5">
        <RiDraggable className="text-[13px]" />
        Drag to reorder units
      </p>
    </div>
  )
}