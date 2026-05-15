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
      </div>
    </div>
  )
}