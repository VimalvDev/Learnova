"use client"
import { useState, useRef } from "react"
import { RiUploadCloud2Line, RiFileTextLine } from "react-icons/ri"

const units = ["Unit 1 — Introduction to Databases", "Unit 2 — ER Model", "Unit 3 — Normalization"]

export default function UploadArea({ onFilesAdded }) {
  const [dragging, setDragging] = useState(false)
  const [unit,     setUnit]     = useState(units[0])
  const [unitOpen, setUnitOpen] = useState(false)
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFilesAdded?.(files)
  }

  return (
    <div className="bg-[#171717] rounded-2xl p-6">
      <div className="mb-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FA6E43]/80 block mb-1">
          Document Processing
        </span>
        <h2 className="text-[17px] font-semibold text-white/90">Upload Learning Materials</h2>
        <p className="text-[12px] text-[#666] mt-0.5">
          Learnova extracts, structures, and embeds your content into a searchable knowledge base.
        </p>
      </div>

      {/* Unit selector */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[12px] text-[#888] flex-shrink-0">Upload to:</span>
        <div className="relative flex-1 max-w-[280px]">
          <button
            onClick={() => setUnitOpen(!unitOpen)}
            className="w-full h-[36px] px-3 bg-[#111] rounded-xl text-[12px] text-white flex items-center justify-between"
          >
            <span className="truncate">{unit}</span>
            <span className="text-[#555] text-[10px] ml-2 flex-shrink-0">▾</span>
          </button>
          {unitOpen && (
            <div className="absolute top-10 left-0 w-full bg-[#1a1a1a] rounded-xl shadow-2xl z-20 overflow-hidden">
              {units.map((u) => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); setUnitOpen(false) }}
                  className={`w-full text-left px-3 py-2.5 text-[12px] hover:bg-white/[0.04] transition-colors ${
                    unit === u ? "text-[#FA6E43]" : "text-white"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="relative flex flex-col items-center justify-center min-h-[200px] rounded-2xl cursor-pointer transition-all duration-200"
        style={{
          background: dragging ? "rgba(250,110,67,0.05)" : "rgba(255,255,255,0.02)",
          border: dragging ? "2px solid #FA6E43" : "2px dashed rgba(250,110,67,0.2)",
          transform: dragging ? "scale(1.01)" : "scale(1)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.jpg,.jpeg,.png,.pptx"
          className="hidden"
          onChange={(e) => onFilesAdded?.(Array.from(e.target.files))}
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all"
          style={{ background: dragging ? "rgba(250,110,67,0.2)" : "rgba(250,110,67,0.1)" }}
        >
          <RiUploadCloud2Line
            className="text-[28px] transition-colors"
            style={{ color: dragging ? "#FA6E43" : "rgba(250,110,67,0.6)" }}
          />
        </div>

        <p className="text-[14px] font-medium text-white/80 mb-1">
          {dragging ? "Release to upload" : "Drop files here or click to browse"}
        </p>
        <p className="text-[12px] text-[#555]">
          PDF, DOCX, images, handwritten notes
        </p>

        <div className="flex items-center gap-2 mt-4">
          {["PDF", "DOCX", "JPG/PNG", "Handwritten", "PPTX"].map((f) => (
            <span
              key={f}
              className="text-[10px] text-[#555] bg-white/[0.04] px-2 py-1 rounded-lg"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}