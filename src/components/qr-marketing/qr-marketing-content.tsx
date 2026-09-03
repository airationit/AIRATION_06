"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  MessageSquare,
  Download,
  ArrowRight,
  Briefcase,
  FileEdit,
  Filter,
  Calendar,
  Sparkles,
  BarChart3,
  ChevronRight,
  BadgeCheck,
  MapPin,
  IndianRupee,
  Clock,
  X,
  Check,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Footer, InteractiveDots } from "@/components/shared";

// 6 Employer Feature Icons for the unified bottom banner
const EMPLOYER_FEATURES = [
  {
    icon: FileEdit,
    top: "Post Jobs",
    bottom: "in Minutes",
  },
  {
    icon: Filter,
    top: "Smart",
    bottom: "Filters",
  },
  {
    icon: Calendar,
    top: "Bulk",
    bottom: "Scheduling",
  },
  {
    icon: Sparkles,
    top: "AI-Powered",
    bottom: "Matching",
  },
  {
    icon: MessageSquare,
    top: "Direct HR",
    bottom: "Chat",
  },
  {
    icon: BarChart3,
    top: "Analytics",
    bottom: "Dashboard",
  },
];

// 3 Realistic Roles for the Interactive Showcase Deck
const SHOWCASE_JOBS = [
  {
    id: "job-1",
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
      exp: "13/13",
      location: "7/7",
      salary: "5/5",
    },
    logoColor: "from-indigo-500 to-purple-600",
    logoLetter: "N",
  },
  {
    id: "job-2",
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
    tags: ["Figma", "Design Systems", "UI/UX"],
    breakdown: {
      skills: "38/40",
      exp: "12/13",
      location: "7/7",
      salary: "5/5",
    },
    logoColor: "from-rose-500 to-amber-500",
    logoLetter: "P",
  },
  {
    id: "job-3",
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
      exp: "12/13",
      location: "7/7",
      salary: "5/5",
    },
    logoColor: "from-blue-600 to-cyan-600",
    logoLetter: "Z",
  },
];

