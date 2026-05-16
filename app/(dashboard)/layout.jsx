import { createClient } from "@/utils/supabase/server"
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar"
import DashboardTopBarWrapper from "@/components/dashboard/layout/DashboardTopBarWrapper"

const ADMIN_EMAIL = "vimalverma8287@gmail.com"

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const email = user?.user_metadata?.email ?? user?.email ?? ""
  const isAdmin = email === ADMIN_EMAIL

  return (
    <div className="flex min-h-screen bg-dark text-white">
      <DashboardSidebar isAdmin={isAdmin} />

      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-30">
          <DashboardTopBarWrapper />
        </div>
        <main className="flex-1 overflow-y-auto px-6 pb-10">{children}</main>
      </div>
    </div>
  )
}