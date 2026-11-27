"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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

  // 2. CENTER CARD (NimbusWorks Pvt Ltd - Current)
  {
    id: "card-2",
    rotationClass: "lg:rotate-0 lg:-translate-y-3",
    scaleClass: "lg:scale-[1.05]",
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

  // 3. RIGHT CARD (Zenti Softtech - APPLIED)
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
      <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
        <Box className="h-4.5 w-4.5 stroke-[2.2]" />
      </div>
    );
  }
  if (type === "nimbus") {
    return (
      <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs">
        <div className="flex items-center justify-center w-5.5 h-3 rounded-full border-2 border-white">
          <div className="w-1.5 h-1.5 rounded-full bg-white ml-auto mr-0.5" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-[#0b172a] flex items-center justify-center text-white shadow-xs p-2">
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full stroke-cyan-400 stroke-2">
        <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
        <path d="M12 3a9 9 0 0 1 9 9" />
        <path d="M12 7a5 5 0 0 1 5 5" />
      </svg>
    </div>
  );
}

function CircularGauge({ score, color }: { score: number; color: string }) {
  const radius = 22;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
      <svg className="h-14 w-14 -rotate-90 transform" viewBox="0 0 56 56">
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          className="stroke-slate-100 dark:stroke-slate-800"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Value */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[13px] font-black leading-none text-slate-800 dark:text-slate-100">
          {score}%
        </span>
        <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 leading-none">
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

function SingleCard({
  card,
  isCenter,
  savedCards,
  toggleSave,
  className,
}: {
  card: JobSwipeCardData;
  isCenter?: boolean;
  savedCards: Record<string, boolean>;
  toggleSave: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("relative transition-all duration-300 w-full", className)}>
      {/* Floating Stamp Badge (SKIP or APPLIED) */}
      {card.badge && (
        <div
          className={cn(
            "absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-transform duration-300",
            card.badge.variant === "skip" ? "lg:rotate-[6deg]" : "lg:-rotate-[6deg]"
          )}
        >
          {card.badge.variant === "skip" ? (
            <div className="rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-[#ea384c] bg-white dark:bg-slate-900 px-4 sm:px-5 py-1 sm:py-1.5 text-xs sm:text-sm font-black tracking-widest text-[#ea384c] uppercase shadow-md">
              {card.badge.text}
            </div>
          ) : (
            <div className="rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-[#16a34a] bg-white dark:bg-slate-900 px-4 sm:px-5 py-1 sm:py-1.5 text-xs sm:text-sm font-black tracking-widest text-[#16a34a] uppercase shadow-md">
              {card.badge.text}
            </div>
          )}
        </div>
      )}

      {/* Card Surface */}
      <div
        className={cn(
          "flex flex-col rounded-3xl bg-white dark:bg-slate-900 p-4.5 sm:p-5.5 border transition-all duration-200 select-none",
          isCenter
            ? "border-slate-200/90 dark:border-slate-700/80 shadow-[0_22px_60px_-15px_rgba(15,23,42,0.14)]"
            : "border-slate-100/90 dark:border-slate-800 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.08)]"
        )}
      >
        {/* Header: Logo, Company & Circular Match Score */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <CompanyLogo type={card.company.logoType} />
            <div className="min-w-0">
              <h4 className="text-[13.5px] sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate leading-snug">
                {card.company.name}
              </h4>
              <p className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                <MapPin className="h-3 w-3 shrink-0 text-slate-600 dark:text-slate-400 stroke-[2.2]" />
                <span className="truncate">{card.company.location}</span>
              </p>
            </div>
          </div>

          {/* Circular Match Gauge */}
          <CircularGauge score={card.matchScore} color={card.matchColor} />
        </div>

        {/* Job Title & Subtitle */}
        <div className="mt-2.5">
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
            "mt-3.5 sm:mt-4 rounded-lg px-3 py-2 sm:py-2.5 flex items-center gap-2 text-xs leading-snug",
            card.matchBanner.type === "low" &&
            "bg-[#fef3f2] text-[#b5251a] border border-[#b5251a]/15 dark:bg-rose-950/30 dark:border-rose-900/40 dark:text-rose-400",
            card.matchBanner.type === "good" &&
            "bg-[#eef3ff] text-[#1e40af] border border-[#1e40af]/15 dark:bg-blue-950/30 dark:border-blue-900/40 dark:text-blue-400",
            card.matchBanner.type === "great" &&
            "bg-[#ecfdf3] text-[#067647] border border-[#067647]/15 dark:bg-emerald-950/30 dark:border-emerald-900/40 dark:text-emerald-400"
          )}
        >
          {card.matchBanner.type === "low" ? (
            <AlertCircle className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
          )}
          <span className="truncate text-[10.5px] sm:text-xs">
            {card.matchBanner.highlight ? (
              <>
                <span className="font-semibold">{card.matchBanner.highlight}</span>{" "}
                <span className="font-normal opacity-90">{card.matchBanner.text}</span>
              </>
            ) : (
              card.matchBanner.text
            )}
          </span>
        </div>

        {/* 2x2 Meta Chips Grid (rounded-lg) */}
        <div className="mt-3.5 sm:mt-4 grid grid-cols-2 gap-2 text-xs">
          {/* Work Mode */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate">
            {card.chips.workMode === "Remote" ? (
              <Monitor className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2.2]" />
            ) : (
              <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2.2]" />
            )}
            <span className="truncate text-[11px] font-semibold">{card.chips.workMode}</span>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate">
            <span className="text-[11px] font-semibold truncate">{card.chips.salary}</span>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2.2]" />
            <span className="truncate text-[11px] font-semibold">{card.chips.experience}</span>
          </div>

          {/* Job Type */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate">
            <Clock className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2.2]" />
            <span className="truncate text-[11px] font-semibold">{card.chips.jobType}</span>
          </div>
        </div>

        {/* Skills Tag Row (Strictly 1 Row with Text Truncation) */}
        <div className="mt-3.5 sm:mt-4 flex flex-nowrap items-center gap-1.5 sm:gap-2 w-full overflow-hidden">
          {card.skills.map((skill) => (
            <span
              key={skill}
              title={skill}
              className="inline-flex items-center min-w-0 shrink max-w-[90px] sm:max-w-[110px] rounded-lg bg-slate-100/70 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/60 px-2 sm:px-2.5 py-1 text-[10.5px] sm:text-[11px] text-slate-600 dark:text-slate-300 font-medium"
            >
              <span className="truncate">{skill}</span>
            </span>
          ))}
          <span className="shrink-0 text-[10px] sm:text-[10.5px] text-slate-400 font-medium whitespace-nowrap px-0.5">
            +{card.extraSkillsCount} more
          </span>
        </div>

        {/* "Why X% match" Breakdown Section */}
        <div className="mt-4 pt-3.5 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[11.5px] sm:text-xs">
              Why {card.matchScore}% match
            </span>
            <span className="text-slate-400 text-[10.5px] sm:text-[11px] font-medium">
              {card.scoreBreakdown.total} / 100 pts
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-left">
            {[
              { label: "Skills", val: card.scoreBreakdown.skills },
              { label: "Exp.", val: card.scoreBreakdown.exp },
              { label: "Role", val: card.scoreBreakdown.role },
              { label: "Salary", val: card.scoreBreakdown.salary },
              { label: "Other", val: card.scoreBreakdown.other },
            ].map((metric) => {
              const percent = getScorePercentage(metric.val);
              return (
                <div key={metric.label} className="flex flex-col items-start text-left">
                  <span className="text-[9.5px] sm:text-[10px] text-slate-400 font-medium text-left">{metric.label}</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 text-left">
                    {metric.val}
                  </span>
                  <div className="mt-1 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
          <button
            type="button"
            aria-label="Skip Job"
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-rose-100/70 hover:bg-rose-100 active:scale-98 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 py-2 sm:py-2.5 text-xs font-bold text-rose-600 dark:text-rose-300 transition-all cursor-pointer"
          >
            <X className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Skip</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSave(card.id)}
            aria-label="Bookmark Job"
            className={cn(
              "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer",
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

          <button
            type="button"
            aria-label="Apply to Job"
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-[#15803d] hover:bg-[#166534] active:scale-98 text-white py-2 sm:py-2.5 text-xs font-bold shadow-xs shadow-emerald-700/20 transition-all cursor-pointer"
          >
            <Check className="h-3.5 w-3.5 stroke-[3]" />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
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
      className="relative w-full overflow-x-clip py-10 sm:py-14 lg:py-12"
      aria-label="Job Application Swipe Showcase"
    >
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full">
        {/* SECTION HEADING - 2 Lines on Mobile, 1 Line on sm+ */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-montserrat text-[22px] xs:text-[26px] sm:text-2xl md:text-3xl lg:text-[2.5rem] font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.2] sm:leading-tight text-center">
            Your Job Application{" "}
            <br className="sm:hidden" />
            Is Just One{" "}
            <span className="font-lora italic font-normal text-[#15803d] dark:text-emerald-400">
              Swipe
            </span>{" "}
            Away
          </h2>
        </motion.div>

        {/* DESKTOP 3-CARD SHOWCASE (lg:flex, 1024px and up) */}
        <div className="hidden lg:flex items-center justify-center gap-2.5 xl:gap-4 2xl:gap-6 max-w-7xl mx-auto pt-6 pb-4">
          {/* Card 1: Left (TechCore Systems) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-[290px] xl:max-w-[340px] 2xl:max-w-[370px] lg:-rotate-[6deg] lg:-translate-y-1"
          >
            <SingleCard
              card={CARDS_DATA[0]}
              savedCards={savedCards}
              toggleSave={toggleSave}
            />
          </motion.div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handleSwipePrev}
            aria-label="Swipe Left to Skip"
            title="Swipe Left: Skip"
            className="h-10 w-10 xl:h-11 xl:w-11 shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-rose-500 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Card 2: Center (NimbusWorks) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-[305px] xl:max-w-[355px] 2xl:max-w-[385px] lg:scale-[1.05] lg:-translate-y-3 z-10"
          >
            <SingleCard
              card={CARDS_DATA[1]}
              isCenter={true}
              savedCards={savedCards}
              toggleSave={toggleSave}
            />
          </motion.div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleSwipeNext}
            aria-label="Swipe Right to Apply"
            title="Swipe Right: Apply"
            className="h-10 w-10 xl:h-11 xl:w-11 shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-emerald-600 hover:text-emerald-700 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          >
            <ArrowRight className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Card 3: Right (Zenti Softtech) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-[290px] xl:max-w-[340px] 2xl:max-w-[370px] lg:rotate-[6deg] lg:-translate-y-1"
          >
            <SingleCard
              card={CARDS_DATA[2]}
              savedCards={savedCards}
              toggleSave={toggleSave}
            />
          </motion.div>
        </div>

        {/* MOBILE & TABLET RESPONSIVE CAROUSEL (< lg, below 1024px) */}
        <div className="flex lg:hidden flex-col items-center w-full pt-1 sm:pt-4 pb-2">
          {/* Card Status Switcher Pills */}
          <div className="flex items-center justify-center gap-2 mb-9 sm:mb-11 max-w-sm w-full px-4">
            {CARDS_DATA.map((c, i) => {
              const isActive = activeCardIndex === i;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCardIndex(i)}
                  className={cn(
                    "flex-1 py-1.5 px-2 rounded-full text-[11px] sm:text-xs font-bold transition-all active:scale-95 cursor-pointer text-center truncate",
                    isActive
                      ? c.badge?.variant === "skip"
                        ? "bg-rose-500 text-white shadow-sm"
                        : c.badge?.variant === "applied"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                  )}
                >
                  {c.badge ? c.badge.text : "Current"}
                </button>
              );
            })}
          </div>

          {/* Active Card with Left & Right Mobile Arrows */}
          <div className="relative flex items-center justify-center w-full px-2 max-w-[420px]">
            {/* Mobile Left Arrow */}
            <button
              type="button"
              onClick={handleSwipePrev}
              aria-label="Previous Card"
              className="absolute left-0 sm:left-1 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Mobile Active Card */}
            <div className="w-full max-w-[315px] sm:max-w-[335px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={CARDS_DATA[activeCardIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SingleCard
                    card={CARDS_DATA[activeCardIndex]}
                    isCenter={activeCardIndex === 1}
                    savedCards={savedCards}
                    toggleSave={toggleSave}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Right Arrow */}
            <button
              type="button"
              onClick={handleSwipeNext}
              aria-label="Next Card"
              className="absolute right-0 sm:right-1 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-3.5 sm:mt-5">
            {CARDS_DATA.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveCardIndex(i)}
                aria-label={`Go to card ${i + 1}`}
                className={cn(
                  "rounded-full transition-all cursor-pointer",
                  activeCardIndex === i
                    ? "h-2 w-6 bg-slate-900 dark:bg-white"
                    : "h-2 w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
