"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function WantToHire() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="want-to-hire"
      className="relative w-full overflow-hidden py-14 sm:py-18 lg:py-24 flex items-center justify-center min-h-0"
      aria-labelledby="want-to-hire-heading"
    >
      {/* Dynamic Ambient Mesh Glow Background (matching AppDownload section) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500/15 via-indigo-500/10 to-sky-500/5 blur-[140px]" />
        <div className="absolute right-10 top-1/4 h-[22rem] w-[22rem] rounded-full bg-blue-600/10 blur-[100px]" />
        
        {/* Subtle geometric grid backdrop */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>
      <div className="mx-auto max-w-[1536px] px-2 sm:px-3 lg:px-4 w-full">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-6">
          
          {/* Left Side: Web Mockup Image */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-start lg:col-span-7"
          >
            {/* Hire Web Mockup Image */}
            <div className="relative w-full max-w-none flex justify-start -ml-2 sm:-ml-6 lg:-ml-12 xl:-ml-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/web_mock.png"
                alt="Hirance Hiring Showcase Web Mockup"
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </motion.div>

          {/* Right Side: Professional Content (Vertically Centered) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-5"
          >
            {/* Header Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

              {/* Headline */}
              <h2
                id="want-to-hire-heading"
                className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight"
              >
                Want to Hire{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                  Top Talent?
                </span>
              </h2>

              {/* Subtext */}
              <p className="mt-3 w-full text-base leading-relaxed text-muted-foreground sm:text-lg">
                Build your dream team faster with Hirance. Access pre-vetted professionals, match in seconds, and hire directly with zero markups.
              </p>

            </div>

            {/* CTA Action Button */}
            <div className="mt-8 flex justify-center lg:justify-start w-full">
              <a
                href="https://uat.hirance.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Post Job on Hirance Platform"
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-600 hover:bg-brand-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                )}
              >
                <Briefcase className="h-4 w-4 text-white" />
                <span className="text-sm font-extrabold tracking-wide uppercase">
                  Post Job Now
                </span>
                <ArrowRight className="h-4 w-4 text-white" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

