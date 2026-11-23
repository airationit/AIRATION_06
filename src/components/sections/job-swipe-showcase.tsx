"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  Bookmark,
  MapPin,
  Briefcase,
  Clock,
  Monitor,
  Building2,
  AlertCircle,
  CheckCircle2,
  Box,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobSwipeCardData {
  id: string;
  badge?: {
    text: string;
    variant: "skip" | "applied";
  };
  rotationClass: string;
  scaleClass: string;
  zIndexClass: string;
  company: {
    name: string;
    location: string;
    logoType: "cube" | "nimbus" | "zenti" | "Zenti" | string;
  };
  matchScore: number;
  matchColor: string;
  title: string;
  department: string;
  postedTime: string;
  matchBanner: {
    type: "low" | "good" | "great";
    highlight?: string;
    text: string;
  };
  chips: {
    workMode: string;
    salary: string;
    experience: string;
    jobType: string;
  };
  skills: string[];
  extraSkillsCount: number;
  scoreBreakdown: {
    skills: string;
    exp: string;
    role: string;
    salary: string;
    other: string;
    total: number;
  };
}

const CARDS_DATA: JobSwipeCardData[] = [
  // 1. LEFT CARD (TechCore Systems - SKIP)
  {
    id: "card-1",
    badge: {
      text: "SKIP",
      variant: "skip",
    },
    rotationClass: "lg:-rotate-[6deg] lg:-translate-y-1",
    scaleClass: "lg:scale-[1.0]",
    zIndexClass: "z-0 hover:z-30",
    company: {
      name: "TechCore Systems",
      location: "Pune, Maharashtra",
      logoType: "cube",
    },
    matchScore: 40,
    matchColor: "#ef4444",
    title: "Full Stack Developer",
    department: "Engineering",
    postedTime: "Posted 2d ago",
    matchBanner: {
      type: "low",
      highlight: "Low match",
      text: "for your current skills and experience",
    },
    chips: {
      workMode: "Remote",
      salary: "₹ 6 – 9 LPA",
      experience: "Fresher",
      jobType: "Full-time",
    },
    skills: ["React", "Node.js", "MongoDB"],
    extraSkillsCount: 4,
    scoreBreakdown: {
      skills: "16/40",
      exp: "3/13",
      role: "6/15",
      salary: "8/10",
      other: "7/20",
      total: 40,
    },
  },

  // 2. CENTER CARD (NimbusWorks Pvt Ltd - IN FOCUS)
  {
    id: "card-2",
    rotationClass: "lg:rotate-0 lg:-translate-y-3",
    scaleClass: "lg:scale-[1.07]",
    zIndexClass: "z-10 hover:z-30",
    company: {
      name: "NimbusWorks Pvt Ltd",
      location: "Hyderabad, Telangana",
      logoType: "nimbus",
    },
    matchScore: 65,
    matchColor: "#2563eb",
    title: "Sales Manager",
    department: "Sales & Business Development",
    postedTime: "Posted 1d ago",
    matchBanner: {
      type: "good",
      highlight: "Good match",
      text: "for your skills and experience",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 8 – 12 LPA",
      experience: "3 – 5 years",
      jobType: "Full-time",
    },
    skills: ["B2B Sales", "CRM", "Negotiation"],
    extraSkillsCount: 3,
    scoreBreakdown: {
      skills: "26/40",
      exp: "9/13",
      role: "11/15",
      salary: "8/10",
      other: "11/20",
      total: 65,
    },
  },

  // 3. RIGHT CARD (zenti Softtech - APPLIED)
  {
    id: "card-3",
    badge: {
      text: "APPLIED",
      variant: "applied",
    },
    rotationClass: "lg:rotate-[6deg] lg:-translate-y-1",
    scaleClass: "lg:scale-[1.0]",
    zIndexClass: "z-0 hover:z-30",
    company: {
      name: "Zenti Softtech",
      location: "Bengaluru, Karnataka",
      logoType: "Zenti",
    },
    matchScore: 80,
    matchColor: "#16a34a",
    title: "HR Executive",
    department: "Human Resources",
    postedTime: "Posted 5h ago",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for your skills and experience",
    },
    chips: {
      workMode: "On-site",
      salary: "₹ 4 – 6 LPA",
      experience: "1 – 3 years",
      jobType: "Full-time",
    },
    skills: ["Recruitment", "Onboarding", "HRMS"],
    extraSkillsCount: 5,
    scoreBreakdown: {
      skills: "32/40",
      exp: "11/13",
      role: "13/15",
      salary: "10/10",
      other: "14/20",
      total: 80,
    },
  },
];

