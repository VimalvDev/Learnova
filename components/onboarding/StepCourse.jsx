"use client"
import { useState } from "react"
import OnboardingCard from "./OnboardingCard"
import StepLabel from "./StepLabel"
import StepFooter from "./StepFooter"

export default function StepCourse({ formData, update, onNext, onBack }) {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFile = (file) => {
    if (!file) return
    update("uploadedFile", { name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + " MB", type: file.type })
    setUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) { clearInterval(interval); setUploading(false); return 100 }
        return p + 10
      })
    }, 150)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <OnboardingCard>

      <StepLabel text="Step 5 of 6 — First Course" />

      <h2 className="text-[22px] font-bold text-white">Create Your First Course</h2>
      <p className="text-[13px] text-[#888] mt-1 mb-6 leading-relaxed">
        Give your learning system something to work with. You can add more
        courses and documents any time.
      </p>

      {/* Course name */}
      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-[#888]">Course Name</label>
          <span className="text-[11px] text-[#444]">{formData.courseName.length} / 80</span>
        </div>
        <input
          type="text"
          maxLength={80}
          value={formData.courseName}
          onChange={(e) => update("courseName", e.target.value)}
          placeholder="e.g. Database Management Systems — Semester 4"
          className="w-full h-[48px] px-4 bg-[#141414] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#FA6E43] focus:ring-2 focus:ring-[#FA6E43]/20 transition-all"
        />
        {formData.primarySubject && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#444]">
            <span className="text-[#FA6E43]">◈</span>
            Pre-filled from your learning focus: {formData.primarySubject}
          </div>
        )}
      </div>

      {/* Unit name */}
      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-[12px] font-medium text-[#888]">First Unit</label>
        <input
          type="text"
          value={formData.unitName}
          onChange={(e) => update("unitName", e.target.value)}
          placeholder="e.g. Unit 1 — Introduction"
          className="w-full h-[48px] px-4 bg-[#141414] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#FA6E43] focus:ring-2 focus:ring-[#FA6E43]/20 transition-all"
        />
        <p className="text-[11px] text-[#444]">You can add more units after setup.</p>
      </div>

      {/* Upload area */}
      {!formData.uploadedFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input").click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-[#FA6E43] bg-[#FA6E43]/5"
              : "border-[#FA6E43]/20 bg-[#141414] hover:border-[#FA6E43]/40"
          }`}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.docx,.jpg,.png"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div className="w-12 h-12 rounded-full bg-[#FA6E43]/10 flex items-center justify-center mx-auto mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FA6E43" className="w-6 h-6" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-[14px] text-white font-medium">Drop your study material here</p>
          <p className="text-[12px] text-[#888] mt-1">or click to browse</p>
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            {["PDF", "DOCX", "JPG/PNG", "Handwritten notes"].map((f) => (
              <span key={f} className="text-[10px] text-[#444] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                {f}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#141414] border border-white/[0.08] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FA6E43]/10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#FA6E43" className="w-4 h-4" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-white font-medium truncate">{formData.uploadedFile.name}</p>
              <p className="text-[11px] text-[#555]">{formData.uploadedFile.size}</p>
            </div>
            {uploading ? (
              <span className="text-[11px] text-[#FA6E43]">{uploadProgress}%</span>
            ) : (
              <span className="text-[11px] text-[#4ADE80] font-medium">✓ Ready</span>
            )}
          </div>
          {uploading && (
            <div className="mt-3 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FA6E43] rounded-full transition-all duration-150"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          <button
            onClick={() => { update("uploadedFile", null); setUploadProgress(0) }}
            className="mt-2 text-[11px] text-[#444] hover:text-[#F87171] transition-colors"
          >
            Remove file
          </button>
        </div>
      )}

      <div className="text-center mt-3">
        <button
          onClick={() => update("uploadedFile", null)}
          className="text-[12px] text-[#555] hover:text-[#888] transition-colors"
        >
          Skip for now →
        </button>
      </div>

      <StepFooter
        onNext={onNext}
        onBack={onBack}
        nextLabel="Finish Setup →"
        disabled={!formData.courseName}
      />

    </OnboardingCard>
  )
}