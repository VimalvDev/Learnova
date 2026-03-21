import Link from "next/link"

export default function WelcomeRow() {
  const hour     = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h1 className="text-[22px] font-bold text-white">{greeting}, Alex 👋</h1>
        <p className="text-[12px] text-[#666] mt-0.5">
          Your mastery index is{" "}
          <span className="text-[#FA6E43] font-semibold">+12.4%</span>{" "}
          higher than last week. Keep it up!
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-[#171717] text-white text-[12px] font-medium rounded-xl hover:bg-[#1c1c1c] transition-all">
          Download Report
        </button>
        <Link
          href="/dashboard/quizzes"
          className="flex items-center gap-2 px-4 py-2 bg-[#FA6E43] text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
        >
          + New Session
        </Link>
      </div>
    </div>
  )
}