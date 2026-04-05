"use client";
import { useState } from "react";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import UsersHeader from "@/components/dashboard/admin/users/UsersHeader";
import UserStatRow from "@/components/dashboard/admin/users/UserStatRow";
import UserFilterBar from "@/components/dashboard/admin/users/UserFilterBar";
import UserTable from "@/components/dashboard/admin/users/UserTable";
import UserDetailDrawer from "@/components/dashboard/admin/users/UserDetailDrawer";

export default function AdminUsersPage() {
  const [drawerUser, setDrawerUser] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden bg-dark -m-6">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto px-6 py-6 relative">
          <div className="flex flex-col gap-5">
            <UsersHeader />
            <UserStatRow />
            <UserTable onViewUser={setDrawerUser} />
          </div>

          {/* Drawer */}
          {drawerUser && (
            <UserDetailDrawer
              user={drawerUser}
              onClose={() => setDrawerUser(null)}
            />
          )}
        </div>
      </div>
      <AdminSidebar />
    </div>
  );
}
