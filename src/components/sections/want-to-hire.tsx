"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  ArrowRight,
  Users,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const hirePerks = [
  {
    icon: Users,
    title: "Pre-Vetted Talent",
    description: "Connect with ready-to-hire professionals.",
  },
  {
    icon: Zap,
    title: "Instant AI Matching",
    description: "Match with qualified candidates in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Commission",
    description: "Direct hiring with zero recruiter markups.",
  },
];

const stats = [
  { value: "48 Hrs", label: "Avg. Time to Hire" },
  { value: "98%", label: "Match Satisfaction" },
  { value: "10k+", label: "Verified Professionals" },
];

export function WantToHire() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="want-to-hire"
      className="relative w-full overflow-hidden py-6 sm:py-8 lg:py-10 flex items-center justify-center min-h-0"
      aria-labelledby="want-to-hire-heading"
    >
      {/* Dynamic Ambient Glow Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/4 top-1/2 h-[34rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-brand-500/10 to-purple-500/5 blur-[140px]" />
        <div className="absolute right-10 bottom-10 h-[24rem] w-[24rem] rounded-full bg-blue-600/10 blur-[110px]" />

        {/* Geometric Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Side: Large Woman Image (Pushed Left) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center lg:justify-start lg:col-span-6"
          >
            {/* Multi-layered Ambient Aura behind image */}
            <div
              className="pointer-events-none absolute h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-brand-500/25 via-indigo-500/20 to-purple-500/20 blur-[90px] sm:h-[500px] sm:w-[500px]"
              aria-hidden="true"
            />

            {/* Large Woman Image Container */}
            <div className="relative group max-w-[420px] sm:max-w-[500px] lg:max-w-[580px] w-full lg:-ml-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/women.png"
                alt="Hirance Hiring Manager Showcase"
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.38)]"
              />
            </div>
          </motion.div>

          {/* Right Side: Redesigned Content & Bottom Right Post Job Button */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between h-full lg:col-span-6"
          >
            {/* Header Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              
              {/* Headline: Want to Hire ? */}
              <h2
                id="want-to-hire-heading"
                className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.12]"
              >
                Want to Hire{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                  Top Talent?
                </span>
              </h2>

              {/* Subtext */}
              <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Build your dream team faster with Hirance. Match with qualified candidates and hire directly with zero markups.
              </p>

              {/* Redesigned Sleek Feature Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full text-left">
                {hirePerks.map((perk, idx) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-3.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-500/40 hover:bg-card/90"
                    >
                      <div>
                        <div className="inline-flex rounded-xl bg-brand-500/10 p-2 text-brand-400 mb-2.5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-foreground">
                          {perk.title}
                        </h3>
                        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                          {perk.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Platform Metrics Strip */}
              <div className="mt-6 flex items-center justify-around rounded-2xl border border-border/50 bg-muted/30 py-3 px-4 w-full backdrop-blur-sm">
                {stats.map((st, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <span className="text-base sm:text-lg font-black text-brand-400">
                      {st.value}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Right CTA Action: Solid color, full-radius Post Job button */}
            <div className="mt-8 flex justify-center lg:justify-end w-full">
              <a
                href="https://uat.hirance.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Post Job on Hirance Platform"
                className={cn(
                  "inline-flex items-center justify-center gap-3 rounded-full bg-brand-600 hover:bg-brand-700 px-8 py-4 font-bold text-white shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                )}
              >
                <Briefcase className="h-5 w-5 text-white" />

                <span className="text-base font-extrabold tracking-wide uppercase">
                  Post Job
                </span>

                <ArrowRight className="h-5 w-5 text-white" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
