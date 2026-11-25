"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Building2,
  Monitor,
  CheckCircle2,
  AlertCircle,
  ArrowDown,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JobListItem } from "@/types/jobs";

const CATEGORIES = [
  "Sales",
  "IT",
  "Marketing",
  "HR",
  "Finance",
  "Design",
  "Video",
  "Data",
  "Support",
  "Content",
];

const SWIPES_PER_ROUND = 10;

export interface PlaygroundJob {
  id: string;
  category?: string;
  department: string;
  postedTime?: string;
  title: string;
  company: string;
  companyLocation?: string;
  verified?: boolean;
  matchScore: number;
  matchGrade?: "HIGH MATCH" | "LOW MATCH" | "MODERATE MATCH" | string;
  matchColor?: string;
  aiNote?: React.ReactNode;
  location?: string;
  salary?: string;
  experience?: string;
  type?: string;
  tags?: string[];
  breakdown?: {
    skills?: string;
    skillsOk?: boolean;
    exp?: string;
    expOk?: boolean;
    role?: string;
    roleOk?: boolean;
    location?: string;
    locationOk?: boolean;
    salary?: string;
    salaryOk?: boolean;
    other?: string;
    otherOk?: boolean;
  };
  matchBanner?: {
    type: "good" | "great" | "low";
    highlight: string;
    text: string;
  };
  chips?: {
    workMode: "Hybrid" | "Remote" | "On-site" | string;
    salary: string;
    experience: string;
    jobType: string;
  };
  skills?: string[];
  extraSkillsCount?: number;
  scoreBreakdown?: {
    skills: string;
    exp: string;
    role: string;
    salary: string;
    other: string;
    total: number;
  };
  logoType?: "nimbus" | "cube" | "riveyra" | "zenti" | "custom";
  logoColor?: string;
  logoLetter?: string;
}

/** Calculate percentage for score fraction string like "26/40" */
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

