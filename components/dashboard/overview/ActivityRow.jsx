import Link from "next/link"
import { RiArrowRightSLine } from "react-icons/ri"

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 60)  return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  if (days  === 1) return "Yesterday"
  return `${days}d ago`
}

export default function ActivityRow({ recentDocs }) {
  const activities = recentDocs.map((doc) => ({
    dot:   "#888",
    title: `Uploaded ${doc.file_name}`,
    sub:   `${doc.courses?.course_name ?? "Unknown course"} · ${(doc.word_count ?? 0).toLocaleString()} words extracted`,
    time:  timeAgo(doc.created_at),
  }))

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 bg-[#171717] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-medium text-white/70">Recent Activity</p>
          <Link href="/documents" className="text-[11px] text-brand hover:underline flex items-center gap-0.5">
            View All <RiArrowRightSLine className="text-[13px]" />
          </Link>
        </div>

        {activities.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[13px] text-secondary-text">No activity yet.</p>
            <Link href="/courses/new" className="text-[12px] text-brand hover:underline mt-2 block">
              Create your first course →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {activities.map(({ dot, title, sub, time }, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
              >
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: dot }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white truncate">{title}</p>
                  <p className="text-[11px] text-secondary-text mt-0.5">{sub}</p>
                </div>
                <span className="text-[11px] text-[#444] shrink-0 mt-0.5">{time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}