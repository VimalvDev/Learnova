"use client";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";

export default function AIUsagePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-(--color-dark) -m-6">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-start justify-between pb-5 border-b border-(--color-card) flex-wrap gap-4">
              <div>
                <p className="text-[11px] text-tertiary-text mb-1">Admin / AI Usage Monitor</p>
                <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white">AI Usage Monitor</h1>
                <p className="text-[13px] text-tertiary-text mt-1">
                  Real-time monitoring of AI API usage, token consumption, and model performance.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-1.5 h-9 px-3 bg-card-dark text-[12px] text-secondary-text rounded-xl hover:text-white transition-colors">
                  Last 7 Days ▾
                </button>
                <button className="flex items-center gap-1.5 h-9 px-3 bg-card-dark text-[12px] text-secondary-text rounded-xl hover:text-white transition-colors">
                  ↓ Export Report
                </button>
              </div>
            </div>

            {/* Content placeholder */}
            <div className="p-6 bg-card rounded-2xl border border-(--color-card)">
              <p className="text-secondary-text">AI Usage content coming soon...</p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar />
    </div>
  );
}
