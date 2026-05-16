import { createClient } from "@/utils/supabase/server"
import DashboardTopBar from "./DashboardTopBar"

export default async function DashboardTopBarWrapper() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, email")
    .eq("id", user.id)
    .single()

  const ADMIN_EMAIL = "vimalverma8287@gmail.com"

  const userData = {
    name:      profile?.name  ?? "User",
    email:     profile?.email ?? "",
    avatar:    user?.user_metadata?.avatar_url ?? null,
    role:      profile?.email === ADMIN_EMAIL ? "Admin" : "Student",
    initials:  (profile?.name ?? "U").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
  }
console.log("profile:", profile)
console.log("user metadata:", user?.user_metadata)
  return <DashboardTopBar user={userData} />
}