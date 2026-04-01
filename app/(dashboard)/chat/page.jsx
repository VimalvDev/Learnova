"use client"
import { useState } from "react"
import ModeSwitcher  from "@/components/dashboard/chat/ModeSwitcher"
import PrivateChat   from "@/components/dashboard/chat/private/PrivateChat"
import PublicChat    from "@/components/dashboard/chat/public/PublicChat"

export default function ChatPage() {
  const [mode, setMode] = useState("private") // "private" | "public"

  return (
    <div className="flex flex-col h-full min-h-0 -m-6">
      <ModeSwitcher mode={mode} setMode={setMode} />
      {mode === "private"
        ? <PrivateChat />
        : <PublicChat onSwitchPrivate={() => setMode("private")} />
      }
    </div>
  )
}