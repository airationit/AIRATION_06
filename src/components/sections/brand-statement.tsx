"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Target, MessageSquare, BadgeCheck } from "lucide-react";
import { Logo } from "@/components/shared/logo";

// First-timer friendly value highlights
const HIGHLIGHTS = [
  {
    icon: Zap,
    title: "Apply in 2 seconds",
    text: "One swipe right. No forms, no cover letters.",
  },
  {
    icon: Target,
    title: "See your match %",
    text: "Know your fit before you ever apply.",
  },
  {
    icon: MessageSquare,
    title: "Chat with recruiters",
    text: "No more application black hole.",
  },
  {
    icon: BadgeCheck,
    title: "Free for candidates",
    text: "Always. Swipe and apply at zero cost.",
  },
];

const MARQUEE = ["SWIPE.", "APPLY.", "GET HIRED.", "SWIPE.", "APPLY.", "GET HIRED."];

export function BrandStatement() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden bg-[var(--hi-navy)] text-white"
      data-testid="brand-statement-section"
      aria-label="Hirance Brand Statement"
    >
      {/* Background Dot Texture */}
      <div className="absolute inset-0 dot-bg opacity-40" />

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      {/* editorial marquee */}
      <div className="overflow-hidden mb-20 mask-fade-r">
        <div className="flex gap-8 w-max animate-marquee-slow select-none" aria-hidden="true">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span
              key={i}
              className={`font-display text-6xl sm:text-8xl font-black tracking-tight ${
                i % 3 === 2 ? "text-gradient-blue" : "text-white/10"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative text-center">
        {/* Centered Hirance Logo */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-8"
        >
          <div className="scale-125">
            <Logo dark width={180} height={50} />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-300 max-w-lg mx-auto"
        >
          Hirance — The Smarter Way to Hire &amp; Get Hired.
        </motion.p>

        {/* value highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={reducedMotion ? undefined : { y: -5 }}
                data-testid={`brand-highlight-${i}`}
                className="rounded-3xl glass-dark border border-white/10 p-6 text-left"
              >
                <div
                  className="w-12 h-12 rounded-2xl grid place-items-center text-white mb-4"
                  style={{ background: "linear-gradient(135deg,#0284C7,#0369A1)" }}
                >
                  <Icon size={22} />
                </div>
                <p className="font-display font-extrabold text-lg text-white">
                  {h.title}
                </p>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  {h.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BrandStatement;
