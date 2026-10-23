"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { HeroVideoCard } from "./hero-video-card";
import { cn } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Smooth scroll animations for Copy Text section
  const { scrollYProgress: copyScrollProgress } = useScroll({
    target: copyRef,
    offset: ["start start", "end start"],
  });

  const copyScale = useTransform(copyScrollProgress, [0, 0.8], [1, 0.94]);
  const copyOpacity = useTransform(copyScrollProgress, [0, 0.75], [1, 0.3]);
  const copyY = useTransform(copyScrollProgress, [0, 0.8], [0, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip pt-24 sm:pt-28 md:pt-32">
      {/* Background with Figma geometric diagonal chevron pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/figma-hero-bg.png')] bg-cover bg-center opacity-90 dark:opacity-10"
        aria-hidden="true"
      />

      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[12%] h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-[30%] h-[22rem] w-[28rem] rounded-full bg-sky-300/12 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* HERO COPY TEXT SECTION */}
      <div className="relative z-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <motion.div
          ref={copyRef}
          style={
            reducedMotion
              ? {}
              : {
                  scale: copyScale,
                  opacity: copyOpacity,
                  y: copyY,
                }
          }
          className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center will-change-transform"
        >
          {/* Eyebrow Typography matching Screenshot 2 */}
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
            className="mb-3 text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400"
          >
            NEXT-GEN SWIPE-BASED HIRING PLATFORM
          </motion.p>

          {/* Headline Words: Swipe. Match. Get Hired. */}
          <h1 className="max-w-4xl text-balance text-3xl sm:text-5xl lg:text-[3.85rem] font-bold leading-[1.1] tracking-tight">
            <span className="mr-[0.22em] inline-block text-slate-900 dark:text-white">
              Swipe.
            </span>
            <span className="mr-[0.22em] inline-block text-slate-900 dark:text-white">
              Match.
            </span>
            <span className="inline-block bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-sky-400 dark:to-indigo-300 font-bold">
              Get Hired.
            </span>
          </h1>

          {/* Subheading matching Screenshot 2 */}
          <motion.p
            initial={
              reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            Fastest way to Post &amp; Apply for jobs— No forms, No scrolling, No waiting.
          </motion.p>

          {/* Action Buttons Row matching Screenshot 2 */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: reducedMotion ? 0 : 0.48,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6 sm:mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-3.5 select-none"
          >
            {/* Start hiring today Button (Solid Blue Pill) */}
            <Link
              href={siteConfig.links.employer}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-[#1d68f0] hover:bg-[#1557d0] dark:bg-brand-600 dark:hover:bg-brand-500 px-6 text-sm font-semibold text-white shadow-sm shadow-[#1d68f0]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
              aria-label="Start hiring today on Hirance"
              tabIndex={0}
            >
              <span>Start hiring today</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Apply for Jobs Button (Solid Black Pill with Google Play Icon) */}
            <a
              href={siteConfig.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 min-w-[11rem] items-center justify-center gap-2.5 rounded-full bg-slate-950 hover:bg-black px-6 text-sm font-semibold text-white shadow-sm shadow-black/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
              aria-label="Apply for Jobs on Google Play"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 512 512" fill="none" aria-hidden="true">
                <path
                  d="M47 24.6c-5.2 5.6-8.3 14.2-8.3 25.4v412c0 11.2 3.1 19.8 8.3 25.4l1.4 1.3 230.9-230.9v-5.4L48.4 23.4 47 24.6z"
                  fill="#00D3FF"
                />
                <path
                  d="M356.4 343.9l-77-77v-5.4l77-77 1.7 1 91.2 51.8c26 14.8 26 39 0 53.8l-91.2 51.8-1.7 1z"
                  fill="#00F076"
                />
                <path
                  d="M358.1 342.9l-78.7-78.7L47 497.3c8.6 9.1 22.7 10.2 38.7 1.1l272.4-155.5z"
                  fill="#FFD900"
                />
                <path
                  d="M358.1 185.5L85.7 30C69.7 20.9 55.6 22 47 31.1l232.4 232.4 78.7-78z"
                  fill="#FF385C"
                />
              </svg>
              <span>Apply for Jobs</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* HERO SHOWCASE BANNER ("Apply in Seconds. Match Instantly.") */}
      <div className="relative mx-auto w-full max-w-[1480px] 2xl:max-w-[1560px] px-2 sm:px-4 lg:px-6 mt-2 sm:mt-4 pb-12 sm:pb-16">
        <HeroVideoCard className="w-full min-h-[480px] sm:min-h-[510px] md:min-h-[530px] lg:h-[550px] xl:h-[575px]" />
      </div>
    </section>
  );
}
