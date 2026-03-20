"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText } from "@/lib/gsap"

export default function FadeIn({
  children,
  duration = 0.8,
  delay = 0,
  direction = "none",
  distance = 40,
  trigger = "scroll",
  stagger = false,
  staggerMax = .6,
  className = "",
}) {
  const ref = useRef(null)

  useGSAP(() => {
    if (!ref.current) return

    const transforms = {
      up:    { y: distance },
      down:  { y: -distance },
      left:  { x: distance },
      right: { x: -distance },
      none:  {},
    }

    if (stagger) {
      const split = SplitText.create(ref.current, {
        type: "words",
        wordsClass: "fade-word",
      })

      // Set all words invisible first
      gsap.set(split.words, {
        opacity: 0,
        ...transforms[direction],
      })

      // Each word gets its own random delay between 0 and staggerMax
      split.words.forEach((word) => {
        const randomDelay = delay + Math.random() * staggerMax

        gsap.to(word, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay: randomDelay,
          ease: "power2.out",
          ...(trigger === "scroll" && {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }),
        })
      })

      return () => split.revert()

    } else {

      gsap.set(ref.current, {
        opacity: 0,
        ...transforms[direction],
      })

      gsap.to(ref.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        ...(trigger === "scroll" && {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }),
      })
    }
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}