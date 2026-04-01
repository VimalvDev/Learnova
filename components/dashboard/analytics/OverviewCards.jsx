import MasteryCard  from "./cards/MasteryCard"
import VelocityCard from "./cards/VelocityCard"
import WeaknessCard from "./cards/WeaknessCard"
import ResponseCard from "./cards/ResponseCard"

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MasteryCard />
      <VelocityCard />
      <WeaknessCard />
      <ResponseCard />
    </div>
  )
}