import Link from "next/link"
import { RiCheckLine, RiRefreshLine, RiCircleLine } from "react-icons/ri"

const items = [
  { label: "Course name added",        status: "done"        },
  { label: "At least one unit created", status: "done"        },
  { label: "Documents uploaded (3)",   status: "done"        },
  { label: "All documents processed",  status: "processing"  },
  { label: "Quiz generator ready",     status: "locked"      },
  { label: "Revision schedule active", status: "locked"      },
]

export default function ReadinessChecklist() {
  const done = items.filter((i) => i.status === "done").length

  return (
    <div className="bg-[#171717] rounded-2xl p-5 mt-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FA6E43]/80 block mb-1">
        Course Readiness
      </span>
      <h3 className="text-[15px] font-semibold text-white/90 mb-4">Setup Checklist</h3>

      <div className="flex flex-col gap-1 mb-4">
        {items.map(({ label, status }) => (
          <div key={label} className="flex items-center gap-3 py-1.5">
            {status === "done" && (
              <RiCheckLine className="text-[#4ADE80] text-[15px] flex-shrink-0" />
            )}
            {status === "processing" && (
              <RiRefreshLine className="text-[#FA6E43] text-[15px] flex-shrink-0 animate-spin" />
            )}
            {status === "locked" && (
              <RiCircleLine className="text-[#444] text-[15px] flex-shrink-0" />
            )}
            <span className={`text-[12px] ${
              status === "locked" ? "text-[#555]" : "text-white"
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-[#666]">Course setup</span>
          <span className="text-[11px] text-[#666]">{Math.round((done / items.length) * 100)}%</span>
        </div>
        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FA6E43] rounded-full transition-all"
            style={{ width: `${(done / items.length) * 100}%` }}
          />
        </div>
      </div>

      <Link
        href="/dashboard/chat"
        className="w-full h-9 bg-[#FA6E43] text-white text-[12px] font-bold rounded-xl flex items-center justify-center hover:brightness-110 transition-all"
      >
        Go to AI Chat →
      </Link>
    </div>
  )
}