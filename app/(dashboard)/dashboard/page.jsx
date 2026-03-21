import WelcomeRow      from "@/components/dashboard/overview/WelcomeRow"
import StatCards       from "@/components/dashboard/overview/StatCards"
import ChartsRow       from "@/components/dashboard/overview/ChartsRow"
import WeaknessSection from "@/components/dashboard/overview/WeaknessSection"
import HeatmapRow      from "@/components/dashboard/overview/HeatmapRow"
import ActivityRow     from "@/components/dashboard/overview/ActivityRow"

export default function DashboardPage() {
  return (
    <div className=" flex flex-col gap-4 py-4">
      <WelcomeRow />
      <StatCards />
      <ChartsRow />
      <WeaknessSection />
      <HeatmapRow />
      <ActivityRow />
    </div>
  )
}