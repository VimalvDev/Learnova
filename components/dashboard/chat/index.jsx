"use client"

import { useState } from "react"
import { api } from "@/services/api"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || loading) return

    const userMsg = { role: "user", content: message }
    setMessages((prev) => [...prev, userMsg])
    setMessage("")
    setLoading(true)

    try {
      const data = await api.chat(message)

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response" },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error fetching response" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask from your notes..."
          className="flex-1 bg-[#111] px-3 py-2 rounded text-white text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-brand text-white rounded disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}