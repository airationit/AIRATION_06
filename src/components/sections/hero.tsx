"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GooglePlayButton } from "@/components/shared";
import { JobPostDemo } from "./job-post-demo";

const headlineWords = ["Swipe.", "Match.", "Get", "Hired."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[10%] h-[32rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[130px]" />
        <div className="absolute right-[-10%] top-[25%] h-[26rem] w-[30rem] rounded-full bg-sky-300/12 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* HERO COPY TEXT SECTION */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
          {/* Clean Kicker (No chip pill, pure crisp typography) */}
          <motion.p
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 14, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              delay: reducedMotion ? 0 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400"
          >
            India&apos;s 1st Swipe-Based Hiring Platform
          </motion.p>

          {/* Headline Words with 3D perspective entrance */}
          <h1
            id="hero-heading"
            className="max-w-4xl text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem] [perspective:1000px]"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 35, rotateX: -20, filter: "blur(10px)" }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: reducedMotion ? 0 : 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  i >= 2
                    ? "text-gradient mr-[0.22em] inline-block bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600 dark:from-brand-400 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent"
                    : "mr-[0.22em] inline-block"
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Key Differentiator Subheading */}
          <motion.p
            initial={
              reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-5 sm:mt-6 max-w-2xl text-pretty text-base sm:text-xl font-semibold text-foreground/90 leading-snug"
          >
            Fastest way to Post &amp; Apply for jobs—
            <span className="text-brand-600 dark:text-brand-400 font-bold">
              No forms, No scrolling, No waiting.
            </span>
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: reducedMotion ? 0 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-7 sm:mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href={siteConfig.links.employer}
              className="group inline-flex h-12 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_0_24px_rgba(37,99,235,0.4)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Start hiring today"
              tabIndex={0}
            >
              Start hiring today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <GooglePlayButton animate={!reducedMotion} />
          </motion.div>
        </div>
      </div>

      {/* INTERACTIVE JOB DEMO SECTION */}
      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-3 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: reducedMotion ? 0 : 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] lg:h-[650px] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-brand-900/10 dark:shadow-black/40"
        >
          <JobPostDemo className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
