"use client"
import { useState } from "react"
import { RiSearchLine, RiArrowDownSLine, RiAddLine, RiCloseLine } from "react-icons/ri"

const filters = ["All","Active","Inactive","Free","Pro","Churned"]

export default function UserFilterBar({ onFilterChange }) {
  const [search,      setSearch]      = useState("")
  const [active,      setActive]      = useState("All")
  const [expanded,    setExpanded]    = useState(false)
  const [filtersApplied, setApplied]  = useState(false)

  const applyFilter = (f) => {
    setActive(f)
    setApplied(f !== "All")
    onFilterChange?.({ filter: f, search })
  }

  return (
    <div className="bg-card rounded-2xl p-5">
      {/* Row 1 */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Search */}
        <div className="flex items-center gap-2 h-9 px-3 bg-card-dark rounded-xl border border-white/[0.06] w-64 focus-within:border-(--color-brand)/30 transition-colors  ">
          <RiSearchLine className="text-(--color-dark-gray) text-[13px]  " />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, institution..."
            className="flex-1 bg-transparent text-[11px] text-white placeholder:text-(--color-dark-gray) outline-none"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 p-1 bg-card-dark rounded-xl flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => applyFilter(f)}
              className={`px-3 py-1 text-[10px] font-medium rounded-lg transition-all whitespace-nowrap ${
                active === f
                  ? "bg-(--color-brand) text-white"
                  : "text-(--color-tertiary-text) hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort */}
        <button className="ml-auto flex items-center gap-1.5 h-9 px-3 bg-card-dark text-[11px] text-(--color-secondary-text) rounded-xl border border-white/[0.06] hover:text-white transition-colors  ">
          Sort: Last Active ↓ <RiArrowDownSLine className="text-[13px]" />
        </button>

        {/* More filters toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-1.5 h-9 px-3 text-[11px] rounded-xl border transition-all   ${
            expanded
              ? "bg-(--color-brand)/[0.08] border-(--color-brand)/30 text-(--color-brand)"
              : "bg-card-dark border-white/[0.06] text-(--color-secondary-text) hover:text-white"
          }`}
        >
          <RiAddLine className="text-[13px]" />
          {expanded ? "Fewer Filters" : "More Filters"}
        </button>
      </div>

      {/* Row 2 — advanced filters */}
      {expanded && (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.04] flex-wrap">
          {[
            { label: "Joined", placeholder: "Date range" },
            { label: "Country", placeholder: "All" },
          ].map(({ label, placeholder }) => (
            <div key={label}>
              <label className="text-[10px] text-(--color-tertiary-text) block mb-1">{label}</label>
              <button className="flex items-center gap-1.5 h-8 px-3 bg-card-dark text-[11px] text-(--color-secondary-text) rounded-lg border border-white/[0.06] hover:text-white transition-colors">
                {placeholder} <RiArrowDownSLine className="text-[12px]" />
              </button>
            </div>
          ))}
          <div>
            <label className="text-[10px] text-(--color-tertiary-text) block mb-1">Plan</label>
            <button className="flex items-center gap-1.5 h-8 px-3 bg-card-dark text-[11px] text-(--color-secondary-text) rounded-lg border border-white/[0.06] hover:text-white transition-colors">
              All <RiArrowDownSLine className="text-[12px]" />
            </button>
          </div>
          <div>
            <label className="text-[10px] text-(--color-tertiary-text) block mb-1">Has courses</label>
            <div className="flex items-center gap-1 p-0.5 bg-card-dark rounded-lg border border-white/[0.06]">
              {["Yes","No","Any"].map((o) => (
                <button key={o} className="px-2.5 py-1 text-[10px] rounded-md text-(--color-tertiary-text) hover:text-white transition-colors">
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active filter summary */}
      {filtersApplied && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]">
          <p className="text-[11px] text-(--color-secondary-text)">
            Showing: <span className="text-white font-medium">{active} users</span> · Sorted by last active
          </p>
          <button
            onClick={() => { setActive("All"); setApplied(false) }}
            className="flex items-center gap-1 text-[11px] text-(--color-brand) hover:underline ml-auto"
          >
            <RiCloseLine className="text-[12px]" /> Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}