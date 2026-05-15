import PageHeader       from "@/components/dashboard/analytics/PageHeader.jsx"
import OverviewCards    from "@/components/dashboard/analytics/OverviewCards.jsx"
import ConceptTable     from "@/components/dashboard/analytics/ConceptTable.jsx"
import WeaknessPanel    from "@/components/dashboard/analytics/WeaknessPanel.jsx"
import PerformanceTrend from "@/components/dashboard/analytics/PerformanceTrend.jsx"
import ConceptHeatmap   from "@/components/dashboard/analytics/ConceptHeatmap.jsx"

import ActionPlan       from "@/components/dashboard/analytics/ActionPlan.jsx"

export default function AnalyticsPage() {
  return (
    <div className="max-w-330 mx-auto flex flex-col gap-4 py-4">
      <PageHeader />
      <OverviewCards />
      <ConceptTable />
      <WeaknessPanel />
      <PerformanceTrend />
      <ConceptHeatmap />
      <ActionPlan />
    </div>
  )
}