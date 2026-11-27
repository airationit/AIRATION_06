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
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { JobListItem } from "@/types/jobs";

// Categories arranged in the exact sequential order that job cards appear in PLAYGROUND_JOBS
const CATEGORIES = [
  "Sales",
  "IT",
  "Content",
  "Marketing",
  "HR",
  "Finance",
  "Design",
  "Video",
  "Data",
  "Support",
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

/** Circular Match Gauge with clean MATCH label matching Image 1 (h-14 w-14) */
function CircularMatchGauge({
  score,
  color = "#2563EB",
}: {
  score: number;
  color?: string;
}) {
  const radius = 22;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * score) / 100;

  return (
    <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-800"
        />
        <circle
          cx="28"
          cy="28"
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
        <span className="text-[13px] font-black text-slate-900 dark:text-white leading-none">
          {score}%
        </span>
        <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 leading-none">
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
  // 3. Content - ByteForge Labs (Technical Content & Documentation)
  {
    id: "job-byteforge",
    category: "Content",
    department: "Content & Tech Media",
    postedTime: "Posted 2h ago",
    title: "Technical Content Strategist",
    company: "ByteForge Labs",
    companyLocation: "Noida, Uttar Pradesh",
    logoType: "cube",
    matchScore: 92,
    matchColor: "#16A34A",
    matchBanner: {
      type: "great",
      highlight: "Great match",
      text: "for technical storytelling & documentation",
    },
    chips: {
      workMode: "Hybrid",
      salary: "₹ 12 – 18 LPA",
      experience: "3 – 5 years",
      jobType: "Full-time",
    },
    skills: ["Tech Writing", "Documentation", "API Docs"],
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
  const applyStampOpacity = useTransform(x, [15, 60], [0, 1]);
  const skipStampOpacity = useTransform(x, [-15, -60], [0, 1]);
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
      <div className="relative h-full w-full rounded-[22px] sm:rounded-[24px] border border-slate-200/90 bg-white p-3.5 xs:p-4 sm:p-4.5 shadow-[0_10px_30px_-6px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Stamp Overlays during drag */}
        {isTop && (
          <>
            {/* APPLY Stamp (Matching Image 3: Bold Green Rounded Stamp on top-left) */}
            <motion.div
              style={{ opacity: applyStampOpacity }}
              className="pointer-events-none absolute left-3.5 top-3.5 z-40 rounded-2xl border-[2.5px] sm:border-[3px] border-[#16A34A] dark:border-emerald-500 bg-white/95 dark:bg-slate-900/95 px-4 sm:px-5 py-1 sm:py-1.5 text-lg sm:text-xl font-black uppercase tracking-wider text-[#15803D] dark:text-emerald-400 shadow-md shadow-emerald-950/10 -rotate-12 select-none"
            >
              APPLY
            </motion.div>

            {/* SKIP Stamp (Matching Image 2: Bold Red Rounded Stamp on top-right) */}
            <motion.div
              style={{ opacity: skipStampOpacity }}
              className="pointer-events-none absolute right-3.5 top-3.5 z-40 rounded-2xl border-[2.5px] sm:border-[3px] border-[#DC2626] dark:border-rose-500 bg-white/95 dark:bg-slate-900/95 px-4 sm:px-5 py-1 sm:py-1.5 text-lg sm:text-xl font-black uppercase tracking-wider text-[#DC2626] dark:text-rose-400 shadow-md shadow-rose-950/10 rotate-12 select-none"
            >
              SKIP
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

        {/* Content & Match Breakdown Combined (removes unnecessary empty gaps) */}
        <div className="flex flex-col">
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
            <h3 className="text-[14.5px] xs:text-[15.5px] sm:text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight truncate">
              {job.title}
            </h3>
            <p className="text-[10.5px] xs:text-[11px] sm:text-[11.5px] text-slate-400 dark:text-slate-500 mt-1 truncate">
              {job.department} {job.postedTime ? `· ${job.postedTime}` : ""}
            </p>
          </div>

          {/* Match Insight Banner (Matching Image 1) */}
          <div
            className={cn(
              "mt-3 xs:mt-3.5 rounded-lg px-2.5 xs:px-3 py-2 sm:py-2.5 flex items-center gap-1.5 text-[10.5px] sm:text-[11px] leading-snug border",
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
            <span className="truncate text-[10.5px] xs:text-[11px]">
              <strong className="font-semibold">{matchBanner.highlight}</strong>{" "}
              <span className="font-normal opacity-90">{matchBanner.text}</span>
            </span>
          </div>

          {/* 2x2 Meta Chips Grid (Matching Image 1) */}
          <div className="mt-3 xs:mt-3.5 grid grid-cols-2 gap-1.5 xs:gap-2 text-xs">
            {/* Work Mode */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 xs:px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              {chips.workMode === "Remote" ? (
                <Monitor className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              ) : (
                <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              )}
              <span className="truncate text-[11px] xs:text-[11.5px] font-semibold">{chips.workMode}</span>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 xs:px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              <span className="truncate text-[11px] xs:text-[11.5px] font-semibold">{chips.salary}</span>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 xs:px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              <span className="truncate text-[11px] xs:text-[11.5px] font-semibold">{chips.experience}</span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 xs:px-3 py-2 text-slate-800 dark:text-slate-200 font-medium truncate shadow-2xs">
              <Clock className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-300 stroke-[2]" />
              <span className="truncate text-[11px] xs:text-[11.5px] font-semibold">{chips.jobType}</span>
            </div>
          </div>

          {/* Skills Tag Row (Strictly 1 Row with Text Truncation) */}
          <div className="mt-3 xs:mt-3.5 flex flex-nowrap items-center gap-1 xs:gap-1.5 w-full overflow-hidden">
            {displaySkills.map((skill) => (
              <span
                key={skill}
                title={skill}
                className="inline-flex items-center min-w-0 shrink max-w-[85px] xs:max-w-[100px] sm:max-w-[110px] rounded-lg bg-slate-100/70 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/60 px-2 py-0.5 xs:px-2.5 xs:py-1 text-[10px] xs:text-[11px] text-slate-700 dark:text-slate-300 font-medium"
              >
                <span className="truncate">{skill}</span>
              </span>
            ))}
            {extraCount > 0 && (
              <span className="shrink-0 text-[10px] xs:text-[11px] text-slate-400 font-medium whitespace-nowrap px-0.5">
                +{extraCount} more
              </span>
            )}
          </div>

          {/* "Why X% match" Breakdown Section with Progress Bars (Directly connected to eliminate empty gap 1) */}
          <div className="mt-3.5 xs:mt-4 pt-3 xs:pt-3.5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-[11.5px] xs:text-xs">
                Why {job.matchScore}% match
              </span>
              <span className="text-slate-400 text-[10.5px] xs:text-[11px] font-medium">
                {scoreBreakdown.total} / 100 pts
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 text-left">
              {[
                { label: "Skills", val: scoreBreakdown.skills },
                { label: "Exp.", val: scoreBreakdown.exp },
                { label: "Role", val: scoreBreakdown.role },
                { label: "Salary", val: scoreBreakdown.salary },
                { label: "Other", val: scoreBreakdown.other },
              ].map((metric) => {
                const percent = getScorePercentage(metric.val);
                return (
                  <div key={metric.label} className="flex flex-col items-start text-left">
                    <span className="text-[9px] xs:text-[10px] text-slate-400 font-medium text-left">
                      {metric.label}
                    </span>
                    <span className="text-[10.5px] xs:text-[11.5px] font-bold text-slate-800 dark:text-slate-200 mt-0.5 text-left">
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
        </div>

        {/* Action Buttons: Skip, Bookmark, Apply (Tight margin eliminates gap 2) */}
        <div className="mt-2.5 lg:mt-4 flex items-center gap-2 pt-0 lg:pt-1">
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

interface SwipeAction {
  job: PlaygroundJob;
  direction: "left" | "right";
  fromIndex: number;
  previousDecision?: "applied" | "skipped";
}

function findNextUnreviewedIndex(
  fromIndex: number,
  jobsList: PlaygroundJob[],
  decisions: Record<string, "applied" | "skipped">
): number | null {
  for (let offset = 1; offset <= jobsList.length; offset++) {
    const candidateIdx = (fromIndex + offset) % jobsList.length;
    const cat = jobsList[candidateIdx].category;
    if (cat && !decisions[cat]) {
      return candidateIdx;
    }
  }
  return null;
}

export function SwipePlayground({ initialJobs }: SwipePlaygroundProps = {}) {
  const reducedMotion = useReducedMotion();
  const [jobs, setJobs] = useState<PlaygroundJob[]>(PLAYGROUND_JOBS);

  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipeDecisions, setSwipeDecisions] = useState<Record<string, "applied" | "skipped">>({});
  const [history, setHistory] = useState<SwipeAction[]>([]);
  const pillsRef = useRef<HTMLDivElement>(null);
  const isDraggingPillsRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const wasDraggedRef = useRef(false);

  const handleScrollPills = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 160, behavior: "smooth" });
    }
  }, []);

  const handlePillsMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = pillsRef.current;
    if (!el) return;
    isDraggingPillsRef.current = true;
    wasDraggedRef.current = false;
    dragStartXRef.current = e.pageX;
    dragStartScrollLeftRef.current = el.scrollLeft;
  }, []);

  const handlePillsMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = pillsRef.current;
    if (!isDraggingPillsRef.current || !el) return;
    const deltaX = e.pageX - dragStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      wasDraggedRef.current = true;
      el.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    }
  }, []);

  const handlePillsMouseUpOrLeave = useCallback(() => {
    isDraggingPillsRef.current = false;
  }, []);

  const totalRoundJobs = Math.min(jobs.length, SWIPES_PER_ROUND);
  const reviewedCount = Object.keys(swipeDecisions).length;
  const appliedJobs = jobs.filter((j) => j.category && swipeDecisions[j.category] === "applied");
  const appliedCount = appliedJobs.length;
  const skippedCount = Object.values(swipeDecisions).filter((d) => d === "skipped").length;

  const isCompleted = reviewedCount >= totalRoundJobs;

  const handleDecide = useCallback(
    (dir: "left" | "right", job: PlaygroundJob) => {
      const cat = job.category;
      if (!cat) return;

      const previousDecision = swipeDecisions[cat];
      const newDecision: "applied" | "skipped" = dir === "right" ? "applied" : "skipped";
      const updatedDecisions: Record<string, "applied" | "skipped"> = {
        ...swipeDecisions,
        [cat]: newDecision,
      };

      setSwipeDecisions(updatedDecisions);

      setHistory((prev) => [
        ...prev,
        {
          job,
          direction: dir,
          fromIndex: currentJobIndex,
          previousDecision,
        },
      ]);

      // Move to the next unreviewed job
      const nextIdx = findNextUnreviewedIndex(currentJobIndex, jobs, updatedDecisions);
      if (nextIdx !== null) {
        setCurrentJobIndex(nextIdx);
      }
    },
    [currentJobIndex, jobs, swipeDecisions]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    // Revert category decision
    if (lastAction.job.category) {
      setSwipeDecisions((prev) => {
        const next = { ...prev };
        if (lastAction.previousDecision) {
          next[lastAction.job.category!] = lastAction.previousDecision;
        } else {
          delete next[lastAction.job.category!];
        }
        return next;
      });
    }

    // Return to the card that was swiped
    setCurrentJobIndex(lastAction.fromIndex);
  }, [history]);

  const handleReset = useCallback(() => {
    setCurrentJobIndex(0);
    setSwipeDecisions({});
    setHistory([]);
  }, []);

  // Switch category and jump to relevant job
  const handleSelectCategory = (category: string) => {
    const targetIdx = jobs.findIndex((j) => j.category === category);
    if (targetIdx !== -1) {
      setCurrentJobIndex(targetIdx);
    }
  };

  const currentJob = !isCompleted ? jobs[currentJobIndex % jobs.length] : null;
  const nextUnreviewedIdx = !isCompleted
    ? findNextUnreviewedIndex(currentJobIndex, jobs, swipeDecisions)
    : null;
  const nextJob =
    !isCompleted &&
    nextUnreviewedIdx !== null &&
    nextUnreviewedIdx !== currentJobIndex
      ? jobs[nextUnreviewedIdx]
      : null;

  return (
    <section
      id="playground"
      className="relative w-full overflow-hidden pt-8 pb-10 sm:py-16 lg:py-10"
      aria-labelledby="playground-heading"
    >
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Floating Badge Pill (Matching Image 1) */}
        <div className="mb-3.5 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-xl font-medium text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <span>Don&apos;t just look.</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">Try it yourself.</span>
            <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Main White Rounded Container Card (Matching Image 1) */}
        <div className="relative rounded-[22px] sm:rounded-[36px] lg:rounded-[40px] border border-slate-500/20 bg-[#fbfbfb] px-5 pt-5 pb-7 xs:px-6 xs:pt-5 xs:pb-8 sm:px-10 sm:py-8 lg:p-12 lg:pb-12 dark:bg-slate-900">
          <div className="grid grid-cols-1 items-center gap-5 sm:gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            {/* Left Column: Heading, Category Pills, 3 Stat Cards, Google Play CTA */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="contents sm:flex sm:flex-col sm:items-start sm:text-left lg:col-span-7 sm:w-full sm:max-w-xl sm:mx-auto lg:mx-0"
            >
              {/* Heading (Matching Image 1) */}
              <h2
                id="playground-heading"
                className="order-1 sm:order-none text-xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-left"
              >
                One <span className="text-[#16A34A] dark:text-[#22C55E]">Swipe.</span>
                <br />
                Every Kind of Job.
              </h2>

              {/* Category Filter Pills (Mobile: single scrollable row + arrow; sm+: wrapped multi-row) */}
              <div className="order-2 sm:order-none w-full sm:mt-8 flex items-center gap-2 sm:block">
                <div
                  ref={pillsRef}
                  data-lenis-prevent
                  onMouseDown={handlePillsMouseDown}
                  onMouseMove={handlePillsMouseMove}
                  onMouseUp={handlePillsMouseUpOrLeave}
                  onMouseLeave={handlePillsMouseUpOrLeave}
                  className="flex flex-1 min-w-0 flex-nowrap sm:flex-wrap items-center gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-visible touch-pan-x select-none no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-xl"
                >
                  {CATEGORIES.map((cat) => {
                    const isCurrent = !isCompleted && currentJob?.category === cat;
                    const decision = swipeDecisions[cat];

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          if (wasDraggedRef.current) {
                            wasDraggedRef.current = false;
                            return;
                          }
                          handleSelectCategory(cat);
                        }}
                        className={cn(
                          "inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-[13px] font-medium transition-all active:scale-95 cursor-pointer border shadow-2xs",
                          isCurrent
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                            : decision === "applied"
                              ? "bg-[#ECFDF3] dark:bg-emerald-950/40 text-[#067647] dark:text-emerald-300 border-[#A6F4C5] dark:border-emerald-800/50"
                              : decision === "skipped"
                                ? "bg-[#FEF3F2] dark:bg-rose-950/40 text-[#B42318] dark:text-rose-300 border-[#FECDCA] dark:border-rose-800/50"
                                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:border-slate-300"
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full shrink-0",
                            isCurrent
                              ? "bg-white"
                              : decision === "applied"
                                ? "bg-[#12B76A]"
                                : decision === "skipped"
                                  ? "bg-[#F04438]"
                                  : "bg-slate-400 dark:bg-slate-500"
                          )}
                        />
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleScrollPills}
                  aria-label="Scroll categories right"
                  className="flex sm:hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-400/70 text-white active:scale-95 transition-transform cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>

              {/* 3 Stat Cards (Matching Image 1 - Medium Digit & Font Boldness) */}
              <div className="order-4 sm:order-none sm:mt-7 grid grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-lg">
                {/* Applied */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs text-center sm:text-left transition-all hover:border-slate-300">
                  <p className="text-2xl xs:text-3xl sm:text-4xl font-medium text-[#16A34A] dark:text-[#22C55E] leading-none tracking-tight">
                    {appliedCount}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    Applied
                  </p>
                </div>

                {/* Skipped */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs text-center sm:text-left transition-all hover:border-slate-300">
                  <p className="text-2xl xs:text-3xl sm:text-4xl font-medium text-[#DC2626] dark:text-[#EF4444] leading-none tracking-tight">
                    {skippedCount}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    Skipped
                  </p>
                </div>

                {/* Reviewed */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs text-center sm:text-left transition-all hover:border-slate-300">
                  <p className="text-2xl xs:text-3xl sm:text-4xl font-medium text-slate-800 dark:text-white leading-none tracking-tight">
                    {reviewedCount}/{SWIPES_PER_ROUND}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    Reviewed
                  </p>
                </div>
              </div>

              {/* Google Play Button + Undo Last Swipe Button Container (Always single row; full-width CTA when no undo on < lg) */}
              <div className="order-5 sm:order-none sm:mt-7 flex flex-nowrap items-center justify-between gap-2 xs:gap-3 sm:gap-6 w-full max-w-lg">
                {/* 1. Google Play Store Badge */}
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#15803D] hover:bg-[#166534] px-3 sm:px-6 py-2.5 sm:py-3 text-white shadow-md shadow-emerald-900/15 transition-all hover:scale-[1.01] active:scale-98 group cursor-pointer min-w-0",
                    history.length === 0 ? "w-full lg:w-auto" : "flex-1 lg:flex-none shrink"
                  )}
                >
                  <svg
                    className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 fill-white shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
                  </svg>
                  <div className="flex flex-col text-left leading-tight min-w-0">
                    <span className="text-[8px] xs:text-[8.5px] sm:text-[10px] font-medium uppercase tracking-wider text-emerald-100 truncate">
                      GET IT ON GOOGLE PLAY
                    </span>
                    <span className="text-[11px] xs:text-xs sm:text-base font-medium text-white tracking-tight whitespace-nowrap truncate">
                      Apply for real jobs
                    </span>
                  </div>
                </a>

                {/* 2. Undo Last Swipe Button (Hidden till cards start being swiped) */}
                <AnimatePresence>
                  {history.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.92, x: 8 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.92, x: 8 }}
                      transition={{ duration: 0.2 }}
                      type="button"
                      onClick={handleUndo}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 px-2.5 xs:px-3 sm:px-5 py-2.5 sm:py-3 text-[11px] xs:text-xs sm:text-sm font-medium transition-all shadow-2xs select-none shrink-0 whitespace-nowrap cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span>Undo last swipe</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Column: Standalone Interactive Card Deck with Image 1 Card Layout (Compact Width) */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="order-3 sm:order-none flex flex-col items-center justify-center lg:col-span-5 w-full pb-2 sm:pb-0"
            >
              {/* Interactive Card Deck Container (Professional Spaced Height & Width) */}
              <div className="relative w-full max-w-[290px] xs:max-w-[315px] sm:max-w-[335px] h-[415px] xs:h-[425px] sm:h-[420px] lg:h-[450px] select-none mx-auto mb-3 sm:mb-2">
                {/* Physical Stacked Deck Visual Effect (only when cards remain) */}
                {!isCompleted && nextJob && (
                  <>
                    <div
                      className="absolute -bottom-2 inset-x-2.5 h-10 rounded-[24px] border border-slate-200/70 bg-white/95 shadow-[0_6px_16px_-3px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-slate-900/90 pointer-events-none"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -bottom-4 inset-x-5 h-10 rounded-[24px] border border-slate-200/50 bg-white/80 shadow-[0_10px_22px_-4px_rgba(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900/75 pointer-events-none"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -bottom-6 inset-x-7.5 h-10 rounded-[24px] border border-slate-200/30 bg-white/60 shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1)] dark:border-slate-800 dark:bg-slate-900/60 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Behind card preview for depth */}
                    <div
                      className="absolute inset-0 rounded-[24px] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-90 shadow-md translate-y-1 scale-[0.99] pointer-events-none"
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Active Top Draggable Card or Completed Summary Card (Matching Image 1) */}
                <AnimatePresence mode="popLayout">
                  {isCompleted ? (
                    <motion.div
                      key="deck-completed"
                      initial={{ scale: 0.94, opacity: 0, y: 15 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.94, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                      className="relative h-full w-full rounded-[24px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/6 dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center justify-center text-center overflow-hidden"
                    >
                      {/* Success Checkmark Circle (Matching Image 1) */}
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#ECFDF3] dark:bg-emerald-950/50 flex items-center justify-center mb-4 sm:mb-5 shadow-2xs">
                        <Check className="h-7 w-7 sm:h-8 sm:w-8 text-[#15803D] dark:text-emerald-400 stroke-[3]" />
                      </div>

                      {/* Headline (Matching Image 1) */}
                      <h3 className="text-2xl sm:text-[28px] font-medium text-slate-900 dark:text-white tracking-tight mb-2">
                        That was fast.
                      </h3>

                      {/* Stats Subtitle: X applied · Y skipped (Matching Image 1) */}
                      <p className="text-sm sm:text-base font-semibold mb-6 sm:mb-7 flex items-center justify-center gap-1.5">
                        <span className="text-[#15803D] dark:text-emerald-400 font-bold">
                          {appliedCount} applied
                        </span>
                        <span className="text-slate-400 font-normal">·</span>
                        <span className="text-[#DC2626] dark:text-rose-500 font-bold">
                          {skippedCount} skipped
                        </span>
                      </p>

                      {/* Google Play Button (Matching Image 1) */}
                      <a
                        href={siteConfig.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#15803D] hover:bg-[#166534] px-5 sm:px-6 py-2.5 sm:py-3 text-white shadow-md shadow-emerald-900/15 transition-all hover:scale-[1.02] active:scale-98 group cursor-pointer mb-5 sm:mb-6 w-full max-w-[240px]"
                      >
                        <svg
                          className="h-5.5 w-5.5 fill-white shrink-0"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
                        </svg>
                        <div className="flex flex-col text-left leading-tight">
                          <span className="text-[9.5px] font-medium uppercase tracking-wider text-emerald-100">
                            GET IT ON GOOGLE PLAY
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                            Apply for real jobs
                          </span>
                        </div>
                      </a>

                      {/* Swipe again Reset Link (Matching Image 1) */}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 underline underline-offset-4 hover:text-[#15803D] dark:hover:text-emerald-400 cursor-pointer transition-colors"
                      >
                        Swipe again
                      </button>
                    </motion.div>
                  ) : (
                    currentJob && (
                      <DragCard
                        key={`${currentJob.id}-${history.length}`}
                        job={currentJob}
                        onDecide={handleDecide}
                        isTop={true}
                      />
                    )
                  )}
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
