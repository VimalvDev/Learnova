"use client"
import { useState } from "react"
import { RiBellLine, RiSearchLine, RiArrowDownSLine } from "react-icons/ri"

export default function AdminHeader() {
  const [search, setSearch] = useState("")

  return (
    <header className="flex items-center justify-between px-6 h-15 border-b border-(--color-card) bg-(--color-dark)/95 backdrop-blur-lg sticky top-0 z-40 flex-shrink-0">

      {/* Logo + admin badge */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-(--color-brand) flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 10 10" fill="none" className="w-4 h-4">
            <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-[15px] font-bold text-white">Learnova</span>
        <span className="text-[9px] font-black text-[var(--color-red)] bg-[var(--color-red)]/10 border border-[var(--color-red)]/25 px-1.5 py-0.5 rounded-md tracking-widest">
          ADMIN
        </span>
      </div>

      {/* Global search */}
      <div className="flex items-center gap-2 h-9 px-3 bg-card-dark rounded-xl w-80 border border-white/[0.06] focus-within:border-(--color-brand)/30 transition-colors">
        <RiSearchLine className="text-dark-gray text-[14px] flex-shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users, courses, events..."
          className="flex-1 bg-transparent text-[12px] text-white placeholder:text-dark-gray outline-none"
        />
        <span className="text-[10px] text-dark-gray bg-card px-1.5 py-0.5 rounded-md flex-shrink-0">⌘K</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* System status */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4ADE80]/[0.06] rounded-xl border border-[#4ADE80]/15">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          <span className="text-[11px] text-[#4ADE80] font-medium">All Systems Operational</span>
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-card-dark flex items-center justify-center text-secondary-text hover:text-white transition-colors">
          <RiBellLine className="text-[16px]" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-red)] border border-(--color-dark)" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 h-9 px-2.5 bg-card-dark rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-colors">
          <div className="w-6 h-6 rounded-full bg-[var(--color-red)]/15 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[var(--color-red)]">AR</span>
          </div>
          <RiArrowDownSLine className="text-dark-gray text-[13px]" />
        </button>
      </div>
    </header>
  )
}