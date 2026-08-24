"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface CandidateCTAProps {
  onFindJobs?: () => void;
  className?: string;
}

function AppleStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 170 170"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.87-12-14.49-6.09-9.35-10.87-20.02-14.34-32.01-3.48-11.99-5.22-23.08-5.22-33.27 0-14.92 3.8-27.18 11.39-36.78 7.59-9.6 17.06-14.46 28.4-14.59 4.35 0 9.24 1.13 14.67 3.39 5.43 2.26 9.17 3.44 11.22 3.53 1.62-.1 5.39-1.28 11.31-3.53 5.92-2.25 10.7-3.28 14.34-3.08 13.06.84 23.36 5.62 30.89 14.34-11.53 7.02-17.18 16.71-16.96 29.07.22 10.02 4.09 18.39 11.62 25.12 7.53 6.73 16.32 10.37 26.37 10.92-2.29 6.86-4.94 13.62-7.95 20.28zM119.22 31.84c0-7.39 2.66-14.37 7.97-20.93 5.31-6.56 11.97-10.64 19.98-12.24.23 1.57.34 2.94.34 4.12 0 7.4-2.73 14.4-8.19 21.01-5.46 6.61-12.16 10.74-20.1 12.39-.23-1.47-.35-2.92-.35-4.35z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden="true"
      role="img"
    >
      <path
        fill="#00D3FF"
        d="M47 24.6c-5.2 5.6-8.3 14.2-8.3 25.4v412c0 11.2 3.1 19.8 8.3 25.4l1.4 1.3 230.9-230.9v-5.4L48.4 23.4 47 24.6z"
      />
      <path
        fill="#00F076"
        d="M356.4 343.9l-77-77v-5.4l77-77 1.7 1 91.2 51.8c26 14.8 26 39 0 53.8l-91.2 51.8-1.7 1z"
      />
      <path
        fill="#FFD900"
        d="M358.1 342.9l-78.7-78.7L47 497.3c8.6 9.1 22.7 10.2 38.7 1.1l272.4-155.5z"
      />
      <path
        fill="#F43249"
        d="M358.1 185.5L85.7 30C69.7 20.9 55.6 22 47 31.1l232.4 232.4 78.7-78z"
      />
    </svg>
  );
}

