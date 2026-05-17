import RevisionHeader       from "@/components/dashboard/revision/RevisionHeader"
import StatsStrip           from "@/components/dashboard/revision/StatsStrip"
import TodayFocus           from "@/components/dashboard/revision/TodayFocus"
import UpcomingList         from "@/components/dashboard/revision/UpcomingList"
import RevisionHistory      from "@/components/dashboard/revision/RevisionHistory"
import RevisionCalendar     from "@/components/dashboard/revision/right-panel/RevisionCalender"
import DayDetail            from "@/components/dashboard/revision/right-panel/DayDetail"
import WeeklyStrip          from "@/components/dashboard/revision/right-panel/WeeklyStrip"

export default function RevisionPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <RevisionHeader />
      <StatsStrip />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">

        {/* Left — main content */}
        <div className="flex flex-col gap-5">
          <TodayFocus />
          <UpcomingList />
          <RevisionHistory />
        </div>

        {/* Right — sticky panel */}
        <div className="flex flex-col gap-4 xl:sticky xl:top-4">
          <RevisionCalendar />
          <DayDetail />
          <WeeklyStrip />
        </div>

      </div>
    </div>
  )
}