"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Building2,
  SlidersHorizontal,
  UserCheck,
  Handshake,
  Check,
  ArrowRight,
  Star,
  CalendarCheck,
  MapPin,
  X,
  Tag,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { JobPostDemo } from "./job-post-demo";
import { PricingModal } from "./pricing-modal";

const STEPS = [
  {
    n: "01",
    icon: Building2,
    title: "Create your company profile",
    text: "Add your company name, logo, industry & culture.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Post a job & set filters",
    text: "Post your role and choose how candidates match you.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Shortlist candidates",
    text: "Review swipes and shortlist your favourites in seconds.",
  },
  {
    n: "04",
    icon: Handshake,
    title: "Interview & hire",
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
    color: "bg-blue-600",
  },
  {
    id: "c2",
    name: "Rohan Varma",
    role: "Product Designer",
    exp: "3 Years",
    location: "Mumbai",
    match: 92,
    initials: "RV",
    color: "bg-slate-700",
  },
  {
    id: "c3",
    name: "Priya Nair",
    role: "Performance Marketer",
    exp: "5 Years",
    location: "Delhi NCR",
    match: 89,
    initials: "PN",
    color: "bg-emerald-600",
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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-xs">
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

    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                    ? "bg-blue-600 text-white"
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
            "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold shrink-0",
            c.color
          )}
        >
          {c.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-foreground leading-tight truncate">
            {c.name}
          </p>
          <p className="text-[10px] text-muted-foreground flex flex-wrap items-center gap-1">
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
      className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
    >
      <div className="flex items-center justify-center gap-1.5">
        <Handshake size={15} />
        <p className="text-xs sm:text-[13px] font-semibold">Offer sent. Your next hire is ready.</p>
      </div>
      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">
        Ananya joins in 30 days · Match confirmed
      </p>
    </motion.div>
  </div>
);

const MINI_COMPONENTS = [MiniProfile, MiniPostFilter, MiniShortlist, MiniHire];

/* ---------- Interactive Progressive Recruiter Dashboard Mockup ---------- */