/** Company Logo renderer matching Image 1 styling */
function CompanyLogo({
  logoType,
  company,
  color,
  letter,
}: {
  logoType?: string;
  company: string;
  color?: string;
  letter?: string;
}) {
  if (logoType === "nimbus") {
    return (
      <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs">
        <div className="flex items-center justify-center w-5.5 h-3 rounded-full border-2 border-white">
          <div className="w-1.5 h-1.5 rounded-full bg-white ml-auto mr-0.5" />
        </div>
      </div>
    );
  }
  if (logoType === "cube") {
    return (
      <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
        <Box className="h-4.5 w-4.5 stroke-[2.2]" />
      </div>
    );
  }
  if (logoType === "riveyra") {
    return (
      <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-slate-950 flex items-center justify-center p-1.5 border border-slate-800 shadow-xs">
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
  return (
    <div
      className={cn(
        "h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-gradient-to-tr flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs",
        color || "from-blue-600 to-indigo-600"
      )}
    >
      {letter || company.charAt(0)}
    </div>
  );
}

/** Circular Match Gauge with clean MATCH label matching Image 1 */
function CircularMatchGauge({
  score,
  color = "#2563EB",
}: {
  score: number;
  color?: string;
}) {
  const radius = 16;
  const strokeWidth = 3.2;
  const circumference = 2 * Math.PI * radius; // ~100.5
  const offset = circumference - (circumference * score) / 100;

  return (
    <div className="relative flex items-center justify-center h-10 w-10 shrink-0">
      <svg className="h-10 w-10 -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-800"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-[10.5px] font-black text-slate-900 dark:text-white leading-none">
          {score}%
        </span>
        <span className="text-[6px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 leading-none">
          MATCH
        </span>
      </div>
    </div>
  );
}

const PLAYGROUND_JOBS: PlaygroundJob[] = [
  // 1. Exact Image 1 Card: NimbusWorks Pvt Ltd - Sales Manager
  {
    id: "job-nimbusworks",
    category: "Sales",
    department: "Sales & Business Development",
    postedTime: "Posted 1d ago",
    title: "Sales Manager",
    company: "NimbusWorks Pvt Ltd",
    companyLocation: "Hyderabad, Telangana",
    logoType: "nimbus",
    matchScore: 65,
    matchColor: "#2563EB",
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
  // 2. Exact Image 2 Job: Database Administrator (DBA) at Riveyra Infotech
  {
    id: "job-dba-riveyra",
    category: "IT",
    department: "IT / Software Roles",
    postedTime: "Posted 1w ago",
    title: "Database Administrator (DBA)",
    company: "Riveyra Infotech Pvt...",
    companyLocation: "Kanpur",
    logoType: "riveyra",
    matchScore: 41,
    matchColor: "#2563EB",
    matchBanner: {
      type: "low",
      highlight: "Moderate match",
      text: "for Database Administrator (DBA) roles",
    },
    chips: {
      workMode: "On-site",
      salary: "₹ 20k – 30k/Mo",
      experience: "2 – 5 Years",
      jobType: "Full Time",
    },
    skills: ["Backup/Rec...", "SQL Server/M...", "Problem Solv..."],
    extraSkillsCount: 2,
    scoreBreakdown: {
      skills: "0/35",
      exp: "12/20",
      role: "10.5/15",
      salary: "10/10",
      other: "4/20",
      total: 41,
    },
  },
  // 3. ByteForge Labs - Full Stack Developer (IT)
  {
    id: "job-byteforge",
    category: "IT",
    department: "IT & Software",
    postedTime: "Posted 2h ago",
    title: "Full Stack Developer",
    company: "ByteForge Labs",
    companyLocation: "Noida, Uttar Pradesh",
    logoType: "cube",
    matchScore: 92,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for your skills and experience",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 12 – 18 LPA",
      experience: "3 – 5 years",
      jobType: "Full-time",
    },
    skills: ["React", "Node.js", "AWS"],
    extraSkillsCount: 2,
    scoreBreakdown: {
      skills: "37/40",
      exp: "12/13",
      role: "14/15",
      salary: "9/10",
      other: "20/20",
      total: 92,
    },
  },
  // 4. Marketing - Amplifi Media Tech
  {
    id: "job-mkt-amplifi",
    category: "Marketing",
    department: "Marketing & Growth",
    postedTime: "Posted 3d ago",
    title: "Growth & Performance Marketer",
    company: "Amplifi Media Tech",
    companyLocation: "Delhi NCR",
    logoType: "custom",
    logoColor: "from-orange-500 to-red-600",
    logoLetter: "A",
    matchScore: 78,
    matchColor: "#2563EB",
    matchBanner: {
      type: "good",
      highlight: "Good match",
      text: "for paid performance & acquisition funnels",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 12 – 18 LPA",
      experience: "4 – 6 Years",
      jobType: "Full-time",
    },
    skills: ["Performance Ads", "SEO", "Analytics"],
    extraSkillsCount: 4,
    scoreBreakdown: {
      skills: "32/40",
      exp: "11/13",
      role: "13/15",
      salary: "10/10",
      other: "12/20",
      total: 78,
    },
  },
  // 5. HR - TalentPulse HR
  {
    id: "job-hr-talentpulse",
    category: "HR",
    department: "Human Resources & Talent",
    postedTime: "Posted 4d ago",
    title: "Senior Talent Acquisition Specialist",
    company: "TalentPulse HR",
    companyLocation: "Bengaluru",
    logoType: "custom",
    logoColor: "from-blue-600 to-cyan-600",
    logoLetter: "T",
    matchScore: 86,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for tech sourcing and recruiter pipelines",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 10 – 16 LPA",
      experience: "3 – 6 Years",
      jobType: "Full-time",
    },
    skills: ["Tech Hiring", "LinkedIn Recruiter", "ATS"],
    extraSkillsCount: 3,
    scoreBreakdown: {
      skills: "34/40",
      exp: "12/13",
      role: "13/15",
      salary: "10/10",
      other: "17/20",
      total: 86,
    },
  },
  // 6. Finance - FinEdge Capital
  {
    id: "job-fin-finedge",
    category: "Finance",
    department: "Financial Planning & Analysis",
    postedTime: "Posted 5d ago",
    title: "Senior Financial Analyst",
    company: "FinEdge Capital",
    companyLocation: "Gurugram",
    logoType: "custom",
    logoColor: "from-amber-600 to-yellow-500",
    logoLetter: "F",
    matchScore: 88,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for financial modeling and forecasting",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 14 – 20 LPA",
      experience: "3 – 5 Years",
      jobType: "Full-time",
    },
    skills: ["Financial Modeling", "Excel VBA", "Forecasting"],
    extraSkillsCount: 3,
    scoreBreakdown: {
      skills: "36/40",
      exp: "12/13",
      role: "14/15",
      salary: "10/10",
      other: "16/20",
      total: 88,
    },
  },
  // 7. Design - PixelCraft Studios
  {
    id: "job-design-pixelcraft",
    category: "Design",
    department: "Design, UI/UX & Creative",
    postedTime: "Posted 1d ago",
    title: "Lead Product Designer (UI/UX)",
    company: "PixelCraft Studios",
    companyLocation: "Mumbai",
    logoType: "custom",
    logoColor: "from-rose-500 to-pink-600",
    logoLetter: "P",
    matchScore: 94,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for design systems and component architecture",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 14 – 20 LPA",
      experience: "3 – 5 Years",
      jobType: "Full-time",
    },
    skills: ["Figma", "Design Systems", "UX Research"],
    extraSkillsCount: 4,
    scoreBreakdown: {
      skills: "38/40",
      exp: "12/13",
      role: "14/15",
      salary: "10/10",
      other: "20/20",
      total: 94,
    },
  },
  // 8. Video - CineWave Media
  {
    id: "job-video-cinewave",
    category: "Video",
    department: "Creative Media & Video",
    postedTime: "Posted 3d ago",
    title: "Motion Graphics & Video Producer",
    company: "CineWave Media",
    companyLocation: "Hyderabad",
    logoType: "custom",
    logoColor: "from-violet-600 to-purple-800",
    logoLetter: "C",
    matchScore: 85,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for 3D motion rendering and After Effects",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 8 – 14 LPA",
      experience: "2 – 5 Years",
      jobType: "Full-time",
    },
    skills: ["After Effects", "Premiere Pro", "3D Motion"],
    extraSkillsCount: 2,
    scoreBreakdown: {
      skills: "35/40",
      exp: "11/13",
      role: "13/15",
      salary: "10/10",
      other: "16/20",
      total: 85,
    },
  },
  // 9. Data - Cerebra AI Labs
  {
    id: "job-data-cerebra",
    category: "Data",
    department: "Data Science, Analytics & AI",
    postedTime: "Posted 2d ago",
    title: "AI / ML Research Engineer",
    company: "Cerebra AI Labs",
    companyLocation: "Gurugram",
    logoType: "custom",
    logoColor: "from-purple-600 to-pink-600",
    logoLetter: "C",
    matchScore: 62,
    matchColor: "#2563EB",
    matchBanner: {
      type: "good",
      highlight: "Good match",
      text: "for PyTorch & neural network architectures",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 24 – 35 LPA",
      experience: "4 – 7 Years",
      jobType: "Full-time",
    },
    skills: ["PyTorch", "LLM Ops", "CUDA"],
    extraSkillsCount: 3,
    scoreBreakdown: {
      skills: "22/40",
      exp: "9/13",
      role: "10/15",
      salary: "10/10",
      other: "11/20",
      total: 62,
    },
  },
  // 10. Support - CloudCare Global
  {
    id: "job-sup-cloudcare",
    category: "Support",
    department: "Customer Operations",
    postedTime: "Posted 1w ago",
    title: "Customer Success Operations Lead",
    company: "CloudCare Global",
    companyLocation: "Pune",
    logoType: "custom",
    logoColor: "from-sky-500 to-blue-600",
    logoLetter: "S",
    matchScore: 90,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for CSAT scaling and SLA orchestration",
    },
    chips: {
      workMode: "Remote",
      salary: "₹ 9 – 14 LPA",
      experience: "3 – 5 Years",
      jobType: "Full-time",
    },
    skills: ["Zendesk", "CSAT Scaling", "SLA Mgmt"],
    extraSkillsCount: 2,
    scoreBreakdown: {
      skills: "37/40",
      exp: "12/13",
      role: "14/15",
      salary: "10/10",
      other: "17/20",
      total: 90,
    },
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

  const [isSaved, setIsSaved] = useState(false);
  const isAnimatingOut = useRef(false);

  // Safe fallback resolvers
  const matchBanner = job.matchBanner || {
    type: (job.matchScore >= 80 ? "great" : job.matchScore >= 60 ? "good" : "low") as "good" | "great" | "low",
    highlight: job.matchScore >= 80 ? "Great match" : job.matchScore >= 60 ? "Good match" : "Moderate match",
    text: "for your skills and experience",
  };

  const chips = job.chips || {
    workMode: job.location?.includes("Remote")
      ? "Remote"
      : job.location?.includes("Hybrid")
        ? "Hybrid"
        : "On-site",
    salary: job.salary || "Competitive",
    experience: job.experience || "2 – 5 years",
    jobType: job.type || "Full-time",
  };

  const skillsList = job.skills || job.tags || ["Technical Skills", "Problem Solving"];
  const extraCount = job.extraSkillsCount ?? (skillsList.length > 3 ? skillsList.length - 3 : 2);
  const displaySkills = skillsList.slice(0, 3);

  const scoreBreakdown = job.scoreBreakdown || {
    skills: job.breakdown?.skills || `${Math.round((job.matchScore / 100) * 40)}/40`,
    exp: job.breakdown?.exp || "9/13",
    role: job.breakdown?.role || "11/15",
    salary: job.breakdown?.salary || "8/10",
    other: job.breakdown?.other || "11/20",
    total: job.matchScore,
  };

  const performSwipe = useCallback(
    (direction: "left" | "right") => {
      if (isAnimatingOut.current) return;
      isAnimatingOut.current = true;

      const targetX = direction === "right" ? 440 : -440;
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
      className="touch-none select-none h-full w-full"
    >
      {/* Compact Image 1 Card Surface Layout */}
      <div className="relative h-full w-full rounded-[22px] sm:rounded-[24px] border border-slate-200/90 bg-white p-3.5 xs:p-4 sm:p-4.5 shadow-xl shadow-slate-900/6 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Stamp Overlays during drag */}
        {isTop && (
          <>
            {/* APPLY Stamp */}
            <motion.div
              style={{ opacity: applyStampOpacity }}
              className="pointer-events-none absolute left-3 top-3 z-40 rounded-xl border-2 border-emerald-500 bg-white/95 dark:bg-slate-900/95 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-emerald-600 shadow-lg -rotate-12 dark:text-emerald-400"
            >
              ✓ APPLY
            </motion.div>

            {/* SKIP Stamp */}
            <motion.div
              style={{ opacity: skipStampOpacity }}
              className="pointer-events-none absolute right-3 top-3 z-40 rounded-xl border-2 border-rose-500 bg-white/95 dark:bg-slate-900/95 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-rose-600 shadow-lg rotate-12 dark:text-rose-400"
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
          {/* Header Row: Logo, Company & Circular Match Score (Matching Image 1) */}
          <div className="flex items-start justify-between gap-2 xs:gap-2.5">
            <div className="flex items-center gap-2 xs:gap-2.5 min-w-0">
              <CompanyLogo
                logoType={job.logoType}
                company={job.company}
                color={job.logoColor}
                letter={job.logoLetter}
              />
              <div className="min-w-0">
                <h4 className="text-[13px] xs:text-[14px] font-bold text-slate-900 dark:text-slate-100 truncate leading-snug">
                  {job.company}
                </h4>
                <p className="flex items-center gap-1 text-[10.5px] xs:text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                  <MapPin className="h-3 w-3 shrink-0 text-slate-600 dark:text-slate-400 stroke-[2.2]" />
                  <span className="truncate">{job.companyLocation || job.location}</span>
                </p>
              </div>
            </div>

            {/* Circular Match Gauge matching Image 1 */}
            <CircularMatchGauge score={job.matchScore} color={job.matchColor} />
          </div>

          {/* Job Title & Subtitle (Matching Image 1) */}
          <div className="mt-2 xs:mt-2.5">
            <h3 className="text-[14px] xs:text-[15px] sm:text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight truncate">
              {job.title}
            </h3>
            <p className="text-[10px] xs:text-[10.5px] sm:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
              {job.department} {job.postedTime ? `· ${job.postedTime}` : ""}
            </p>
          </div>

          {/* Match Insight Banner (Matching Image 1) */}
          <div
            className={cn(
              "mt-2 xs:mt-2.5 rounded-md px-2 xs:px-2.5 py-1.5 sm:py-2 flex items-center gap-1.5 text-[10.5px] sm:text-[11px] leading-snug border",
              matchBanner.type === "good" &&
              "bg-[#EEF3FF] text-[#1E40AF] border-[#DCE7FE] dark:bg-blue-950/30 dark:border-blue-900/40 dark:text-blue-300",
              matchBanner.type === "great" &&
              "bg-[#ECFDF3] text-[#067647] border-[#067647]/15 dark:bg-emerald-950/30 dark:border-emerald-900/40 dark:text-emerald-400",
              matchBanner.type === "low" &&
              "bg-[#FEF3F2] text-[#B5251A] border-[#B5251A]/15 dark:bg-rose-950/30 dark:border-rose-900/40 dark:text-rose-400"
            )}
          >
            {matchBanner.type === "low" ? (
              <AlertCircle className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
            )}
            <span className="truncate text-[10px] xs:text-[10.5px] sm:text-[11px]">
              <strong className="font-semibold">{matchBanner.highlight}</strong>{" "}
              <span className="font-normal opacity-90">{matchBanner.text}</span>
            </span>
          </div>

          {/* 2x2 Meta Chips Grid (Matching Image 1) */}
          <div className="mt-2 xs:mt-2.5 grid grid-cols-2 gap-1 xs:gap-1.5 text-xs">
            {/* Work Mode */}
            <div className="flex items-center gap-1.5 rounded-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 xs:px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              {chips.workMode === "Remote" ? (
                <Monitor className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              ) : (
                <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              )}
              <span className="truncate text-[10.5px] xs:text-[11px] font-semibold">{chips.workMode}</span>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-1.5 rounded-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 xs:px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              <span className="truncate text-[10.5px] xs:text-[11px] font-semibold">{chips.salary}</span>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-1.5 rounded-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 xs:px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              <span className="truncate text-[10.5px] xs:text-[11px] font-semibold">{chips.experience}</span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-1.5 rounded-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 xs:px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              <Clock className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              <span className="truncate text-[10.5px] xs:text-[11px] font-semibold">{chips.jobType}</span>
            </div>
          </div>

          {/* Skills Tag Row (Matching Image 1) */}
          <div className="mt-2 xs:mt-2.5 flex flex-wrap items-center gap-1 xs:gap-1.5">
            {displaySkills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-slate-100/70 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/60 px-1.5 xs:px-2 py-0.5 text-[9.5px] xs:text-[10.5px] text-slate-700 dark:text-slate-300 font-medium"
              >
                {skill}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-[9.5px] xs:text-[10.5px] text-slate-400 font-medium px-1">
                +{extraCount} more
              </span>
            )}
          </div>
        </div>

        {/* "Why X% match" Breakdown Section with Progress Bars (Matching Image 1) */}
        <div className="mt-2 xs:mt-2.5 pt-2 xs:pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px] xs:text-[11.5px] sm:text-xs">
              Why {job.matchScore}% match
            </span>
            <span className="text-slate-400 text-[10px] xs:text-[10.5px] sm:text-[11px] font-medium">
              {scoreBreakdown.total} / 100 pts
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 text-center">
            {[
              { label: "Skills", val: scoreBreakdown.skills },
              { label: "Exp.", val: scoreBreakdown.exp },
              { label: "Role", val: scoreBreakdown.role },
              { label: "Salary", val: scoreBreakdown.salary },
              { label: "Other", val: scoreBreakdown.other },
            ].map((metric) => {
              const percent = getScorePercentage(metric.val);
              return (
                <div key={metric.label} className="flex flex-col items-center">
                  <span className="text-[8.5px] xs:text-[9.5px] sm:text-[10px] text-slate-400 font-medium">
                    {metric.label}
                  </span>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">
                    {metric.val}
                  </span>
                  {/* Background track + filled percentage blue bar matching Image 1 */}
                  <div className="mt-1 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300 bg-[#2563EB]"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Skip, Bookmark, Apply (Matching Image 1) */}
        <div className="mt-2.5 xs:mt-3 flex items-center gap-1.5 pt-0.5">
          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              performSwipe("left");
            }}
            aria-label="Skip Job"
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-[#FFF1F2] hover:bg-[#FFE4E6] dark:bg-rose-950/40 dark:hover:bg-rose-900/50 py-2 sm:py-2.5 text-xs font-bold text-[#E11D48] dark:text-rose-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <X className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Skip</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved((prev) => !prev);
            }}
            aria-label="Bookmark Job"
            className={cn(
              "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer shadow-2xs",
              isSaved
                ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/40"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            )}
          >
            <Bookmark
              className={cn(
                "h-4 w-4 stroke-[2]",
                isSaved && "fill-current text-blue-600"
              )}
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
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-[#15803D] hover:bg-[#166534] active:scale-95 text-white py-2 sm:py-2.5 text-xs font-bold shadow-md shadow-emerald-800/20 transition-all cursor-pointer"
          >
            <Check className="h-3.5 w-3.5 stroke-[3]" />
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
  const [activeCategory, setActiveCategory] = useState<string>("Sales");

  const [index, setIndex] = useState(0);
  const [applied, setApplied] = useState<PlaygroundJob[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [showAppliedToast, setShowAppliedToast] = useState(false);
  const swipeCountRef = useRef(0);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  const handleDecide = useCallback(
    (dir: "left" | "right", job: PlaygroundJob) => {
      const roundIndex = swipeCountRef.current % SWIPES_PER_ROUND;
      if (job.id !== jobs[roundIndex % jobs.length]?.id) return;

      const startsNewRound = swipeCountRef.current > 0 && roundIndex === 0;
      swipeCountRef.current += 1;
      if (startsNewRound) {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setApplied(dir === "right" ? [job] : []);
        setSkipped(dir === "left" ? 1 : 0);
        setShowAppliedToast(false);
      }
      if (dir === "right") {
        if (!startsNewRound) setApplied((previous) => [...previous, job]);
        setShowAppliedToast(true);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => setShowAppliedToast(false), 2200);
      } else if (!startsNewRound) {
        setSkipped((previous) => previous + 1);
      }
      setIndex(swipeCountRef.current);
    },
    [jobs]
  );

  // Switch category and jump to relevant job
  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    const targetIdx = jobs.findIndex((j) => j.category === category);
    if (targetIdx !== -1) {
      swipeCountRef.current = targetIdx;
      setIndex(targetIdx);
    }
  };

  const reviewedCount = index === 0 ? 0 : ((index - 1) % SWIPES_PER_ROUND) + 1;
  const cardIndex = index % SWIPES_PER_ROUND;
  const currentJob = jobs[cardIndex % jobs.length];
  const nextJob = jobs[((cardIndex + 1) % SWIPES_PER_ROUND) % jobs.length];

  return (
    <section
      id="playground"
      className="relative w-full overflow-hidden py-10 sm:py-16 lg:py-20 bg-[#F8FAFC] dark:bg-slate-950"
      aria-labelledby="playground-heading"
    >
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Floating Badge Pill (Matching Image 1) */}
        <div className="mb-5 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <span>Don&apos;t just look.</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">Try it yourself.</span>
            <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Main White Rounded Container Card (Matching Image 1) */}
        <div className="relative rounded-[22px] sm:rounded-[36px] lg:rounded-[40px] border border-slate-200/80 bg-white p-3.5 xs:p-5 sm:p-8 lg:p-12 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            {/* Left Column: Heading, Category Pills, 3 Stat Cards, Google Play CTA */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left lg:col-span-7 w-full max-w-xl mx-auto lg:mx-0"
            >
              {/* Heading (Matching Image 1) */}
              <h2
                id="playground-heading"
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]"
              >
                One <span className="text-[#16A34A] dark:text-[#22C55E]">Swipe.</span>
                <br />
                Every Kind of Job.
              </h2>

              {/* Category Filter Pills (Matching Image 1) */}
              <div className="mt-4 sm:mt-8 flex flex-wrap gap-1.5 sm:gap-2.5 max-w-xl">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleSelectCategory(cat)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] xs:text-xs sm:text-[13px] font-medium transition-all active:scale-95 cursor-pointer",
                        isActive
                          ? "bg-[#2563EB] text-white shadow-sm"
                          : "bg-slate-50/90 text-slate-600 border border-slate-200/90 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isActive ? "bg-white" : "bg-slate-400 dark:bg-slate-500"
                        )}
                      />
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3 Stat Cards (Matching Image 1) */}
              <div className="mt-5 sm:mt-8 grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-4 w-full max-w-lg">
                {/* Applied */}
                <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 xs:p-3 sm:p-5 dark:border-slate-800 dark:bg-slate-800/60 shadow-2xs text-center sm:text-left">
                  <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-[#16A34A] dark:text-[#22C55E] leading-none">
                    {applied.length}
                  </p>
                  <p className="mt-1 sm:mt-1.5 text-[10px] xs:text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Applied
                  </p>
                </div>

                {/* Skipped */}
                <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 xs:p-3 sm:p-5 dark:border-slate-800 dark:bg-slate-800/60 shadow-2xs text-center sm:text-left">
                  <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-[#DC2626] dark:text-[#EF4444] leading-none">
                    {skipped}
                  </p>
                  <p className="mt-1 sm:mt-1.5 text-[10px] xs:text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Skipped
                  </p>
                </div>

                {/* Reviewed */}
                <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 xs:p-3 sm:p-5 dark:border-slate-800 dark:bg-slate-800/60 shadow-2xs text-center sm:text-left">
                  <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-none">
                    {reviewedCount}/{SWIPES_PER_ROUND}
                  </p>
                  <p className="mt-1 sm:mt-1.5 text-[10px] xs:text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Reviewed
                  </p>
                </div>
              </div>

              {/* Google Play Button (Matching Image 1) */}
              <div className="mt-5 sm:mt-10 w-full xs:w-auto">
                <a
                  href="#download-app"
                  className="inline-flex items-center justify-center gap-2.5 sm:gap-3.5 rounded-2xl bg-[#15803D] hover:bg-[#166534] px-4 sm:px-6 py-2.5 sm:py-3.5 text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer w-full xs:w-auto"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 fill-white" aria-hidden="true">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.198-.246-.31-.572-.31-.944V2.758c0-.372.112-.698.31-.944zM15.207 13.414l2.45-2.45-12.78-7.38 10.33 9.83zm0-2.828L4.877 20.416l12.78-7.38-2.45-2.45zm1.414 1.414l3.19 1.84c.89.51.89 1.35 0 1.87l-3.19 1.84-2.12-2.12 2.12-2.12z" />
                  </svg>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                      GET IT ON GOOGLE PLAY
                    </span>
                    <span className="text-xs sm:text-base font-extrabold text-white tracking-tight">
                      Apply for real jobs
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Standalone Interactive Card Deck with Image 1 Card Layout (Compact Width) */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center lg:col-span-5 w-full"
            >
              {/* Dynamic Application Toast */}
              <AnimatePresence>
                {showAppliedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-3 flex items-center justify-between rounded-xl bg-[#00a86b] px-3.5 py-1.5 text-white shadow-md select-none w-full max-w-[285px] xs:max-w-[310px] sm:max-w-[325px]"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      <span>Application Sent! Recruiter notified.</span>
                    </div>
                    <span className="text-amber-300 text-xs font-bold select-none leading-none">✦</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Card Deck Container (Responsive Max-Width & Proper Height) */}
              <div className="relative w-full max-w-[285px] xs:max-w-[310px] sm:max-w-[325px] h-[475px] xs:h-[480px] sm:h-[485px] select-none mx-auto">
                {/* Physical Stacked Deck Visual Effect (Matching Image 1 bottom stacked layers) */}
                <div
                  className="absolute -bottom-2 inset-x-2.5 h-10 rounded-[24px] border border-slate-200/70 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-4 inset-x-5 h-10 rounded-[24px] border border-slate-200/50 bg-white/80 shadow-xs dark:border-slate-800 dark:bg-slate-900/75 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 inset-x-7.5 h-10 rounded-[24px] border border-slate-200/30 bg-white/60 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Behind card preview for depth */}
                {nextJob && (
                  <div
                    className="absolute inset-0 rounded-[24px] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-90 shadow-md translate-y-1 scale-[0.99] pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                {/* Active Top Draggable Card */}
                <AnimatePresence mode="popLayout">
                  <DragCard
                    key={currentJob.id + "-" + index}
                    job={currentJob}
                    onDecide={handleDecide}
                    isTop={true}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SwipePlayground;
