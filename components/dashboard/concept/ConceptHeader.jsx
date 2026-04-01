import Link from "next/link"
import {
  RiArrowRightSLine, RiCalendarLine, RiPlayLine,
} from "react-icons/ri"

const crumbs = [
  { label: "My Courses",         href: "/courses"             },
  { label: "DBMS — Semester 4",  href: "/courses/1"           },
  { label: "Unit 3",             href: "/courses/1/units/3"   },
  { label: "Normalization",      href: null                              },
]

export default function ConceptHeader() {
  return (
    <div className="pb-5 border-b border-(--color-card)">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        {crumbs.map((c, i) => (
          <div key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <RiArrowRightSLine className="text-(--color-dark-gray) text-[13px]" />}
            {c.href ? (
              <Link href={c.href} className="text-[12px] text-(--color-tertiary-text) hover:text-(--color-brand) transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-[12px] text-white">{c.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[clamp(22px,2.6vw,30px)] font-bold text-white leading-tight mb-2">
            Normalization
          </h1>
          <p className="text-[12px] text-(--color-tertiary-text) mb-3">
            Unit 3 · DBMS_Notes.pdf · Chapter 4 · Last studied 3 days ago
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-[var(--color-red)] bg-[var(--color-red)]/10 px-2.5 py-1 rounded-lg border border-[var(--color-red)]/20">
              🔴 Critical Risk
            </span>
            <span className="text-[10px] text-(--color-secondary-text) bg-card-dark px-2.5 py-1 rounded-lg">
              Chapter 4
            </span>
            <span className="text-[10px] text-(--color-brand) bg-(--color-brand)/10 px-2.5 py-1 rounded-lg border border-(--color-brand)/20">
              Prerequisite for 4 concepts
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 h-10 px-4 bg-card-dark text-white text-[12px] font-medium rounded-xl hover:bg-(--color-card-mid) transition-colors">
              <RiCalendarLine className="text-(--color-brand) text-[14px]" />
              Schedule Revision
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-(--color-brand) text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all">
              Start Focused Practice <RiPlayLine className="text-[13px]" />
            </button>
          </div>
          <p className="text-[11px] text-(--color-tertiary-text)">
            <span className="text-(--color-brand)">◈</span>{" "}
            Next revision due: Tomorrow · Based on current mastery score
          </p>
        </div>
      </div>
    </div>
  )
}