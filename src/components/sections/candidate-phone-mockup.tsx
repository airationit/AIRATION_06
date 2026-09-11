"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Check,
  X,
  Bookmark,
  RotateCcw,
  SlidersHorizontal,
  Bell,
  Layers,
  MessageSquare,
  User,
  Wifi,
  Signal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface JobBreakdownItem {
  label: string;
  score: string;
  status: "high" | "mid" | "low";
}

export interface JobCardData {
  id: string;
  department: string;
  title: string;
  company: string;
  verified: boolean;
  verifiedText: string;
  matchScore: number;
  aiNote: React.ReactNode;
  location: string;
  salary: string;
  experience: string;
  type: string;
  tags: string[];
  breakdown: JobBreakdownItem[];
  logoType?: "hirance" | "nexus" | "pixel" | "cerebra";
  logoColor?: string;
  logoLetter?: string;
}

const JOBS_DATA: JobCardData[] = [
  {
    id: "job-sales-manager",
    department: "Sales & Distribution",
    title: "Area Sales Manager",
    company: "Hirance Private L...",
    verified: false,
    verifiedText: "Employer Not Verified",
    matchScore: 33,
    aiNote: (
      <>
        Perfect for Distributor/Dealer Management professionals with{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">2-5 Years</strong>{" "}
        looking for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">Work from Office</strong>{" "}
        job...
      </>
    ),
    location: "Bareilly",
    salary: "Not Disclosed",
    experience: "2-5 Years",
    type: "Full Time",
    tags: ["Distributor/Dealer Management", "Regional Market Strategy"],
    breakdown: [
      { label: "Skills", score: "0/40", status: "low" },
      { label: "Experience", score: "5.2/13", status: "low" },
      { label: "Location", score: "7/7", status: "high" },
      { label: "Salary", score: "2.5/5", status: "mid" },
    ],
    logoType: "hirance",
  },
  {
    id: "job-software-engineer",
    department: "Engineering & Technology",
    title: "Senior Full Stack Engineer",
    company: "Nexus Cloud Systems",
    verified: true,
    verifiedText: "Verified Employer",
    matchScore: 94,
    aiNote: (
      <>
        High match for Next.js, TypeScript & React microservices with{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">3-5 Years</strong>{" "}
        looking for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">Hybrid / Remote</strong>{" "}
        job...
      </>
    ),
    location: "Bengaluru",
    salary: "₹ 18 - 28 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["Next.js", "TypeScript", "Node.js"],
    breakdown: [
      { label: "Skills", score: "38/40", status: "high" },
      { label: "Experience", score: "12/13", status: "high" },
      { label: "Location", score: "7/7", status: "high" },
      { label: "Salary", score: "5/5", status: "high" },
    ],
    logoType: "nexus",
    logoColor: "from-blue-600 to-indigo-600",
    logoLetter: "N",
  },
  {
    id: "job-product-designer",
    department: "Design & Creative",
    title: "Lead Product Designer (UI/UX)",
    company: "PixelCraft Studios",
    verified: true,
    verifiedText: "Verified Employer",
    matchScore: 88,
    aiNote: (
      <>
        Strong synergy for mobile UI design systems, Figma workflows with{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">3-5 Years</strong>{" "}
        looking for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">Work from Office</strong>{" "}
        job...
      </>
    ),
    location: "Mumbai",
    salary: "₹ 14 - 22 LPA",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["Figma", "Design Systems", "UI/UX"],
    breakdown: [
      { label: "Skills", score: "36/40", status: "high" },
      { label: "Experience", score: "11/13", status: "high" },
      { label: "Location", score: "7/7", status: "high" },
      { label: "Salary", score: "4.5/5", status: "high" },
    ],
    logoType: "pixel",
    logoColor: "from-rose-500 to-amber-500",
    logoLetter: "P",
  },
  {
    id: "job-ai-engineer",
    department: "Data & AI Research",
    title: "AI / ML Research Engineer",
    company: "Cerebra AI Labs",
    verified: true,
    verifiedText: "Verified Employer",
    matchScore: 64,
    aiNote: (
      <>
        Demands PyTorch, LLM fine-tuning & CUDA optimizations with{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">4-7 Years</strong>{" "}
        looking for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">Hybrid</strong>{" "}
        job...
      </>
    ),
    location: "Gurugram",
    salary: "₹ 24 - 36 LPA",
    experience: "4-7 Years",
    type: "Full Time",
    tags: ["PyTorch", "LLM Ops", "CUDA"],
    breakdown: [
      { label: "Skills", score: "24/40", status: "mid" },
      { label: "Experience", score: "9/13", status: "mid" },
      { label: "Location", score: "7/7", status: "high" },
      { label: "Salary", score: "5/5", status: "high" },
    ],
    logoType: "cerebra",
    logoColor: "from-purple-600 to-pink-600",
    logoLetter: "C",
  },
];

function HiranceSwirlLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-7 w-7 xs:h-8 xs:w-8 shrink-0 rounded-full bg-sky-50 flex items-center justify-center p-0.5 shadow-2xs border border-sky-100/60 dark:bg-sky-950/40 dark:border-sky-800/40",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (angle) => (
              <path
                key={angle}
                d="M50 50 C 48 38, 42 26, 52 18 C 58 13, 66 18, 62 26 C 58 34, 50 50, 50 50"
                transform={`rotate(${angle} 50 50)`}
              />
            )
          )}
        </g>
      </svg>
    </div>
  );
}

