import TimelineFields from "./config/TimelineFields"
import CapacitySlider from "./config/CapacitySlider"
import LevelSelector  from "./config/LevelSelector"
import SmartToggles   from "./config/SmartToggles"
import ExamContext    from "./config/ExamContext"
import MasterySnapshot from "./config/MasterySnapshot"
import { RiFlashlightLine } from "react-icons/ri"

export default function PlanConfigForm({ config, setConfig, onGenerate }) {
  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))
  const updateToggle = (key, val) =>
    setConfig(prev => ({ ...prev, toggles: { ...prev.toggles, [key]: val } }))

  return (
    <div className="bg-card rounded-2xl p-[clamp(1.25rem,3vw,2.25rem)]">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">
        Plan Parameters
      </p>
      <h2 className="text-[clamp(16px,2vw,20px)] font-semibold text-white mb-1">
        Configure Your Study Roadmap
      </h2>
      <p className="text-[12px] text-(--color-tertiary-text) mb-7">
        Learnova will analyze your mastery profile and build a prioritized plan around your timeline and capacity.
      </p>

      <div className="flex flex-col gap-7">
        <TimelineFields
          targetDate={config.targetDate}
          daysRemaining={config.daysRemaining}
          onChange={(date, days) => {
            update("targetDate", date)
            update("daysRemaining", days)
          }}
        />
        <CapacitySlider
          value={config.hoursPerDay}
          onChange={(v) => update("hoursPerDay", v)}
        />
        <LevelSelector
          value={config.level}
          onChange={(v) => update("level", v)}
        />
        <SmartToggles
          value={config.toggles}
          onToggle={updateToggle}
        />
        <ExamContext
          value={config.examContext}
          onChange={(v) => update("examContext", v)}
        />
        <MasterySnapshot />
      </div>

      <button
        onClick={onGenerate}
        className="mt-7 w-full h-12 bg-(--color-brand) text-white text-[14px] font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
      >
        <RiFlashlightLine className="text-[16px]" />
        Generate My Learning Plan
      </button>
    </div>
  )
}