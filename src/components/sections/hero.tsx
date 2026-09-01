"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GooglePlayButton } from "@/components/shared";
import { JobPostDemo } from "./job-post-demo";
import { cn } from "@/lib/utils";

const headlineWords = ["Swipe.", "Match.", "Get", "Hired."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Smooth scroll animations for Copy Text section (natural scale, elevation, fade & blur, 0% pinning jitter)
  const { scrollYProgress: copyScrollProgress } = useScroll({
    target: copyRef,
    offset: ["start start", "end start"],
  });

  const copyScale = useTransform(copyScrollProgress, [0, 0.8], [1, 0.88]);
  const copyOpacity = useTransform(copyScrollProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(copyScrollProgress, [0, 0.8], [0, -50]);
  const copyBlurNum = useTransform(copyScrollProgress, [0, 0.75], [0, 10]);
  const copyFilter = useTransform(copyBlurNum, (v) => `blur(${v}px)`);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[18%] h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-[42%] h-[24rem] w-[28rem] rounded-full bg-sky-300/12 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* HERO COPY TEXT SECTION (Natural smooth Framer Motion scaling, elevation, fade & blur) */}
      <div
        className={cn(
          "relative z-0 flex items-center justify-center px-6 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24",
          reducedMotion ? "min-h-auto" : "min-h-[72dvh] sm:min-h-[76dvh]"
        )}
      >
        <motion.div
          ref={copyRef}
          style={
            reducedMotion
              ? {}
              : {
                  scale: copyScale,
                  opacity: copyOpacity,
                  y: copyY,
                  filter: copyFilter,
                }
          }
          className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center will-change-transform"
        >
          {/* Clean Kicker (No chip pill, pure crisp typography) */}
          <motion.p
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 16, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              delay: reducedMotion ? 0 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400"
          >
            India&apos;s Swipe-Based Hiring Platform
          </motion.p>

          {/* Headline Words with 3D perspective entrance */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.75rem] [perspective:1000px]">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 40, rotateX: -25, filter: "blur(10px)" }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: reducedMotion ? 0 : 0.12 + i * 0.08,
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
              reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.48,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-6 max-w-4xl text-base sm:text-lg md:text-xl font-semibold text-foreground/90 leading-snug"
          >
            Fastest way to Post &amp; Apply for jobs—{" "}
            <span className="text-brand-600 dark:text-brand-400 font-bold">
              No forms, No scrolling, No waiting.
            </span>
          </motion.p>

          {/* Crisp, Humanized Platform Description */}
          {/* <motion.p
            initial={
              reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.62,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-2xl text-pretty text-sm sm:text-base text-muted-foreground leading-relaxed font-normal"
          >
            Hirance is India&apos;s swipe-based hiring platform, built to solve the
            biggest problem in job hunting and recruitment—speed. No more long forms,
            resume uploads, or endless job scrolling. Candidates swipe right to apply and
            left to skip, based on an AI-calculated match score for every job. Employers
            post jobs in under a minute and get only relevant, pre-filtered candidates.
            Smarter hiring starts here.
          </motion.p> */}

          {/* Action Buttons Row */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: reducedMotion ? 0 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 sm:mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
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
        </motion.div>
      </div>

      {/* FULL-SCREEN JOB POST DEMO SECTION (Hidden on mobile devices for clean, fast scrolling) */}
      <div
        ref={demoSectionRef}
        className={cn(
          "relative w-full hidden md:block",
          "h-[calc(100dvh+4rem)]"
        )}
      >
        {/* Pinned Sticky Viewport (100vh x 100vw) */}
        <div className="sticky top-0 h-[calc(100dvh+4rem)] w-full overflow-hidden bg-transparent text-white">
          <div className="relative h-full w-full p-2 pt-20 pb-1 sm:p-3 sm:pt-24 sm:pb-1 md:p-3.5 md:pt-24 md:pb-1">
            <JobPostDemo className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
