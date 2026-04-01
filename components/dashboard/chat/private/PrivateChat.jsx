"use client"
import { useState, useRef, useEffect } from "react"
import CenterPanel  from "./CenterPanel"
import RightPanel   from "./RightPanel"

export default function PrivateChat() {
  const [messages, setMessages] = useState([
    {
      id: 1, role: "user",
      content: "Explain 2NF with an example from my notes.",
      time: "2:41 PM",
    },
    {
      id: 2, role: "ai",
      content: "Based on your uploaded documents, 2NF (Second Normal Form) requires that a relation is already in 1NF and every non-prime attribute is fully functionally dependent on the entire primary key.\n\nExample from your notes: The relation R(A, B, C) where A→C exists and {A,B} is the primary key violates 2NF because C depends only on A.",
      bullets: [
        "No partial dependencies on a composite key",
        "All non-key attributes depend on the whole key",
        "Violations are resolved by decomposition",
      ],
      sources: [
        { name: "DBMS_Notes.pdf", loc: "Chapter 4 · Page 57" },
        { name: "Unit2_Slides.pdf", loc: "Slide 14" },
      ],
      confidence: 87,
      time: "2:41 PM",
    },
    {
      id: 3, role: "user",
      content: "What is the difference between 2NF and 3NF?",
      time: "2:43 PM",
    },
    {
      id: 4, role: "ai", type: "lowconfidence",
      content: "This question is not sufficiently covered in your uploaded documents.",
      confidence: 38,
      time: "2:43 PM",
    },
  ])

  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: input.trim(), time: "Now" }])
    setInput("")
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