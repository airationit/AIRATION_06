"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Hero } from "./hero";
import { Hero2 } from "./hero-2";

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the HeroSequence section (220vh total height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for fluid scrolling
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Phase 1 (0.0 -> 0.4): Scale down Hero 1 copy text smoothly
  const hero1Scale = useTransform(springProgress, [0, 0.4], [1, 0.78]);
  const hero1Opacity = useTransform(springProgress, [0.45, 0.85], [1, 0.4]);

  // Phase 2 (0.45 -> 0.95): Hero 2 slides in smoothly from left (-100% -> 0%) OVER Hero 1
  const hero2X = useTransform(springProgress, [0.45, 0.95], ["-100%", "0%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[220vh]">
      {/* Sticky viewport container (Locked at top-0, 100vh full screen) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Layer 1 (z-10): Hero 1 (Locked in place at top-0) */}
        <motion.div
          style={{
            scale: hero1Scale,
            opacity: hero1Opacity,
          }}
          className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center items-center overflow-y-auto bg-background"
        >
          <Hero />
        </motion.div>

        {/* Layer 2 (z-20): Hero 2 (Slides smoothly from the left directly OVER Hero 1) */}
        <motion.div
          style={{ x: hero2X }}
          className="absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-slate-950 shadow-2xl"
        >
          <Hero2 />
        </motion.div>

      </div>
    </section>
  );
}
