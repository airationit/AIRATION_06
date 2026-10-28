"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Target, MessageSquare, BadgeCheck } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

// First-timer friendly value highlights matching reference image
const HIGHLIGHTS = [
  {
    icon: Zap,
    step: "01",
    title: "Apply in 2 seconds",
    text: "One swipe right. No forms or cover letters.",
    iconBg: "bg-[#0091FF]",
    iconShadow: "shadow-[0_4px_20px_rgba(0,145,255,0.45)]",
    glow: "bg-[#0091FF]/25",
  },
  {
    icon: Target,
    step: "02",
    title: "See your match %",
    text: "Instantly know your fit score before applying.",
    iconBg: "bg-[#A855F7]",
    iconShadow: "shadow-[0_4px_20px_rgba(168,85,247,0.45)]",
    glow: "bg-[#A855F7]/25",
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Chat with recruiters",
    text: "Direct connection. Zero application black holes.",
    iconBg: "bg-[#0284C7]",
    iconShadow: "shadow-[0_4px_20px_rgba(2,132,199,0.45)]",
    glow: "bg-[#0284C7]/25",
  },
  {
    icon: BadgeCheck,
    step: "04",
    title: "Free for candidates",
    text: "Always 100% free for candidates. Apply at zero cost.",
    iconBg: "bg-[#10B981]",
    iconShadow: "shadow-[0_4px_20px_rgba(16,185,129,0.45)]",
    glow: "bg-[#10B981]/25",
  },
];

const MARQUEE = ["SWIPE.", "MATCH.", "GET HIRED.", "SWIPE.", "MATCH.", "GET HIRED."];

export function BrandStatement() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden rounded-t-[28px] sm:rounded-t-[44px] lg:rounded-t-[56px] border-t border-white/10 bg-[var(--hi-navy)] text-white shadow-2xl shadow-slate-950/20"
      data-testid="brand-statement-section"
      aria-label="Hirance Brand Statement"
    >
      {/* Background Dot Texture */}
      <div className="absolute inset-0 dot-bg opacity-40" />

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[300px] sm:h-[350px] bg-sky-500/10 rounded-full blur-[120px] sm:blur-[140px]"
        aria-hidden="true"
      />

      {/* editorial marquee */}
      <div className="overflow-hidden mb-8 sm:mb-12 lg:mb-16 mask-fade-r">
        <div className="flex gap-4 sm:gap-8 w-max animate-marquee-slow select-none" aria-hidden="true">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span
              key={i}
              className={`font-display text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight ${
                i % 3 === 2 ? "text-gradient-blue" : "text-white/10"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Centered Hirance Logo */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="scale-110 sm:scale-125">
            <Logo dark href="/" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-lg mx-auto leading-relaxed px-2"
        >
          Hirance — The Smarter Way to Hire &amp; Get Hired.
        </motion.p>

        {/* value highlights: 2x2 grid on mobile for compact, scannable layout; 4 columns on desktop */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
                data-testid={`brand-highlight-${i}`}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A1020]/90 p-5 sm:p-6 text-left backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#0D1528] hover:shadow-xl hover:shadow-sky-500/5 flex flex-col justify-between"
              >
                {/* Subtle Hover Radial Spotlight */}
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full ${h.glow} blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
                />

                {/* Top Row: Icon + Step Index */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div
                    className={cn(
                      "h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center text-white",
                      h.iconBg,
                      h.iconShadow
                    )}
                  >
                    <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                    {h.step}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-tight leading-snug">
                    {h.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-400 mt-1.5 leading-relaxed">
                    {h.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BrandStatement;
