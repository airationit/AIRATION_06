"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
  PanInfo,
} from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  RotateCcw,
  ArrowRight,
  PartyPopper,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface PlaygroundJob {
  id: string;
  department: string;
  title: string;
  company: string;
  verified: boolean;
  matchScore: number;
  matchGrade: "HIGH MATCH" | "LOW MATCH";
  aiNote: string;
  location: string;
  salary: string;
  experience: string;
  type: string;
  tags: string[];
  breakdown: {
    skills: string;
    skillsOk: boolean;
    exp: string;
    expOk: boolean;
    location: string;
    locationOk: boolean;
    salary: string;
    salaryOk: boolean;
  };
  logoColor: string;
  logoLetter: string;
}

const PLAYGROUND_JOBS: PlaygroundJob[] = [
  {
    id: "pg-dept-1",
    department: "Engineering & Software Development",
    title: "Senior Full Stack Engineer (Next.js)",
    company: "Nexus Cloud Systems",
    verified: true,
    matchScore: 98,
    matchGrade: "HIGH MATCH",
    aiNote: "Strong match for React, TypeScript, Next.js architecture, and Node microservices skillset.",
    location: "Bengaluru (Hybrid)",
    salary: "₹ 16 - 24 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["Next.js", "TypeScript", "Node.js"],
    breakdown: {
      skills: "40/40",
      skillsOk: true,
      exp: "13/13",
      expOk: true,
      location: "7/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-indigo-500 to-purple-600",
    logoLetter: "N",
  },
  {
    id: "pg-dept-2",
    department: "Data Science, Analytics & AI",
    title: "AI / ML Research Engineer",
    company: "Cerebra AI Labs",
    verified: true,
    matchScore: 62,
    matchGrade: "LOW MATCH",
    aiNote: "Role demands PyTorch, LLM fine-tuning & CUDA optimizations. Stack gap with application-tier background.",
    location: "Gurugram (Hybrid)",
    salary: "₹ 24 - 35 LPA",
    experience: "4-7 Years",
    type: "Full Time",
    tags: ["PyTorch", "LLM Ops", "CUDA"],
    breakdown: {
      skills: "22/40",
      skillsOk: false,
      exp: "9/13",
      expOk: false,
      location: "7/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-purple-600 to-pink-600",
    logoLetter: "C",
  },
  {
    id: "pg-dept-3",
    department: "Design, UI/UX & Creative",
    title: "Lead Product Designer (UI/UX)",
    company: "PixelCraft Studios",
    verified: true,
    matchScore: 94,
    matchGrade: "HIGH MATCH",
    aiNote: "High synergy for design systems, Figma component architectures, and responsive micro-interactions.",
    location: "Mumbai (Hybrid)",
    salary: "₹ 14 - 20 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["Figma", "Design Systems", "UX Research"],
    breakdown: {
      skills: "38/40",
      skillsOk: true,
      exp: "12/13",
      expOk: true,
      location: "7/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-rose-500 to-amber-500",
    logoLetter: "P",
  },
  {
    id: "pg-dept-4",
    department: "Marketing, SEO & Content Growth",
    title: "Performance & Growth Marketing Lead",
    company: "Amplifi Media Tech",
    verified: true,
    matchScore: 58,
    matchGrade: "LOW MATCH",
    aiNote: "Demands 5+ yrs paid ad spend management, CAC/LTV scaling & programmatic SEO funnels.",
    location: "Delhi NCR (On-site)",
    salary: "₹ 12 - 18 LPA",
    experience: "4-6 Years",
    type: "Full Time",
    tags: ["SEO", "Performance Ads", "Analytics"],
    breakdown: {
      skills: "20/40",
      skillsOk: false,
      exp: "8/13",
      expOk: false,
      location: "6/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-orange-500 to-red-600",
    logoLetter: "A",
  },
  {
    id: "pg-dept-5",
    department: "Sales & Business Development",
    title: "Enterprise B2B Sales Manager",
    company: "Zenith SaaS Corp",
    verified: true,
    matchScore: 92,
    matchGrade: "HIGH MATCH",
    aiNote: "Great alignment for enterprise SaaS pipeline generation, contract closing, and key account expansion.",
    location: "Pune (Hybrid)",
    salary: "₹ 15 - 25 LPA",
    experience: "3-6 Years",
    type: "Full Time",
    tags: ["B2B Sales", "SaaS Pipeline", "Closing"],
    breakdown: {
      skills: "37/40",
      skillsOk: true,
      exp: "12/13",
      expOk: true,
      location: "7/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-blue-600 to-cyan-600",
    logoLetter: "Z",
  },
];

interface DragCardProps {
  job: PlaygroundJob;
  onDecide: (dir: "left" | "right", job: PlaygroundJob) => void;
  isTop: boolean;
}

function DragCard({ job, onDecide, isTop }: DragCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-14, 0, 14]);
  const applyStampOpacity = useTransform(x, [18, 65], [0, 1]);
  const skipStampOpacity = useTransform(x, [-18, -65], [0, 1]);
  const overlayGreen = useTransform(
    x,
    [0, 120],
    ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 0.12)"]
  );
  const overlayRed = useTransform(
    x,
    [0, -120],
    ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.12)"]
  );

  const isHighMatch = job.matchScore >= 80;
  const isAnimatingOut = useRef(false);

  const performSwipe = useCallback(
    (direction: "left" | "right") => {
      if (isAnimatingOut.current) return;
      isAnimatingOut.current = true;

      const targetX = direction === "right" ? 420 : -420;
      animate(x, targetX, {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
      }).then(() => {
        onDecide(direction, job);
      });
    },
    [onDecide, job, x]
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!isTop || isAnimatingOut.current) return;
    const swipeThreshold = 65;
    const velocityThreshold = 300;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      performSwipe("right");
    } else if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      performSwipe("left");
    } else {
      animate(x, 0, { type: "spring", stiffness: 350, damping: 25 });
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: isTop ? 30 : 20,
        cursor: isTop ? "grab" : "default",
      }}
      initial={{ scale: 0.95, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
        mass: 0.8,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      className="touch-none select-none"
    >
      <div className="relative h-full w-full rounded-[22px] sm:rounded-[24px] border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Stamp Overlays during drag or button actions */}
        {isTop && (
          <>
            {/* APPLY Stamp */}
            <motion.div
              style={{ opacity: applyStampOpacity }}
              className="pointer-events-none absolute left-3 top-3 z-40 rounded-lg border-2 border-emerald-500 bg-emerald-500/15 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider text-emerald-600 shadow-md backdrop-blur-sm -rotate-12 dark:bg-emerald-500/25 dark:text-emerald-400"
            >
              ✓ APPLY
            </motion.div>

            {/* SKIP Stamp */}
            <motion.div
              style={{ opacity: skipStampOpacity }}
              className="pointer-events-none absolute right-3 top-3 z-40 rounded-lg border-2 border-rose-500 bg-rose-500/15 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider text-rose-600 shadow-md backdrop-blur-sm rotate-12 dark:bg-rose-500/25 dark:text-rose-400"
            >
              ✕ SKIP
            </motion.div>

            {/* Tint overlay */}
            <motion.div
              style={{ backgroundColor: overlayGreen }}
              className="pointer-events-none absolute inset-0 z-20"
            />
            <motion.div
              style={{ backgroundColor: overlayRed }}
              className="pointer-events-none absolute inset-0 z-20"
            />
          </>
        )}

        {/* Top Header: Company Row & Match Badge */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg bg-gradient-to-tr flex items-center justify-center text-white font-black text-xs shadow-xs",
                  job.logoColor
                )}
              >
                {job.logoLetter}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {job.company}
                </p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <BadgeCheck className="h-3 w-3 text-blue-500 shrink-0" />
                  <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    Verified Employer
                  </span>
                </div>
              </div>
            </div>

            {/* Match Pill */}
            <div
              className={cn(
                "shrink-0 flex items-center gap-1 rounded-full border px-2 py-0.5",
                isHighMatch
                  ? "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40"
                  : "border-rose-500/30 bg-rose-50 dark:bg-rose-950/40"
              )}
            >
              <div
                className={cn(
                  "h-1.5 w-1.5 rounded-full animate-pulse",
                  isHighMatch ? "bg-emerald-500" : "bg-rose-500"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-extrabold",
                  isHighMatch
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {job.matchScore}% Match
              </span>
            </div>
          </div>

          {/* Department Category */}
          <p className="mt-1.5 text-[9.5px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
            {job.department}
          </p>

          {/* Job Title */}
          <h4 className="mt-0.5 text-[12.5px] sm:text-[13.5px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {job.title}
          </h4>

          {/* AI Match Insight Box */}
          <div
            className={cn(
              "mt-1.5 rounded-lg border p-1.5 sm:p-2",
              isHighMatch
                ? "border-indigo-100 bg-indigo-50/70 dark:border-indigo-950 dark:bg-indigo-950/30"
                : "border-amber-100 bg-amber-50/70 dark:border-amber-950 dark:bg-amber-950/30"
            )}
          >
            <div className="flex items-start gap-1.5">
              {isHighMatch ? (
                <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <p
                className={cn(
                  "text-[9.5px] sm:text-[10px] leading-snug font-medium line-clamp-2",
                  isHighMatch
                    ? "text-indigo-950 dark:text-indigo-200"
                    : "text-amber-950 dark:text-amber-200"
                )}
              >
                {job.aiNote}
              </p>
            </div>
          </div>

          {/* Meta Grid (4 pills in 2x2 grid) */}
          <div className="mt-1.5 grid grid-cols-2 gap-1 text-[9.5px] sm:text-[10px]">
            <div className="flex items-center gap-1 rounded bg-slate-50 px-2 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-50 px-2 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <IndianRupee className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate font-bold">{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-50 px-2 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <Briefcase className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate">{job.experience}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-50 px-2 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <Clock className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate">{job.type}</span>
            </div>
          </div>

          {/* Skills Tags */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-blue-50/80 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Why Match Section */}
        <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">
            <span>Why {job.matchScore}% Match?</span>
            <span
              className={cn(
                "font-bold",
                isHighMatch
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {job.matchGrade}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center text-[9px]">
            <div
              className={cn(
                "rounded p-0.5",
                job.breakdown.skillsOk
                  ? "bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
              )}
            >
              <span className="block text-[8px] text-slate-500">Skills</span>
              <span className="font-bold">{job.breakdown.skills}</span>
            </div>
            <div
              className={cn(
                "rounded p-0.5",
                job.breakdown.expOk
                  ? "bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
              )}
            >
              <span className="block text-[8px] text-slate-500">Exp</span>
              <span className="font-bold">{job.breakdown.exp}</span>
            </div>
            <div
              className={cn(
                "rounded p-0.5",
                job.breakdown.locationOk
                  ? "bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
              )}
            >
              <span className="block text-[8px] text-slate-500">Location</span>
              <span className="font-bold">{job.breakdown.location}</span>
            </div>
            <div
              className={cn(
                "rounded p-0.5",
                job.breakdown.salaryOk
                  ? "bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
              )}
            >
              <span className="block text-[8px] text-slate-500">Salary</span>
              <span className="font-bold">{job.breakdown.salary}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons on Card */}
        <div className="mt-2 flex items-center justify-between gap-1.5 pt-0.5">
          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              performSwipe("left");
            }}
            aria-label="Skip Job"
            className="flex-1 flex items-center justify-center gap-1 rounded-full border border-rose-200 bg-rose-50/80 py-1.5 text-[11px] font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 cursor-pointer"
          >
            <X className="h-3 w-3" />
            <span>Skip</span>
          </button>

          {/* Hirance Logo / Bookmark Button */}
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Save Job"
            className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-1.5 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 dark:border-slate-800 dark:bg-slate-800 cursor-pointer"
          >
            <Image
              src="/images/icon.png"
              alt="Hirance Icon"
              width={16}
              height={16}
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain"
            />
          </button>

          {/* Apply Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              performSwipe("right");
            }}
            aria-label="Apply to Job"
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-emerald-600 py-1.5 text-[11px] font-bold text-white shadow-sm shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-95 cursor-pointer"
          >
            <Check className="h-3 w-3" strokeWidth={2.8} />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function SwipePlayground() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [applied, setApplied] = useState<PlaygroundJob[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  const handleDecide = useCallback(
    (dir: "left" | "right", job: PlaygroundJob) => {
      if (index >= PLAYGROUND_JOBS.length) return;

      if (dir === "right") {
        setApplied((prev) => [...prev, job]);
        setShowAppliedToast(true);
        setTimeout(() => setShowAppliedToast(false), 2200);
      } else {
        setSkipped((prev) => prev + 1);
      }

      setIndex((prev) => prev + 1);
    },
    [index]
  );

  const handleRestart = () => {
    setIndex(0);
    setApplied([]);
    setSkipped(0);
  };

  const done = index >= PLAYGROUND_JOBS.length;
  const currentJob = PLAYGROUND_JOBS[index];
  const nextJob = PLAYGROUND_JOBS[index + 1];

  return (
    <section
      id="playground"
      className="relative w-full overflow-hidden py-10 sm:py-14 lg:py-18"
      aria-labelledby="playground-heading"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/3 top-1/2 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/8 to-cyan-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Headline, Live Tally & Applied Stream */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            <h2
              id="playground-heading"
              className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Your Turn.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                Swipe a Few Jobs.
              </span>
            </h2>

            <p className="mt-3.5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Drag the card right to apply, left to skip — or use the action buttons below. This is exactly how fast hiring feels on Hirance.
            </p>

            {/* Live Tally Cards */}
            <div className="mt-7 grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {applied.length}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground font-medium flex items-center justify-center gap-1">
                  <Check size={13} className="text-emerald-500" strokeWidth={2.5} /> Applied
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-black text-rose-500 dark:text-rose-400">
                  {skipped}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground font-medium flex items-center justify-center gap-1">
                  <X size={13} className="text-rose-500" strokeWidth={2.5} /> Skipped
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-black text-foreground">
                  {Math.min(index + (done ? 0 : 1), PLAYGROUND_JOBS.length)}/{PLAYGROUND_JOBS.length}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground font-medium">
                  Reviewed
                </p>
              </div>
            </div>

            {/* Live Applied Stream List */}
            {applied.length > 0 && (
              <div className="mt-5 space-y-2 w-full max-w-md">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-left">
                  Applied Roles ({applied.length})
                </p>
                <AnimatePresence>
                  {applied.slice(-2).map((j) => (
                    <motion.div
                      key={j.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-500/20 px-3.5 py-2 text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate">
                          {j.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {j.company} · {j.location}
                        </p>
                      </div>
                      <span className="shrink-0 ml-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                        {j.matchScore}%
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Right Column: Interactive Swipe Deck */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center lg:col-span-5"
          >
            {/* Card Deck Wrapper */}
            <div className="relative flex flex-col items-center w-[285px] sm:w-[295px]">
              <div className="relative w-full h-[370px] sm:h-[385px] select-none">
                {!done ? (
                  <>
                    {/* Background Stack Layer (Visual Depth) */}
                    {nextJob && (
                      <div className="absolute inset-0 translate-y-2.5 scale-[0.96] rounded-[22px] sm:rounded-[24px] border border-slate-200/60 bg-white/70 dark:border-slate-800 dark:bg-slate-900/70 opacity-60 shadow-lg" />
                    )}

                    {/* Active Top Draggable Card */}
                    <AnimatePresence mode="popLayout">
                      <DragCard
                        key={currentJob.id}
                        job={currentJob}
                        onDecide={handleDecide}
                        isTop={true}
                      />
                    </AnimatePresence>
                  </>
                ) : (
                  /* Celebration Finished Screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 rounded-[22px] sm:rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-2 shadow-md shadow-blue-500/25">
                      <PartyPopper size={22} />
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                      That was fast! 🎉
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-[240px]">
                      You reviewed all roles and applied to{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {applied.length} role{applied.length !== 1 ? "s" : ""}
                      </strong>{" "}
                      in seconds.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 w-full max-w-[230px]">
                      <a
                        href={siteConfig.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 rounded-full bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white py-2 px-4 text-xs font-bold shadow-md shadow-[#0077c8]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 512 512" fill="none" aria-hidden="true">
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
                        <span>Get Google App</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      <button
                        type="button"
                        onClick={handleRestart}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800 hover:bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        <RotateCcw size={12} />
                        <span>Replay Demo</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Dynamic Toast for Applied Roles */}
              <AnimatePresence>
                {showAppliedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute -top-3 z-50 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-600 px-3 py-1 text-white shadow-xl shadow-emerald-600/30 text-[11px] font-bold"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                    <span>Application Sent! Recruiter notified.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SwipePlayground;
