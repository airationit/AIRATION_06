"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Gauge,
  Clock3,
  TrendingUp,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { CandidatePhoneMockup } from "./candidate-phone-mockup";

const POINTS = [
  {
    icon: Gauge,
    title: "Swipe through relevant jobs",
    text: "Our match engine surfaces roles built around your skills — not keyword soup.",
  },
  {
    icon: Clock3,
    title: "Apply in seconds",
    text: "One right-swipe sends your profile. Zero cover letters, zero forms.",
  },
  {
    icon: TrendingUp,
    title: "See your match percentage",
    text: "Every card shows a live compatibility score before you decide.",
  },
  {
    icon: Briefcase,
    title: "Discover jobs by role",
    text: "Roles tailored to your tech stack — Frontend, Cloud DevOps, Backend, AI, Security & more.",
  },
];

export function AppDownload() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="candidate-experience"
      className="relative w-full overflow-hidden py-14 sm:py-18 lg:py-24 flex items-center justify-center min-h-0"
      aria-labelledby="candidate-experience-heading"
    >
      {/* Clean Ambient Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-slate-200/80 dark:bg-slate-800/80" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Headline, Timeline Points & CTA */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            {/* Main Headline */}
            <h2
              id="candidate-experience-heading"
              className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Stop Applying.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                Start Swiping.
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3.5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              No endless forms. No complicated applications. Just discover, swipe and get hired on the go.
            </p>

            {/* Timeline Feature Points */}
            <div className="relative mt-8 w-full max-w-xl">
              {/* Connector line */}
              <div
                className="absolute left-[20px] sm:left-[22px] top-3 bottom-3 w-px bg-slate-200 dark:bg-slate-800"
                aria-hidden="true"
              />

              <div className="space-y-5 sm:space-y-6">
                {POINTS.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-48px" }}
                      transition={{
                        delay: idx * 0.07,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative flex items-start gap-4 text-left"
                    >
                      <div className="relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 shadow-xs dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 transition-colors duration-200 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700">
                        <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-base font-bold text-foreground sm:text-lg leading-snug">
                          {p.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Phone Showcase with Swipeable Job Cards */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            {/* Subtle Neutral Backdrop behind phone */}
            <div
              className="pointer-events-none absolute h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] rounded-full bg-slate-200/50 dark:bg-slate-800/20 blur-[90px]"
              aria-hidden="true"
            />

            {/* Container with Interactive Phone Mockup */}
            <div className="relative w-full flex justify-center items-center">
              <CandidatePhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const CandidateExperience = AppDownload;
export default AppDownload;
