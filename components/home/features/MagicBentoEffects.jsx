"use client"
import { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"

const MOBILE_BREAKPOINT = 768

const createParticleElement = (x, y, color) => {
  const el = document.createElement("div")
  el.className = "learnova-particle"
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 5px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const calculateSpotlightValues = (radius) => ({
  proximity:    radius * 0.5,
  fadeDistance: radius * 0.75,
})

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect()
  const relX  = ((mouseX - rect.left)  / rect.width)  * 100
  const relY  = ((mouseY - rect.top)   / rect.height) * 100
  card.style.setProperty("--glow-x",         `${relX}%`)
  card.style.setProperty("--glow-y",         `${relY}%`)
  card.style.setProperty("--glow-intensity", glow.toString())
  card.style.setProperty("--glow-radius",    `${radius}px`)
}

// ── ParticleCard ───────────────────────────────────────────────────────────
export function ParticleCard({
  children,
  className = "",
  style,
  particleCount = 8,
  glowColor = "250, 110, 67",
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = false,
  disableAnimations = false,
}) {
  const cardRef              = useRef(null)
  const particlesRef         = useRef([])
  const timeoutsRef          = useRef([])
  const isHoveredRef         = useRef(false)
  const memoizedParticles    = useRef([])
  const particlesInitialized = useRef(false)

  const initParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      )
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return
    if (!particlesInitialized.current) initParticles()

    memoizedParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const clone = particle.cloneNode(true)
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        )
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none", repeat: -1, yoyo: true,
        })
        gsap.to(clone, {
          opacity: 0.25,
          duration: 1.5,
          ease: "power2.inOut", repeat: -1, yoyo: true,
        })
      }, i * 100)
      timeoutsRef.current.push(id)
    })
  }, [initParticles])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return
    const el = cardRef.current

    const onEnter = () => {
      isHoveredRef.current = true
      // Particles disabled
      // animateParticles()
    }

    const onLeave = () => {
      isHoveredRef.current = false
      // Particles disabled
      // clearParticles()
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3 })
    }

    const onMove = (e) => {
      if (!enableMagnetism) return
      const rect    = el.getBoundingClientRect()
      const centerX = rect.width  / 2
      const centerY = rect.height / 2
      const x       = e.clientX - rect.left
      const y       = e.clientY - rect.top
      gsap.to(el, {
        x: (x - centerX) * 0.04,
        y: (y - centerY) * 0.04,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const onClick = (e) => {
      if (!clickEffect) return
      const rect = el.getBoundingClientRect()
      const x    = e.clientX - rect.left
      const y    = e.clientY - rect.top
      const maxD = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      )
      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position:absolute;
        width:${maxD * 2}px;height:${maxD * 2}px;
        border-radius:50%;
        background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,rgba(${glowColor},0.15) 35%,transparent 70%);
        left:${x - maxD}px;top:${y - maxD}px;
        pointer-events:none;z-index:1000;
      `
      el.appendChild(ripple)
      gsap.fromTo(ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.75, ease: "power2.out",
          onComplete: () => ripple.remove() }
      )
    }

    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    el.addEventListener("mousemove",  onMove)
    el.addEventListener("click",      onClick)

    return () => {
      isHoveredRef.current = false
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("mousemove",  onMove)
      el.removeEventListener("click",      onClick)
      clearParticles()
    }
  }, [animateParticles, clearParticles, disableAnimations, enableMagnetism, clickEffect, glowColor])

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={style}
    >
      {children}
    </div>
  )
}

// ── GlobalSpotlight ────────────────────────────────────────────────────────
export function GlobalSpotlight({
  sectionRef,
  glowColor     = "250, 110, 67",
  spotlightRadius = 350,
  disableAnimations = false,
}) {
  const spotRef = useRef(null)

  useEffect(() => {
    if (disableAnimations || !sectionRef?.current) return

    const spotlight = document.createElement("div")
    spotlight.style.cssText = `
      position:fixed;
      width:1200px;height:1200px;
      border-radius:50%;
      pointer-events:none;
      background:radial-gradient(circle,
        rgba(${glowColor},0.06) 0%,
        rgba(${glowColor},0.03) 18%,
        rgba(${glowColor},0.01) 30%,
        transparent 50%
      );
      z-index:200;
      opacity:0;
      transform:translate(-50%,-50%);
      mix-blend-mode:screen;
      transition:opacity 0.15s ease;
    `
    document.body.appendChild(spotlight)
    spotRef.current = spotlight

    const onMove = (e) => {
      if (!spotRef.current || !sectionRef.current) return
      const rect       = sectionRef.current.getBoundingClientRect()
      const inside     =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom

      const cards = sectionRef.current.querySelectorAll(".card")
      if (!inside) {
        spotRef.current.style.opacity = "0"
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"))
        return
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
      let minDist = Infinity

      cards.forEach((card) => {
        const cr      = card.getBoundingClientRect()
        const centerX = cr.left + cr.width  / 2
        const centerY = cr.top  + cr.height / 2
        const dist    = Math.max(
          0,
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
            Math.max(cr.width, cr.height) / 2,
        )
        minDist = Math.min(minDist, dist)

        const intensity =
          dist <= proximity    ? 1
          : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity)
          : 0

        updateCardGlowProperties(card, e.clientX, e.clientY, intensity, spotlightRadius)
      })

      gsap.to(spotRef.current, {
        left: e.clientX, top: e.clientY,
        duration: 0.08, ease: "power2.out",
      })

      const targetOpacity =
        minDist <= proximity    ? 0.4
        : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.4
        : 0

      spotRef.current.style.opacity = targetOpacity.toString()
    }

    const onLeave = () => {
      if (!spotRef.current) return
      spotRef.current.style.opacity = "0"
      sectionRef.current
        ?.querySelectorAll(".card")
        .forEach((c) => c.style.setProperty("--glow-intensity", "0"))
    }

    document.addEventListener("mousemove",  onMove)
    document.addEventListener("mouseleave", onLeave)

    return () => {
      document.removeEventListener("mousemove",  onMove)
      document.removeEventListener("mouseleave", onLeave)
      spotRef.current?.parentNode?.removeChild(spotRef.current)
    }
  }, [sectionRef, glowColor, spotlightRadius, disableAnimations])

  return null
}

// ── CSS injection — call once at app level or in _app ────────────────────
export function BentoGlowStyles({ glowColor = "250, 110, 67" }) {
  return (
    <style>{`
      .card--border-glow {
        --glow-x: 50%;
        --glow-y: 50%;
        --glow-intensity: 0;
        --glow-radius: 200px;
      }

      .card--border-glow::after {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1.5px;
        background: radial-gradient(
          var(--glow-radius) circle at var(--glow-x) var(--glow-y),
          rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
          rgba(${glowColor}, calc(var(--glow-intensity) * 0.45)) 30%,
          transparent 60%
        );
        border-radius: inherit;
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        pointer-events: none;
        z-index: 2;
        transition: opacity 0.25s ease;
      }

      .learnova-particle::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: rgba(${glowColor}, 0.15);
        border-radius: 50%;
        z-index: -1;
      }
    `}</style>
  )
}