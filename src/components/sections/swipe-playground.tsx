"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
  PanInfo,
} from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  RotateCcw,
  ArrowRight,
  PartyPopper,
  Bookmark,
  MapPin,
  Briefcase,
  IndianRupee,
  BadgeCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface PlaygroundJob {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  aiNote: string;
  location: string;
  salary: string;
  experience: string;
  tags: string[];
  logoColor: string;
}

const PLAYGROUND_JOBS: PlaygroundJob[] = [
  {
    id: "pg-1",
    title: "Senior Full Stack Engineer",
    company: "Nexus Cloud Systems",
    matchScore: 96,
    aiNote: "Strong match for React, Next.js, Node.js & high-scale architecture.",
    location: "Bengaluru (Hybrid)",
    salary: "₹ 16 - 24 LPA",
    experience: "3-6 Years",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    logoColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "pg-2",
    title: "Product Designer (UI/UX)",
    company: "Nova Studios",
    matchScore: 92,
    aiNote: "Ideal fit for design systems, mobile UX, and interactive micro-animations.",
    location: "Mumbai / Remote",
    salary: "₹ 12 - 18 LPA",
    experience: "2-5 Years",
    tags: ["Figma", "Design Systems", "Prototyping"],
    logoColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "pg-3",
    title: "Growth & Performance Marketer",
    company: "ScaleFlow India",
    matchScore: 89,
    aiNote: "Great for paid user acquisition, ROAS scaling, and analytics funnels.",
    location: "Gurugram, HR",
    salary: "₹ 10 - 15 LPA",
    experience: "2-4 Years",
    tags: ["Meta Ads", "Google Ads", "Growth Funnels"],
    logoColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "pg-4",
    title: "Area Sales Manager",
    company: "Airation Softtech",
    matchScore: 95,
    aiNote: "Excellent match for regional distributor expansion and B2B client management.",
    location: "Bareilly, UP",
    salary: "₹ 7 - 10 LPA",
    experience: "2-5 Years",
    tags: ["Channel Sales", "B2B Expansion", "FMCG"],
    logoColor: "from-amber-500 to-orange-600",
  },
];

interface DragCardProps {
  job: PlaygroundJob;
  onDecide: (dir: "left" | "right", job: PlaygroundJob) => void;
  isTop: boolean;
  isExiting: boolean;
  exitDir: "left" | "right";
}

