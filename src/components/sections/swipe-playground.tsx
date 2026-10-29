"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  MapPin,
  Briefcase,
  Clock,
  Award,
  ShoppingBag,
  LayoutGrid,
  BarChart2,
  Signal,
  Wifi,
  SlidersHorizontal,
  Bell,
  Layers,
  MessageSquare,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JobListItem } from "@/types/jobs";

export interface PlaygroundJob {
  id: string;
  department: string;
  postedTime?: string;
  title: string;
  company: string;
  companyLocation?: string;
  verified: boolean;
  matchScore: number;
  matchGrade?: "HIGH MATCH" | "LOW MATCH" | "MODERATE MATCH";
  aiNote: React.ReactNode;
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
    role?: string;
    roleOk?: boolean;
    location?: string;
    locationOk?: boolean;
    salary: string;
    salaryOk: boolean;
    other?: string;
    otherOk?: boolean;
  };
  logoType?: "riveyra" | "custom";
  logoColor?: string;
  logoLetter?: string;
}

/** Riveyra Logo matching exact shared mockup */
function RiveyraLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-9 w-9 shrink-0 rounded-xl bg-slate-950 flex items-center justify-center p-1 border border-slate-800 shadow-xs",
        className
      )}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" fill="none">
        <path
          d="M14 10 C14 10, 26 10, 26 18 C26 23, 20 24, 14 24"
          stroke="url(#r-pink-grad-pg)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M14 10 V30"
          stroke="url(#r-pink-grad-pg)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M20 24 L27 30"
          stroke="url(#r-pink-grad-pg)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="r-pink-grad-pg" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F43F5E" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Circular Match Gauge with ✦ golden sparkle matching exact shared mockup */
function CircularMatchGauge({ score }: { score: number }) {
  const radius = 17;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // ~106.8
  const offset = circumference - (circumference * score) / 100;

  return (
    <div className="relative flex items-center justify-center h-11 w-11 shrink-0">
      <span className="absolute -top-1 -right-0.5 text-amber-500 font-bold text-xs select-none">
        ✦
      </span>
      <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-800"
        />
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
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-none">
          {score}%
        </span>
        <span className="text-[7.5px] font-medium text-slate-500 dark:text-slate-400 leading-none mt-0.5">
          Match
        </span>
      </div>
    </div>
  );
}

/** Rupee Icon matching exact shared mockup */
function RupeeCircleIcon() {
  return (
    <div className="h-4 w-4 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-600 font-bold text-[8.5px] leading-none shrink-0">
      ₹
    </div>
  );
}

