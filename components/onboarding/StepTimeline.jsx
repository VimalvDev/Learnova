"use client"

export default function StepTimeline({ formData, update }) {
  const hours = [1, 2, 3, 4, 5, 6, 8]

  return (
    <div className="max-w-[640px]">
      <div className="mb-8">
        <h2 className="text-[32px] lg:text-[38px] font-black text-white leading-tight mb-2">
          Plan Your Study Schedule.
        </h2>
        <p className="text-[14px] text-[#888891] leading-relaxed">
          Learnova uses your timeline to pace revision sessions and estimate mastery readiness.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Target date */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891] block mb-2">
            Target Exam or Goal Date
          </label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => update("targetDate", e.target.value)}
            className="w-full h-[50px] px-4 bg-[#212225] text-white text-[13px] rounded-xl outline-none transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.06)", colorScheme: "dark" }}
            onFocus={(e) => e.target.style.borderColor = "rgba(250,110,67,0.4)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
          />
        </div>

        {/* Daily hours */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891]">
              Daily Study Hours
            </label>
            <span className="text-[20px] font-black text-[#FA6E43]">
              {formData.dailyHours}h
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {hours.map((h) => (
              <button
                key={h}
                onClick={() => update("dailyHours", h)}
                className="flex-1 min-w-[48px] h-[48px] rounded-xl text-[14px] font-bold transition-all"
                style={{
                  background: formData.dailyHours === h
                    ? "#FA6E43"
                    : "#212225",
                  color: formData.dailyHours === h ? "#fff" : "#555",
                  border: formData.dailyHours === h
                    ? "none"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        {/* Study window */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891] block mb-2">
              Study From
            </label>
            <input
              type="time"
              value={formData.studyFrom}
              onChange={(e) => update("studyFrom", e.target.value)}
              className="w-full h-[50px] px-4 bg-[#212225] text-white text-[13px] rounded-xl outline-none transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.06)", colorScheme: "dark" }}
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888891] block mb-2">
              Study To
            </label>
            <input
              type="time"
              value={formData.studyTo}
              onChange={(e) => update("studyTo", e.target.value)}
              className="w-full h-[50px] px-4 bg-[#212225] text-white text-[13px] rounded-xl outline-none transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.06)", colorScheme: "dark" }}
            />
          </div>
        </div>

        {/* Info note */}
        <div
          className="flex items-start gap-2.5 px-4 py-3.5 rounded-xl text-[12px] text-[#888891] leading-relaxed"
          style={{ background: "#212225", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-[#FA6E43] flex-shrink-0 mt-0.5">◈</span>
          <span>
            Learnova uses your schedule to send smart reminders and pace revision
            sessions. You can adjust this at any time in settings.
          </span>
        </div>

      </div>
    </div>
  )
}