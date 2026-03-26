import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardTopBar from "@/components/dashboard/layout/DashboardTopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-dark text-white">
      {/* Sidebar — fixed, never scrolls */}
      <DashboardSidebar />

      {/* Main — offset for fixed sidebar, only content scrolls */}
      <div className="flex-1 flex flex-col">
        {/* Topbar — sticky within scrollable content */}
        <div className="sticky top-0 z-30">
          <DashboardTopBar />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
