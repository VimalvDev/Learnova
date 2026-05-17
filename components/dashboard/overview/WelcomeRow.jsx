export default function WelcomeRow({ name, avgMastery }) {
  const hour     = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const firstName = name?.split(" ")[0] ?? "there"

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h1 className="text-[22px] text-white">{greeting}, {firstName}</h1>
        <p className="text-[12px] text-[#666] mt-0.5">
          {avgMastery > 0
            ? <>Your average mastery is <span className="text-brand font-semibold">{avgMastery}%</span> across all concepts.</>
            : "Upload your study materials and start learning to track your progress."}
        </p>
      </div>
    </div>
  )
}