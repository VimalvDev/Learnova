import Link from "next/link"
import { RiArrowRightSLine, RiDownloadLine, RiAddLine } from "react-icons/ri"

export default function UsersHeader() {
  return (
    <div className="flex items-start justify-between pb-5 border-b border-(--color-card) flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Link href="/dashboard/admin" className="text-[11px] text-(--color-tertiary-text) hover:text-(--color-brand) transition-colors">
            Admin
          </Link>
          <RiArrowRightSLine className="text-(--color-dark-gray) text-[12px]" />
          <span className="text-[11px] text-(--color-secondary-text)">Users</span>
        </div>
        <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white leading-tight">
          User Management
        </h1>
        <p className="text-[clamp(12px,1.3vw,14px)] text-(--color-secondary-text) mt-1">
          View, manage, and monitor all registered users across the platform.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 h-9 px-4 bg-card-dark text-[12px] text-(--color-secondary-text) rounded-xl border border-white/[0.06] hover:text-white hover:border-white/[0.1] transition-all">
          <RiDownloadLine className="text-[14px]" /> Export Users
        </button>
        <button className="flex items-center gap-2 h-9 px-4 bg-(--color-brand) text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all">
          <RiAddLine className="text-[14px]" /> Invite User
        </button>
      </div>
    </div>
  )
}