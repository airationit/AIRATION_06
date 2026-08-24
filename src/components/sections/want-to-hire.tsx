"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Building2,
  SlidersHorizontal,
  UserCheck,
  Handshake,
  Check,
  ArrowRight,
  Loader2,
  Star,
  CalendarCheck,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SwipePlayground } from "./swipe-playground";
import { CandidateCTA } from "./candidate-cta";
import { EmployerCTA } from "./employer-cta";

const STEPS = [
  {
    n: "01",
    icon: Building2,
    title: "Create Company Profile",
    text: "Add your company name, logo, industry & culture.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Post Job & Set Filter",
    text: "Post your role and choose how candidates match you.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Shortlist Candidates",
    text: "Review swipes and shortlist your favourites in seconds.",
  },
  {
    n: "04",
    icon: Handshake,
    title: "Interview & Hire",
    text: "Schedule interviews and send the offer — all in-app.",
  },
];

const CANDIDATES = [
  {
    id: "c1",
    name: "Ananya Sharma",
    role: "Senior React Developer",
    exp: "4 Years",
    location: "Bengaluru",
    match: 96,
    initials: "AS",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "c2",
    name: "Rohan Varma",
    role: "Product Designer",
    exp: "3 Years",
    location: "Mumbai",
    match: 92,
    initials: "RV",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "c3",
    name: "Priya Nair",
    role: "Performance Marketer",
    exp: "5 Years",
    location: "Delhi NCR",
    match: 89,
    initials: "PN",
    color: "from-emerald-600 to-teal-600",
  },
];

/* ---------- Per-Step Mini Motion Graphics inside Mockup ---------- */

const MiniProfile = () => (
  <div className="space-y-2 w-full pt-1">
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-background/90 p-2.5 shadow-2xs"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xs shadow-xs">
        TN
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
          TechNova Solutions
        </p>
        <p className="text-[10px] sm:text-[10.5px] text-muted-foreground truncate">
          SaaS · Software · Bengaluru
        </p>
      </div>
      <span className="flex items-center gap-1 text-[9.5px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 rounded-full px-2.5 py-0.5">
        <Check size={10} strokeWidth={3} /> Verified
      </span>
    </motion.div>

    <div className="grid grid-cols-2 gap-2">
      {[
        { l: "Team size", v: "120+ members" },
        { l: "Culture", v: "Fast & Hybrid" },
      ].map((r, i) => (
        <div
          key={r.l}
          className="rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1.5 flex items-center justify-between text-[10px] sm:text-[10.5px]"
        >
          <span className="text-muted-foreground">{r.l}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="font-semibold text-foreground"
          >
            {r.v}
          </motion.span>
        </div>
      ))}
    </div>
  </div>
);

