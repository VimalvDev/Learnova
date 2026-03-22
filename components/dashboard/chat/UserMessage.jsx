export default function UserMessage({ text, time }) {
  return (
    <div className="flex flex-col items-end gap-1 mb-5">
      <div
        className="max-w-[68%] px-4 py-3 text-white/85 text-[13px] leading-relaxed bg-[#2A2B2F]"
        style={{ borderRadius: "14px 4px 14px 14px" }}
      >
        {text}
      </div>
      <span className="text-[10px] text-[#444]">You · {time}</span>
    </div>
  )
}