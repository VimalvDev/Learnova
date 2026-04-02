"use client"
import { useState } from "react"
import { RiUploadLine, RiArrowDownSLine } from "react-icons/ri"
import SettingCard  from "../shared/SettingCard"
import SectionHeader from "../shared/SectionHeader"
import SaveRow      from "../shared/SaveRow"

const levels = ["High School","Undergraduate","Postgraduate","Self-Learner","Professional"]

export default function ProfileSection({ onSave }) {
  const [name,     setName]     = useState("Vimal Rahman")
  const [level,    setLevel]    = useState("Undergraduate")
  const [focus,    setFocus]    = useState("Computer Science")
  const [inst,     setInst]     = useState("")
  const [bio,      setBio]      = useState("")
  const [lvlOpen,  setLvlOpen]  = useState(false)

  return (
    <SettingCard>
      <SectionHeader
        tag="Profile"
        title="Profile Information"
        subtitle="Your public identity within the Learnova system."
      />

      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-(--color-brand) flex items-center justify-center border-2 border-(--color-brand)/30">
            <span className="text-[22px] font-bold text-white">AR</span>
          </div>
          <button className="text-[11px] text-brand hover:underline flex items-center gap-1">
            <RiUploadLine className="text-[12px]" /> Upload Photo
          </button>
          <p className="text-[10px] text-tertiary-text text-center">JPG or PNG · Max 2MB</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">

          {/* Full name */}
          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-1.5">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 bg-card-dark text-[13px] text-white rounded-xl outline-none focus:ring-1 focus:ring-(--color-brand)/30 transition-all"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label className="text-[11px] font-medium text-tertiary-text">Email Address</label>
              <span className="text-[9px] text-dark-gray bg-card px-1.5 py-0.5 rounded-md">Readonly</span>
            </div>
            <input
              value="Vimal@university.edu"
              readOnly
              className="w-full h-11 px-3.5 bg-card-dark text-[13px] text-secondary-text rounded-xl cursor-not-allowed opacity-60"
            />
            <p className="text-[10px] text-tertiary-text mt-1">Email cannot be changed. Contact support if needed.</p>
          </div>

          {/* Academic level */}
          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-1.5">Academic Level</label>
            <div className="relative">
              <button
                onClick={() => setLvlOpen(!lvlOpen)}
                className="w-full h-11 px-3.5 bg-card-dark text-[13px] text-white rounded-xl flex items-center justify-between"
              >
                {level}
                <RiArrowDownSLine className="text-dark-gray text-[14px]" />
              </button>
              {lvlOpen && (
                <div className="absolute top-12 left-0 w-full bg-(--color-card-mid) rounded-xl border border-white/[0.06] shadow-2xl z-20 overflow-hidden">
                  {levels.map((l) => (
                    <button key={l} onClick={() => { setLevel(l); setLvlOpen(false) }}
                      className={`w-full text-left px-3.5 py-2.5 text-[12px] hover:bg-white/[0.04] transition-colors ${level === l ? "text-brand" : "text-white"}`}>
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Study focus */}
          <div>
            <label className="text-[11px] font-medium text-tertiary-text block mb-1.5">Primary Study Focus</label>
            <input
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="e.g. Computer Science, Medicine, Law"
              className="w-full h-11 px-3.5 bg-card-dark text-[13px] text-white placeholder:text-dark-gray rounded-xl outline-none focus:ring-1 focus:ring-(--color-brand)/30 transition-all"
            />
          </div>

          {/* Institution */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label className="text-[11px] font-medium text-tertiary-text">Institution</label>
              <span className="text-[9px] text-dark-gray bg-card px-1.5 py-0.5 rounded-md">Optional</span>
            </div>
            <input
              value={inst}
              onChange={(e) => setInst(e.target.value)}
              placeholder="e.g. University of Manchester"
              className="w-full h-11 px-3.5 bg-card-dark text-[13px] text-white placeholder:text-dark-gray rounded-xl outline-none focus:ring-1 focus:ring-(--color-brand)/30 transition-all"
            />
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-tertiary-text">Short Bio</label>
                <span className="text-[9px] text-dark-gray bg-card px-1.5 py-0.5 rounded-md">Optional</span>
              </div>
              <span className="text-[10px] text-dark-gray">{bio.length} / 200</span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 200))}
              placeholder="Describe your learning goals..."
              rows={3}
              className="w-full px-3.5 py-3 bg-card-dark text-[13px] text-white placeholder:text-dark-gray rounded-xl outline-none focus:ring-1 focus:ring-(--color-brand)/30 transition-all resize-y min-h-[72px]"
            />
          </div>
        </div>
      </div>

      <SaveRow label="Save Profile" onSave={onSave} />
    </SettingCard>
  )
}