const MiniPostFilter = () => {
  const filters = [
    { k: "Open to All", d: "Everyone can apply" },
    { k: "Smart Match", d: "AI-matched candidate pool" },
    { k: "Exact Match", d: "Only 90%+ compatibility" },
  ];
  const selected = 1;

  return (
    <div className="space-y-1.5 w-full pt-1">
      <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 flex items-center justify-between text-[10.5px] sm:text-[11px]">
        <span className="text-muted-foreground">Job title</span>
        <span className="font-bold text-foreground text-xs sm:text-[13px]">
          Software Developer
        </span>
      </div>

      <div className="space-y-1.5">
        {filters.map((f, i) => {
          const on = i === selected;
          return (
            <div
              key={f.k}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-1.5 transition-colors",
                on
                  ? "border-blue-500 bg-blue-50/70 dark:border-blue-500/60 dark:bg-blue-950/40"
                  : "border-border/60 bg-background/80"
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-[11px] sm:text-xs font-bold leading-tight",
                    on ? "text-blue-600 dark:text-blue-400" : "text-foreground"
                  )}
                >
                  {f.k}
                </p>
                <p className="text-[9px] sm:text-[9.5px] text-muted-foreground">
                  {f.d}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 w-4 h-4 rounded-full flex items-center justify-center",
                  on
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "border-2 border-border"
                )}
              >
                {on && <Check size={9} strokeWidth={3} />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MiniShortlist = () => (
  <div className="space-y-2 w-full pt-1">
    {CANDIDATES.slice(0, 2).map((c, i) => (
      <motion.div
        key={c.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/90 px-3 py-2 shadow-2xs"
      >
        <div
          className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-black shrink-0 bg-gradient-to-br",
            c.color
          )}
        >
          {c.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-foreground leading-tight truncate">
            {c.name}
          </p>
          <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
            {c.role} · {c.exp}{" "}
            <span className="inline-flex items-center gap-0.5 text-muted-foreground">
              <MapPin size={8} />
              {c.location}
            </span>
          </p>
        </div>
        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          {c.match}%
        </span>
        <span className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center">
          <Star size={10} className="text-amber-500 fill-amber-500" />
        </span>
      </motion.div>
    ))}
  </div>
);

const MiniHire = () => (
  <div className="space-y-2 w-full pt-1">
    <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-background/90 px-3 py-2">
      <CalendarCheck size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-foreground">Interview Scheduled</p>
        <p className="text-[10px] text-muted-foreground truncate">
          Ananya Sharma · Tomorrow, 4:00 PM · Video Call
        </p>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl p-2.5 text-center text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-sm"
    >
      <div className="flex items-center justify-center gap-1.5">
        <Handshake size={15} />
        <p className="text-xs sm:text-[13px] font-black">Offer Sent — Candidate Hired! 🎉</p>
      </div>
      <p className="text-[10px] text-white/85 mt-0.5">
        Ananya joins in 30 days · Match confirmed
      </p>
    </motion.div>
  </div>
);

const MINI_COMPONENTS = [MiniProfile, MiniPostFilter, MiniShortlist, MiniHire];

/* ---------- Interactive Progressive Recruiter Dashboard Mockup ---------- */

function RecruiterDashboardMockup({
  active,
  onStepClick,
}: {
  active: number;
  onStepClick: (stepIndex: number) => void;
}) {
  const completed = Math.min(active, 4);

  return (
    <div className="w-full max-w-xl lg:max-w-none min-h-[580px] sm:min-h-[610px] lg:min-h-[640px] flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-card/95 border border-border/80 shadow-2xl shadow-slate-950/15 dark:shadow-white/5 overflow-hidden backdrop-blur-md">
      {/* Browser Window Chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/70 bg-muted/40 shrink-0 select-none">
        <span className="w-3 h-3 rounded-full bg-rose-400/90" />
        <span className="w-3 h-3 rounded-full bg-amber-400/90" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
        <span className="ml-2.5 font-mono text-[11px] text-muted-foreground">
          hirance.com/recruiter
        </span>
        <span className="ml-auto font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
          {completed}/4 done
        </span>
      </div>

      {/* Progress Line */}
      <div className="h-1 bg-muted/70 w-full overflow-hidden shrink-0">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-500"
          animate={{ width: `${(completed / 4) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Steps Accordion View */}
      <div className="p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
        {STEPS.map((s, i) => {
          const isDone = i < active;
          const isActive = i === active;
          const Mini = MINI_COMPONENTS[i];

          return (
            <div
              key={s.n}
              onClick={() => onStepClick(i)}
              className={cn(
                "rounded-xl sm:rounded-2xl border transition-colors duration-200 cursor-pointer overflow-hidden",
                isActive
                  ? "border-blue-500/70 bg-blue-50/40 dark:border-blue-500/50 dark:bg-blue-950/25 shadow-xs"
                  : isDone
                  ? "border-emerald-500/30 bg-emerald-50/20 dark:border-emerald-500/20 dark:bg-emerald-950/10"
                  : "border-border/60 bg-card/60 hover:bg-muted/30"
              )}
            >
              <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3">
                {/* Status Indicator Icon */}
                <div
                  className={cn(
                    "shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white transition-colors",
                    isDone
                      ? "bg-emerald-500 shadow-xs"
                      : isActive
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xs"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isDone ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="flex items-center justify-center"
                      >
                        <Check size={16} strokeWidth={3} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        className={isActive ? "text-white" : "text-muted-foreground"}
                      >
                        <s.icon size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    Step {s.n}
                  </p>
                  <p
                    className={cn(
                      "text-xs sm:text-sm font-bold leading-tight",
                      isDone || isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.title}
                  </p>
                </div>

                {/* Status Pill */}
                {isDone ? (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-full px-2.5 py-0.5"
                  >
                    <Check size={11} strokeWidth={3} /> Done
                  </motion.span>
                ) : isActive ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-full px-2.5 py-0.5">
                    <Loader2 size={11} className="animate-spin" /> In progress
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-muted-foreground/60">
                    Pending
                  </span>
                )}
              </div>

              {/* Expandable Mini Graphic when active */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="px-3.5 sm:px-4 pb-3 pt-0.5 overflow-hidden"
                  >
                    <Mini />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* 4 Steps Completed Banner */}
        <AnimatePresence>
          {active >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl sm:rounded-2xl p-3 text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md mt-auto"
            >
              <div className="flex items-center justify-center gap-1.5">
                <Sparkles size={15} className="text-sky-200" />
                <p className="text-xs sm:text-sm font-black">From profile to hire — done!</p>
              </div>
              <p className="text-[10px] sm:text-[11px] text-white/85 mt-0.5">
                All 4 steps seamlessly managed inside Hirance.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Main Employer Experience Component ---------- */

export function WantToHire() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  // Auto-advance stepper every 3.5 seconds
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const jumpToStep = (index: number) => {
    setActive(index);
  };

  return (
    <section
      id="want-to-hire"
      className="relative w-full overflow-hidden pt-14 pb-12 sm:pt-18 sm:pb-16 lg:pt-24 lg:pb-20 flex items-center justify-center min-h-0"
      aria-labelledby="want-to-hire-heading"
    >
      {/* Ambient Mesh Glow Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500/15 via-indigo-500/10 to-sky-500/5 blur-[140px]" />
        <div className="absolute right-10 top-1/4 h-[22rem] w-[22rem] rounded-full bg-blue-600/10 blur-[100px]" />

        {/* Subtle geometric grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Interactive Progressive Recruiter Dashboard Mockup */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-start lg:col-span-6 order-2 lg:order-1 w-full"
          >
            <RecruiterDashboardMockup
              active={active}
              onStepClick={jumpToStep}
            />

            {/* Stepper Navigation Indicator Dots */}
            <div className="flex items-center gap-2 mt-4 select-none">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => jumpToStep(i)}
                  aria-label={`Jump to Step ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === Math.min(active, 3)
                      ? "w-7 bg-blue-600 dark:bg-blue-400"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: High-Impact Employer Content & Clickable Steps */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{
              duration: 0.6,
              delay: reducedMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col justify-start items-center text-center lg:items-start lg:text-left lg:col-span-6 order-1 lg:order-2 w-full"
          >
            {/* Main Headline */}
            <h2
              id="want-to-hire-heading"
              className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Post a Job. Let Candidates{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                Come to You.
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3.5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Post any role in 60 seconds. Our match engine filters applicants in real time so you only talk to the best fits.
            </p>

            {/* 4 Interactive Step Highlight Cards (2x2 Grid) */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {STEPS.map((s, i) => {
                const done = i < active;
                const on = i === active;

                return (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => jumpToStep(i)}
                    className={cn(
                      "text-left rounded-xl p-3.5 border transition-all duration-200 hover:-translate-y-0.5",
                      on
                        ? "border-blue-500 bg-blue-50/60 dark:border-blue-500/50 dark:bg-blue-950/20 shadow-xs ring-1 ring-blue-500/20"
                        : done
                        ? "border-emerald-500/30 bg-emerald-50/30 dark:border-emerald-500/20 dark:bg-emerald-950/10"
                        : "border-border/70 bg-card/60 hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                        {s.n}
                      </span>
                      {done ? (
                        <Check size={14} className="text-emerald-500" strokeWidth={3} />
                      ) : (
                        <s.icon
                          size={14}
                          className={cn(on ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground")}
                        />
                      )}
                    </div>
                    <p className="text-xs font-bold text-foreground leading-snug">
                      {s.title}
                    </p>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                      {s.text}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Post Any Job in 1 Minute Card */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{
                delay: reducedMotion ? 0 : 0.25,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mt-6 sm:mt-8 w-full overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#060c18] border border-white/12 p-6 sm:p-7 lg:p-8 text-left shadow-2xl shadow-slate-950/30"
            >
              {/* Subtle background dot grid pattern */}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] opacity-70"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                  Post Any Job in 1 Minute.
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-slate-300 dark:text-slate-300 leading-relaxed">
                  For every job you post, someone can swipe in seconds.
                </p>

                {/* Actions Row */}
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Primary CTA */}
                  <a
                    href={siteConfig.links.employer}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Post a Job on Hirance employer portal"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-100 px-6 sm:px-7 py-3 text-sm sm:text-base font-bold text-[#060c18] shadow-md shadow-white/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>Post a Job</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  {/* See demo Action */}
                  <Link
                    href="/request-demo"
                    aria-label="See Hirance employer demo"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#00d2ff] hover:text-[#38bdf8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-[#00d2ff]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    <span>See demo</span>
                  </Link>

                  {/* View plans & pricing Action */}
                  <Link
                    href="/request-demo"
                    aria-label="View employer plans and pricing"
                    className="text-sm sm:text-base font-semibold text-[#00d2ff] hover:text-[#38bdf8] underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
                  >
                    View plans & pricing
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Swipe Playground */}
        <div className="mt-14 sm:mt-18 lg:mt-22 w-full">
          <SwipePlayground />
        </div>

        {/* CTA Banners */}
        <div className="mt-8 sm:mt-12 w-full space-y-6 sm:space-y-8">
          <CandidateCTA />
          <EmployerCTA />
        </div>
      </div>
    </section>
  );
}

export const EmployerExperience = WantToHire;
export default WantToHire;
