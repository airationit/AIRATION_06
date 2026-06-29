"use client";

import { motion } from "framer-motion";
import { variants, transitions } from "@/config/animations";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center gap-8 px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={variants.staggerContainer}
      >
        <motion.h1
          className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
          variants={variants.fadeInUp}
          transition={transitions.smooth}
        >
          Airation
        </motion.h1>

        <motion.p
          className="max-w-xl text-lg text-muted-foreground sm:text-xl"
          variants={variants.fadeInUp}
          transition={transitions.smooth}
        >
          A modern experience powered by GSAP, Framer Motion, React Three Fiber,
          and smooth scroll.
        </motion.p>

        <motion.div
          className="flex gap-4"
          variants={variants.fadeInUp}
          transition={transitions.smooth}
        >
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent">
            Learn More
          </button>
        </motion.div>
      </motion.section>
    </main>
  );
}