function DragCard({ job, onDecide, isTop, isExiting, exitDir }: DragCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-14, 14]);
  const applyOpacity = useTransform(x, [30, 110], [0, 1]);
  const skipOpacity = useTransform(x, [-30, -110], [0, 1]);
  const overlayGreen = useTransform(
    x,
    [0, 120],
    ["rgba(16, 185, 129, 0)", "rgba(16, 185, 129, 0.08)"]
  );
  const overlayRed = useTransform(
    x,
    [0, -120],
    ["rgba(244, 63, 94, 0)", "rgba(244, 63, 94, 0.08)"]
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!isTop) return;
    if (info.offset.x > 85 || info.velocity.x > 320) {
      onDecide("right", job);
    } else if (info.offset.x < -85 || info.velocity.x < -320) {
      onDecide("left", job);
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
      initial={{ scale: 0.94, opacity: 0, y: 12 }}
      animate={{
        scale: 1,
        opacity: isExiting ? 0 : 1,
        y: 0,
        ...(isExiting && {
          x: exitDir === "right" ? 400 : -400,
          rotate: exitDir === "right" ? 22 : -22,
        }),
      }}
      transition={{
        duration: isExiting ? 0.32 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      className="touch-none select-none"
    >
      <div className="relative h-full w-full rounded-[24px] sm:rounded-[28px] border border-border/80 bg-card p-4 sm:p-5 shadow-xl shadow-slate-950/10 dark:shadow-white/5 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Stamp Overlays during drag */}
        {isTop && (
          <>
            {/* APPLY Stamp */}
            <motion.div
              style={{ opacity: applyOpacity }}
              className="pointer-events-none absolute left-4 top-4 z-40 rounded-xl border-2 border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/80 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shadow-lg backdrop-blur-sm -rotate-12"
            >
              ✓ APPLY
            </motion.div>

            {/* SKIP Stamp */}
            <motion.div
              style={{ opacity: skipOpacity }}
              className="pointer-events-none absolute right-4 top-4 z-40 rounded-xl border-2 border-rose-500 bg-rose-500/15 dark:bg-rose-950/80 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 shadow-lg backdrop-blur-sm rotate-12"
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

        {/* Top Section */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Header Row: Company info & Match pill */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={cn(
                  "h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl bg-gradient-to-tr flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-md",
                  job.logoColor
                )}
              >
                {job.company.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {job.company}
                </p>
                <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-muted-foreground mt-0.5">
                  <BadgeCheck className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  <span>Verified Employer</span>
                </div>
              </div>
            </div>

            {/* Match Circle */}
            <div className="shrink-0 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-50 px-2.5 py-1 dark:bg-emerald-950/40">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                {job.matchScore}% Match
              </span>
            </div>
          </div>

          {/* Job Title */}
          <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-foreground leading-snug">
            {job.title}
          </h3>

          {/* AI Match Insight Box */}
          <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 p-2.5 sm:p-3 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-indigo-950/20">
            <div className="flex items-start gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[11px] sm:text-xs leading-relaxed text-blue-950 dark:text-blue-200 font-medium">
                {job.aiNote}
              </p>
            </div>
          </div>

          {/* Meta Badges Grid */}
          <div className="grid grid-cols-2 gap-1.5 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-foreground font-semibold">
              <IndianRupee className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{job.salary}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-muted-foreground col-span-2">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{job.experience}</span>
            </div>
          </div>
        </div>

        {/* Skills Tags at Bottom */}
        <div className="pt-2.5 border-t border-border/50 flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-blue-50/90 px-2 py-0.5 text-[10px] sm:text-[10.5px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/40 dark:border-blue-800/40"
            >
              {tag}
            </span>
          ))}
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
  const [saved, setSaved] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDir, setExitDir] = useState<"left" | "right">("right");

  const handleDecide = useCallback(
    (dir: "left" | "right", job: PlaygroundJob) => {
      if (isExiting || index >= PLAYGROUND_JOBS.length) return;

      setExitDir(dir);
      setIsExiting(true);

      if (dir === "right") {
        setApplied((prev) => [...prev, job]);
      } else {
        setSkipped((prev) => prev + 1);
      }

      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setIsExiting(false);
      }, 300);
    },
    [index, isExiting]
  );

  const handleRestart = () => {
    setIndex(0);
    setApplied([]);
    setSkipped(0);
    setSaved(0);
    setIsExiting(false);
  };

  const done = index >= PLAYGROUND_JOBS.length;
  const currentJob = PLAYGROUND_JOBS[index];
  const nextJob = PLAYGROUND_JOBS[index + 1];

  return (
    <section
      id="playground"
      className="relative w-full overflow-hidden py-14 sm:py-18 lg:py-24"
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
            <div className="flex flex-col items-center w-full max-w-[350px]">
              <div className="relative w-[300px] sm:w-[340px] h-[315px] sm:h-[335px] select-none">
                {!done ? (
                  <>
                    {/* Background Stack Layer (Visual Depth) */}
                    {nextJob && (
                      <div className="absolute inset-0 translate-y-3.5 scale-[0.95] rounded-[24px] sm:rounded-[28px] border border-border/60 bg-card/70 opacity-60 shadow-lg" />
                    )}

                    {/* Active Top Draggable Card */}
                    <AnimatePresence mode="popLayout">
                      <DragCard
                        key={currentJob.id}
                        job={currentJob}
                        onDecide={handleDecide}
                        isTop={true}
                        isExiting={isExiting}
                        exitDir={exitDir}
                      />
                    </AnimatePresence>
                  </>
                ) : (
                  /* Celebration Finished Screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 rounded-[24px] sm:rounded-[28px] bg-card border border-border/80 shadow-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-2 shadow-md shadow-blue-500/25">
                      <PartyPopper size={22} />
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                      That was fast! 🎉
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13px] text-muted-foreground leading-relaxed max-w-[260px]">
                      You reviewed all roles and applied to{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {applied.length} role{applied.length !== 1 ? "s" : ""}
                      </strong>
                      {saved > 0 ? ` and saved ${saved}` : ""} in seconds.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 w-full max-w-[250px]">
                      <Link
                        href="/jobs"
                        className="group flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Sparkles size={14} />
                        <span>Explore Live Jobs</span>
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <div className="flex gap-2">
                        <a
                          href={siteConfig.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted py-2 text-xs font-bold text-foreground transition-colors"
                        >
                          Get App
                        </a>
                        <button
                          type="button"
                          onClick={handleRestart}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border hover:bg-muted px-3.5 py-2 text-xs font-bold text-muted-foreground transition-colors"
                        >
                          <RotateCcw size={12} />
                          <span>Replay</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Controls positioned cleanly below the Card Deck */}
              {!done && (
                <div className="mt-6 sm:mt-7 flex items-center justify-center gap-7 select-none">
                  {/* Skip Button */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDecide("left", currentJob)}
                      aria-label="Skip Job"
                      className="group flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-rose-500 shadow-lg shadow-rose-500/10 hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <X size={24} strokeWidth={2.8} />
                    </button>
                    <span className="text-[10.5px] font-black uppercase tracking-widest text-rose-500">
                      Skip
                    </span>
                  </div>

                  {/* Save Button */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSaved((s) => s + 1)}
                      aria-label="Bookmark Job"
                      className="group flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-500 shadow-lg shadow-amber-500/10 hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <Bookmark size={22} strokeWidth={2.4} />
                    </button>
                    <span className="text-[10.5px] font-black uppercase tracking-widest text-amber-500">
                      Save
                    </span>
                  </div>

                  {/* Apply Button */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDecide("right", currentJob)}
                      aria-label="Apply to Job"
                      className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <Check size={24} strokeWidth={3} />
                    </button>
                    <span className="text-[10.5px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      Apply
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SwipePlayground;