function CircularMatchGauge({ score }: { score: number }) {
  const radius = 17;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center h-11 w-11 shrink-0">
      {/* 4-point golden sparkle icon at top-right */}
      <span className="absolute -top-1 -right-0.5 text-amber-500 font-bold text-xs select-none">
        ✦
      </span>

      <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44">
        {/* Background circle track */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-800"
        />
        {/* Active progress stroke */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center score & label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-[11px] font-black text-slate-900 dark:text-white leading-none">
          {score}%
        </span>
        <span className="text-[7.5px] font-medium text-slate-400 dark:text-slate-500 leading-none mt-0.5">
          Match
        </span>
      </div>
    </div>
  );
}

function RupeeCircleIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-[8.5px] xs:text-[9.5px] leading-none",
        className
      )}
    >
      ₹
    </div>
  );
}

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
      initial={{
        scale,
        y: translateY,
        opacity,
      }}
      style={{
        position: "absolute",
        inset: 0,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 30 - indexOffset,
        cursor: isTop ? "grab" : "default",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translate3d(0, 0, 0)",
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
      {/* Card Body with Exact Layout from the App */}
      <div className="relative h-full w-full rounded-[22px] xs:rounded-[26px] border border-slate-200/90 bg-white p-3 xs:p-3.5 sm:p-4 shadow-lg flex flex-col justify-between dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Dynamic Stamp Overlays during manual drag OR programmatic auto-swiping */}
        {isTop && (
          <>
            {/* APPLY Stamp */}
            <motion.div
              style={{ opacity: applyStampOpacity }}
              className="pointer-events-none absolute left-3.5 top-3.5 z-40 rounded-lg border-2 border-emerald-500 bg-emerald-500/15 px-2.5 py-0.5 text-[9.5px] xs:text-[10.5px] font-black uppercase tracking-wider text-emerald-600 shadow-md backdrop-blur-sm -rotate-12 dark:bg-emerald-500/25 dark:text-emerald-400"
            >
              ✓ APPLY
            </motion.div>

            {/* SKIP Stamp */}
            <motion.div
              style={{ opacity: skipStampOpacity }}
              className="pointer-events-none absolute right-3.5 top-3.5 z-40 rounded-lg border-2 border-rose-500 bg-rose-500/15 px-2.5 py-0.5 text-[9.5px] xs:text-[10.5px] font-black uppercase tracking-wider text-rose-600 shadow-md backdrop-blur-sm rotate-12 dark:bg-rose-500/25 dark:text-rose-400"
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

        {/* Content Container */}
        <div>
          {/* Top Row: Company Info & Circular Match Gauge */}
          <div className="flex items-start justify-between gap-2">
            {/* Company Logo & Details */}
            <div className="flex items-center gap-2 min-w-0">
              {job.logoType === "hirance" ? (
                <HiranceSwirlLogo />
              ) : (
                <div
                  className={cn(
                    "h-7 w-7 xs:h-8 xs:w-8 shrink-0 rounded-xl bg-gradient-to-tr flex items-center justify-center text-white font-black text-xs shadow-xs",
                    job.logoColor || "from-blue-600 to-indigo-600"
                  )}
                >
                  {job.logoLetter || "H"}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-xs xs:text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {job.company}
                </p>
                <p className="truncate text-[9.5px] xs:text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  {job.verifiedText}
                </p>
              </div>
            </div>

            {/* Exact Circular Match Gauge */}
            <CircularMatchGauge score={job.matchScore} />
          </div>

          {/* Job Title */}
          <h3 className="mt-2 text-sm xs:text-base sm:text-[17px] font-black tracking-tight text-slate-900 dark:text-white leading-tight truncate">
            {job.title}
          </h3>

          {/* AI Match Insight Box (Lavender / Soft Purple) */}
          <div className="mt-2 rounded-xl xs:rounded-2xl border border-purple-200/60 bg-purple-50/40 p-2 xs:p-2.5 dark:border-purple-950 dark:bg-purple-950/20">
            <div className="flex items-start gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <p className="text-[9.5px] xs:text-[10px] leading-snug text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                {job.aiNote}
              </p>
            </div>
          </div>

          {/* Meta Grid (2x2 with colored outlined icons) */}
          <div className="mt-2 grid grid-cols-2 gap-1.5 xs:gap-2">
            {/* Location */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 xs:p-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <MapPin className="h-3.5 w-3.5 text-purple-500 stroke-[2] shrink-0" />
              <span className="truncate text-[10px] xs:text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.location}
              </span>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 xs:p-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <RupeeCircleIcon />
              <span className="truncate text-[10px] xs:text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.salary}
              </span>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 xs:p-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <Briefcase className="h-3.5 w-3.5 text-blue-500 stroke-[2] shrink-0" />
              <span className="truncate text-[10px] xs:text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.experience}
              </span>
            </div>

            {/* Type */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 xs:p-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <Clock className="h-3.5 w-3.5 text-orange-500 stroke-[2] shrink-0" />
              <span className="truncate text-[10px] xs:text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.type}
              </span>
            </div>
          </div>

          {/* Skill Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-blue-50/80 border border-blue-100/50 px-2 xs:px-2.5 py-0.5 xs:py-1 text-[9px] xs:text-[9.5px] font-medium text-slate-800 dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Why Match Section */}
        <div className="mt-2.5 rounded-2xl bg-emerald-50/40 border border-emerald-100/60 p-2 xs:p-2.5 dark:bg-emerald-950/20 dark:border-emerald-900/40">
          <p className="text-[11px] xs:text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1.5">
            Why {job.matchScore}% Match?
          </p>
          <div className="grid grid-cols-4 gap-1 xs:gap-1.5">
            {job.breakdown.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1 xs:gap-1.5 min-w-0"
              >
                {/* Vertical colored indicator line */}
                <div
                  className={cn(
                    "w-0.5 h-6 rounded-full shrink-0",
                    item.status === "high"
                      ? "bg-emerald-500"
                      : item.status === "mid"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  )}
                />
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[8px] xs:text-[8.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] xs:text-[10.5px] font-bold leading-tight truncate",
                      item.status === "high"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : item.status === "mid"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons on Card */}
        <div className="mt-2.5 flex items-center justify-between gap-2 pt-0.5">
          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              performSwipe("left");
            }}
            aria-label="Skip Job"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-rose-50/90 border border-rose-200/80 py-2 text-[11px] xs:text-xs font-bold text-rose-800 transition-all hover:bg-rose-100 active:scale-95 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300 cursor-pointer shadow-xs"
          >
            <X className="h-3.5 w-3.5 text-rose-700 dark:text-rose-300 stroke-[2.5]" />
            <span>Skip</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Save Job"
            className="h-8.5 w-8.5 xs:h-9 xs:w-9 shrink-0 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 cursor-pointer shadow-xs"
          >
            <Bookmark className="h-4 w-4 stroke-[2]" />
          </button>

          {/* Apply Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              performSwipe("right");
            }}
            aria-label="Apply to Job"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-[11px] xs:text-xs font-bold text-white shadow-md shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-95 cursor-pointer"
          >
            <Check className="h-4 w-4 stroke-[3]" />
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
      setTimeout(() => setShowAppliedToast(false), 1600);
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
      // Reached the end: pause on completion screen for 2.2 seconds then seamlessly auto-loop
      timerRef.current = setTimeout(() => {
        handleReset();
      }, 2200);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const currentJob = JOBS_DATA[currentIndex];
    // High match (>= 80) swipes right, otherwise left
    const targetDirection = currentJob.matchScore >= 80 ? "right" : "left";

    timerRef.current = setTimeout(() => {
      setAutoSwipeTarget({ id: currentJob.id, direction: targetDirection });
    }, 2200);

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
      <div
        className="relative w-[260px] xs:w-[278px] sm:w-[292px] md:w-[305px] lg:w-[295px] xl:w-[310px] 2xl:w-[330px] rounded-[34px] xs:rounded-[38px] sm:rounded-[42px] border-[6px] xs:border-[7px] sm:border-[8px] border-slate-900 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-black/80 dark:border-slate-800 dark:ring-white/10 overflow-hidden"
        style={{
          transformStyle: "flat",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Dynamic Island Notch */}
        <div className="absolute top-1.5 xs:top-2 left-1/2 -translate-x-1/2 z-50 flex h-3 xs:h-3.5 w-18 xs:w-20 items-center justify-between rounded-full bg-black px-1.5 py-0.5">
          <div className="h-1.5 xs:h-2 w-1.5 xs:w-2 rounded-full bg-slate-900 border border-slate-800" />
          <div className="h-1 xs:h-1.5 w-1 xs:w-1.5 rounded-full bg-blue-950" />
        </div>

        {/* Screen Area */}
        <div
          className="relative flex h-[485px] xs:h-[510px] sm:h-[530px] md:h-[545px] lg:h-[525px] xl:h-[550px] 2xl:h-[570px] w-full flex-col justify-between bg-slate-50 dark:bg-slate-950 overflow-hidden pt-4 xs:pt-5"
          style={{
            isolation: "isolate",
            transformStyle: "flat",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Status Bar (12:29 & 100% Battery) */}
          <div className="px-3.5 xs:px-4 flex items-center justify-between text-[9.5px] xs:text-[10px] font-bold text-slate-800 dark:text-slate-200 select-none">
            <span>12:29</span>
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Wifi className="h-3 w-3" />
              <Signal className="h-3 w-3" />
              {/* Battery indicator with 100 */}
              <div className="flex items-center rounded-2xs border border-slate-700 dark:border-slate-300 px-1 py-0.2 text-[8px] font-mono leading-none">
                <span>100</span>
              </div>
            </div>
          </div>

          {/* App Header with 99+ notifications badge */}
          <div className="px-3 xs:px-3.5 py-1 xs:py-1.5 flex items-center justify-between select-none">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-200/50"
              aria-label="Filter Preferences"
            >
              <SlidersHorizontal className="h-4 w-4 stroke-[2]" />
            </button>

            <span className="text-xs xs:text-sm font-black text-slate-900 dark:text-white tracking-tight">
              Get Hired Today
            </span>

            <div className="relative">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-200/50"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 stroke-[2]" />
              </button>
              <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-blue-600 px-1 py-0.2 text-[7.5px] font-black text-white shadow-xs">
                99+
              </span>
            </div>
          </div>

          {/* Card Stack Playground Area */}
          <div
            className="relative mx-2 xs:mx-2.5 flex-1 min-h-0 my-0.5"
            style={{
              isolation: "isolate",
              transformStyle: "flat",
            }}
          >
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
                  className="absolute inset-0 rounded-[22px] xs:rounded-[26px] border border-slate-200 bg-white p-3.5 xs:p-4 shadow-lg flex flex-col items-center justify-center text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-9 w-9 xs:h-10 xs:w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-1.5 xs:mb-2 shadow-xs">
                    <Sparkles className="h-4 w-4 xs:h-5 xs:w-5" />
                  </div>
                  <h4 className="text-xs xs:text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    All Caught Up! 🎉
                  </h4>
                  <p className="mt-0.5 xs:mt-1 text-[9px] xs:text-[10px] sm:text-[10.5px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-[190px] xs:max-w-[200px]">
                    Ready to get hired? Get the Hirance mobile app on Google Play.
                  </p>

                  {/* Primary CTA: Google Play App Redirect */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hirance"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get Hirance App on Google Play"
                    className="mt-2.5 xs:mt-3.5 flex items-center justify-center gap-1.5 xs:gap-2 rounded-full bg-slate-950 px-3.5 xs:px-4 py-1.5 xs:py-2 text-[10px] xs:text-[11px] font-extrabold text-white shadow-md shadow-slate-950/20 transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-950 border border-slate-800 dark:border-slate-200 w-full max-w-[200px] xs:max-w-[215px]"
                  >
                    <svg
                      className="h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0"
                      viewBox="0 0 512 512"
                      fill="none"
                      aria-hidden="true"
                    >
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
                    className="mt-1.5 xs:mt-2 flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 xs:px-3.5 py-1 xs:py-1.5 text-[9.5px] xs:text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 w-full max-w-[200px] xs:max-w-[215px]"
                  >
                    <RotateCcw className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-slate-500" />
                    <span>Reset Demo Deck</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom App Navigation Bar */}
          <div className="px-3 xs:px-4 py-1.5 bg-white border-t border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex items-center justify-around select-none">
            {/* Swipe (Active) */}
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 text-blue-600"
            >
              <div className="rounded-2xl bg-blue-100/70 px-3.5 py-0.5 flex items-center justify-center">
                <Layers className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[8.5px] font-extrabold">Swipe</span>
            </button>

            {/* My Jobs */}
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500"
            >
              <Briefcase className="h-4 w-4 stroke-[2]" />
              <span className="text-[8.5px] font-medium">My Jobs</span>
            </button>

            {/* Messages */}
            <div className="relative">
              <button
                type="button"
                className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500"
              >
                <MessageSquare className="h-4 w-4 stroke-[2]" />
                <span className="text-[8.5px] font-medium">Messages</span>
              </button>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[7px] font-black text-white">
                10
              </span>
            </div>

            {/* Profile */}
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500"
            >
              <User className="h-4 w-4 stroke-[2]" />
              <span className="text-[8.5px] font-medium">Profile</span>
            </button>
          </div>

          {/* Android System Nav Bar */}
          <div className="flex items-center justify-around px-8 py-0.5 text-slate-400 dark:text-slate-600 select-none bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800">
            <div className="flex flex-col gap-0.5">
              <div className="w-2.5 h-0.5 bg-current rounded-full" />
              <div className="w-2.5 h-0.5 bg-current rounded-full" />
              <div className="w-2.5 h-0.5 bg-current rounded-full" />
            </div>
            <div className="w-2 h-2 rounded-2xs border border-current" />
            <div className="text-[9px] leading-none">⟨</div>
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
