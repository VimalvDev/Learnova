"use client";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";

export default function APIKeysPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-(--color-dark) -m-6">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-start justify-between pb-5 border-b border-(--color-card) flex-wrap gap-4">
              <div>
                <p className="text-[11px] text-tertiary-text mb-1">Admin / Configuration</p>
                <h1 className="text-[clamp(20px,2.4vw,26px)] font-bold text-white">API Keys Management</h1>
                <p className="text-[13px] text-tertiary-text mt-1">
                  Manage API keys and integrate external services.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-1.5 h-9 px-3 bg-brand text-[12px] text-white rounded-xl hover:bg-brand/90 transition-colors">
                  + Generate Key
                </button>
              </div>
            </div>

            {/* Content placeholder */}
            <div className="p-6 bg-card rounded-2xl border border-(--color-card)">
              <p className="text-secondary-text">API Keys content coming soon...</p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar />
    </div>
  );
}
