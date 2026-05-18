"use client"
import { useState } from "react"
import Link from "next/link"
import { RiArrowDownSLine, RiArrowUpSLine, RiFileTextLine, RiLockLine, RiGlobalLine } from "react-icons/ri"

const scoreColor = (s) => s >= 0.75 ? "#FA6E43" : s >= 0.5 ? "#FBBF24" : "#F87171"

export default function ChatSidePanel({ mode, sources, sessionId }) {
  const [sourcesOpen, setSourcesOpen] = useState(true)

  const activeFiles = [...new Set(sources.map((s) => s.name))]

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-card-dark">

      {/* Mode info */}
      <div className="p-4 border-b border-(--color-card)">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">Current Mode</p>
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{
            background: mode === "private" ? "rgba(250,110,67,0.06)" : "rgba(74,222,128,0.06)",
            border: `1px solid ${mode === "private" ? "rgba(250,110,67,0.15)" : "rgba(74,222,128,0.15)"}`,
          }}
        >
          {mode === "private"
            ? <RiLockLine  className="text-brand text-[14px] shrink-0" />
            : <RiGlobalLine className="text-[#4ADE80] text-[14px] shrink-0" />
          }
          <div>
            <p className="text-[12px] font-semibold" style={{ color: mode === "private" ? "#FA6E43" : "#4ADE80" }}>
              {mode === "private" ? "Private Mode" : "Public Mode"}
            </p>
            <p className="text-[10px] text-tertiary-text mt-0.5">
              {mode === "private" ? "Answers from your notes" : "General AI knowledge"}
            </p>
          </div>
        </div>

        {mode === "private" && (
          <div className="mt-3 flex flex-col gap-1.5">
            {[
              "Answers grounded in your docs",
              "Source citations shown",
              "Confidence score tracked",
            ].map((item) => (
              <p key={item} className="text-[10px] text-secondary-text flex items-start gap-1.5">
                <span className="text-brand mt-0.5 shrink-0">·</span> {item}
              </p>
            ))}
          </div>
        )}

        {mode === "public" && (
          <div className="mt-3 flex flex-col gap-1.5">
            {[
              "Uses AI general knowledge",
              "Not from your documents",
              "Verify before exam use",
            ].map((item) => (
              <p key={item} className="text-[10px] text-secondary-text flex items-start gap-1.5">
                <span className="text-[#4ADE80] mt-0.5 shrink-0">·</span> {item}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Sources — private mode only */}
      {mode === "private" && (
        <div className="p-4 border-b border-(--color-card)">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex items-center justify-between w-full mb-3"
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70">
              Retrieved Sources
            </p>
            {sourcesOpen
              ? <RiArrowUpSLine   className="text-dark-gray text-[13px]" />
              : <RiArrowDownSLine className="text-dark-gray text-[13px]" />
            }
          </button>

          {sourcesOpen && (
            sources.length === 0 ? (
              <p className="text-[11px] text-tertiary-text">Sources appear after your first question.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {sources.map((s) => (
                  <div key={s.rank} className="bg-card rounded-xl p-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-bold text-brand shrink-0">#{s.rank}</span>
                          <span className="text-[11px] font-medium text-white truncate">{s.name}</span>
                        </div>
                        <p className="text-[10px] text-tertiary-text truncate">{s.loc}</p>
                      </div>
                      <span className="text-[11px] font-bold shrink-0" style={{ color: scoreColor(s.score) }}>
                        {(s.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div
                      className="h-[2px] rounded-full mb-2"
                      style={{ width: `${s.score * 100}%`, background: scoreColor(s.score) }}
                    />
                    <p className="text-[10px] text-secondary-text leading-relaxed line-clamp-2">{s.snippet}</p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {/* Active documents */}
      {mode === "private" && activeFiles.length > 0 && (
        <div className="p-4 border-b border-(--color-card)">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">Used Documents</p>
          <div className="flex flex-col gap-2">
            {activeFiles.map((name) => (
              <div key={name} className="flex items-center gap-2">
                <RiFileTextLine className="text-brand/50 text-[12px] shrink-0" />
                <span className="text-[11px] text-white truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">Quick Links</p>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Upload Documents", href: "/documents" },
            { label: "My Courses",       href: "/courses"   },
            { label: "Quiz Center",      href: "/dashboard/quizzes" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] text-secondary-text hover:text-brand transition-colors py-1"
            >
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}