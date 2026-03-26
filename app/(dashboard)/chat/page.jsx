"use client";
import { useState } from "react";
import { RiLayoutRightLine } from "react-icons/ri";
import CenterPanel from "@/components/dashboard/chat/CenterPanel";
import RightPanel from "@/components/dashboard/chat/RightPanel";

export default function ChatPage() {
  const [mode, setMode] = useState("private");
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="relative flex h-screen">
      
      {/* CENTER */}
      <div className="flex flex-col h-screen lg:mr-[300px]">
        
        <div className="flex-1 overflow-y-auto ">
          {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-dark">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-brand/[0.08] border border-brand/20">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-[10px] font-medium text-brand">
              {mode === "private" ? "Private" : "Public"}
            </span>
          </div>

          <button
            onClick={() => setRightOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#212225] text-[#888] text-[11px] rounded-xl hover:text-white transition-colors"
          >
            Options <RiLayoutRightLine className="text-[13px]" />
          </button>
        </div>

        <CenterPanel mode={mode} onModeChange={setMode} />
        </div>
      </div>

      {/* RIGHT — fixed desktop */}
      <div className="hidden lg:flex fixed right-0 top-0 h-screen w-[300px] overflow-y-auto bg-dark z-10">
        <div className="flex-1 overflow-y-auto">
          <RightPanel mode={mode} onModeChange={setMode} />
        </div>
      </div>

      {/* RIGHT — mobile drawer */}
      {rightOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setRightOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[80vw] max-w-[300px] bg-dark flex flex-col shadow-2xl">
            
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <span className="text-[13px] font-semibold text-white">
                Options
              </span>

              <button
                onClick={() => setRightOpen(false)}
                className="text-[#444] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <RightPanel mode={mode} onModeChange={setMode} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}