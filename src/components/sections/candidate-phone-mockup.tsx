"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  Award,
  ShoppingBag,
  LayoutGrid,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { REAL_LIVE_JOBS, mapJobToCardData } from "@/lib/live-jobs-mapper";
import { JobListItem } from "@/types/jobs";

export interface JobBreakdownItem {
  label: string;
  score: string;
  status: "high" | "mid" | "low";
  icon?: "chart" | "briefcase" | "badge" | "bag" | "grid";
}

export interface JobCardData {
  id: string;
  department: string;
  postedTime?: string;
  title: string;
  company: string;
  companyLocation?: string;
  companyLogo?: string | null;
  verified: boolean;
  verifiedText: string;
  matchScore: number;
  matchLabel?: string;
  aiNote: React.ReactNode;
  location: string;
  salary: string;
  experience: string;
  type: string;
  tags: string[];
  breakdown: JobBreakdownItem[];
  logoType?: "riveyra" | "hirance" | "nexus" | "pixel" | "cerebra";
  logoColor?: string;
  logoLetter?: string;
}

const JOBS_DATA: JobCardData[] = [
  {
    id: "job-dba-riveyra",
    department: "IT / Software Roles",
    postedTime: "Posted 1 hr ago",
    title: "Database Administrator (DBA)",
    company: "Riveyra Infotech Pvt. Ltd.",
    companyLocation: "Kanpur",
    verified: true,
    verifiedText: "Kanpur",
    matchScore: 41,
    matchLabel: "MODERATE MATCH",
    aiNote: (
      <>
        Perfect for{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">
          Database Administrator (DBA)
        </strong>{" "}
        professionals with{" "}
        <strong className="font-bold text-indigo-950 dark:text-indigo-200">
          3-5 Years
        </strong>{" "}
        experience.
      </>
    ),
    location: "Onsite",
    salary: "₹ 20K - 30K/Mo",
    experience: "3-5 Years",
    type: "Full Time",
    tags: ["Backup/recovery", "SQL Server/MSSQL", "PROBLEM SOLVING"],
    breakdown: [
      { label: "Skills", score: "0/35", status: "low", icon: "chart" },
      { label: "Experience", score: "12/20", status: "mid", icon: "briefcase" },
      { label: "Role Fit", score: "10.5/15", status: "mid", icon: "badge" },
      { label: "Salary", score: "10/10", status: "high", icon: "bag" },
      { label: "Other", score: "4/20", status: "low", icon: "grid" },
    ],
    logoType: "riveyra",
  },
  {
    id: "job-ai-engineer",
    department: "Data & AI Research",
    postedTime: "Posted 2 hrs ago",
    title: "AI / ML Research Engineer",
    company: "Cerebra AI Labs",
    companyLocation: "Gurugram",
    verified: true,
    verifiedText: "Gurugram",
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
      { label: "Skills", score: "24/40", status: "mid", icon: "chart" },
      { label: "Experience", score: "9/13", status: "mid", icon: "briefcase" },
      { label: "Location", score: "7/7", status: "high", icon: "badge" },
      { label: "Salary", score: "5/5", status: "high", icon: "bag" },
      { label: "Other", score: "4/10", status: "mid", icon: "grid" },
    ],
    logoType: "cerebra",
    logoColor: "from-purple-600 to-pink-600",
    logoLetter: "C",
  },
  {
    id: "job-software-engineer",
    department: "Engineering & Technology",
    postedTime: "Posted 3 hrs ago",
    title: "Senior Full Stack Engineer",
    company: "Nexus Cloud Systems",
    companyLocation: "Bengaluru",
    verified: true,
    verifiedText: "Bengaluru",
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
      { label: "Skills", score: "38/40", status: "high", icon: "chart" },
      { label: "Experience", score: "12/13", status: "high", icon: "briefcase" },
      { label: "Location", score: "7/7", status: "high", icon: "badge" },
      { label: "Salary", score: "5/5", status: "high", icon: "bag" },
      { label: "Other", score: "8/10", status: "high", icon: "grid" },
    ],
    logoType: "nexus",
    logoColor: "from-blue-600 to-indigo-600",
    logoLetter: "N",
  },
];

