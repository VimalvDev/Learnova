export default function UserMessage({ message }) {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="max-w-[75%] bg-card-dark rounded-2xl rounded-tr-sm px-4 py-3">
        <p className="text-[13px] text-white leading-relaxed">{message.content}</p>
      </div>
      <span className="text-[10px] text-(--color-tertiary-text) pr-1">You · {message.time}</span>
    </div>
  )
}