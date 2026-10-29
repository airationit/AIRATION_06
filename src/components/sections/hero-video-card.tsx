"use client";

import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface HeroVideoCardProps {
  className?: string;
}

export function HeroVideoCard({ className }: HeroVideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

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
        Apply in Seconds. Match Instantly. Video showcase of frictionless hiring on Hirance.
      </figcaption>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/hero_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-center scale-[1.02] opacity-90 sm:opacity-95 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Soft targeted gradient on left side for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent sm:w-3/4 md:w-2/3 lg:w-3/5" />
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-slate-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 h-full w-full overflow-hidden flex items-center justify-start px-6 xs:px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-6 sm:py-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left justify-center space-y-3 sm:space-y-4 lg:space-y-5 max-w-lg lg:max-w-xl w-full"
        >
          {/* Main Headline */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.1] drop-shadow-md">
            Apply in Seconds.{" "}
            <span className="bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Match Instantly.
            </span>
          </h2>

          {/* Short, precise, easy to get */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed drop-shadow-sm max-w-md">
            No forms. Just swipe right to apply.
          </p>

          {/* Action Buttons */}
          <div className="pt-1 sm:pt-2 flex flex-row flex-wrap items-center gap-3">
            <a
              href={siteConfig.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 xs:h-11 sm:h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 xs:px-6 sm:px-7 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-700 hover:shadow-[0_0_28px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Swiping</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </figure>
  );
}
