"use client"
import { useState, useRef, useEffect } from "react"
import UserMessage      from "./UserMessage"
import AIMessage        from "./AIMessage"
import ThinkingIndicator from "./ThinkingIndicator"
import ChatInputBar     from "./ChatInputBar"
import ChatSidePanel    from "./ChatSidePanel"
import SessionHistory   from "./SessionHistory"
import { RiDeleteBinLine, RiHistoryLine } from "react-icons/ri"

export default function ChatInterface({ mode }) {
  const [messages,   setMessages]   = useState([])
  const [input,      setInput]      = useState("")
  const [loading,    setLoading]    = useState(false)
  const [sessionId,  setSessionId]  = useState(null)
  const [sources,    setSources]    = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const bottomRef = useRef(null)

  // Reset chat when mode changes
  useEffect(() => {
    setMessages([])
    setSessionId(null)
    setSources([])
    setInput("")
  }, [mode])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const question = input.trim()
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: question, time }])
    setInput("")
    setLoading(true)
    setSources([])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, mode, sessionId }),
      })

      const data = await res.json()
      const aiTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      if (data.sessionId && !sessionId) setSessionId(data.sessionId)
      if (data.sources?.length) setSources(data.sources)

      setMessages((prev) => [...prev, {
        id:         Date.now() + 1,
        role:       "ai",
        content:    data.reply ?? data.error ?? "No response received.",
        time:       aiTime,
        confidence: data.confidence ?? null,
        sources:    data.sources ?? [],
        isError:    !!data.error,
        isLowConf:  data.confidence !== undefined && data.confidence !== null && data.confidence < 40,
      }])
    } catch {
      setMessages((prev) => [...prev, {
        id:      Date.now() + 1,
        role:    "ai",
        content: "Connection error. Please try again.",
        time:    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([])
    setSessionId(null)
    setSources([])
  }

  if (showHistory) {
    return (
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <SessionHistory onClose={() => setShowHistory(false)} />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[1fr_260px] flex-1 min-h-0 overflow-hidden">

      {/* Main chat area */}
      <div className="flex flex-col h-full min-h-0 border-r border-(--color-card-dark)">

        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-(--color-card-dark) shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-white">
              {mode === "private" ? "Ask from Your Notes" : "Public AI Chat"}
            </span>
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{
                background: mode === "private" ? "rgba(250,110,67,0.08)" : "rgba(74,222,128,0.08)",
                color:      mode === "private" ? "#FA6E43" : "#4ADE80",
                border:     `1px solid ${mode === "private" ? "rgba(250,110,67,0.2)" : "rgba(74,222,128,0.2)"}`,
              }}
            >
              <div className="w-1 h-1 rounded-full" style={{ background: mode === "private" ? "#FA6E43" : "#4ADE80" }} />
              {mode === "private" ? "PRIVATE" : "PUBLIC"}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-[#555] hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
            >
              <RiDeleteBinLine className="text-[12px]" /> Clear
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-[#555] hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
            >
              <RiHistoryLine className="text-[12px]" /> History
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
          {messages.length === 0 && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
              <span className="text-brand text-[28px] mb-4">◈</span>
              <p className="text-[15px] font-semibold text-white mb-2">
                {mode === "private" ? "Ask from Your Notes" : "Ask Anything"}
              </p>
              <p className="text-[12px] text-tertiary-text max-w-xs leading-relaxed">
                {mode === "private"
                  ? "Questions are answered only from your uploaded documents."
                  : "Get answers from general AI knowledge on any topic."}
              </p>
            </div>
          )}

          {messages.map((msg) =>
            msg.role === "user"
              ? <UserMessage key={msg.id} message={msg} />
              : <AIMessage   key={msg.id} message={msg} mode={mode} />
          )}

          {loading && <ThinkingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 px-5 py-4 border-t border-(--color-card-dark)">
          <ChatInputBar
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={loading}
            mode={mode}
          />
          <p className="text-[10px] text-tertiary-text text-center mt-2">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Side panel */}
      <ChatSidePanel mode={mode} sources={sources} sessionId={sessionId} />
    </div>
  )
}