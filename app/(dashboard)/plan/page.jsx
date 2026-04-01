"use client"
import { useState } from "react"
import PlanHeader        from "@/components/dashboard/plan/PlanHeader"
import PlanConfigForm    from "@/components/dashboard/plan/PlanConfigForm"
import EmptyState        from "@/components/dashboard/plan/EmptyState"
import LoadingState      from "@/components/dashboard/plan/LoadingState"
import CollapsedConfigBar from "@/components/dashboard/plan/CollapsedConfigBar"
import PlanOverview      from "@/components/dashboard/plan/PlanOverview"
import DayTimeline       from "@/components/dashboard/plan/DayTimeline"
import WeeklyAccordion   from "@/components/dashboard/plan/WeeklyAccordion"
import RiskAssessment    from "@/components/dashboard/plan/RiskAssessment"
import MasteryForecast   from "@/components/dashboard/plan/right-panel/MasteryForecast"
import PlanActions       from "@/components/dashboard/plan/right-panel/PlanActions"
import PlanProgress      from "@/components/dashboard/plan/right-panel/PlanProgress"
import ConceptPriority   from "@/components/dashboard/plan/right-panel/ConceptPriority"

export default function PlanPage() {
  const [phase,  setPhase]  = useState("config") // "config" | "loading" | "plan"
  const [config, setConfig] = useState({
    targetDate:    "March 15, 2026",
    daysRemaining: 19,
    hoursPerDay:   2.5,
    level:         "Intermediate",
    toggles: {
      prioritizeWeak:   true,
      dailyRevision:    true,
      prerequisiteOrder:true,
      practiceQuizzes:  true,
      bufferDays:       false,
    },
    examContext: "",
  })

  const handleGenerate = () => {
    setPhase("loading")
    setTimeout(() => setPhase("plan"), 3200)
  }

  const handleRegenerate = () => {
    setPhase("loading")
    setTimeout(() => setPhase("plan"), 3200)
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <PlanHeader phase={phase} />

      {phase === "loading" ? (
        <LoadingState />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            {phase === "config" && (
              <PlanConfigForm
                config={config}
                setConfig={setConfig}
                onGenerate={handleGenerate}
              />
            )}

            {phase === "plan" && (
              <>
                <CollapsedConfigBar config={config} onEdit={() => setPhase("config")} />
                <PlanOverview />
                <DayTimeline />
                <WeeklyAccordion />
                <RiskAssessment />
              </>
            )}

            {phase === "config" && <EmptyState />}
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4 xl:sticky xl:top-4">
            <MasteryForecast phase={phase} />
            <PlanActions phase={phase} onRegenerate={handleRegenerate} />
            {phase === "plan" && <PlanProgress />}
            {phase === "plan" && <ConceptPriority />}
          </div>

        </div>
      )}
    </div>
  )
}