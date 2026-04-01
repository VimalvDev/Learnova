import { RiFlashlightLine } from "react-icons/ri"

export default function AdaptiveStatusCard({ answers }) {
  const recent     = answers.slice(-2)
  const allCorrect = recent.length === 2 && recent.every((a) => a.selected === a.correct)
  const allWrong   = recent.length === 2 && recent.every((a) => a.selected !== a.correct)

  const status = allCorrect
    ? "Difficulty increasing — strong performance detected"
    : allWrong
    ? "Difficulty reduced — reinforcing foundational concepts"
    : "Adaptive Engine Active · Monitoring your performance"

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-card-dark rounded-xl border border-brand/10">
      <RiFlashlightLine className="text-brand text-[14px] shrink-0" />
      <span className="text-[12px] text-[#888]">{status}</span>
    </div>
  )
}