"use client"
import { useState } from "react"
import { RiCloseLine } from "react-icons/ri"

export default function BulkActionBar({ count, onClear }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (count === 0) return null

  return (
    <div className="flex items-center gap-4 px-5 py-3 bg-card-dark border-b border-white/[0.06] flex-wrap">
      <span className="text-[12px] font-semibold text-white  ">
        {count} user{count !== 1 ? "s" : ""} selected
      </span>
      <div className="flex items-center gap-1 flex-wrap">
        {["Send Email","Export Selected"].map((a) => (
          <button
            key={a}
            className="h-7 px-3 text-[11px] text-(--color-secondary-text) bg-card rounded-lg hover:text-white hover:bg-white/[0.06] transition-all"
          >
            {a}
          </button>
        ))}
        <button className="h-7 px-3 text-[11px] text-[#FBBF24] bg-[#FBBF24]/[0.06] rounded-lg hover:bg-[#FBBF24]/[0.1] transition-all">
          Suspend
        </button>
        {confirmDelete ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-red)]/[0.08] rounded-lg border border-[var(--color-red)]/20">
            <span className="text-[11px] text-white">
              Delete {count} user{count !== 1 ? "s" : ""}? This is permanent.
            </span>
            <button className="text-[11px] font-bold text-[var(--color-red)] hover:underline">
              Confirm Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-[11px] text-(--color-secondary-text) hover:text-white"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="h-7 px-3 text-[11px] text-[var(--color-red)] bg-[var(--color-red)]/[0.06] rounded-lg hover:bg-[var(--color-red)]/[0.1] transition-all"
          >
            Delete
          </button>
        )}
      </div>
      <button
        onClick={onClear}
        className="ml-auto flex items-center gap-1 text-[11px] text-(--color-tertiary-text) hover:text-white transition-colors"
      >
        <RiCloseLine className="text-[13px]" /> Clear
      </button>
    </div>
  )
}