function CompanyLogo({ type }: { type: "cube" | "nimbus" | "zenti" | "Zenti" | string }) {
  if (type === "cube") {
    return (
      <div className="h-10 w-10 shrink-0 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
        <Box className="h-5 w-5 stroke-[2.2]" />
      </div>
    );
  }
  if (type === "nimbus") {
    return (
      <div className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs">
        <div className="flex items-center justify-center w-6 h-3 rounded-full border-2 border-white">
          <div className="w-2 h-2 rounded-full bg-white ml-auto mr-0.5" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-10 w-10 shrink-0 rounded-2xl bg-[#0b172a] flex items-center justify-center text-white shadow-xs p-2">
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full stroke-cyan-400 stroke-2">
        <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
        <path d="M12 3a9 9 0 0 1 9 9" />
        <path d="M12 7a5 5 0 0 1 5 5" />
      </svg>
    </div>
  );
}

function CircularGauge({ score, color }: { score: number; color: string }) {
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-11 w-11 shrink-0 flex items-center justify-center">
      <svg className="h-11 w-11 -rotate-90 transform" viewBox="0 0 44 44">
        {/* Track */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-slate-100 dark:stroke-slate-800"
          strokeWidth="3.5"
          fill="transparent"
        />
        {/* Progress Arc */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-black leading-none text-slate-800 dark:text-slate-100">
          {score}%
        </span>
        <span className="text-[6.5px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
          MATCH
        </span>
      </div>
    </div>
  );
}

function getScorePercentage(fractionStr: string): number {
  const parts = fractionStr.split("/");
  if (parts.length === 2) {
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (!isNaN(num) && !isNaN(den) && den > 0) {
      return Math.min(Math.max((num / den) * 100, 0), 100);
    }
  }
  return 0;
}

export function JobSwipeShowcase() {
  const reducedMotion = useReducedMotion();
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [savedCards, setSavedCards] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string) => {
    setSavedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSwipePrev = () => {
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : CARDS_DATA.length - 1));
  };

  const handleSwipeNext = () => {
    setActiveCardIndex((prev) => (prev < CARDS_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="swipe-job-application"
      className="relative w-full overflow-hidden py-14 sm:py-18 lg:py-12"
      aria-label="Job Application Swipe Showcase"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* SECTION HEADING */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.25]">
            Your Job Application Is Just One
            <br />
            <span className="font-serif italic font-normal text-[#15803d] dark:text-emerald-400">
              Swipe
            </span>{" "}
            Away
          </h2>
        </motion.div>

        {/* CARDS DISPLAY CONTAINER */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 xl:gap-6 max-w-7xl mx-auto pt-6 pb-4">

          {CARDS_DATA.map((card, idx) => {
            const isCenter = idx === 1;
            const isLeft = idx === 0;
            const isRight = idx === 2;

            return (
              <React.Fragment key={card.id}>
                {/* Red Left Arrow between Card 1 and Card 2 */}
                {isCenter && (
                  <button
                    type="button"
                    onClick={handleSwipePrev}
                    aria-label="Swipe Left to Skip"
                    title="Swipe Left: Skip"
                    className="hidden lg:flex h-10 w-10 xl:h-11 xl:w-11 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-rose-500 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
                  >
                    <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
                  </button>
                )}

                {/* SINGLE CARD WRAPPER WITH STAMP BADGE */}
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "relative w-full max-w-[350px] sm:max-w-[375px] lg:max-w-[365px] xl:max-w-[385px] transition-all duration-300",
                    card.rotationClass,
                    card.scaleClass,
                    card.zIndexClass
                  )}
                >
                  {/* Floating Stamp Badge (SKIP or APPLIED) */}
                  {card.badge && (
                    <div
                      className={cn(
                        "absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-transform duration-300",
                        card.badge.variant === "skip" ? "lg:rotate-[6deg]" : "lg:-rotate-[6deg]"
                      )}
                    >
                      {card.badge.variant === "skip" ? (
                        <div className="rounded-2xl border-[2.5px] sm:border-[3px] border-[#ea384c] bg-white dark:bg-slate-900 px-5 sm:px-6 py-1.5 sm:py-2 text-base sm:text-lg font-black tracking-widest text-[#ea384c] uppercase shadow-[0_8px_24px_-4px_rgba(0,0,0,0.14),0_2px_6px_rgba(0,0,0,0.06)]">
                          {card.badge.text}
                        </div>
                      ) : (
                        <div className="rounded-2xl border-[2.5px] sm:border-[3px] border-[#16a34a] bg-white dark:bg-slate-900 px-5 sm:px-6 py-1.5 sm:py-2 text-base sm:text-lg font-black tracking-widest text-[#16a34a] uppercase shadow-[0_8px_24px_-4px_rgba(0,0,0,0.14),0_2px_6px_rgba(0,0,0,0.06)]">
                          {card.badge.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Surface */}
                  <div
                    className={cn(
                      "flex flex-col rounded-3xl bg-white dark:bg-slate-900 p-5.5 sm:p-6 border transition-all duration-200 select-none",
                      isCenter
                        ? "border-slate-200/90 dark:border-slate-700/80 shadow-[0_22px_60px_-15px_rgba(15,23,42,0.14)]"
                        : "border-slate-100/90 dark:border-slate-800 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.08)]"
                    )}
                  >
                    {/* Header: Logo, Company & Circular Match Score */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <CompanyLogo type={card.company.logoType} />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate leading-snug">
                            {card.company.name}
                          </h4>
                          <p className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5 font-normal">
                            <MapPin className="h-3 w-3 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2.2]" />
                            <span className="truncate">{card.company.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Circular Match Gauge */}
                      <CircularGauge score={card.matchScore} color={card.matchColor} />
                    </div>

                    {/* Job Title & Subtitle */}
                    <div className="mt-3">
                      <h3 className="text-base sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight truncate">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                        {card.department} · {card.postedTime}
                      </p>
                    </div>

                    {/* Match Insight Alert Banner */}
                    <div
                      className={cn(
                        "mt-3 rounded-[0.45rem] px-2.5 py-2 flex items-center gap-2 text-xs leading-snug",
                        card.matchBanner.type === "low" &&
                        "bg-[#fef3f2] text-[#b5251a] border border-[#b5251a]/15 dark:bg-rose-950/30 dark:border-rose-900/40 dark:text-rose-400",
                        card.matchBanner.type === "good" &&
                        "bg-[#eef3ff] text-[#1e40af] border border-[#1e40af]/15 dark:bg-blue-950/30 dark:border-blue-900/40 dark:text-blue-400",
                        card.matchBanner.type === "great" &&
                        "bg-[#ecfdf3] text-[#067647] border border-[#067647]/15 dark:bg-emerald-950/30 dark:border-emerald-900/40 dark:text-emerald-400"
                      )}
                    >
                      {card.matchBanner.type === "low" ? (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="truncate text-[11px] sm:text-xs">
                        {card.matchBanner.highlight ? (
                          <>
                            <span className="font-semibold">{card.matchBanner.highlight}</span>{" "}
                            <span className="font-normal">{card.matchBanner.text}</span>
                          </>
                        ) : (
                          card.matchBanner.text
                        )}
                      </span>
                    </div>

                    {/* 2x2 Meta Chips Grid */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      {/* Work Mode */}
                      <div className="flex items-center gap-1.5 rounded-[0.45rem] border border-slate-100 dark:border-slate-800  px-2.5 py-1.5 text-slate-900 dark:text-slate-300 font-medium truncate">
                        {card.chips.workMode === "Remote" ? (
                          <Monitor className="h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-slate-100 stroke-[2.2]" />
                        ) : card.chips.workMode === "Hybrid" ? (
                          <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-slate-100 stroke-[2.2]" />
                        ) : (
                          <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-slate-100 stroke-[2.2]" />
                        )}
                        <span className="truncate text-[11px]">{card.chips.workMode}</span>
                      </div>

                      {/* Salary */}
                      <div className="flex items-center gap-1 rounded-[0.45rem] border border-slate-100 dark:border-slate-800  px-2.5 py-1.5 text-slate-900 dark:text-slate-300 font-medium truncate">
                        <span className="text-[11px] font-semibold truncate">{card.chips.salary}</span>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-1.5 rounded-[0.45rem] border border-slate-100 dark:border-slate-800  px-2.5 py-1.5 text-slate-900 dark:text-slate-300 font-medium truncate">
                        <Briefcase className="h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-slate-100 stroke-[2.2]" />
                        <span className="truncate text-[11px]">{card.chips.experience}</span>
                      </div>

                      {/* Job Type */}
                      <div className="flex items-center gap-1.5 rounded-[0.45rem] border border-slate-100 dark:border-slate-800  px-2.5 py-1.5 text-slate-900 dark:text-slate-300 font-medium truncate">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-slate-100 stroke-[2.2]" />
                        <span className="truncate text-[11px]">{card.chips.jobType}</span>
                      </div>
                    </div>

                    {/* Skills Tag Row */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {card.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-slate-100/70 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/60 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="text-[10.5px] text-slate-400 font-medium px-1">
                        +{card.extraSkillsCount} more
                      </span>
                    </div>

                    {/* "Why X% match" Breakdown Section */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-[11.5px]">
                          Why {card.matchScore}% match
                        </span>
                        <span className="text-slate-400 text-[11px] font-medium">
                          {card.scoreBreakdown.total} / 100 pts
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        {[
                          { label: "Skills", val: card.scoreBreakdown.skills },
                          { label: "Exp.", val: card.scoreBreakdown.exp },
                          { label: "Role", val: card.scoreBreakdown.role },
                          { label: "Salary", val: card.scoreBreakdown.salary },
                          { label: "Other", val: card.scoreBreakdown.other },
                        ].map((metric) => {
                          const percent = getScorePercentage(metric.val);
                          return (
                            <div key={metric.label} className="flex flex-col items-center">
                              <span className="text-[10px] text-slate-400 font-medium">{metric.label}</span>
                              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                {metric.val}
                              </span>
                              {/* Background track + filled percentage bar */}
                              <div className="mt-1.5 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-300"
                                  style={{
                                    width: `${percent}%`,
                                    backgroundColor: card.matchColor,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Card Actions: Skip, Bookmark, Apply */}
                    <div className="mt-4 flex items-center gap-2 pt-1">
                      {/* Skip Button */}
                      <button
                        type="button"
                        aria-label="Skip Job"
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-rose-100/70 hover:bg-rose-100 active:scale-98 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-300 transition-all cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                        <span>Skip</span>
                      </button>

                      {/* Bookmark Button */}
                      <button
                        type="button"
                        onClick={() => toggleSave(card.id)}
                        aria-label="Bookmark Job"
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all cursor-pointer",
                          savedCards[card.id]
                            ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/40"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        )}
                      >
                        <Bookmark
                          className={cn(
                            "h-4 w-4 stroke-[2]",
                            savedCards[card.id] && "fill-current text-blue-600"
                          )}
                        />
                      </button>

                      {/* Apply Button */}
                      <button
                        type="button"
                        aria-label="Apply to Job"
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#15803d] hover:bg-[#166534] active:scale-98 text-white py-2.5 text-xs font-bold shadow-xs shadow-emerald-700/20 transition-all cursor-pointer"
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                        <span>Apply</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Green Right Arrow between Card 2 and Card 3 */}
                {isCenter && (
                  <button
                    type="button"
                    onClick={handleSwipeNext}
                    aria-label="Swipe Right to Apply"
                    title="Swipe Right: Apply"
                    className="hidden lg:flex h-10 w-10 xl:h-11 xl:w-11 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-emerald-600 hover:text-emerald-700 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
                  >
                    <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