// Interactive Job Card Mockup aligned with Homescreen Design Language
function InteractiveJobSwipeShowcase() {
  const [jobIndex, setJobIndex] = useState(0);
  const [action, setAction] = useState<"idle" | "applied" | "skipped">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [dragX, setDragX] = useState(0);

  const currentJob = SHOWCASE_JOBS[jobIndex];

  const handleApply = () => {
    setAction("applied");
    setTimeout(() => {
      setJobIndex((prev) => (prev + 1) % SHOWCASE_JOBS.length);
      setAction("idle");
      setDragX(0);
    }, 1200);
  };

  const handleSkip = () => {
    setAction("skipped");
    setTimeout(() => {
      setJobIndex((prev) => (prev + 1) % SHOWCASE_JOBS.length);
      setAction("idle");
      setDragX(0);
    }, 900);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100/90 dark:border-blue-900/40 bg-white/95 dark:bg-card/90 p-6 sm:p-10 lg:p-12 shadow-xs">
      {/* Subtle ambient lighting glows matching homescreen theme */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Subtitle & Crisp Feature Highlights */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Headline matching Homescreen styling */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.1]">
            Swipe a Few Jobs.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Apply in Seconds.
            </span>
          </h2>

          {/* Subhead with engaging, relatable tone */}
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
            Dating apps ghost. Hirance doesn’t. Drag the card right to apply, left to skip — zero forms, instant HR connection.
          </p>

          {/* 3 Crisp Feature Highlights (Clean list rows, no bulky cards) */}
          <div className="mt-6 space-y-3 w-full max-w-md text-left">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-100/80 dark:border-blue-900/40 shadow-2xs">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  2-Second Apply
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  One swipe right sends your profile. Zero forms or repetitive cover letters.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-100/80 dark:border-blue-900/40 shadow-2xs">
                <Sparkles className="h-4 w-4 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  Instant Match Score
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Live compatibility breakdown across skills, experience, and salary.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-100/80 dark:border-blue-900/40 shadow-2xs">
                <MessageSquare className="h-4 w-4 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  Direct HR Connection
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Chat directly with verified employers. No recruiters in the middle.
                </p>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="mt-7 flex justify-center lg:justify-start w-full">
            <a
              href={siteConfig.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white px-6 py-3 text-sm sm:text-base font-bold shadow-md shadow-[#0077c8]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              <span>Start Swiping on Hirance</span>
              <ArrowRight className="h-4 w-4 opacity-80" />
            </a>
          </div>
        </div>

        {/* Right Column: Live Swiping Card with Continuous Vibration/Motion */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
          <div className="relative w-[300px] sm:w-[325px] h-[440px] flex items-center justify-center">
            {/* Background Stack Illusion */}
            <div className="absolute inset-0 translate-y-3 scale-[0.95] rounded-[26px] border border-slate-200/60 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60 opacity-60 shadow-md" />

            <AnimatePresence mode="wait">
              {action === "idle" ? (
                <motion.div
                  key={currentJob.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.65}
                  onDrag={(_, info) => setDragX(info.offset.x)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 75) {
                      handleApply();
                    } else if (info.offset.x < -75) {
                      handleSkip();
                    } else {
                      setDragX(0);
                    }
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setDragX(0);
                  }}
                  /* Continuous left and right vibration / swaying motion */
                  animate={
                    dragX !== 0
                      ? { x: dragX, rotate: dragX * 0.08 }
                      : isHovered
                        ? { x: 0, rotate: 0 }
                        : {
                          x: [-18, 18, -18],
                          rotate: [-3.5, 3.5, -3.5],
                        }
                  }
                  transition={
                    dragX !== 0 || isHovered
                      ? { duration: 0.15 }
                      : {
                        repeat: Infinity,
                        duration: 2.8,
                        ease: "easeInOut",
                      }
                  }
                  className="relative w-full rounded-[26px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  {/* Dynamic subtle stamp glow when dragging or vibrating */}
                  {dragX > 20 && (
                    <div className="pointer-events-none absolute left-3 top-3 z-30 rounded-lg border-2 border-emerald-500 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black tracking-wider text-emerald-600 shadow-md -rotate-12 backdrop-blur-xs">
                      ✓ APPLY
                    </div>
                  )}
                  {dragX < -20 && (
                    <div className="pointer-events-none absolute right-3 top-3 z-30 rounded-lg border-2 border-rose-500 bg-rose-500/20 px-2 py-0.5 text-[10px] font-black tracking-wider text-rose-600 shadow-md rotate-12 backdrop-blur-xs">
                      ✕ SKIP
                    </div>
                  )}

                  <div>
                    {/* Header Row: Company Avatar + Name + Match Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${currentJob.logoColor} flex items-center justify-center text-white font-black text-sm shadow-xs shrink-0`}
                        >
                          {currentJob.logoLetter}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                            {currentJob.company}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <BadgeCheck className="h-3 w-3 text-blue-500 shrink-0" />
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              Verified Employer
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Match Pill */}
                      <div className="shrink-0 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          {currentJob.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    {/* Department */}
                    <p className="mt-2.5 text-[9.5px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400 truncate">
                      {currentJob.department}
                    </p>

                    {/* Title */}
                    <h4 className="mt-0.5 text-sm sm:text-[15px] font-black text-slate-900 dark:text-white leading-snug">
                      {currentJob.title}
                    </h4>

                    {/* AI Match Insight Box */}
                    <div className="mt-2 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/80 dark:bg-indigo-950/30 p-2 flex items-start gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] sm:text-[10.5px] leading-snug text-indigo-950 dark:text-indigo-200 font-medium line-clamp-2">
                        {currentJob.aiNote}
                      </p>
                    </div>

                    {/* Meta Grid (4 pills in 2x2 grid) */}
                    <div className="mt-2 grid grid-cols-2 gap-1 text-[10px]">
                      <div className="flex items-center gap-1 rounded-md bg-slate-50 dark:bg-slate-800/60 px-2 py-1 text-slate-700 dark:text-slate-300">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">{currentJob.location}</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-slate-50 dark:bg-slate-800/60 px-2 py-1 text-slate-700 dark:text-slate-300">
                        <IndianRupee className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate font-bold">{currentJob.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-slate-50 dark:bg-slate-800/60 px-2 py-1 text-slate-700 dark:text-slate-300">
                        <Briefcase className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">{currentJob.experience}</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-slate-50 dark:bg-slate-800/60 px-2 py-1 text-slate-700 dark:text-slate-300">
                        <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">{currentJob.type}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {currentJob.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-blue-50/90 dark:bg-blue-950/50 px-2 py-0.5 text-[9.5px] font-semibold text-blue-700 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Why Match Section */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                      <span>WHY {currentJob.matchScore}% MATCH?</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                        {currentJob.matchGrade}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center text-[9.5px]">
                      <div className="rounded bg-emerald-50/80 dark:bg-emerald-950/40 p-1 text-emerald-600 dark:text-emerald-400">
                        <span className="block text-[8px] text-slate-500">Skills</span>
                        <span className="font-extrabold">{currentJob.breakdown.skills}</span>
                      </div>
                      <div className="rounded bg-emerald-50/80 dark:bg-emerald-950/40 p-1 text-emerald-600 dark:text-emerald-400">
                        <span className="block text-[8px] text-slate-500">Exp</span>
                        <span className="font-extrabold">{currentJob.breakdown.exp}</span>
                      </div>
                      <div className="rounded bg-emerald-50/80 dark:bg-emerald-950/40 p-1 text-emerald-600 dark:text-emerald-400">
                        <span className="block text-[8px] text-slate-500">Location</span>
                        <span className="font-extrabold">{currentJob.breakdown.location}</span>
                      </div>
                      <div className="rounded bg-emerald-50/80 dark:bg-emerald-950/40 p-1 text-emerald-600 dark:text-emerald-400">
                        <span className="block text-[8px] text-slate-500">Salary</span>
                        <span className="font-extrabold">{currentJob.breakdown.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons on Card */}
                  <div className="mt-3 flex items-center justify-between gap-2 pt-1">
                    {/* Skip Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSkip();
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/90 dark:bg-rose-950/40 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 transition-all hover:bg-rose-100 cursor-pointer shadow-2xs active:scale-95"
                    >
                      <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>Skip</span>
                    </button>

                    {/* Hirance Center Badge */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs p-1">
                      <Image
                        src="/images/icon.png"
                        alt="Hirance"
                        width={20}
                        height={20}
                        className="h-4 w-4 object-contain"
                      />
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply();
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#00875A] hover:bg-[#00754E] text-white py-2 text-xs font-bold transition-all shadow-md shadow-emerald-600/25 cursor-pointer active:scale-95"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>Apply</span>
                    </button>
                  </div>
                </motion.div>
              ) : action === "applied" ? (
                /* Celebration Screen after Apply */
                <motion.div
                  key="applied-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full rounded-[26px] bg-white dark:bg-slate-900 border-2 border-emerald-500/60 shadow-2xl p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-3 shadow-lg shadow-emerald-500/30">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-black text-foreground">
                    Applied in 2 Seconds! 🎉
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-[220px]">
                    Zero forms, zero cover letters. Profile sent directly to HR at {currentJob.company}.
                  </p>
                  <span className="mt-4 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Next job loading...
                  </span>
                </motion.div>
              ) : (
                /* Skipped Feedback Screen */
                <motion.div
                  key="skipped-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white mb-3 shadow-lg shadow-rose-500/30">
                    <X className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-black text-foreground">
                    Role Skipped
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-[220px]">
                    AI matching is fine-tuning recommendations to your exact preferences.
                  </p>
                  <span className="mt-4 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    Next match loading...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Scene: HR Manager & Sad Candidate with thought cloud
function SheRejectedHeroScene() {
  return (
    <div className="relative w-full max-w-[540px] lg:max-w-[590px] aspect-[800/533] overflow-hidden select-none">
      <Image
        src="/images/she_rejected.png"
        alt="Hirance - She Rejected? No worries! The right opportunity is just a swipe away"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export function QrMarketingContent() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Background Interactive Dots Canvas matching other pages */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* HERO / HEADER SECTION: Exact same format & background gradient as other pages */}
      <section
        className="relative pt-32 pb-12 sm:pt-40 sm:pb-16"
        aria-labelledby="qr-heading"
      >
        {/* Soft Radial Ambient Glow matching About, Contact & How-it-works */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.15),transparent_70%)]" />
          <div className="absolute left-1/2 top-[15%] h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[130px]" />
          <div className="absolute right-[-5%] top-[35%] h-[20rem] w-[24rem] rounded-full bg-sky-400/10 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center text-center lg:text-left">
            {/* Left Column: Heading, Subtitle & 4 Feature Pills */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
              {/* Primary Heading */}
              <motion.h1
                id="qr-heading"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08]"
              >
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-600 dark:text-slate-400 mb-2.5 flex items-center justify-center lg:justify-start gap-2">
                  <span>She rejected?</span>
                  <span className="text-xl sm:text-2xl" aria-hidden="true">💔</span>
                </span>
                Find Your Next Job
                <span className="block text-[#0066FF] dark:text-blue-400 mt-1">
                  in One Tap
                </span>
              </motion.h1>

              {/* 4 Feature Pills Row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-2.5 w-full text-left"
              >
                {/* 1. One-Tap Apply */}
                <div className="flex items-center gap-2 rounded-2xl border border-blue-100/90 dark:border-blue-900/40 bg-white/90 dark:bg-card/90 p-2.5 shadow-2xs">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0066FF]">
                    <Zap className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    One-Tap
                    <br />
                    Apply
                  </span>
                </div>

                {/* 2. Real-time Alerts */}
                <div className="flex items-center gap-2 rounded-2xl border border-blue-100/90 dark:border-blue-900/40 bg-white/90 dark:bg-card/90 p-2.5 shadow-2xs">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0066FF]">
                    <Bell className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Real-time
                    <br />
                    Alerts
                  </span>
                </div>

                {/* 3. Direct HR Chat */}
                <div className="flex items-center gap-2 rounded-2xl border border-blue-100/90 dark:border-blue-900/40 bg-white/90 dark:bg-card/90 p-2.5 shadow-2xs">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0066FF]">
                    <MessageSquare className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Direct
                    <br />
                    HR Chat
                  </span>
                </div>

                {/* 4. No Ghosting Guaranteed */}
                <div className="flex items-center gap-2 rounded-2xl border border-blue-100/90 dark:border-blue-900/40 bg-white/90 dark:bg-card/90 p-2.5 shadow-2xs">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0066FF]">
                    <ShieldCheck className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    No Ghosting
                    <br />
                    Guaranteed
                  </span>
                </div>
              </motion.div>

              {/* Primary Download CTA Button placed directly below the 4 feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 sm:mt-7 flex justify-center lg:justify-start w-full"
              >
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-3.5 text-base sm:text-lg font-bold shadow-lg shadow-blue-600/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Hirance App</span>
                  <ArrowRight className="h-4 w-4 opacity-80" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: She Rejected Scene (HR Red Cancel Sign & Sad Employee) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex justify-center lg:justify-end -mt-8 lg:-mt-16"
            >
              <SheRejectedHeroScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FLYER MAIN CONTENT: Expanded width (max-w-6xl lg:max-w-7xl) for spacious layout */}
      <div className="mx-auto w-full max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {/* ========================================================================= */}
        {/* SECTION 1: I'M JOB HUNTING (FOR CANDIDATES)                               */}
        {/* ========================================================================= */}
        <section aria-labelledby="job-seeker-section" className="pb-10 sm:pb-12">
          {/* Interactive Job Swiping Demo with Image 2 Card (01) & Swiping Card */}
          <InteractiveJobSwipeShowcase />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: FOR EMPLOYERS                                                  */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="employer-banner-heading"
          className="mt-6 sm:mt-10 rounded-3xl border border-blue-100/90 dark:border-blue-900/40 bg-white/95 dark:bg-card/90 p-6 sm:p-8 lg:p-9 shadow-xs"
        >
          {/* Header Row: Highlighted For Employers with Icon + Learn More Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 text-left">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-md shadow-blue-600/25">
                <Briefcase className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <h2
                  id="employer-banner-heading"
                  className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-snug"
                >
                  For Employers
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Hire pre-screened talent fast with smart matching &amp; direct chat
                </p>
              </div>
            </div>

            <a
              href={siteConfig.links.employer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 dark:border-blue-800 bg-white dark:bg-card hover:bg-blue-50/80 dark:hover:bg-blue-950/40 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#2563EB] shadow-xs transition-all hover:shadow-sm shrink-0"
            >
              <span>Learn more about hiring on Hirance</span>
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>

          {/* 6 Compact Feature Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 w-full items-start">
            {EMPLOYER_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 text-[#2563EB] transition-transform duration-200 group-hover:scale-105 shadow-xs">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <span className="mt-2 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    {item.top}
                    <br />
                    {item.bottom}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FOOTER: Matches exact site footer format */}
      <Footer />
    </main>
  );
}