/** Riveyra logo matching Figma */
function RiveyraLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-8 w-8 xs:h-9 xs:w-9 shrink-0 rounded-xl bg-slate-950 flex items-center justify-center p-1 border border-slate-800 shadow-xs",
        className
      )}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" fill="none">
        <path
          d="M14 10 C14 10, 26 10, 26 18 C26 23, 20 24, 14 24"
          stroke="url(#r-pink-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M14 10 V30"
          stroke="url(#r-pink-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M20 24 L27 30"
          stroke="url(#r-pink-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="r-pink-grad" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F43F5E" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function MetricIcon({ type }: { type?: string }) {
  if (type === "briefcase") {
    return <Briefcase className="h-3 w-3 text-purple-600 dark:text-purple-400 stroke-[2]" />;
  }
  if (type === "badge") {
    return <Award className="h-3 w-3 text-amber-500 dark:text-amber-400 stroke-[2]" />;
  }
  if (type === "bag") {
    return <ShoppingBag className="h-3 w-3 text-emerald-600 dark:text-emerald-400 stroke-[2]" />;
  }
  if (type === "grid") {
    return <LayoutGrid className="h-3 w-3 text-slate-500 dark:text-slate-400 stroke-[2]" />;
  }
  return <BarChart2 className="h-3 w-3 text-sky-500 dark:text-sky-400 stroke-[2]" />;
}

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
      <div className="relative h-full w-full rounded-[22px] xs:rounded-[26px] border border-slate-200/90 !bg-white p-3 xs:p-3.5 sm:p-4 shadow-lg flex flex-col justify-between dark:border-slate-800 dark:!bg-slate-900 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
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
              {job.logoType === "riveyra" ? (
                <RiveyraLogo />
              ) : job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="h-7 w-7 xs:h-8 xs:w-8 shrink-0 rounded-xl object-contain bg-white dark:bg-slate-800 p-0.5 border border-slate-200/60 dark:border-slate-700 shadow-2xs"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : job.logoType === "hirance" ? (
                <HiranceSwirlLogo />
              ) : (
                <div
                  className={cn(
                    "h-7 w-7 xs:h-8 xs:w-8 shrink-0 rounded-xl bg-gradient-to-tr flex items-center justify-center text-white font-black text-xs shadow-xs",
                    job.logoColor || "from-blue-600 to-indigo-600"
                  )}
                >
                  {job.logoLetter || job.company?.charAt(0) || "H"}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-xs xs:text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {job.company}
                </p>
                <p className="truncate text-[9.5px] xs:text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  {job.companyLocation || job.verifiedText}
                </p>
              </div>
            </div>

            {/* Circular Match Gauge matching Figma */}
            <CircularMatchGauge score={job.matchScore} />
          </div>

          {/* Job Title & Subtitle */}
          <div className="mt-1.5">
            <h3 className="text-sm xs:text-base font-black tracking-tight text-slate-900 dark:text-white leading-tight truncate">
              {job.title}
            </h3>
            {job.department && (
              <p className="text-[9.5px] xs:text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                {job.department} {job.postedTime ? `• ${job.postedTime}` : ""}
              </p>
            )}
          </div>

          {/* AI Match Insight Box (Lavender / Soft Purple) */}
          <div className="mt-2 rounded-xl xs:rounded-2xl border border-purple-200/60 bg-purple-50/50 p-2 xs:p-2.5 dark:border-purple-950 dark:bg-purple-950/20">
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
          <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
            {job.tags.slice(0, 3).map((tag, tagIdx) => (
              <span
                key={`${tag}-${tagIdx}`}
                className="max-w-[85px] xs:max-w-[95px] truncate rounded-lg bg-blue-50/80 border border-blue-100/50 px-2 xs:px-2.5 py-0.5 xs:py-1 text-[8.5px] xs:text-[9px] font-medium text-slate-700 dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Why Match Section matching Figma */}
        <div className="mt-2 rounded-2xl bg-emerald-50/40 border border-emerald-100/60 p-2 xs:p-2.5 dark:bg-emerald-950/20 dark:border-emerald-900/40">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10.5px] xs:text-[11px] font-bold text-emerald-800 dark:text-emerald-400">
              Why {job.matchScore}% Match?
            </p>
            <span className="rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-200/80 dark:border-emerald-800 px-1.5 py-0.2 text-[7px] xs:text-[7.5px] font-bold text-emerald-700 dark:text-emerald-300">
              {job.matchLabel || "MODERATE MATCH"} ⓘ
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 text-center">
            {job.breakdown.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center min-w-0"
              >
                <div className="mb-0.5">
                  <MetricIcon type={item.icon} />
                </div>
                <span className="text-[7.5px] xs:text-[8px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  {item.label}
                </span>
                <span className="text-[8.5px] xs:text-[9.5px] font-bold text-slate-800 dark:text-slate-200 leading-tight truncate">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons on Card matching Figma */}
        <div className="mt-2 flex items-center justify-between gap-2 pt-0.5">
          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              performSwipe("left");
            }}
            aria-label="Skip Job"
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-rose-50 border border-rose-200/80 py-2 text-[11px] xs:text-xs font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300 cursor-pointer shadow-xs"
          >
            <X className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Skip</span>
          </button>

          {/* Center Floating Hirance "H" Button matching Figma */}
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
              className="h-4.5 w-4.5 object-contain"
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
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-[#00a86b] hover:bg-[#00925d] py-2 text-[11px] xs:text-xs font-bold text-white shadow-md shadow-[#00a86b]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface CandidatePhoneMockupProps {
  initialJobs?: JobListItem[];
}

export function CandidatePhoneMockup({ initialJobs }: CandidatePhoneMockupProps = {}) {
  const [jobs, setJobs] = useState<JobCardData[]>(() => {
    if (initialJobs && initialJobs.length > 0) {
      return initialJobs.map((j, i) => mapJobToCardData(j, i));
    }
    return REAL_LIVE_JOBS.map((j, i) => mapJobToCardData(j, i));
  });

  useEffect(() => {
    if (initialJobs && initialJobs.length > 0) {
      setJobs(initialJobs.map((j, i) => mapJobToCardData(j, i)));
    } else {
      // Dynamic client-side fetch from live endpoint
      fetch("/api/v1/jobs/?page_size=8")
        .then((r) => r.json())
        .then((res) => {
          if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
            setJobs(res.data.map((j: JobListItem, i: number) => mapJobToCardData(j, i)));
          }
        })
        .catch(() => {});
    }
  }, [initialJobs]);

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

  // Automatic Swiping Engine based on match score
  useEffect(() => {
    if (reducedMotion || isPaused || autoSwipeTarget || jobs.length === 0) return;

    const currentJob = jobs[currentIndex % jobs.length];
    if (!currentJob) return;

    // High match (>= 80) swipes right, otherwise left
    const targetDirection = currentJob.matchScore >= 80 ? "right" : "left";

    timerRef.current = setTimeout(() => {
      setAutoSwipeTarget({ id: currentJob.id, direction: targetDirection });
    }, 3200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, autoSwipeTarget, reducedMotion, jobs]);

  // Continuously show available job cards in an infinite deck cycle
  const visibleCards = useMemo(() => {
    if (jobs.length === 0) return [];
    const count = Math.min(3, jobs.length);
    const result: { job: JobCardData; key: string; indexOffset: number }[] = [];
    for (let offset = 0; offset < count; offset++) {
      const idx = (currentIndex + offset) % jobs.length;
      result.push({
        job: jobs[idx],
        key: `${jobs[idx].id}-${currentIndex + offset}`,
        indexOffset: offset,
      });
    }
    return result;
  }, [currentIndex, jobs]);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Smartphone Chassis matching Figma */}
      <div
        className="relative w-[265px] xs:w-[280px] sm:w-[295px] md:w-[310px] lg:w-[305px] xl:w-[320px] rounded-[38px] border-[7px] border-slate-900 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/80 dark:border-slate-800 dark:ring-white/10 overflow-hidden"
        style={{
          transformStyle: "flat",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Center Punch Hole Camera matching Figma */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-black ring-1 ring-slate-800" />
        </div>

        {/* Screen Area */}
        <div
          className="relative flex h-[500px] xs:h-[525px] sm:h-[545px] md:h-[560px] lg:h-[540px] xl:h-[560px] w-full flex-col justify-between bg-slate-50 dark:bg-slate-950 overflow-hidden pt-3.5"
          style={{
            isolation: "isolate",
            transformStyle: "flat",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Status Bar (11:06 matching Figma) */}
          <div className="px-4 flex items-center justify-between text-[10px] font-bold text-slate-800 dark:text-slate-200 select-none">
            <span>11:06</span>
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <div className="flex items-center rounded-2xs border border-slate-700 dark:border-slate-300 px-1 py-0.2 text-[8px] font-mono leading-none">
                <span>90</span>
              </div>
            </div>
          </div>

          {/* App Header with 10 notifications badge matching Figma */}
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

          {/* Persistent Green Toast Banner matching Figma */}
          <div className="mx-2 xs:mx-2.5 mb-1 flex items-center justify-between rounded-lg bg-[#00a86b] px-3 py-1.5 text-white shadow-xs select-none">
            <div className="flex items-center gap-1.5 text-[9.5px] xs:text-[10px] font-semibold">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>Application #74 Sent! Recruiter notified.</span>
            </div>
            <span className="text-amber-300 text-xs font-bold select-none leading-none">✦</span>
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
              {visibleCards.map(({ job, key, indexOffset }) => (
                <SwipeCard
                  key={key}
                  job={job}
                  isTop={indexOffset === 0}
                  indexOffset={indexOffset}
                  onSwipeComplete={handleSwipeComplete}
                  triggerDirection={
                    indexOffset === 0 && autoSwipeTarget?.id === job.id
                      ? autoSwipeTarget.direction
                      : null
                  }
                />
              ))}
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
