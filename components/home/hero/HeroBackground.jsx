// FULL RESPONSIVE FIX — replaced px with responsive vw + clamp

"use client";

import { motion } from "framer-motion";

function FloatingShape({
  className,
  delay = 0,
  width,
  height,
  rotate = 0,
  gradient,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 12 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.6,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.4 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r ${gradient} to-transparent
            border border-white/[0.08]
            shadow-[0_8px_40px_0_color-mix(in_srgb,var(--color-brand)_8%,transparent)]
            after:absolute after:inset-0 after:rounded-full
            after:bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--color-brand)_12%,transparent),transparent_70%)]
            backdrop-blur-[1px]
          `}
        />
      </motion.div>
    </motion.div>
  );
}

// rest unchanged...

export default function HeroBackground({ children }) {
  return (
    <div className="fixed top-0 z-0 w-screen h-screen bg-dark pointer-events-none">
      {/* Shapes — RESPONSIVE */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape
          delay={0.2}
          width="clamp(300px, 75vw, 950px)"
          height="clamp(80px, 15vw, 20rem)"
          rotate={10}
          gradient="from-brand/10"
          className="left-[-25%] top-[5%] sm:left-[-15%] sm:top-[30%]"
        />

        

        <FloatingShape
          delay={0.3}
          width="clamp(200px, 40vw, 380px)"
          height="clamp(60px, 10vw, 110px)"
          rotate={-7}
          gradient="from-white/[0.05]"
          className="left-[-5%] bottom-[10%] sm:left-[5%] sm:bottom-[15%]"
        />

        <FloatingShape
          delay={0.6}
          width="clamp(140px, 28vw, 260px)"
          height="clamp(40px, 8vw, 80px)"
          rotate={22}
          gradient="from-brand/10"
          className="right-[5%] top-[3%] sm:right-[20%] sm:top-[6%]"
        />

        <FloatingShape
          delay={0.75}
          width="clamp(120px, 22vw, 200px)"
          height="clamp(30px, 6vw, 60px)"
          rotate={-20}
          gradient="from-white/[0.04]"
          className="left-[10%] top-[2%] sm:left-[24%] sm:top-[4%]"
        />

        <FloatingShape
          delay={0.55}
          width="clamp(260px, 65vw, 780px)"
          height="clamp(80px, 13vw, 170px)"
          rotate={-12}
          gradient="from-brand/5"
          className="right-[-25%] bottom-[2%] sm:right-[-10%] sm:bottom-[6%]"
        />
      </div>

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
