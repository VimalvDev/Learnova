"use client"
import { useState } from "react"
import OnboardingCard from "./OnboardingCard"
import StepLabel from "./StepLabel"
import StepFooter from "./StepFooter"

const subjects = ["Computer Science", "Medicine", "Law", "Mathematics", "Engineering", "Business", "Physics", "Languages"]
const levels   = ["High School", "Undergraduate", "Postgraduate", "Self-Learner", "Professional"]

export default function StepFocus({ formData, update, onNext, onBack }) {
  const [tagInput, setTagInput] = useState("")

  const addTag = (val) => {
    const v = val.trim()
    if (!v || formData.additionalSubjects.includes(v)) return
    update("additionalSubjects", [...formData.additionalSubjects, v])
    setTagInput("")
  }

  const removeTag = (tag) =>
    update("additionalSubjects", formData.additionalSubjects.filter((t) => t !== tag))

  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(tagInput)
    }
    if (e.key === "Backspace" && !tagInput && formData.additionalSubjects.length) {
      removeTag(formData.additionalSubjects[formData.additionalSubjects.length - 1])
    }
  }

  return (
    <OnboardingCard>

      <StepLabel text="Step 1 of 6 — Learning Focus" />

      <h2 className="text-[22px] font-bold text-white">What Are You Studying?</h2>
      <p className="text-[13px] text-[#888] mt-1 mb-6 leading-relaxed">
        Learnova uses this to weight topic relationships and suggest relevant
        structure for your material.
      </p>

      {/* Primary subject */}
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-[12px] font-medium text-[#888]">Primary Subject</label>
        <input
          type="text"
          value={formData.primarySubject}
          onChange={(e) => update("primarySubject", e.target.value)}
          placeholder="e.g. Database Management Systems"
          className="w-full h-[48px] px-4 bg-[#141414] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#FA6E43] focus:ring-2 focus:ring-[#FA6E43]/20 transition-all"
        />

        {/* Quick select pills */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-[11px] text-[#444]">Common subjects:</span>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => update("primarySubject", s)}
                className={`px-3 py-1.5 rounded-lg text-[12px] border transition-all duration-150 ${
                  formData.primarySubject === s
                    ? "bg-[#FA6E43]/10 border-[#FA6E43]/40 text-white"
                    : "bg-[#2A2B2F] border-white/[0.06] text-[#888] hover:border-white/20 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional subjects tag input */}
      <div className="flex flex-col gap-1.5 mb-5">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-[#888]">Add more subjects</label>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#444] bg-white/[0.04] px-2 py-0.5 rounded-full">
            Optional
          </span>
        </div>
        <div
          className="min-h-[48px] px-3 py-2 bg-[#141414] border border-white/[0.08] rounded-xl flex flex-wrap gap-2 items-center cursor-text focus-within:border-[#FA6E43] transition-all"
          onClick={() => document.getElementById("tag-input").focus()}
        >
          {formData.additionalSubjects.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#2A2B2F] border border-[#FA6E43]/25 rounded-lg text-[12px] text-white"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-[#444] hover:text-[#F87171] transition-colors text-[10px]"
              >
                ×
              </button>
            </span>
          ))}
          <input
            id="tag-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            onBlur={() => addTag(tagInput)}
            placeholder={formData.additionalSubjects.length ? "" : "Add subject..."}
            className="flex-1 min-w-[120px] bg-transparent text-[12px] text-white placeholder:text-white/20 outline-none"
          />
        </div>
      </div>

      {/* Academic level + studying for */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[#888]">Academic Level</label>
          <select
            value={formData.academicLevel}
            onChange={(e) => update("academicLevel", e.target.value)}
            className="h-[44px] px-3 bg-[#141414] border border-white/[0.08] rounded-xl text-[13px] text-white outline-none focus:border-[#FA6E43] transition-all appearance-none"
          >
            <option value="">Select level</option>
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[#888]">Studying For</label>
          <input
            type="text"
            value={formData.studyingFor}
            onChange={(e) => update("studyingFor", e.target.value)}
            placeholder="e.g. Final Exam, GRE"
            className="h-[44px] px-3 bg-[#141414] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#FA6E43] transition-all"
          />
        </div>
      </div>

      <StepFooter onNext={onNext} onBack={onBack} showBack={false} disabled={!formData.primarySubject} />

    </OnboardingCard>
  )
}