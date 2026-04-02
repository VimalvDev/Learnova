import AIMessage            from "./AIMessage"
import UserMessage          from "./UserMessage"
import LowConfidenceMessage from "./LowConfidenceMessage"
import ThinkingIndicator    from "./ThinkingIndicator"
import InputBar             from "./InputBar"

export default function CenterPanel({ messages, input, setInput, onSend, bottomRef }) {
  return (
    <div className="flex flex-col h-full min-h-0 border-r border-(--color-card-dark)">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
        {messages.map((msg) => {
          if (msg.role === "user")
            return <UserMessage key={msg.id} message={msg} />
          if (msg.type === "lowconfidence")
            return <LowConfidenceMessage key={msg.id} message={msg} />
          return <AIMessage key={msg.id} message={msg} />
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-(--color-card-dark)">
        <InputBar value={input} onChange={setInput} onSend={onSend} />
        <p className="text-[10px] text-tertiary-text text-center mt-2">
          Enter to send · Shift+Enter for new line · / for commands
        </p>
      </div>
    </div>
  )
}