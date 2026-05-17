"use client"
import { useState, useRef } from "react"
import {
  RiUploadCloud2Line, RiFileTextLine, RiCheckLine,
  RiEditLine, RiDeleteBinLine, RiArrowRightLine,
  RiClipboardLine,
} from "react-icons/ri"

const ACCEPTED = ".pdf,.docx,.txt"

export default function UploadArea({ courseId, onUploadComplete }) {
  const [tab,       setTab]       = useState("file")
  const [dragging,  setDragging]  = useState(false)
  const [stage,     setStage]     = useState("idle")
  const [error,     setError]     = useState(null)
  const [fileInfo,  setFileInfo]  = useState(null)
  const [units,     setUnits]     = useState([])
  const [pasteText, setPasteText] = useState("")
  const [pasteName, setPasteName] = useState("")
  const inputRef = useRef()

  async function handleFile(file) {
    if (!courseId) { setError("Save course information first before uploading."); return }
    setError(null)
    setStage("extracting")
    setFileInfo(null)
    setUnits([])

    const formData = new FormData()
    formData.append("file",      file)
    formData.append("course_id", courseId)

    try {
      const res  = await fetch("/api/documents/process", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setStage("idle"); return }
      setFileInfo({
        file_name:  data.file_name,
        file_type:  data.file_type,
        word_count: data.word_count,
        page_count: data.page_count ?? 0,
      })
      setUnits(data.units)
      setStage("preview")
    } catch {
      setError("Upload failed. Please try again.")
      setStage("idle")
    }
  }

  async function handlePasteSubmit() {
    if (!courseId)         { setError("Save course information first."); return }
    if (!pasteText.trim()) { setError("Please paste some text first."); return }
    setError(null)
    setStage("extracting")
    setFileInfo(null)
    setUnits([])

    try {
      const res  = await fetch("/api/documents/process-text", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text:      pasteText,
          name:      pasteName.trim() || "Pasted Notes",
          course_id: courseId,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setStage("idle"); return }
      setFileInfo({
        file_name:  data.file_name,
        file_type:  data.file_type,
        word_count: data.word_count,
        page_count: 0,
      })
      setUnits(data.units)
      setStage("preview")
    } catch {
      setError("Processing failed. Please try again.")
      setStage("idle")
    }
  }

  async function handleConfirm() {
    setStage("saving")
    setError(null)
    try {
      const res  = await fetch("/api/documents/confirm", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id:  courseId,
          file_name:  fileInfo.file_name,
          file_type:  fileInfo.file_type,
          word_count: fileInfo.word_count,
          page_count: fileInfo.page_count,
          units,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setStage("preview"); return }
      setStage("done")
      onUploadComplete?.()
    } catch {
      setError("Save failed. Please try again.")
      setStage("preview")
    }
  }

  function handleUnitNameChange(index, newName) {
    setUnits((prev) => prev.map((u, i) => i === index ? { ...u, unit_name: newName } : u))
  }
  function handleUnitDelete(index) {
    setUnits((prev) => prev.filter((_, i) => i !== index))
  }

  function reset() {
    setStage("idle")
    setError(null)
    setFileInfo(null)
    setUnits([])
    setPasteText("")
    setPasteName("")
  }

  return (
    <div className="bg-[#171717] rounded-2xl p-6">
      <div className="mb-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand/80 block mb-1">
          Document Processing
        </span>
        <h2 className="text-[17px] font-semibold text-white/90">Upload Learning Materials</h2>
        <p className="text-[12px] text-[#666] mt-0.5">
          Learnova extracts, structures, and organizes your content automatically.
        </p>
      </div>

      {stage === "idle" && (
        <>
          <div className="flex items-center gap-1 p-1 bg-[#111] rounded-xl w-fit mb-4">
            {[
              { key: "file", label: "Upload File" },
              { key: "text", label: "Paste Text"  },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setError(null) }}
                className={`px-4 py-1.5 text-[12px] font-medium rounded-lg transition-all ${
                  tab === key ? "bg-[#2a2a2a] text-white" : "text-secondary-text hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "file" && (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
              className="relative flex flex-col items-center justify-center min-h-[200px] rounded-2xl cursor-pointer transition-all duration-200"
              style={{
                background: dragging ? "rgba(250,110,67,0.05)" : "rgba(255,255,255,0.02)",
                border:     dragging ? "2px solid #FA6E43"     : "2px dashed rgba(250,110,67,0.2)",
                transform:  dragging ? "scale(1.01)"           : "scale(1)",
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED}
                className="hidden"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
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
                {dragging ? "Release to upload" : "Drop file here or click to browse"}
              </p>
              <p className="text-[12px] text-secondary-text">PDF, DOCX, TXT — one file at a time</p>
              <div className="flex items-center gap-2 mt-4">
                {["PDF", "DOCX", "TXT"].map((f) => (
                  <span key={f} className="text-[10px] text-secondary-text bg-white/[0.04] px-2 py-1 rounded-lg">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tab === "text" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#888] block mb-1.5">Document Title</label>
                <input
                  value={pasteName}
                  onChange={(e) => setPasteName(e.target.value)}
                  placeholder="e.g. DBMS Unit 2 Notes"
                  className="w-full h-[42px] px-3.5 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-brand/40 transition-all"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-[#888]">Paste Your Notes</label>
                  <span className="text-[10px] text-[#444]">
                    {pasteText.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Paste your notes, syllabus, or any study material here..."
                  rows={10}
                  className="w-full px-3.5 py-3 bg-[#111] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-brand/40 transition-all resize-y min-h-[200px]"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-[#444] flex items-center gap-1.5">
                  <RiClipboardLine className="text-brand text-[13px]" />
                  Learnova will detect units from your text automatically.
                </p>
                <button
                  onClick={handlePasteSubmit}
                  disabled={!pasteText.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Process Text <RiArrowRightLine className="text-[13px]" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {stage === "extracting" && (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
          <p className="text-[13px] text-secondary-text">Extracting text and detecting units...</p>
        </div>
      )}

      {stage === "preview" && (
        <div>
          <div className="flex items-center gap-3 p-3 bg-[#111] rounded-xl mb-4">
            <RiFileTextLine className="text-brand text-[18px] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">{fileInfo?.file_name}</p>
              <p className="text-[11px] text-secondary-text">
                {fileInfo?.word_count?.toLocaleString()} words
                {fileInfo?.page_count > 0 && ` · ${fileInfo.page_count} pages`}
                {` · ${units.length} unit${units.length !== 1 ? "s" : ""} detected`}
              </p>
            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-widest text-brand/70 mb-3">
            Detected Units — Review & Edit
          </p>
          <div className="flex flex-col gap-2">
            {units.map((unit, i) => (
              <UnitPreviewRow
                key={i}
                index={i}
                unit={unit}
                onNameChange={(name) => handleUnitNameChange(i, name)}
                onDelete={() => handleUnitDelete(i)}
              />
            ))}
          </div>
    

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/[0.04]">
            <button onClick={reset} className="text-[12px] text-[#666] hover:text-white transition-colors">
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={units.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all disabled:opacity-50"
            >
              Confirm & Save <RiArrowRightLine className="text-[13px]" />
            </button>
          </div>
        </div>
      )}

      {stage === "saving" && (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
          <p className="text-[13px] text-secondary-text">Saving to your knowledge base...</p>
        </div>
      )}

      {stage === "done" && (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <div className="w-12 h-12 rounded-full bg-[#4ADE80]/10 flex items-center justify-center">
            <RiCheckLine className="text-[#4ADE80] text-[22px]" />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-medium text-white mb-1">Successfully saved</p>
            <p className="text-[12px] text-secondary-text">
              {units.length} unit{units.length !== 1 ? "s" : ""} added to your course
            </p>
          </div>
          <button onClick={reset} className="text-[12px] text-brand hover:underline">
            Upload another file
          </button>
        </div>
      )}

      {error && <p className="text-[12px] text-[#F87171] mt-3">{error}</p>}
    </div>
  )
}

function UnitPreviewRow({ index, unit, onNameChange, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [name,    setName]    = useState(unit.unit_name)
  const wordCount = unit.content?.split(/\s+/).filter(Boolean).length ?? 0

  function handleBlur() {
    setEditing(false)
    if (name.trim()) onNameChange(name.trim())
    else setName(unit.unit_name)
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#111] rounded-xl group">
      <span className="text-[10px] font-bold text-brand shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            className="w-full bg-transparent text-[13px] font-medium text-white outline-none border-b border-brand/40"
          />
        ) : (
          <p className="text-[13px] font-medium text-white truncate">{unit.unit_name}</p>
        )}
        <p className="text-[11px] text-secondary-text mt-0.5">{wordCount.toLocaleString()} words</p>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setEditing(true)} className="text-secondary-text hover:text-white transition-colors">
          <RiEditLine className="text-[14px]" />
        </button>
        <button onClick={onDelete} className="text-secondary-text hover:text-[#F87171] transition-colors">
          <RiDeleteBinLine className="text-[14px]" />
        </button>
      </div>
    </div>
  )
}