"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Zap,
  Clock,
  Target,
  Briefcase,
} from "lucide-react";
import { CandidatePhoneMockup } from "./candidate-phone-mockup";

const POINTS = [
  {
    icon: Zap,
    title: "Swipe through relevant jobs",
    text: "Our match engine surfaces roles built around your skills — not keyword soup.",
  },
  {
    icon: Clock,
    title: "Apply in seconds",
    text: "One right swipe sends your profile. Zero cover letters, zero forms.",
  },
  {
    icon: Target,
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
      className="relative w-full overflow-hidden py-14 sm:py-18 lg:py-24 flex items-center justify-center min-h-0 bg-white dark:bg-slate-950"
      aria-labelledby="candidate-experience-heading"
    >
      {/* Background Subtle Divider */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Headline & Feature Points matching Figma */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            {/* Main Headline matching Figma */}
            <h2
              id="candidate-experience-heading"
              className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Stop Applying,{" "}
              <span className="italic font-normal">
                Start Swiping.
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3.5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              No endless forms. No complicated applications. Just discover, swipe and get hired on the go.
            </p>

            {/* Feature Points matching Figma */}
            <div className="mt-8 sm:mt-10 w-full max-w-xl space-y-5 sm:space-y-6">
              {POINTS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={reducedMotion ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-48px" }}
                    transition={{
                      delay: idx * 0.07,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative flex items-start gap-4 text-left"
                  >
                    {/* Light Blue Squircle Icon Badge matching Figma */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50/90 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100/60 dark:border-blue-900/40 shadow-xs transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Interactive Phone Showcase with Job Cards matching Figma */}
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
            {/* Container with Phone Mockup */}
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

