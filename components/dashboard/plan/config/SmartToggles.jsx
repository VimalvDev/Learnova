export default function SmartToggles({ value, onToggle }) {
  return (
    <div>
      <p className="text-[12px] text-secondary-text mb-3">Plan options</p>
      <div className="bg-card-dark rounded-xl overflow-hidden divide-y divide-white/[0.04]">
        {[
          { key: "prioritizeWeak",    label: "Prioritize Weak Topics",           desc: "Front-load critical and high-risk concepts"        },
          { key: "dailyRevision",     label: "Include Daily Revision Sessions",  desc: "Interleave spaced repetition throughout the plan"  },
          { key: "prerequisiteOrder", label: "Include Prerequisite Ordering",    desc: "Ensure foundational concepts are covered first"    },
          { key: "practiceQuizzes",   label: "Generate Practice Quizzes",        desc: "Add adaptive quizzes after each topic cluster"     },
          { key: "bufferDays",        label: "Include Buffer Days",              desc: "Add rest or catch-up days every 5 days"            },
        ].map(({ key, label, desc }) => {
          const on = value[key]
          return (
            <div
              key={key}
              onClick={() => onToggle(key, !on)}
              className="flex items-center justify-between gap-4 px-4 py-3.5 cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-white">{label}</p>
                <p className="text-[10px] text-tertiary-text mt-0.5">{desc}</p>
              </div>
              <div className={`w-8 h-4 rounded-full flex-shrink-0 relative transition-all duration-200 ${on ? "bg-(--color-brand)" : "bg-white/[0.1]"}`}>
                <div
                  className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-200"
                  style={{ left: on ? "17px" : "2px" }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}