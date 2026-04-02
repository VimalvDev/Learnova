const W = 120, CX = 60, CY = 60, R = 44, SW = 14

const segments = [
  { pct: 28, color: "var(--color-brand)",         label: "Daily active",   count: 797  },
  { pct: 32, color: "rgba(83,77,229,0.5)",         label: "Weekly active",  count: 910  },
  { pct: 18, color: "rgba(83,77,229,0.3)",         label: "Monthly",        count: 512  },
  { pct: 22, color: "rgba(255,255,255,0.08)",      label: "Churned",        count: 628  },
]

export default function DonutChart() {
  const circ = 2 * Math.PI * R
  let offset = 0

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={W} height={W} viewBox={`0 0 ${W} ${W}`} className="-rotate-90">
          {segments.map((s, i) => {
            const dash = (s.pct / 100) * circ
            const el = (
              <circle key={i} cx={CX} cy={CY} r={R}
                fill="none" stroke={s.color} strokeWidth={SW}
                strokeDasharray={`${dash} ${circ}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            )
            offset += dash
            return el
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[16px] font-bold text-white leading-none">2,847</span>
          <span className="text-[9px] text-tertiary-text mt-0.5">Total</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1.5">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="text-[11px] text-secondary-text flex-1">{s.label}</span>
            <span className="text-[11px] font-medium text-white">{s.pct}%</span>
            <span className="text-[10px] text-tertiary-text w-14 text-right">({s.count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}