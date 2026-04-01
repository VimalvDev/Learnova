"use client";
import { useState } from "react";
import { RiLayoutRightLine } from "react-icons/ri";
import ChatHeader from "@/components/dashboard/chat/ChatHeader";
import CenterPanel from "@/components/dashboard/chat/CenterPanel";
import RightPanel from "@/components/dashboard/chat/RightPanel";
import InputBar from "@/components/dashboard/chat/InputBar";

export default function ChatPage() {
  const [mode, setMode] = useState("private");
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden">
      
      {/* CENTER PANEL */}
      <div className="flex flex-col col-span-5 lg:flex-1 h-screen overflow-hidden">
        
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-dark flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-brand/[0.08] border border-brand/20">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-[10px] font-medium text-brand">
              {mode === "private" ? "Private" : "Public"}
            </span>
          </div>

          <button
            onClick={() => setRightOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-card-dark text-[#888] text-[11px] rounded-xl hover:text-white transition-colors"
          >
            Options <RiLayoutRightLine className="text-[13px]" />
          </button>
        </div>

        {/* Fixed Header */}
        <div className="flex-shrink-0 border-b border-white/[0.06]">
          <ChatHeader mode={mode} />
        </div>

        {/* Scrollable Messages */}
        <div className="flex-1 overflow-y-auto">
          <CenterPanel mode={mode} onModeChange={setMode} />
        </div>

        {/* Fixed Input Bar */}
        <div className="flex-shrink-0 border-t border-white/[0.06]">
          <InputBar onSend={(text) => {}} isPublic={mode === "public"} />
        </div>
      </div>

      {/* RIGHT PANEL - Desktop Only */}
      <div className="hidden lg:flex w-[300px] flex-shrink-0 overflow-hidden bg-dark border-l border-white/[0.06] z-10">
        <div className="flex-1 overflow-y-auto">
          <RightPanel mode={mode} onModeChange={setMode} />
        </div>
      </div>

      {/* RIGHT PANEL - Mobile Drawer */}
      {rightOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setRightOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[80vw] max-w-[300px] bg-dark flex flex-col shadow-2xl">
            
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
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