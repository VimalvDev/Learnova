"use client"
import { useState } from "react"
import ModeSwitcher from "@/components/dashboard/chat/ModeSwitcher"
import ChatInterface from "@/components/dashboard/chat/ChatInterface"

export default function ChatPage() {
  const [mode, setMode] = useState("private")

  return (
    <div className="flex flex-col h-full min-h-0 -mx-6 -mb-10 overflow-hidden">
      <ModeSwitcher mode={mode} setMode={setMode} />
      <ChatInterface mode={mode} />
    </div>
  )
}