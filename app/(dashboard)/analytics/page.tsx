import PageHeader       from "@/components/dashboard/analytics/PageHeader.jsx"
import OverviewCards    from "@/components/dashboard/analytics/OverviewCards.jsx"
import ConceptTable     from "@/components/dashboard/analytics/ConceptTable.jsx"
import WeaknessPanel    from "@/components/dashboard/analytics/WeaknessPanel.jsx"
import PerformanceTrend from "@/components/dashboard/analytics/PerformanceTrend.jsx"
import ConceptHeatmap   from "@/components/dashboard/analytics/ConceptHeatmap.jsx"
import EfficiencyAnalysis from "@/components/dashboard/analytics/EfficiencyAnalysis.jsx"
import ActionPlan       from "@/components/dashboard/analytics/ActionPlan.jsx"

export default function AnalyticsPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <PageHeader />
      <OverviewCards />
      <ConceptTable />
      <WeaknessPanel />
      <PerformanceTrend />
      <ConceptHeatmap />
      <EfficiencyAnalysis />
      <ActionPlan />
    </div>
  )
}