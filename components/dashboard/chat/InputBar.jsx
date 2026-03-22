"use client";
import { useState, useRef, useEffect } from "react";
import { RiSendPlaneFill, RiAttachment2, RiMicLine } from "react-icons/ri";

const commands = [
  { cmd: "/quiz", desc: "Generate a quiz" },
  { cmd: "/summary", desc: "Summarize topic" },
  { cmd: "/explain", desc: "Detailed explain" },
  { cmd: "/compare", desc: "Compare concepts" },
  { cmd: "/weak", desc: "Review weak areas" },
];

export default function InputBar({ onSend, isPublic = false }) {
  const [value, setValue] = useState("");
  const [showCmds, setShowCmds] = useState(false);
  const textareaRef = useRef();

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 120) + "px";
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setShowCmds(val.startsWith("/") && val.length <= 12);
  };

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
    setShowCmds(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") setShowCmds(false);
  };

  const accentColor = isPublic ? "#4ADE80" : "#FA6E43";

  return (
    <div
      className="flex-shrink-0 px-4 py-3 border-t border-white/[0.06]"
      style={{
        background: "rgba(13,13,13,0.98)",
        backdropFilter: "blur(16px)",
      }}
    >
      {showCmds && (
        <div className="mb-2 bg-[#212225] rounded-xl overflow-hidden shadow-2xl border border-white/[0.06]">
          {commands
            .filter((c) => c.cmd.startsWith(value))
            .map(({ cmd, desc }) => (
              <button
                key={cmd}
                onClick={() => {
                  setValue(cmd + " ");
                  setShowCmds(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
              >
                <span
                  className="text-[12px] font-mono font-bold w-16 text-left"
                  style={{ color: accentColor }}
                >
                  {cmd}
                </span>
                <span className="text-[12px] text-[#888]">{desc}</span>
              </button>
            ))}
        </div>
      )}

      <div
        className="flex items-center w-full z-50 gap-2.5 px-3 py-2.5 rounded-xl  transition-all"
        style={{
          background: "#141414",
          border: value
            ? `1px solid ${accentColor}35`
            : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button className="text-[#444] hover:text-white transition-colors flex-shrink-0 mb-0.5">
          <RiAttachment2 className="text-[16px]" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            isPublic ? "Ask anything..." : "Ask a question about your notes..."
          }
          rows={1}
          className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/20 outline-none resize-none leading-relaxed"
          style={{ maxHeight: "120px" }}
        />
        <div className="flex items-center gap-2 flex-shrink-0 mb-0.5">
          <button className="text-[#444] hover:text-white transition-colors hidden sm:block">
            <RiMicLine className="text-[16px]" />
          </button>
          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: value.trim() ? accentColor : "rgba(255,255,255,0.06)",
              opacity: value.trim() ? 1 : 0.4,
            }}
          >
            <RiSendPlaneFill className="text-white text-[12px]" />
          </button>
        </div>
      </div>

      <p className="text-[10px] text-[#333] text-center mt-1.5 hidden sm:block">
        Enter to send · Shift+Enter for new line · / for commands
      </p>
    </div>
  );
}
