"use client"
import { useState, useRef, useEffect } from "react"
import CenterPanel from "./CenterPanel"
import RightPanel from "./RightPanel"

export default function PrivateChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const question = input.trim()
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setMessages(prev => [...prev, {
      id: Date.now(),
      role: "user",
      content: question,
      time,
    }])
    setInput("")

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, mode: "private" }),
      })

      const data = await res.json()

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "ai",
        content: data.reply || data.error || "No response",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        confidence: data.confidence ?? null,
        sources: data.sources || [],
      }])

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "ai",
        content: "Connection error. Make sure the backend server is running on port 5000.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }])
    }
  }

  return (
    <div className="grid grid-cols-[1fr_300px] flex-1 min-h-0 overflow-hidden">
      <CenterPanel
        messages={messages}
        input={input}
        setInput={setInput}
        onSend={handleSend}
        bottomRef={bottomRef}
      />
      <RightPanel />
    </div>
  )
}