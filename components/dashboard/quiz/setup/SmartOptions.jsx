const options = [
  {
    key:   "prioritizeIncorrect",
    label: "Prioritize Previously Incorrect Topics",
    desc:  "Focus quiz on concepts you've gotten wrong before",
  },
  {
    key:   "includePrerequisites",
    label: "Include Prerequisite Concepts",
    desc:  "Surface foundational gaps before advanced topics",
  },
  {
    key:   "explanationMode",
    label: "Explanation Mode After Each Question",
    desc:  "Show detailed answer explanations in real time",
  },
]

export default function SmartOptions({ value, onChange }) {
  const toggle = (key) => onChange({ ...value, [key]: !value[key] })

  return (
    <div className="flex flex-col divide-y divide-white/4">
      {options.map(({ key, label, desc }) => {
        const active = value[key]
        return (
          <div
            key={key}
            onClick={() => toggle(key)}
            className="flex items-center justify-between gap-4 py-3.5 cursor-pointer hover:bg-white/1 rounded-lg transition-colors first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-white">{label}</p>
              <p className="text-[11px] text-secondary-text mt-0.5">{desc}</p>
            </div>
            <div
              className={`w-8 h-4 rounded-full shrink-0 relative transition-all duration-200 ${
                active ? "bg-brand" : "bg-white/8"
              }`}
            >
              <div
                className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-200"
                style={{ left: active ? "17px" : "2px" }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}