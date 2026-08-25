"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Sparkles,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  Check,
  X,
  Bookmark,
  RotateCcw,
  SlidersHorizontal,
  Bell,
  Layers,
  MessageSquare,
  User,
  BadgeCheck,
  Hand,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface JobCardData {
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

const JOBS_DATA: JobCardData[] = [
  {
    id: "it-job-1",
    department: "Web & Frontend Engineering",
    title: "Frontend Engineer (Next.js)",
    company: "Nexus Cloud Systems",
    verified: true,
    matchScore: 98,
    matchGrade: "HIGH MATCH",
    aiNote: "Strong match for your React, TypeScript, and high-performance UI architecture skillset.",
    location: "Bengaluru (Hybrid)",
    salary: "₹ 14 - 20 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
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
    id: "it-job-2",
    department: "Cloud Infrastructure & DevOps",
    title: "Lead DevOps & SRE Engineer",
    company: "StrataScale Cloud Infra",
    verified: true,
    matchScore: 56,
    matchGrade: "LOW MATCH",
    aiNote: "Requires 7+ yrs multi-cloud Terraform, Golang & 24/7 on-call. Stack gap with your current frontend/web focus.",
    location: "Hyderabad (On-site)",
    salary: "₹ 22 - 30 LPA",
    experience: "6-9 Years",
    type: "Full Time",
    tags: ["Kubernetes", "Terraform", "AWS / GCP", "Golang"],
    breakdown: {
      skills: "20/40",
      skillsOk: false,
      exp: "7/13",
      expOk: false,
      location: "5/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-slate-600 to-slate-800",
    logoLetter: "S",
  },
  {
    id: "it-job-3",
    department: "Backend & Distributed Systems",
    title: "Backend Systems Engineer",
    company: "FinVortex Technologies",
    verified: true,
    matchScore: 94,
    matchGrade: "HIGH MATCH",
    aiNote: "High synergy with your Node.js, PostgreSQL, Redis, and high-throughput microservices experience.",
    location: "Pune (Remote)",
    salary: "₹ 16 - 24 LPA",
    experience: "3-6 Years",
    type: "Full Time",
    tags: ["Node.js", "PostgreSQL", "Redis", "System Design"],
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
    logoColor: "from-blue-600 to-cyan-600",
    logoLetter: "F",
  },
  {
    id: "it-job-4",
    department: "AI & Machine Learning",
    title: "AI / ML Research Engineer",
    company: "Cerebra AI Labs",
    verified: true,
    matchScore: 62,
    matchGrade: "LOW MATCH",
    aiNote: "Role demands PyTorch, LLM fine-tuning & CUDA optimizations. Does not align with application-tier background.",
    location: "Gurugram (Hybrid)",
    salary: "₹ 24 - 35 LPA",
    experience: "4-7 Years",
    type: "Full Time",
    tags: ["PyTorch", "LLM Ops", "CUDA", "Deep Learning"],
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
    id: "it-job-5",
    department: "Cybersecurity & InfoSec",
    title: "Cybersecurity Analyst & SecOps",
    company: "ShieldPoint Infosec",
    verified: true,
    matchScore: 92,
    matchGrade: "HIGH MATCH",
    aiNote: "Great match for Application Security, OWASP standards, penetration audits, and SOC compliance monitoring.",
    location: "Noida (Hybrid)",
    salary: "₹ 12 - 18 LPA",
    experience: "2-5 Years",
    type: "Full Time",
    tags: ["AppSec", "OWASP", "SOC Monitoring", "Pen-testing"],
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
    logoColor: "from-emerald-600 to-teal-700",
    logoLetter: "S",
  },
  {
    id: "it-job-6",
    department: "Mobile Engineering",
    title: "Senior React Native Developer",
    company: "Airation Softtech Pvt Ltd",
    verified: true,
    matchScore: 96,
    matchGrade: "HIGH MATCH",
    aiNote: "Excellent match for cross-platform iOS & Android mobile app architecture, gesture animations & state management.",
    location: "Bareilly / Hybrid",
    salary: "₹ 14 - 22 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["React Native", "Expo", "TypeScript", "Mobile UI"],
    breakdown: {
      skills: "39/40",
      skillsOk: true,
      exp: "13/13",
      expOk: true,
      location: "7/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: "from-cyan-500 to-blue-600",
    logoLetter: "A",
  },
];

interface SwipeCardProps {
  job: JobCardData;
  isTop: boolean;
  indexOffset: number;
  onSwipeComplete: (direction: "left" | "right") => void;
  triggerDirection?: "left" | "right" | null;
}

function SwipeCard({
  job,
  isTop,
  indexOffset,
  onSwipeComplete,
  triggerDirection,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-14, 0, 14]);
  const applyStampOpacity = useTransform(x, [18, 65], [0, 1]);
  const skipStampOpacity = useTransform(x, [-18, -65], [0, 1]);
  const overlayGreen = useTransform(
    x,
    [0, 120],
    ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 0.14)"]
  );
  const overlayRed = useTransform(
    x,
    [0, -120],
    ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.14)"]
  );

  const isHighMatch = job.matchScore >= 80;
  const isAnimatingOut = useRef(false);

  const performSwipe = useCallback(
    (direction: "left" | "right") => {
      if (isAnimatingOut.current) return;
      isAnimatingOut.current = true;

      const targetX = direction === "right" ? 380 : -380;
      animate(x, targetX, {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
      }).then(() => {
        onSwipeComplete(direction);
      });
    },
    [onSwipeComplete, x]
  );

  // Triggered programmatically via auto-swipe
  useEffect(() => {
    if (isTop && triggerDirection && !isAnimatingOut.current) {
      performSwipe(triggerDirection);
    }
  }, [isTop, triggerDirection, performSwipe]);

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

  // Stacking scale & offset
  const scale = 1 - indexOffset * 0.04;
  const translateY = indexOffset * 8;
  const opacity = indexOffset === 0 ? 1 : indexOffset === 1 ? 0.9 : 0.6;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 30 - indexOffset,
        cursor: isTop ? "grab" : "default",
      }}
      animate={{
        scale,
        y: translateY,
        opacity,
      }}
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
      {/* Card Body */}
      <div className="relative h-full w-full rounded-[18px] border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-lg flex flex-col justify-between dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Dynamic Stamp Overlays during manual drag OR programmatic auto-swiping */}
        {isTop && (
          <>
            {/* APPLY Stamp */}
            <motion.div
              style={{ opacity: applyStampOpacity }}
              className="pointer-events-none absolute left-3 top-3 z-40 rounded-lg border-2 border-emerald-500 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 shadow-md backdrop-blur-sm -rotate-12 dark:bg-emerald-500/25 dark:text-emerald-400"
            >
              ✓ APPLY
            </motion.div>

            {/* SKIP Stamp */}
            <motion.div
              style={{ opacity: skipStampOpacity }}
              className="pointer-events-none absolute right-3 top-3 z-40 rounded-lg border-2 border-rose-500 bg-rose-500/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-rose-600 shadow-md backdrop-blur-sm rotate-12 dark:bg-rose-500/25 dark:text-rose-400"
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
          <div className="flex items-start justify-between gap-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "h-7 w-7 shrink-0 rounded-lg bg-gradient-to-tr flex items-center justify-center text-white font-black text-xs shadow-xs",
                  job.logoColor
                )}
              >
                {job.logoLetter}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  {job.company}
                </p>
                <div className="flex items-center gap-0.5">
                  <BadgeCheck className="h-3 w-3 text-blue-500 shrink-0" />
                  <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    Verified Employer
                  </span>
                </div>
              </div>
            </div>

            {/* Match Circle (Green for High Match, Rose/Amber for Low Match) */}
            <div
              className={cn(
                "shrink-0 flex items-center gap-1 rounded-full border px-1.5 py-0.5",
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
                  "text-[9.5px] font-extrabold",
                  isHighMatch
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {job.matchScore}% Match
              </span>
            </div>
          </div>

          {/* Job Title */}
          <h4 className="mt-1.5 text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-white leading-tight">
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
            <div className="flex items-start gap-1">
              {isHighMatch ? (
                <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <p
                className={cn(
                  "text-[9.5px] leading-snug font-medium line-clamp-2",
                  isHighMatch
                    ? "text-indigo-950 dark:text-indigo-200"
                    : "text-amber-950 dark:text-amber-200"
                )}
              >
                {job.aiNote}
              </p>
            </div>
          </div>

          {/* Meta Grid */}
          <div className="mt-1.5 grid grid-cols-2 gap-1 text-[9.5px]">
            <div className="flex items-center gap-1 rounded bg-slate-50 px-1.5 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <MapPin className="h-2.5 w-2.5 text-slate-400 shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-50 px-1.5 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <IndianRupee className="h-2.5 w-2.5 text-slate-400 shrink-0" />
              <span className="truncate font-semibold">{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-50 px-1.5 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <Briefcase className="h-2.5 w-2.5 text-slate-400 shrink-0" />
              <span className="truncate">{job.experience}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-50 px-1.5 py-1 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <Clock className="h-2.5 w-2.5 text-slate-400 shrink-0" />
              <span className="truncate">{job.type}</span>
            </div>
          </div>

          {/* Skills Tags */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {job.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-blue-50/80 px-1.5 py-0.5 text-[8.5px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Why Match Section */}
        <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[8.5px] text-slate-500 font-bold uppercase tracking-wider mb-1">
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
            className="flex-1 flex items-center justify-center gap-1 rounded-full border border-rose-200 bg-rose-50/80 py-1.5 text-[10.5px] font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 cursor-pointer"
          >
            <X className="h-3 w-3" />
            <span>Skip</span>
          </button>

          {/* Bookmark / Hirance Logo Button */}
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Save Job"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-1.5 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 dark:border-slate-800 dark:bg-slate-800 cursor-pointer"
          >
            <Image
              src="/images/icon.png"
              alt="Hirance Icon"
              width={16}
              height={16}
              className="h-3.5 w-3.5 object-contain"
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
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-emerald-600 py-1.5 text-[10.5px] font-bold text-white shadow-sm shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-95 cursor-pointer"
          >
            <Check className="h-3 w-3" strokeWidth={2.8} />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function CandidatePhoneMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSwipeTarget, setAutoSwipeTarget] = useState<{
    id: string;
    direction: "left" | "right";
  } | null>(null);
  const [appliedCount, setAppliedCount] = useState(0);
  const [showAppliedToast, setShowAppliedToast] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useReducedMotion();

  const handleSwipeComplete = useCallback((direction: "left" | "right") => {
    setAutoSwipeTarget(null);
    if (direction === "right") {
      setAppliedCount((prev) => prev + 1);
      setShowAppliedToast(true);
      setTimeout(() => setShowAppliedToast(false), 2200);
    }
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setAutoSwipeTarget(null);
  }, []);

  // Automatic Swiping Engine based on match score
  useEffect(() => {
    if (reducedMotion || isPaused || autoSwipeTarget) return;

    if (currentIndex >= JOBS_DATA.length) {
      // Reached the end: pause on completion screen for 3.2 seconds then seamlessly auto-loop
      timerRef.current = setTimeout(() => {
        handleReset();
      }, 3200);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    // Evaluate top card match score for direction:
    // Low Score (< 80) -> Left (Skip)
    // High Score (>= 80) -> Right (Apply)
    const currentJob = JOBS_DATA[currentIndex];
    const targetDirection = currentJob.matchScore >= 80 ? "right" : "left";

    timerRef.current = setTimeout(() => {
      setAutoSwipeTarget({ id: currentJob.id, direction: targetDirection });
    }, 3400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, autoSwipeTarget, reducedMotion, handleReset]);

  const visibleJobs = JOBS_DATA.slice(currentIndex, currentIndex + 3);
  const isDeckFinished = currentIndex >= JOBS_DATA.length;

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Smartphone Chassis */}
      <div className="relative w-[265px] sm:w-[285px] md:w-[295px] rounded-[38px] sm:rounded-[42px] border-[7px] sm:border-[8px] border-slate-900 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-black/80 dark:border-slate-800 dark:ring-white/10 overflow-hidden">
        {/* Dynamic Island Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex h-3.5 w-20 items-center justify-between rounded-full bg-black px-1.5 py-0.5">
          <div className="h-2 w-2 rounded-full bg-slate-900 border border-slate-800" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-950" />
        </div>

        {/* Screen Area */}
        <div className="relative flex h-[480px] sm:h-[505px] w-full flex-col justify-between bg-slate-100 dark:bg-slate-950 overflow-hidden pt-5">
          {/* Status Bar */}
          <div className="px-4 flex items-center justify-between text-[10px] font-bold text-slate-800 dark:text-slate-200 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5 items-end h-2">
                <span className="w-0.5 h-0.5 bg-current rounded-full" />
                <span className="w-0.5 h-1 bg-current rounded-full" />
                <span className="w-0.5 h-1.5 bg-current rounded-full" />
                <span className="w-0.5 h-2 bg-current rounded-full" />
              </div>
              <span className="text-[9px]">5G</span>
              <div className="w-4 h-2 rounded-2xs border border-current p-0.5 flex items-center">
                <div className="h-full w-3/4 bg-current rounded-3xs" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="px-3.5 py-1.5 flex items-center justify-between select-none">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 shadow-2xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Filter Preferences"
            >
              <SlidersHorizontal className="h-3 w-3" />
            </button>

            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-slate-900 dark:text-white">
                Get Hired Today
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 shadow-2xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Notifications"
              >
                <Bell className="h-3 w-3" />
              </button>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-black text-white">
                9+
              </span>
            </div>
          </div>

          {/* Card Stack Playground Area */}
          <div className="relative mx-2.5 flex-1 min-h-0 my-0.5">
            <AnimatePresence>
              {!isDeckFinished ? (
                visibleJobs.map((job, idx) => (
                  <SwipeCard
                    key={job.id}
                    job={job}
                    isTop={idx === 0}
                    indexOffset={idx}
                    onSwipeComplete={handleSwipeComplete}
                    triggerDirection={
                      idx === 0 && autoSwipeTarget?.id === job.id
                        ? autoSwipeTarget.direction
                        : null
                    }
                  />
                ))
              ) : (
                /* Deck Finished Screen with Google Play Redirect */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-[18px] border border-slate-200 bg-white p-3.5 sm:p-4 shadow-lg flex flex-col items-center justify-center text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-2 shadow-xs">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    All Caught Up! 🎉
                  </h4>
                  <p className="mt-1 text-[10px] sm:text-[10.5px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-[200px]">
                    Ready to get hired? Get the Hirance mobile app on Google Play.
                  </p>

                  {/* Primary CTA: Google Play App Redirect */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hirance"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get Hirance App on Google Play"
                    className="mt-3.5 flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-[11px] font-extrabold text-white shadow-md shadow-slate-950/20 transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-950 border border-slate-800 dark:border-slate-200 w-full max-w-[215px]"
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
                    <span>Get on Google Play</span>
                  </a>

                  {/* Secondary Action: Reset Demo Deck */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 w-full max-w-[215px]"
                  >
                    <RotateCcw className="h-3 w-3 text-slate-500" />
                    <span>Reset Demo Deck</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Swipe Hint Indicator */}
            {!isDeckFinished && (
              <div className="pointer-events-none absolute -bottom-0.5 inset-x-0 flex items-center justify-center gap-1 text-[9px] font-semibold text-slate-400 dark:text-slate-500">
                <Hand className="h-2.5 w-2.5 animate-pulse text-blue-500" />
                <span>Swipe left to Skip • right to Apply</span>
              </div>
            )}
          </div>

          {/* Bottom App Navigation Bar */}
          <div className="px-4 py-1.5 bg-white/95 border-t border-slate-200/80 dark:bg-slate-900/95 dark:border-slate-800 flex items-center justify-between select-none">
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 text-blue-600 dark:text-blue-400"
            >
              <Layers className="h-3.5 w-3.5" />
              <span className="text-[8px] font-extrabold">Swipe</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500"
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span className="text-[8px] font-medium">My Jobs</span>
            </button>
            <div className="relative">
              <button
                type="button"
                className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-[8px] font-medium">Messages</span>
              </button>
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 text-[7px] font-black text-white">
                60
              </span>
            </div>
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500"
            >
              <User className="h-3.5 w-3.5" />
              <span className="text-[8px] font-medium">Profile</span>
            </button>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="flex justify-center pb-1 bg-white/95 dark:bg-slate-900/95">
            <div className="h-0.5 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Dynamic Toast for Swiping Right (Applications) */}
      <AnimatePresence>
        {showAppliedToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-3 z-50 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-600 px-4 py-2 text-white shadow-xl shadow-emerald-600/30"
          >
            <Check className="h-4 w-4" strokeWidth={3} />
            <span className="text-xs font-bold">
              Application #{appliedCount} Sent! Recruiter notified.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