export function CandidateCTA({ onFindJobs, className }: CandidateCTAProps) {
  const reducedMotion = useReducedMotion();

  const deckCards = [
    { dir: 1, delay: 0, c: "#00E5FF", m: "96%" },
    { dir: -1, delay: 1.6, c: "#38bdf8", m: "88%" },
    { dir: 1, delay: 3.2, c: "#0ea5e9", m: "92%" },
  ];

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 text-white",
        "border border-white/15 shadow-2xl shadow-sky-950/30",
        className
      )}
      style={{
        background:
          "linear-gradient(135deg, #0284C7 0%, #0369A1 55%, #0B1528 100%)",
      }}
      data-testid="candidate-cta-section"
    >
      {/* Background Decorative Ambient Aura */}
      <div
        className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-sky-400/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Animated Swipe Deck on the Right Side (Visible on sm and up) */}
      <div
        className="absolute right-4 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 w-[220px] sm:w-[240px] h-[290px] sm:h-[310px] pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        {/* Static background cards for visual depth */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] scale-90 translate-y-4" />
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.05] scale-95 translate-y-2" />

        {/* Dynamic Swiping Glass Cards */}
        {deckCards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-3xl border border-white/20 bg-white/[0.09] backdrop-blur-sm p-5 flex flex-col shadow-lg select-none"
            initial={{ x: 0, rotate: 0, opacity: 1 }}
            animate={
              reducedMotion
                ? {}
                : {
                    x: [0, 0, card.dir * 320, card.dir * 320, 0],
                    rotate: [0, 0, card.dir * 20, card.dir * 20, 0],
                    opacity: [1, 1, 0, 0, 1],
                  }
            }
            transition={{
              duration: 4.8,
              times: [0, 0.45, 0.62, 0.9, 1],
              repeat: Infinity,
              delay: card.delay,
              ease: "easeInOut",
            }}
          >
            {/* Card Header Placeholder */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-xl shadow-xs shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${card.c}, #0284C7)`,
                }}
              />
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="h-2 w-20 rounded-full bg-white/40" />
                <div className="h-2 w-14 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Match Percentage Pill */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-400/20 px-2.5 py-1 border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="font-mono-hi text-[10px] font-extrabold text-emerald-200">
                {card.m} MATCH
              </span>
            </div>

            {/* Content Wireframe Bars */}
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded-full bg-white/15" />
              <div className="h-2 w-4/5 rounded-full bg-white/15" />
              <div className="h-2 w-2/3 rounded-full bg-white/15" />
            </div>

            {/* Role Tags */}
            <div className="mt-auto flex gap-1.5">
              {["React", "Node"].map((t) => (
                <span
                  key={t}
                  className="text-[9.5px] font-medium px-2.5 py-0.5 rounded-full bg-white/15 text-white/80 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Swipe Verdict Stamp (APPLY / SKIP) */}
            {!reducedMotion && (
              <motion.div
                className={cn(
                  "absolute top-4 border-2 font-black text-sm px-2.5 py-0.5 rounded-lg select-none uppercase tracking-wider",
                  card.dir === 1
                    ? "left-4 text-emerald-300 border-emerald-300 bg-emerald-950/40"
                    : "right-4 text-rose-300 border-rose-300 bg-rose-950/40"
                )}
                style={{
                  transform: `rotate(${card.dir === 1 ? -14 : 14}deg)`,
                }}
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: 4.8,
                  times: [0, 0.45, 0.55, 0.9, 1],
                  repeat: Infinity,
                  delay: card.delay,
                }}
              >
                {card.dir === 1 ? "APPLY" : "SKIP"}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Left Content */}
      <div className="relative z-10 max-w-xl text-left">
        {/* Chip Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-1.5 mb-5 select-none">
          <Sparkles size={14} className="text-cyan-200 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-white">
            Free forever for candidates
          </span>
        </div>

        {/* Heading */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-balance text-white">
          Your Next Opportunity <br className="hidden sm:inline" />
          Is Waiting.
        </h3>

        {/* Subtext */}
        <p className="mt-3.5 text-base sm:text-lg text-white/85 leading-relaxed text-pretty">
          Swipe through jobs. Apply in seconds. Get hired faster.
        </p>

        {/* Action Button: Find Jobs */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {onFindJobs ? (
            <button
              type="button"
              onClick={onFindJobs}
              data-testid="candidate-cta-find-jobs-button"
              className="group flex items-center justify-center gap-2.5 font-bold text-[#060c18] bg-white hover:bg-cyan-200 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Find Jobs</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          ) : (
            <Link
              href="/jobs"
              data-testid="candidate-cta-find-jobs-button"
              className="group flex items-center justify-center gap-2.5 font-bold text-[#060c18] bg-white hover:bg-cyan-200 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Find Jobs</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>

        {/* App Download Badges */}
        <div className="mt-6 pt-1">
          <p className="font-mono-hi text-[11px] font-bold uppercase tracking-widest text-white/70 mb-2.5 select-none">
            Or download the app
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {/* App Store Button */}
            <a
              href={siteConfig.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Hirance on Apple App Store"
              className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-4 py-2.5 text-left text-white shadow-xs transition-all duration-200 hover:scale-[1.02]"
            >
              <AppleStoreIcon className="h-5 w-5 fill-current shrink-0 text-white" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-wider text-white/70">
                  Download on the
                </span>
                <span className="text-xs font-bold text-white mt-0.5">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href={siteConfig.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Hirance on Google Play Store"
              className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-4 py-2.5 text-left text-white shadow-xs transition-all duration-200 hover:scale-[1.02]"
            >
              <GooglePlayIcon className="h-5 w-5 shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-wider text-white/70">
                  Get it on
                </span>
                <span className="text-xs font-bold text-white mt-0.5">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CandidateCTA;
