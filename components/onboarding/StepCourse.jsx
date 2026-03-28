"use client";
import { useState, useRef } from "react";
import {
  RiUploadCloud2Line,
  RiFileTextLine,
  RiCloseLine,
} from "react-icons/ri";

export default function StepCourse({ formData, update }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (file) update("uploadedFile", file);
  };

  return (
    <div className="max-w-160">
      <div className="mb-8">
        <h2 className="text-[32px] lg:text-[38px] font-black text-white leading-tight mb-2">
          Set Up Your First Course.
        </h2>
        <p className="text-sm text-bleed leading-relaxed">
          Upload your study material and Learnova will extract, chunk, and embed
          it into your personal knowledge base.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Course name + unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-bleed block mb-2">
              Course Name
            </label>
            <input
              type="text"
              value={formData.courseName}
              onChange={(e) => update("courseName", e.target.value)}
              placeholder="e.g. DBMS — Semester 4"
              className="w-full h-12.5 px-4 bg-card-dark text-white text-xs placeholder:text-white/20 rounded-xl outline-none transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(250,110,67,0.4)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.06)")
              }
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-bleed block mb-2">
              Unit / Module Name
            </label>
            <input
              type="text"
              value={formData.unitName}
              onChange={(e) => update("unitName", e.target.value)}
              placeholder="e.g. Unit 1 — Intro"
              className="w-full h-12.5 px-4 bg-card-dark text-white text-xs placeholder:text-white/20 rounded-xl outline-none transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(250,110,67,0.4)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.06)")
              }
            />
          </div>
        </div>

        {/* Upload zone */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-bleed block mb-2">
            Upload Document
          </label>
          {formData.uploadedFile ? (
            <div
              className="flex items-center gap-4 px-5 py-4 rounded-2xl"
              style={{
                background: "rgba(250,110,67,0.06)",
                border: "1.5px solid rgba(250,110,67,0.3)",
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                <RiFileTextLine className="text-brand text-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white truncate">
                  {formData.uploadedFile.name}
                </p>
                <p className="text-xs text-bleed mt-0.5">
                  {(formData.uploadedFile.size / 1024 / 1024).toFixed(1)} MB ·
                  Ready to process
                </p>
              </div>
              <button
                onClick={() => update("uploadedFile", null)}
                className="text-secondary-text hover:text-red transition-colors shrink-0"
              >
                <RiCloseLine className="text-[18px]" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`flex flex-col items-center justify-center min-h-45 rounded-2xl cursor-pointer transition-all duration-200 ${
                dragging
                  ? "bg-brand/5 border-2 border-brand scale-[1.01]"
                  : "bg-card-dark border-2 border-dashed border-white/[0.08] scale-100"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.jpg,.jpeg,.png,.pptx"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                  dragging ? "bg-brand/20" : "bg-brand/10"
                }`}
              >
                <RiUploadCloud2Line
                  className={`text-[24px] transition-colors ${
                    dragging ? "text-brand" : "text-brand/50"
                  }`}
                />
              </div>
              <p className="text-[14px] font-semibold text-white/80 mb-1">
                {dragging
                  ? "Release to upload"
                  : "Drop file here or click to browse"}
              </p>
              <p className="text-[12px] text-secondary-text">
                PDF, DOCX, PNG, JPG, PPTX
              </p>
            </div>
          )}
        </div>

        {/* Skip note */}
        <div
          className="flex items-start gap-2.5 px-4 py-3.5 rounded-xl text-xs text-bleed"
          style={{
            background: "#212225",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-brand shrink-0 mt-0.5">◈</span>
          <span>
            You can skip document upload for now and add files later from the
            dashboard. The AI features activate once at least one document is
            processed.
          </span>
        </div>
      </div>
    </div>
  );
}
