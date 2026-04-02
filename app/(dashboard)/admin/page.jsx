import AdminHeader           from "@/components/dashboard/admin/AdminHeader"
import AdminSidebar          from "@/components/dashboard/admin/AdminSidebar"
import MetricCards           from "@/components/dashboard/admin/sections/MetricCards"
import AIUsageMonitor        from "@/components/dashboard/admin/sections/AIUsageMonitor"
import UserGrowthEngagement  from "@/components/dashboard/admin/sections/UserGrowthEngagement"
import UserManagementTable   from "@/components/dashboard/admin/sections/UserManagementTable"
import SystemHealth          from "@/components/dashboard/admin/sections/SystemHealth"
import ActivityLog           from "@/components/dashboard/admin/sections/ActivityLog"
import PlatformIntelligence  from "@/components/dashboard/admin/sections/PlatformIntelligence"
import QuickActions          from "@/components/dashboard/admin/sections/QuickActions"

export default function AdminPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-(--color-dark) -m-6">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-6">

            {/* Page header */}
            <div className="flex items-start justify-between pb-5 border-b border-(--color-card) flex-wrap gap-4">
              <div>
                <p className="text-[11px] text-tertiary-text mb-1">Admin / Overview</p>
                <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white">Platform Overview</h1>
                <p className="text-[13px] text-tertiary-text mt-1">
                  Real-time monitoring of platform usage, AI performance, and system health.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-1.5 h-9 px-3 bg-card-dark text-[12px] text-secondary-text rounded-xl hover:text-white transition-colors">
                  Last 7 Days ▾
                </button>
                <button className="flex items-center gap-1.5 h-9 px-3 bg-card-dark text-[12px] text-secondary-text rounded-xl hover:text-white transition-colors">
                  ↓ Export Report
                </button>
                <p className="text-[10px] text-tertiary-text">Auto-refreshes every 60s · Last: 3:42 PM</p>
              </div>
            </div>

            <MetricCards />
            <AIUsageMonitor />
            <UserGrowthEngagement />
            <UserManagementTable />
            <SystemHealth />
            <ActivityLog />
            <PlatformIntelligence />
            <QuickActions />
          </div>
        </div>
      </div>
            <AdminSidebar />

    </div>
  )
}