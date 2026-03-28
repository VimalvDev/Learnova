"use client";
import { useState } from "react";

const commonSubjects = [
  "Computer Science",
  "Medicine",
  "Law",
  "Mathematics",
  "Engineering",
  "Business",
  "Physics",
  "Languages",
];

const levels = [
  "High School",
  "Undergraduate",
  "Postgraduate",
  "Professional",
  "Self-study",
];

export default function StepFocus({ formData, update }) {
  const [tagInput, setTagInput] = useState("");

  const addTag = (subject) => {
    if (!formData.additionalSubjects.includes(subject)) {
      update("additionalSubjects", [...formData.additionalSubjects, subject]);
    }
  };

  const removeTag = (subject) => {
    update(
      "additionalSubjects",
      formData.additionalSubjects.filter((s) => s !== subject),
    );
  };

  const handleTagKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
      setTagInput("");
    }
  };

  return (
    <div className="max-w-160">
      {/* Step heading */}
      <div className="mb-8">
        <h2 className="text-[32px] lg:text-[38px] font-black text-white leading-tight mb-2">
          What Are You Studying?
        </h2>
        <p className="text-sm text-bleed leading-relaxed">
          Learnova uses this to weight topic relationships and suggest relevant
          structure for your material.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Primary subject */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891] block mb-2">
            Primary Subject
          </label>
          <input
            type="text"
            value={formData.primarySubject}
            onChange={(e) => update("primarySubject", e.target.value)}
            placeholder="e.g. Database Management Systems"
            className="w-full h-12.5 px-4 bg-card-dark text-white text-sm placeholder:text-white/20 rounded-xl outline-none transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(250,110,67,0.4)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.06)")
            }
          />

          {/* Quick picks */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-[11px] text-[#444] self-center">Common:</span>
            {commonSubjects.map((s) => (
              <button
                key={s}
                onClick={() => update("primarySubject", s)}
                className={`px-3 py-1.5 text-[11px] rounded-lg transition-all border ${
                  formData.primarySubject === s
                    ? "bg-brand/10 text-brand border-brand/30"
                    : "bg-white/4 text-bleed border-white/6"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Additional subjects */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-bleed">
              Add More Subjects
            </label>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/6 text-secondary-text font-bold uppercase tracking-wider">
              Optional
            </span>
          </div>
          <div
            className="min-h-12.5 px-3 py-2.5 bg-card-dark rounded-xl flex flex-wrap gap-2 items-center transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {formData.additionalSubjects.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium bg-brand/10 text-brand"
              >
                {s}
                <button
                  onClick={() => removeTag(s)}
                  className="text-brand/60 hover:text-brand text-[14px] leading-none"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKey}
              placeholder={
                formData.additionalSubjects.length === 0 ? "Add subject..." : ""
              }
              className="flex-1 min-w-30 bg-transparent text-xs text-white placeholder:text-white/20 outline-none"
            />
          </div>
        </div>

        {/* Academic level + Goal */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891] block mb-2">
              Academic Level
            </label>
            <select
              value={formData.academicLevel}
              onChange={(e) => update("academicLevel", e.target.value)}
              className="w-full h-12.5 px-4 bg-card-dark text-white text-xs rounded-xl outline-none appearance-none cursor-pointer transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <option value="" disabled>
                Select level
              </option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891] block mb-2">
              Studying For
            </label>
            <input
              type="text"
              value={formData.studyingFor}
              onChange={(e) => update("studyingFor", e.target.value)}
              placeholder="e.g. Final Exam, GRE"
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
      </div>
    </div>
  );
}
