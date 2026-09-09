"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks";
import { CandidatePhoneMockup } from "./candidate-phone-mockup";

interface HeroVideoCardProps {
  className?: string;
}

export function HeroVideoCard({ className }: HeroVideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto play/pause video when in viewport for optimal performance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Adaptive 3D orientation per device:
  // Mobile (<640px): Straight-on for ergonomic touch interactions and 0 edge clipping.
  // Tablet (640-1023px): Subtle 3D tilt (-10°) for clean balanced stage.
  // Laptop/Desktop (>=1024px): Full rich cinematic 3D perspective (-22°).
  const rotationValues = mounted
    ? isMobile
      ? { rotateY: 0, rotateX: 0, rotateZ: 0 }
      : isTablet
      ? { rotateY: -10, rotateX: 4, rotateZ: 1.5 }
      : { rotateY: -22, rotateX: 6, rotateZ: 3.5 }
    : { rotateY: -22, rotateX: 6, rotateZ: 3.5 };

  return (
    <figure
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/15 bg-slate-950 text-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.35),0_0_1px_1px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/5 dark:ring-white/10 select-none",
        className
      )}
      aria-label="Hirance swipe-based job hiring platform showcase"
    >
      <figcaption className="sr-only">
        Apply in Seconds. Match Instantly. Interactive job card swipe demo showcasing frictionless hiring on Hirance.
      </figcaption>

      {/* Video Background (Bright, vivid with subtle blur) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/hero_video.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-center scale-[1.03] filter blur-[2px] xs:blur-[3px] sm:blur-[4px] opacity-90 sm:opacity-95 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Mobile & Tablet Portrait: Top-to-bottom subtle gradient overlay for guaranteed text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-slate-950/85 lg:hidden" />

        {/* Laptop & Desktop: Targeted Soft Gradient behind Left Text Only (Leaves right side bright & vivid) */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-slate-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />
      </div>

      {/* Floating Audio Control (Subtle, glassmorphic) */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
        className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 flex h-7.5 w-7.5 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
      >
        {isMuted ? (
          <VolumeX className="h-3.5 w-3.5 text-slate-300" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-brand-400 animate-pulse" />
        )}
      </button>

      {/* Main Content Area: Left & Right Wing Alignment across Full Card Width */}
      <div className="relative z-20 h-full w-full overflow-hidden flex items-center justify-center px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 w-full my-auto">
          {/* Left Column: Anchored to the LEFT Edge (Clean, Precise & Minimal) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center space-y-2.5 xs:space-y-3 sm:space-y-4 lg:space-y-5 max-w-sm xs:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl w-full"
          >
            {/* Main Headline */}
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.1] drop-shadow-md">
              Apply in Seconds.{" "}
              <span className="bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Match Instantly.
              </span>
            </h2>

            {/* Short, precise, easy to get */}
            <p className="text-xs xs:text-sm sm:text-base lg:text-base xl:text-lg text-slate-200 font-normal leading-relaxed drop-shadow-sm max-w-xs xs:max-w-sm sm:max-w-md">
              No forms. Just swipe right to apply.
            </p>

            {/* Action Buttons */}
            <div className="pt-0.5 xs:pt-1 sm:pt-2 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 xs:gap-2.5 sm:gap-3">
              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-9 xs:h-10 sm:h-11 lg:h-10 xl:h-11 items-center justify-center gap-1.5 xs:gap-2 rounded-full bg-brand-600 px-4 xs:px-5 sm:px-6 lg:px-5 xl:px-6 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-500 hover:shadow-[0_0_28px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Swiping</span>
                <ArrowRight className="h-3.5 w-3.5 xs:h-4 xs:w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                href={siteConfig.links.employer}
                className="inline-flex h-9 xs:h-10 sm:h-11 lg:h-10 xl:h-11 items-center justify-center gap-1.5 xs:gap-2 rounded-full border border-white/25 bg-slate-900/60 px-4 xs:px-5 sm:px-6 lg:px-5 xl:px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <span>Post a Job</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Anchored to the RIGHT Edge with Responsive 3D Perspective */}
          <div className="relative flex items-center justify-center lg:justify-end shrink-0 w-full lg:w-auto [perspective:1000px] py-0.5 sm:py-2">
            {/* Multi-layered Neon Ambient Aura behind phone */}
            <div
              className="pointer-events-none absolute h-[180px] w-[180px] xs:h-[220px] xs:w-[220px] sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px] xl:h-[390px] xl:w-[390px] 2xl:h-[450px] 2xl:w-[450px] rounded-full bg-gradient-to-tr from-brand-500/30 via-blue-500/20 to-indigo-500/20 blur-[50px] xs:blur-[70px] sm:blur-[90px]"
              aria-hidden="true"
            />

            {/* 3D Ground Cast Shadow */}
            <div
              className={cn(
                "pointer-events-none absolute rounded-full bg-black/75 blur-xl transition-all duration-500",
                mounted && isMobile
                  ? "-bottom-3 left-1/2 -translate-x-1/2 h-6 w-48 sm:w-56 opacity-60"
                  : "-bottom-5 right-2 sm:right-5 lg:right-6 h-10 w-48 sm:w-56 lg:w-64 xl:w-72 2xl:w-80 transform rotate-3 opacity-80"
              )}
              aria-hidden="true"
            />

            {/* 3D Tilted Mockup Stage (Compact on laptops, expansive on large desktop) */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.85, ...rotationValues }
              }
              animate={{
                opacity: 1,
                scale: 1,
                ...rotationValues,
              }}
              whileHover={
                mounted && !isMobile && !reducedMotion
                  ? { rotateY: -16, rotateX: 4, rotateZ: 2, transition: { duration: 0.3 } }
                  : undefined
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="relative flex justify-center items-center scale-[0.80] xs:scale-[0.85] sm:scale-[0.88] md:scale-[0.92] lg:scale-[0.82] xl:scale-[0.88] 2xl:scale-[1.04] origin-center lg:origin-right py-0.5 sm:py-1"
            >
              {/* 3D Phone Chassis with Physical Extrusion Edge & Deep Directional Shadow */}
              <div
                className="relative rounded-[36px] xs:rounded-[40px] sm:rounded-[44px] ring-1 ring-white/15"
                style={{
                  boxShadow:
                    mounted && isMobile
                      ? "0 18px 40px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)"
                      : "-1px 0 0 rgba(255, 255, 255, 0.25), 2px 2px 0 #334155, 4px 4px 0 #1e293b, 6px 6px 0 #0f172a, 8px 8px 0 #020617, -24px 32px 60px -10px rgba(0, 0, 0, 0.8), -8px 14px 26px rgba(0, 0, 0, 0.5)",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <CandidatePhoneMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </figure>
  );
}
