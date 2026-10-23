"use client";

import { motion } from "framer-motion";

/**
 * App-wide animated gradient backdrop.
 *
 * A modern "mesh gradient" built from a handful of large, blurred orbs that
 * slowly drift and breathe. Colors are pulled straight from the brand theme
 * (brand blue + accent violet, with a sky/indigo lift) so it stays cohesive
 * with the rest of the UI. Sits fixed behind all content and adapts to both
 * light and dark mode via Tailwind's blend modes.
 */

type Orb = {
  className: string;
  animate: {
    x: number[];
    y: number[];
    scale: number[];
  };
  duration: number;
};

const orbs: Orb[] = [
  {
    // Soft white glow — top right
    className:
      "right-[-15%] top-[-8%] h-[48vw] w-[48vw] bg-white/60 dark:bg-slate-800/20",
    animate: { x: [0, -80, 40, 0], y: [0, 90, -20, 0], scale: [1, 0.92, 1.2, 1] },
    duration: 28,
  },
  {
    // Soft white spark — mid left, subtle
    className:
      "left-[-8%] top-[38%] h-[34vw] w-[34vw] bg-white/40 dark:bg-white/10",
    animate: { x: [0, 70, 0, 0], y: [0, -40, 50, 0], scale: [1, 1.2, 0.95, 1] },
    duration: 32,
  },
];

export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base theme wash - clean neutral without blue staining */}
      <div className="absolute inset-0 bg-white dark:bg-[#070A14]" />

      {/* Drifting mesh orbs */}
      <div className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[110px] ${orb.className}`}
            animate={orb.animate}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut" as const,
            }}
          />
        ))}
      </div>

      {/* Top + bottom vignette so content edges stay legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/60" />
    </div>
  );
}