const PLAYGROUND_JOBS: PlaygroundJob[] = [
  {
    id: "job-dba-riveyra",
    department: "IT / Software Roles",
    postedTime: "Posted 1w ago",
    title: "Database Administrator (DBA)",
    company: "Riveyra Infotech Pvt...",
    companyLocation: "Kanpur",
    verified: true,
    matchScore: 41,
    matchGrade: "MODERATE MATCH",
    aiNote: (
      <>
        Perfect for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">
          Database Administrator (DBA) professionals
        </strong>{" "}
        with{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">
          2–5 Years
        </strong>{" "}
        ex...
      </>
    ),
    location: "Onsite",
    salary: "20k – 30k/Mo",
    experience: "2–5 Years",
    type: "Full Time",
    tags: ["Backup/Rec...", "SQL Server/M...", "Problem Solv..."],
    breakdown: {
      skills: "0/35",
      skillsOk: false,
      exp: "12/20",
      expOk: true,
      role: "10.5/15",
      roleOk: true,
      salary: "10/10",
      salaryOk: true,
      other: "4/20",
      otherOk: false,
    },
    logoType: "riveyra",
  },
  {
    id: "pg-dept-1",
    department: "Engineering & Software Development",
    title: "Senior Full Stack Engineer (Next.js)",
    company: "Nexus Cloud Systems",
    companyLocation: "Bengaluru",
    verified: true,
    matchScore: 98,
    matchGrade: "HIGH MATCH",
    aiNote: (
      <>
        Strong match for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">
          React, TypeScript, Next.js architecture
        </strong>{" "}
        and Node microservices.
      </>
    ),
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
      role: "14/15",
      roleOk: true,
      salary: "5/5",
      salaryOk: true,
      other: "8/10",
      otherOk: true,
    },
    logoType: "custom",
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
      <div className="relative h-full w-full rounded-[22px] border border-slate-200/90 bg-white p-3 xs:p-3.5 shadow-md shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between overflow-hidden">
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

        {/* Content Container */}
        <div>
          {/* Top Row: Company Info & Circular Match Gauge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {job.logoType === "riveyra" ? (
                <RiveyraLogo />
              ) : (
                <div
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-xl bg-gradient-to-tr flex items-center justify-center text-white font-bold text-xs shadow-xs",
                    job.logoColor || "from-blue-600 to-indigo-600"
                  )}
                >
                  {job.logoLetter || job.company.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {job.company}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-blue-500 shrink-0" strokeWidth={2} />
                  <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 truncate">
                    {job.companyLocation || job.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Match Gauge matching exact mockup */}
            <CircularMatchGauge score={job.matchScore} />
          </div>

          {/* Job Title & Subtitle */}
          <div className="mt-2">
            <h4 className="text-[15px] sm:text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight truncate">
              {job.title}
            </h4>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {job.department} {job.postedTime ? `• ${job.postedTime}` : ""}
            </p>
          </div>

          {/* AI Match Insight Box */}
          <div className="mt-2 rounded-xl border border-purple-100 bg-[#F9F8FF] p-2 dark:border-purple-950 dark:bg-purple-950/20">
            <div className="flex items-start gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div className="text-[10px] leading-snug text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                {job.aiNote}
              </div>
            </div>
          </div>

          {/* Meta Grid (2x2) */}
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <MapPin className="h-3.5 w-3.5 text-blue-500 stroke-[2] shrink-0" />
              <span className="truncate text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.location}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <RupeeCircleIcon />
              <span className="truncate text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.salary}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <Briefcase className="h-3.5 w-3.5 text-purple-500 stroke-[2] shrink-0" />
              <span className="truncate text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.experience}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:border-slate-800 dark:bg-slate-900 min-w-0">
              <Clock className="h-3.5 w-3.5 text-amber-500 stroke-[2] shrink-0" />
              <span className="truncate text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                {job.type}
              </span>
            </div>
          </div>

          {/* Skill Tags */}
          <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
            {job.tags.slice(0, 3).map((tag, tagIdx) => (
              <span
                key={`${tag}-${tagIdx}`}
                className="max-w-[85px] xs:max-w-[95px] truncate rounded-lg bg-[#F0F5FA] border border-blue-100/50 px-2 py-0.5 text-[9px] font-medium text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Why Match Section */}
        <div className="mt-2 rounded-xl bg-[#F4FBF7] border border-emerald-200/60 p-2 dark:bg-emerald-950/20 dark:border-emerald-900/40">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400">
              Why {job.matchScore}% Match?
            </p>
          </div>
          <div className="grid grid-cols-5 gap-1 text-center">
            <div className="flex flex-col items-center justify-center min-w-0">
              <BarChart2 className="h-3 w-3 text-sky-500 stroke-[2] mb-0.5" />
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">Skills</span>
              <span className={cn("text-[9.5px] font-bold", job.breakdown.skillsOk ? "text-emerald-600" : "text-rose-600")}>
                {job.breakdown.skills}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-0">
              <Briefcase className="h-3 w-3 text-purple-600 stroke-[2] mb-0.5" />
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">Exp.</span>
              <span className={cn("text-[9.5px] font-bold", job.breakdown.expOk ? "text-emerald-600" : "text-rose-600")}>
                {job.breakdown.exp}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-0">
              <Award className="h-3 w-3 text-amber-500 stroke-[2] mb-0.5" />
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">Role</span>
              <span className={cn("text-[9.5px] font-bold", job.breakdown.roleOk !== false ? "text-emerald-600" : "text-rose-600")}>
                {job.breakdown.role || "10.5/15"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-0">
              <ShoppingBag className="h-3 w-3 text-emerald-600 stroke-[2] mb-0.5" />
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">Salary</span>
              <span className={cn("text-[9.5px] font-bold", job.breakdown.salaryOk ? "text-emerald-600" : "text-rose-600")}>
                {job.breakdown.salary}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center min-w-0">
              <LayoutGrid className="h-3 w-3 text-slate-500 stroke-[2] mb-0.5" />
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">Other</span>
              <span className={cn("text-[9.5px] font-bold", job.breakdown.otherOk ? "text-emerald-600" : "text-rose-600")}>
                {job.breakdown.other || "4/20"}
              </span>
            </div>
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
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-[#FEF2F2] border border-rose-200/80 py-2 text-xs font-bold text-[#991B1B] hover:bg-rose-100 transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            <X className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Skip</span>
          </button>

          {/* Center Floating Hirance "H" Button */}
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Hirance Action"
            className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-slate-100 bg-white shadow-md hover:scale-105 active:scale-95 transition-all dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icon.png"
              alt="Hirance"
              className="h-5 w-5 object-contain"
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
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-[#15803D] hover:bg-[#166534] py-2 text-xs font-bold text-white shadow-md shadow-emerald-800/20 transition-all active:scale-95 cursor-pointer"
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface SwipePlaygroundProps {
  initialJobs?: JobListItem[];
}

export function SwipePlayground({ initialJobs }: SwipePlaygroundProps = {}) {
  const reducedMotion = useReducedMotion();
  const [jobs, setJobs] = useState<PlaygroundJob[]>(PLAYGROUND_JOBS);

  const [index, setIndex] = useState(0);
  const [applied, setApplied] = useState<PlaygroundJob[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  const handleDecide = useCallback(
    (dir: "left" | "right", job: PlaygroundJob) => {
      if (dir === "right") {
        setApplied((prev) => [...prev, job]);
        setShowAppliedToast(true);
        setTimeout(() => setShowAppliedToast(false), 2200);
      } else {
        setSkipped((prev) => prev + 1);
      }

      setIndex((prev) => prev + 1);
    },
    []
  );

  const currentJob = jobs[index % jobs.length];
  const nextJob = jobs[(index + 1) % jobs.length];
  const reviewedCount = index === 0 ? 0 : ((index - 1) % 5) + 1;

  return (
    <section
      id="playground"
      className="section-blue-glow relative w-full overflow-hidden py-10 sm:py-14 lg:py-18 bg-white dark:bg-slate-950"
      aria-labelledby="playground-heading"
    >
      {/* Subtle section divider; the shared CSS supplies the center glow. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
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
              className="text-balance text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Your Turn,{" "}
              <span className="italic font-medium">
                Swipe a Few Jobs.
              </span>
            </h2>

            <p className="mt-3.5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Drag the card right to apply, left to skip — or use the action buttons below. This is exactly how fast hiring feels on Hirance.
            </p>

            {/* Live Tally Cards */}
            <div className="mt-7 grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="rounded-2xl border border-[#D1FAE5] bg-[#F6FFF9] dark:bg-emerald-950/20 dark:border-emerald-900/40 p-3.5 sm:p-4 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {applied.length}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground font-medium flex items-center justify-center gap-1">
                  <Check size={13} className="text-emerald-500" strokeWidth={2.5} /> Applied
                </p>
              </div>

              <div className="rounded-2xl border border-[#FFE4E6] bg-[#FFF7F7] dark:bg-rose-950/20 dark:border-rose-900/40 p-3.5 sm:p-4 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-semibold text-rose-500 dark:text-rose-400">
                  {skipped}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground font-medium flex items-center justify-center gap-1">
                  <X size={13} className="text-rose-500" strokeWidth={2.5} /> Skipped
                </p>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-[#FBFBFB] dark:bg-card dark:border-border p-3.5 sm:p-4 text-center shadow-xs">
                <p className="text-2xl sm:text-3xl font-semibold text-foreground">
                  {reviewedCount}/5
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
            {/* Smartphone Chassis matching Mockup */}
            <div
              className="relative w-[285px] xs:w-[305px] sm:w-[325px] rounded-[38px] border-[7px] border-slate-900 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/80 dark:border-slate-800 dark:ring-white/10 overflow-hidden"
              style={{
                transformStyle: "flat",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Center Punch Hole Camera */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
                <div className="h-2.5 w-2.5 rounded-full bg-black ring-1 ring-slate-800" />
              </div>

              {/* Screen Area */}
              <div
                className="relative flex h-[515px] xs:h-[535px] sm:h-[555px] w-full flex-col justify-between bg-slate-50 dark:bg-slate-950 overflow-hidden pt-3.5 select-none"
                style={{
                  isolation: "isolate",
                  transformStyle: "flat",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Status Bar (11:06 matching Mockup) */}
                <div className="px-4 flex items-center justify-between text-[10px] font-bold text-slate-800 dark:text-slate-200 select-none">
                  <span>11:06</span>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Signal className="h-3 w-3" />
                    <Wifi className="h-3 w-3" />
                    <div className="flex items-center gap-0.5 rounded-2xs border border-emerald-500 bg-emerald-500/10 px-1 py-0.2 text-[8px] font-mono leading-none text-emerald-600 dark:text-emerald-400">
                      <span>90</span>
                      <span className="text-[7px]">⚡</span>
                    </div>
                  </div>
                </div>

                {/* App Header with 10 notifications badge */}
                <div className="px-3 xs:px-3.5 py-1 flex items-center justify-between select-none">
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
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[7.5px] font-black text-white shadow-xs">
                      10
                    </span>
                  </div>
                </div>

                {/* Dynamic Application Toast */}
                <AnimatePresence>
                  {showAppliedToast && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="mx-2 xs:mx-2.5 mb-1 flex items-center justify-between rounded-lg bg-[#00a86b] px-3 py-1.5 text-white shadow-xs select-none"
                    >
                      <div className="flex items-center gap-1.5 text-[9.5px] xs:text-[10px] font-semibold">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Application Sent! Recruiter notified.</span>
                      </div>
                      <span className="text-amber-300 text-xs font-bold select-none leading-none">✦</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interactive Card Stack Area */}
                <div
                  className="relative mx-2 xs:mx-2.5 flex-1 min-h-0 my-0.5 select-none"
                  style={{
                    isolation: "isolate",
                    transformStyle: "flat",
                  }}
                >
                  {/* Background Stack Layer (Visual Depth) */}
                  {nextJob && (
                    <div className="absolute inset-0 translate-y-1.5 scale-[0.97] rounded-[22px] border border-slate-200/60 bg-white/70 dark:border-slate-800 dark:bg-slate-900/70 opacity-60 shadow-md" />
                  )}

                  {/* Active Top Draggable Card */}
                  <AnimatePresence mode="popLayout">
                    <DragCard
                      key={`${currentJob.id}-${index}`}
                      job={currentJob}
                      onDecide={handleDecide}
                      isTop={true}
                    />
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SwipePlayground;
