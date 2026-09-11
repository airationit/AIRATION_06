"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Briefcase,
  Rocket,
  MessageSquare,
  ShieldCheck,
  Zap,
  Flame,
  Compass,
  Check,
} from "lucide-react";
import { useLaunchConfig } from "@/hooks/use-launch-config";
import { InteractiveDots } from "./interactive-dots";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LaunchWrapperProps {
  children: React.ReactNode;
}

export function LaunchWrapper({ children }: LaunchWrapperProps) {
  const pathname = usePathname();
  const { hasLaunched, launchDateStr, timeLeft, isLoading } =
    useLaunchConfig();

  // Allow access to /delete-account (and legal routes) even during launch countdown
  const isExemptRoute =
    pathname === "/delete-account" ||
    pathname?.startsWith("/delete-account/") ||
    pathname === "/privacy" ||
    pathname?.startsWith("/privacy-policy") ||
    pathname?.startsWith("/mobile-privacy-policy") ||
    pathname === "/terms" ||
    pathname?.startsWith("/terms-and-conditions");

  // Formatted date (e.g. "21 September 2026")
  const formattedDate = useMemo(() => {
    const d = new Date(launchDateStr);
    return isNaN(d.getTime())
      ? "21 September 2026"
      : d.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  }, [launchDateStr]);

  // If already launched or viewing an exempt page like /delete-account, render full page
  if ((!isLoading && hasLaunched) || isExemptRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-dvh flex flex-col justify-between overflow-x-clip bg-background text-foreground select-none font-sans">
      {/* ─────────────────────────────────────────────────────────────
          BACKGROUND LAYER 1: Interactive Dot Field
         ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <InteractiveDots />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BACKGROUND LAYER 2: Fluid Multi-Color Aurora Mesh Lights
         ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Top-center primary brand aura */}
        <motion.div
          animate={{
            scale: [1, 1.18, 0.96, 1],
            x: ["-50%", "-47%", "-53%", "-50%"],
            y: ["0%", "-8%", "5%", "0%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[-18%] h-[46rem] w-[62rem] rounded-full bg-gradient-to-tr from-brand-600/30 via-sky-400/25 to-indigo-600/25 blur-[160px]"
        />

        {/* Right energetic neon sky orb */}
        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.22, 0.38, 0.22],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[25%] h-[36rem] w-[40rem] rounded-full bg-gradient-to-l from-sky-400/25 via-indigo-500/20 to-transparent blur-[140px]"
        />

        {/* Left deep violet & emerald orb */}
        <motion.div
          animate={{
            scale: [1.1, 0.92, 1.1],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute left-[-10%] top-[45%] h-[36rem] w-[40rem] rounded-full bg-gradient-to-r from-violet-600/20 via-brand-600/20 to-emerald-500/15 blur-[140px]"
        />

        {/* Bottom soft horizon glow */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BACKGROUND LAYER 3: Rich SVG Constellation & Network Lines
         ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 h-full w-full opacity-35 dark:opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for connecting lines */}
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>

            {/* Glowing filter for nodes */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connected Network Polygon Lines */}
          <path
            d="M 120 180 L 260 280 L 420 220 L 580 340 L 740 260 L 920 380 L 1100 240 L 1320 350"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M 180 420 L 360 360 L 520 480 L 720 400 L 940 500 L 1160 420"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="0.8"
            strokeDasharray="6 8"
          />

          {/* Network Node Circles with Glow */}
          {[
            { cx: 120, cy: 180 },
            { cx: 260, cy: 280 },
            { cx: 420, cy: 220 },
            { cx: 740, cy: 260 },
            { cx: 920, cy: 380 },
            { cx: 1100, cy: 240 },
            { cx: 1320, cy: 350 },
            { cx: 360, cy: 360 },
            { cx: 720, cy: 400 },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r="4" fill="#38bdf8" filter="url(#glow)" />
              <circle cx={n.cx} cy={n.cy} r="8" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.5" />
            </g>
          ))}
        </svg>

        {/* Twinkling 4-Point SVG Stars across the screen */}
        {[
          { top: "14%", left: "18%", delay: 0, scale: 1 },
          { top: "22%", right: "22%", delay: 1.2, scale: 0.8 },
          { top: "60%", left: "10%", delay: 2.4, scale: 1.2 },
          { top: "68%", right: "14%", delay: 0.8, scale: 0.9 },
          { top: "35%", left: "4%", delay: 3, scale: 0.7 },
          { top: "42%", right: "6%", delay: 1.8, scale: 1.1 },
          { top: "82%", left: "28%", delay: 2.2, scale: 0.8 },
          { top: "78%", right: "32%", delay: 1.5, scale: 1 },
        ].map((star, idx) => (
          <motion.div
            key={idx}
            style={{
              top: star.top,
              left: star.left,
              right: star.right,
              transform: `scale(${star.scale})`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [star.scale * 0.85, star.scale * 1.15, star.scale * 0.85],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            className="absolute"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-sky-400/70">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BACKGROUND LAYER 4: Floating Holographic Icons & Glass Badges
         ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Floating Icon 1: Top-Left Briefcase */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [-4, 6, -4],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex items-center justify-center absolute left-[8%] top-[16%] h-14 w-14 rounded-2xl border border-brand-500/30 bg-card/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl text-brand-500"
        >
          <Briefcase className="h-6 w-6 stroke-[1.8]" />
          <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            Jobs
          </span>
        </motion.div>

        {/* Floating Icon 2: Top-Right Rocket Launch */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [6, -6, 6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="hidden md:flex items-center justify-center absolute right-[9%] top-[18%] h-14 w-14 rounded-2xl border border-sky-500/30 bg-card/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl text-sky-500"
        >
          <Rocket className="h-6 w-6 stroke-[1.8]" />
          <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            Launch
          </span>
        </motion.div>

        {/* Floating Icon 3: Mid-Left AI Radar Compass */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [3, -5, 3],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden lg:flex items-center justify-center absolute left-[5%] top-[50%] h-13 w-13 rounded-2xl border border-indigo-500/30 bg-card/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl text-indigo-500"
        >
          <Compass className="h-6 w-6 stroke-[1.8]" />
          <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            AI Match
          </span>
        </motion.div>

        {/* Floating Icon 4: Mid-Right Direct Recruiter Chat */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="hidden lg:flex items-center justify-center absolute right-[6%] top-[52%] h-13 w-13 rounded-2xl border border-emerald-500/30 bg-card/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl text-emerald-500"
        >
          <MessageSquare className="h-6 w-6 stroke-[1.8]" />
          <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            Chat
          </span>
        </motion.div>

        {/* Floating Icon 5: Bottom-Left Verified Shield */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden xl:flex items-center justify-center absolute left-[10%] bottom-[18%] h-13 w-13 rounded-2xl border border-teal-500/30 bg-card/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl text-teal-500"
        >
          <ShieldCheck className="h-6 w-6 stroke-[1.8]" />
          <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            Verified
          </span>
        </motion.div>

        {/* Floating Icon 6: Bottom-Right Instant Match Offer */}
        <motion.div
          animate={{
            y: [0, 14, 0],
            rotate: [4, -4, 4],
          }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="hidden xl:flex items-center justify-center absolute right-[10%] bottom-[20%] h-13 w-13 rounded-2xl border border-amber-500/30 bg-card/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl text-amber-500"
        >
          <Zap className="h-6 w-6 stroke-[1.8] fill-amber-500/20" />
          <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            Fast Track
          </span>
        </motion.div>

        {/* Dynamic Interactive Card 1 (Left): Live candidate match */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: [0.75, 1, 0.75],
            y: [0, -14, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="hidden 2xl:flex items-center gap-3 absolute left-14 top-40 rounded-2xl border border-border/80 bg-card/85 dark:bg-slate-900/85 p-3.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-sky-500 text-white font-black text-sm shadow-md">
            H
          </div>
          <div className="flex flex-col text-left pr-2">
            <span className="text-[13px] font-bold text-foreground">Next.js Lead Engineer</span>
            <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
              <Check className="h-3 w-3" /> 98% Compatibility Match
            </span>
          </div>
        </motion.div>

        {/* Dynamic Interactive Card 2 (Right): 1-Swipe Hired */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: [0.75, 1, 0.75],
            y: [0, 16, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden 2xl:flex items-center gap-3 absolute right-16 top-44 rounded-2xl border border-border/80 bg-card/85 dark:bg-slate-900/85 p-3.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
            <Zap className="h-5 w-5 fill-white" />
          </div>
          <div className="flex flex-col text-left pr-2">
            <span className="text-[13px] font-bold text-foreground">Swiped Right • Applied!</span>
            <span className="text-[11px] text-muted-foreground">Direct recruiter chat unlocked</span>
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TOP NAVBAR / BRAND HEADER
         ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl px-6 py-4 sm:px-10 lg:px-16 transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/icon.png"
                alt={`${siteConfig.name} icon`}
                width={36}
                height={36}
                priority
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/images/wordmark-navy.png"
                alt={siteConfig.name}
                width={112}
                height={28}
                priority
                className="h-5.5 w-auto object-contain dark:hidden transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/images/wordmark-white.png"
                alt={siteConfig.name}
                width={112}
                height={28}
                priority
                className="hidden h-5.5 w-auto object-contain dark:block transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-muted-foreground border-l border-border/70 pl-4">
              <span>Swipe</span>
              <span className="text-brand-500">•</span>
              <span>Match</span>
              <span className="text-brand-500">•</span>
              <span>Get Hired</span>
            </span>
          </div>

          {/* Status & Support Contact */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Live Synchronized Beacon */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="tracking-wide text-foreground/80">Countdown Synchronized</span>
            </div>

            <a
              href="mailto:support@hirance.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/70 px-4 py-1.5 text-xs font-semibold text-foreground/80 backdrop-blur-md transition-all hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 shadow-2xs"
            >
              <Mail className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT & COUNTDOWN PRESENTATION
         ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:py-16">
        {/* Typographic Kicker (NO chip or pill per rules) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand-600 dark:text-brand-400"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-sky-500" />
          <span>Official Platform Launch</span>
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-sky-500" />
        </motion.div>

        {/* Dynamic Launch Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-balance text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black tracking-tight text-foreground leading-[1.06]"
        >
          We Are Launching On{" "}
          <span className="text-gradient inline-block bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600 dark:from-brand-400 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent">
            {formattedDate}
          </span>
        </motion.h1>

        {/* Humanized Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
        >
          India&apos;s swipe-based hiring platform is almost here. Fastest way to Post &amp; Apply for jobs—{" "}
          <span className="font-semibold text-foreground">
            No forms, No scrolling, No waiting.
          </span>
        </motion.p>

        {/* ── Central Animated Countdown Ticker with Layered SVG Radar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 sm:mt-12 w-full max-w-3xl"
        >
          {/* Animated Sweeping Radar Beam SVG */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 dark:opacity-35" aria-hidden="true">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="h-[380px] w-[380px] sm:h-[480px] sm:w-[480px]"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="radarSweep" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric rings */}
              <circle cx="200" cy="200" r="185" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" className="text-brand-500/60" />
              <circle cx="200" cy="200" r="135" stroke="currentColor" strokeWidth="1" className="text-sky-400/50" />
              <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" className="text-indigo-400/50" />
              <circle cx="200" cy="200" r="35" stroke="currentColor" strokeWidth="1" className="text-brand-400/40" />

              {/* Crosshairs */}
              <line x1="15" y1="200" x2="385" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-border/60" />
              <line x1="200" y1="15" x2="200" y2="385" stroke="currentColor" strokeWidth="0.5" className="text-border/60" />

              {/* Sweeping radar beam */}
              <path
                d="M200 200 L385 200 A185 185 0 0 0 330 70 Z"
                fill="url(#radarSweep)"
                opacity="0.65"
              />
            </motion.svg>
          </div>

          {/* Glowing Glass Container */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-brand-500/35 via-sky-400/25 to-border/40 shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 rounded-[calc(1.5rem-1px)] bg-card/85 dark:bg-slate-950/80 p-4 sm:p-7 md:p-8 backdrop-blur-2xl">
              {[
                { label: "Days", val: timeLeft.days },
                { label: "Hours", val: timeLeft.hours },
                { label: "Minutes", val: timeLeft.minutes },
                { label: "Seconds", val: timeLeft.seconds },
              ].map((unit, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-background/50 dark:bg-slate-900/50 p-3 sm:p-5 md:p-6 transition-all duration-300 hover:border-brand-500/50 hover:bg-background/80 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  {/* Subtle top gloss highlight */}
                  <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent" />

                  {/* Animated Flipping/Sliding Digit */}
                  <div className="relative h-10 sm:h-16 md:h-20 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={unit.val}
                        initial={{ y: 12, opacity: 0.2, filter: "blur(2px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -12, opacity: 0.2, filter: "blur(2px)" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="font-mono text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors inline-block"
                      >
                        {String(unit.val).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Unit Label */}
                  <span className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {unit.label}
                  </span>

                  {/* Dynamic LED accent pulse */}
                  <div className="mt-2.5 h-1 w-6 sm:w-10 rounded-full bg-brand-500/25 group-hover:bg-brand-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 3 Value Highlights with Rich Interactive SVGs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 text-left"
        >
          {/* Feature 1: Swipe to Apply */}
          <div className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card/75 dark:bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-0.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-sky-500/20 border border-brand-500/25 text-brand-600 dark:text-brand-400 shadow-2xs group-hover:scale-105 transition-transform">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9l6 6-6 6" />
                <path d="M4 4v7a4 4 0 0 0 4 4h11" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                1-Swipe Apply
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Right swipe to apply instantly. Zero resumes to upload, zero lengthy forms.
              </p>
            </div>
          </div>

          {/* Feature 2: AI Compatibility Scores */}
          <div className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card/75 dark:bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-purple-500/20 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 shadow-2xs group-hover:scale-105 transition-transform">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
                <circle cx="12" cy="12" r="3" className="fill-indigo-500/30" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                AI Match Scores
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Real-time compatibility scores calculated in milliseconds before you swipe.
              </p>
            </div>
          </div>

          {/* Feature 3: Direct Recruiter Connect */}
          <div className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card/75 dark:bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/20 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 shadow-2xs group-hover:scale-105 transition-transform">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" />
                <path d="M12 10h.01" />
                <path d="M16 10h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Direct Chat
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Match with recruiters and converse directly without recruitment agency delays.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 w-full border-t border-border/50 bg-background/50 px-6 py-6 text-center text-xs text-muted-foreground backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Hirance Technologies Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-border">•</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="text-border">•</span>
            <Link href="/mobile-privacy-policy" className="hover:text-foreground transition-colors">
              Mobile Privacy
            </Link>
            <span className="text-border">•</span>
            <Link href="/delete-account" className="hover:text-foreground transition-colors">
              Delete Account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
