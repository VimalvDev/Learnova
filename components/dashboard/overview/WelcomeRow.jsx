import Link from "next/link"
import { RiDownloadLine, RiAddLine } from "react-icons/ri"

export default function WelcomeRow() {
  const hour     = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h1 className="text-[22px] font-bold text-white">{greeting}, Vimal 👋</h1>
        <p className="text-[12px] text-[#666] mt-0.5">
          Your mastery index is{" "}
          <span className="text-brand font-semibold">+12.4%</span>{" "}
          higher than last week. Keep it up!
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#171717] text-white text-[12px] font-medium rounded-xl hover:bg-[#1c1c1c] transition-all">
          <RiDownloadLine className="text-[14px]" />
          Download Report
        </button>
        <Link
          href="/dashboard/quizzes"
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          <RiAddLine className="text-[14px]" />
          New Session
        </Link>
      </div>
    </div>
  )
}