function RecruiterDashboardMockup({ active, onStepClick }: {
  active: number;
  onStepClick: (stepIndex: number) => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:max-w-none">
      <div className="flex items-center gap-1.5 border-b border-border/70 bg-slate-50 px-4 py-4 sm:px-5 dark:bg-slate-900">
        <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="ml-2 text-[11px] text-muted-foreground sm:text-xs">employer.hirance.com</span>
        <span className="ml-auto text-[11px] font-medium text-blue-600 dark:text-blue-400">{Math.min(active + 1, 4)} / 4</span>
      </div>
      <div className="h-1 bg-slate-100 dark:bg-slate-800" aria-hidden="true">
        <motion.div className="h-full bg-blue-600" animate={{ width: active >= 4 ? "100%" : ((active + 1) / STEPS.length) * 100 + "%" }} transition={{ duration: reducedMotion ? 0 : 0.3 }} />
      </div>
      <div className="flex min-h-[540px] flex-col gap-2 p-3 sm:min-h-[560px] sm:gap-2.5 sm:p-5">
        {STEPS.map((step, index) => {
          const selected = active === index;
          const done = index < active;
          const Mini = MINI_COMPONENTS[index];
          return (
            <div key={step.n} className={cn("overflow-hidden rounded-xl border transition-colors duration-200", selected ? "border-blue-200 bg-blue-50/40 dark:border-blue-800 dark:bg-blue-950/20" : "border-border/60 bg-transparent")}>
              <button type="button" onClick={() => onStepClick(index)} aria-expanded={selected} aria-controls={"employer-step-" + index} className="flex min-h-16 w-full items-center gap-3 px-3 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:px-4">
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", selected ? "bg-blue-600 text-white" : done ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" : "bg-slate-100 text-slate-400 dark:bg-slate-800")}>
                  {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <step.icon className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mb-0.5 block text-[10px] font-medium text-muted-foreground">Step {step.n}</span>
                  <span className="block text-xs font-semibold leading-snug text-foreground sm:text-sm">{step.title}</span>
                </span>
                <span className={cn("text-[10px] font-medium", done ? "text-emerald-600 dark:text-emerald-400" : selected ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground")}>
                  {done ? "Done" : selected ? "In progress" : "Pending"}
                </span>
              </button>
              <div id={"employer-step-" + index} hidden={!selected}>
                {selected && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="border-t border-blue-100 px-3 pb-4 pt-3 sm:px-4 dark:border-blue-900/60"><Mini /></motion.div>}
              </div>
            </div>
          );
        })}
        {active >= 4 && <div className="mt-auto rounded-xl bg-blue-50 px-4 py-4 text-center dark:bg-blue-950/40">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">From profile to hire.</p>
          <p className="mt-1 text-xs text-muted-foreground">Your hiring journey, all in one place.</p>
        </div>}
      </div>
    </div>
  );
}

/* ---------- Main Employer Experience Component ---------- */

export function WantToHire() {
  const [active, setActive] = useState(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Handle escape key and body scroll locking for the demo modal
  useEffect(() => {
    if (!isDemoModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDemoModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDemoModalOpen]);

  useEffect(() => {
    if (reducedMotion || isDemoModalOpen || isPricingModalOpen) return;
    const timeout = setTimeout(() => {
      setActive((previous) => previous >= STEPS.length ? 0 : previous + 1);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [active, reducedMotion, isDemoModalOpen, isPricingModalOpen]);

  const jumpToStep = (index: number) => {
    setActive(index);
  };

  return (
    <section
      id="want-to-hire"
      className="section-blue-glow relative w-full overflow-hidden pt-14 pb-12 sm:pt-18 sm:pb-16 lg:pt-24 lg:pb-20 flex items-center justify-center min-h-0 bg-white dark:bg-slate-950"
      aria-labelledby="want-to-hire-heading"
    >
      {/* Background Subtle Divider */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-border/70" />
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
            {/* Section Eyebrow (clean typography, no chip/badge) */}
            <p className="mb-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-600 dark:text-brand-400">
              For Employers &amp; Hiring Teams
            </p>

            <h2
              id="want-to-hire-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Post a Job. {" "}
              <span className="italic font-medium">
                Let Candidates Come to You.
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3.5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Built for employers: post any role in 60 seconds. Our match engine filters applicants in real time so you only talk to the best fits.
            </p>

            {/* Step highlights stay in sync with the automatic walkthrough. */}
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2" aria-label="Hiring process">
              {STEPS.map((step, index) => {
                const selected = active === index;
                const done = index < active;
                return (
                  <button key={step.n} type="button" onClick={() => jumpToStep(index)} aria-pressed={selected} aria-controls={"employer-step-" + index}
                    className={cn("rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", selected ? "border-blue-300 bg-blue-50/60 dark:border-blue-700 dark:bg-blue-950/25" : "border-border/70 bg-transparent hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-600 dark:hover:bg-slate-900")}>
                    <span className="mb-3 flex items-center justify-between gap-3">
                      <span className={cn("text-xs font-semibold tabular-nums", selected ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground")}>{step.n}</span>
                      {done ? <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> : <step.icon className={cn("h-4 w-4", selected ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground")} aria-hidden="true" />}
                    </span>
                    <span className="block text-sm font-semibold leading-snug text-foreground">{step.title}</span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{step.text}</span>
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
              style={{
                backgroundColor: '#F8FAFF',
                borderColor: '#BBCFFB',
              }}
              className="relative mt-6 sm:mt-8 w-full overflow-hidden rounded-2xl sm:rounded-3xl border dark:border-slate-800/60 dark:bg-slate-900/20 p-6 sm:p-7 lg:p-8 text-left shadow-sm backdrop-blur-sm"
            >
              {/* Subtle ambient gradient shimmer glow in background */}
              <div
                className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-slate-200/30 dark:bg-slate-700/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-slate-200/30 dark:bg-slate-700/20 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <h3 className="text-[20px] font-semibold tracking-tight text-foreground leading-tight">
                  Post Any Job in 1 Minute.
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 px-6 sm:px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-md shadow-brand-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                  >
                    <span>Post a Job</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  {/* See demo Action */}
                  <button
                    type="button"
                    onClick={() => setIsDemoModalOpen(true)}
                    aria-label="See Hirance employer job posting interactive demo"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-md cursor-pointer"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
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
                  </button>

                  {/* View Pricing Action */}
                  <button
                    type="button"
                    onClick={() => setIsPricingModalOpen(true)}
                    aria-label="View employer hiring pricing plans"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-md cursor-pointer"
                  >
                    <Tag className="h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>View Pricing</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      
      </div>

      {/* Interactive Job Post Demo Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-post-demo-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col w-full max-w-5xl xl:max-w-6xl h-[88vh] max-h-[740px] rounded-2xl sm:rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <span id="job-post-demo-modal-title" className="sr-only">
                Hirance Job Post Interactive Demo
              </span>

              {/* Floating Close Button */}
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                aria-label="Close demo modal"
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3.5 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/10 text-slate-700 hover:bg-slate-900/20 hover:text-slate-900 transition-all dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20 cursor-pointer shadow-xs"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Embedded Job Post Demo Interactive Stage */}
              <div className="flex-1 w-full h-full min-h-0 overflow-hidden">
                <JobPostDemo className="h-full w-full rounded-2xl sm:rounded-3xl border-0 shadow-none ring-0" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Employer Pricing Plans Modal */}
      <PricingModal
        open={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </section>
  );
}

export const EmployerExperience = WantToHire;
export default WantToHire;
