"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { JobListItem } from "@/types/jobs";

interface HeroVideoCardProps {
  className?: string;
  initialJobs?: JobListItem[];
}

export function HeroVideoCard({ className }: HeroVideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const [isMuted, setIsMuted] = useState(true);

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
          className="h-full w-full object-cover object-[center_35%] blur-[2px] scale-[1.02] opacity-95 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Subtle Brand Blue Atmosphere Tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/30 via-blue-950/20 to-transparent pointer-events-none" />

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

      {/* Main Content Area: Left Column Anchored over Video */}
      <div className="relative z-20 h-full w-full flex items-center px-6 xs:px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 w-full my-auto">
          {/* Left Column: Headline, subtext, and CTA */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center space-y-2.5 xs:space-y-3 sm:space-y-4 lg:space-y-5 max-w-sm xs:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl"
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
            </div>
          </motion.div>
        </div>
      </div>
    </figure>
  );
}
