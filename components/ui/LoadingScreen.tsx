"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

const words = ["Learn", "Adapt", "Master"]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  // Cycle through words every 900ms, stop at last word
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev >= words.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 900)
    return () => clearInterval(interval)
  }, [])

  // Counter from 0 to 100 over 2.7s
  useEffect(() => {
    const start = performance.now()
    const duration = 2700
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - start
      const value = Math.min((elapsed / duration) * 100, 100)
      setProgress(value)

      if (value < 100) {
        rafId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          onCompleteRef.current()
        }, 400)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: "#0D0D0D" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Top-Left: Brand Label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p
          className="text-xs md:text-sm uppercase tracking-[0.3em]"
          style={{ color: "#888891" }}
        >
          AI Learning Platform
        </p>
      </motion.div>

      {/* Center: Rotating Words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl italic"
            style={{ color: "rgba(244, 243, 246, 0.8)", fontFamily: "Georgia, 'Times New Roman', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-Right: Counter */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p
          className="text-6xl md:text-8xl lg:text-9xl tabular-nums"
          style={{ color: "#f4f3f6", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {Math.round(progress).toString().padStart(3, "0")}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[3px] w-full" style={{ backgroundColor: "rgba(31, 31, 31, 0.5)" }}>
          <motion.div
            className="h-full"
            style={{
              originX: 0,
              background: "linear-gradient(90deg, #5465FF 0%, #7a88ff 100%)",
              boxShadow: "0 0 8px rgba(84, 101, 255, 0.35)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  )
}
