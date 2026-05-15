"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/ui/LoadingScreen"

export default function LoaderPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#0D0D0D",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <h1
          className="text-4xl md:text-6xl italic"
          style={{ color: "#5465FF", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Learnova
        </h1>
        <p
          className="mt-4 text-lg md:text-xl"
          style={{ color: "#888891" }}
        >
          The smarter way to learn
        </p>
        <button
          onClick={() => setIsLoading(true)}
          className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
          style={{
            backgroundColor: "#5465FF",
            color: "#f4f3f6",
          }}
        >
          Replay Loader
        </button>
      </div>
    </>
  )
}
