import ConceptHeader    from "@/components/dashboard/concept/ConceptHeader"
import MasteryOverview  from "@/components/dashboard/concept/MasteryOverview"
import PerformanceTrend from "@/components/dashboard/concept/PerformanceTrend"
import MistakePatterns  from "@/components/dashboard/concept/MistakePatterns"
import SessionBreakdown from "@/components/dashboard/concept/SessionBreakdown"
import SourceReferences from "@/components/dashboard/concept/SourceReferences"
import KnowledgeGraph   from "@/components/dashboard/concept/right-panel/KnowledgeGraph"
import ImprovementPlan  from "@/components/dashboard/concept/right-panel/ImprovmentPlan"
import QuickStats       from "@/components/dashboard/concept/right-panel/QuickStats"

export default function ConceptDetailPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <ConceptHeader />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">

        {/* Left — main content */}
        <div className="flex flex-col gap-5">
          <MasteryOverview />
          <PerformanceTrend />
          <MistakePatterns />
          <SessionBreakdown />
          <SourceReferences />
        </div>

        {/* Right — sticky panel */}
        <div className="flex flex-col gap-4 xl:sticky xl:top-4">
          <KnowledgeGraph />
          <ImprovementPlan />
          <QuickStats />
        </div>

      </div>
    </div>
  )
}