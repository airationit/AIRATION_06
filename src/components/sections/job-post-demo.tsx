"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion"
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  MapPin,
  Users,
  Check,
  Sparkles,
  Send,
  Wand2,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Building2,
  Bell,
  Settings,
  MessageSquare,
  Heart,
  FileText,
  Plus,
  Save,
  X,
  ArrowLeft,
  RefreshCw,
  Star,
  Calendar,
  LayoutGrid,
  IndianRupee,
  Bookmark,
  Zap,
  Search,
  Clock,
  Pencil,
  Lock,
} from "lucide-react"

export interface StepItem {
  key: string
  name: string
  caption: string
}

export const STEPS: StepItem[] = [
  {
    key: "signin",
    name: "Sign in",
    caption: "Enter your mobile number and verify with OTP — no long forms.",
  },
  {
    key: "details",
    name: "Job Details",
    caption: "Add the core details candidates see first — title, location, salary & type.",
  },
  {
    key: "requirements",
    name: "Requirements",
    caption: "Let AI draft the full job description in one click, then fine-tune.",
  },
  {
    key: "match",
    name: "Match %",
    caption: "Pick how strictly Hirance filters applicants for this role.",
  },
  {
    key: "publish",
    name: "Preview & Post",
    caption: "Review everything and publish — your job goes live instantly.",
  },
  {
    key: "matches",
    name: "Candidate Applications",
    caption: "Review, filter and shortlist AI-ranked candidates in real time.",
  },
  {
    key: "dashboard",
    name: "Real-time Analytics",
    caption: "Track real-time hiring analytics and your funnel at a glance.",
  },
]

const STEP_DURATIONS = [5200, 4200, 4800, 4000, 3800, 4800, 4000]

/* ---------- Shared primitives ---------- */

interface FieldProps {
  label: string
  value: string
  required?: boolean
  icon?: React.ComponentType<{ size?: number; className?: string }>
  delay?: number
  dropdown?: boolean
  reducedMotion?: boolean
  hint?: string
}

const Field = ({
  label,
  value,
  required,
  icon: Icon,
  delay = 0,
  dropdown,
  reducedMotion,
  hint,
}: FieldProps) => (
  <div>
    <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px]">
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </p>
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xs sm:px-4 sm:py-3"
    >
      {Icon && <Icon size={17} className="shrink-0 text-slate-400" />}
      <span className="truncate text-sm font-semibold text-slate-900 sm:text-base">
        {value}
      </span>
      {dropdown && (
        <ChevronDown size={16} className="ml-auto shrink-0 text-slate-400" />
      )}
    </motion.div>
    {hint && (
      <p className="mt-1 text-xs font-medium text-brand-600">{hint}</p>
    )}
  </div>
)

interface ChipProps {
  children: React.ReactNode
  on?: boolean
}

const Chip = ({ children, on }: ChipProps) => (
  <span
    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
      on
        ? "border-brand-500 bg-brand-50 text-brand-700 shadow-xs"
        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
    }`}
  >
    {children}
  </span>
)

/* ---------- Sign in (screenshot 1) ---------- */

const SignInScreen = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const journey = [
    {
      n: 1,
      c: "#7C3AED",
      titleColor: "text-[#7C3AED]",
      t: "Create Your Company Profile",
      d: "Tell us about your company and hiring needs - takes less than 2 mins",
      card: (
        <div className="flex min-w-[170px] 2xl:min-w-[190px] items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:min-w-[190px]">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Building2 size={18} />
            <div className="absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-600 text-white shadow-xs">
              <Check size={9} strokeWidth={3.5} />
            </div>
          </div>
          <div>
            <p className="text-xs leading-tight font-bold text-slate-900">
              Airation Softtech
            </p>
            <div className="mt-1.5 h-1.5 w-14 rounded-full bg-slate-100" />
          </div>
        </div>
      ),
    },
    {
      n: 2,
      c: "#2563EB",
      titleColor: "text-[#2563EB]",
      t: "Post A Job",
      d: "Post any job under 1 min. Candidates start swiping in seconds",
      card: (
        <div className="flex min-w-[170px] 2xl:min-w-[190px] flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:min-w-[190px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500">
              <Briefcase size={14} />
            </div>
            <div>
              <p className="text-xs leading-tight font-bold text-slate-900">
                Sales Executive
              </p>
              <p className="text-[10px] text-slate-500">Full time, Noida</p>
            </div>
          </div>
          <span className="w-full rounded-lg bg-brand-600 py-1.5 text-center text-xs font-semibold text-white">
            Post Job
          </span>
        </div>
      ),
    },
    {
      n: 3,
      c: "#F97316",
      titleColor: "text-[#F97316]",
      t: "Review AI-Matched Candidates",
      d: "Review candidates ranked by match % so no manual filtering, no resume pile",
      card: (
        <div className="flex min-w-[180px] 2xl:min-w-[200px] flex-col gap-1.5 rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-sm sm:min-w-[200px] sm:p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[10px] font-bold text-sky-700">
                RA
              </div>
              <div>
                <p className="text-xs leading-tight font-bold text-slate-900">
                  Rohan Jha
                </p>
                <p className="flex items-center gap-0.5 text-[10px] text-slate-500">
                  <MapPin size={9} /> Noida
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center justify-center rounded-full border-2 border-emerald-500 px-1.5 py-0.5 text-center">
              <span className="text-[10px] leading-none font-black text-emerald-600">
                87%
              </span>
              <span className="mt-0.5 text-[8px] leading-none font-semibold text-emerald-600">
                Match
              </span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-900">Sales Executive</p>
          <div className="flex items-center gap-1.5">
            <span className="flex-1 rounded-md border border-rose-100 bg-rose-50 py-0.5 text-center text-[10px] font-semibold text-rose-500">
              ✕ Skip
            </span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400">
              <Bookmark size={10} />
            </span>
            <span className="flex-1 rounded-md border border-emerald-100 bg-emerald-50 py-0.5 text-center text-[10px] font-semibold text-emerald-600">
              ✓ Shortlist
            </span>
          </div>
        </div>
      ),
    },
    {
      n: 4,
      c: "#16A34A",
      titleColor: "text-[#16A34A]",
      t: "Hire The Right Talent",
      d: "Connect, interview and hire the right talent - all from 1 dashboard",
      card: (
        <div className="flex min-w-[170px] 2xl:min-w-[190px] items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:min-w-[190px]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
            <Check size={15} strokeWidth={3} />
          </div>
          <div>
            <p className="text-xs leading-tight font-bold text-slate-900">
              Hired Successfully!
            </p>
            <p className="text-[10px] text-slate-500">Welcome aboard!</p>
          </div>
        </div>
      ),
    },
  ]

  const digits = "9026728748".split("")

  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-3 sm:p-5 lg:p-6 2xl:p-8">
      <div className="mx-auto grid w-full max-w-5xl 2xl:max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8 2xl:gap-10">
        <div className="flex flex-col gap-3.5 sm:gap-4 2xl:gap-4.5 lg:col-span-7">
          {journey.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : 0.06 + idx * 0.08,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-between gap-3 2xl:gap-4"
            >
              <div className="relative flex min-w-0 flex-1 items-start gap-3 2xl:gap-3.5">
                {idx < journey.length - 1 && (
                  <div className="absolute top-8 bottom-[-18px] 2xl:bottom-[-20px] left-3.5 z-0 w-px bg-slate-200 sm:left-4" />
                )}
                <div
                  className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white shadow-xs sm:h-8 sm:w-8 2xl:h-9 2xl:w-9 sm:text-sm 2xl:text-base"
                  style={{ backgroundColor: s.c }}
                >
                  {s.n}
                </div>
                <div className="min-w-0 pr-1">
                  <p
                    className={`text-xs leading-tight font-bold sm:text-sm 2xl:text-base ${s.titleColor}`}
                  >
                    {s.t}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-xs 2xl:text-sm">
                    {s.d}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 md:block">{s.card}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.2, duration: 0.4 }}
          className="flex flex-col justify-center lg:col-span-5 lg:pl-2 2xl:pl-4"
        >
          <h2 className="text-2xl leading-[1.12] font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.2rem] 2xl:text-[2.6rem]">
            Smarter Hiring
            <br />
            Starts Here
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-500 sm:text-sm 2xl:text-base">
            Post any job in under 1 minute. For every job you post, someone
            swipes in seconds.
          </p>

          <p className="mt-5 2xl:mt-6 mb-2 text-xs font-bold text-slate-900 sm:text-sm 2xl:text-base">
            Mobile number
          </p>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-300/90 bg-white px-4 py-3 2xl:py-3.5">
            <span className="flex shrink-0 items-center gap-1.5 text-sm 2xl:text-base font-bold text-slate-900">
              <span className="text-base 2xl:text-lg" aria-hidden>
                🇮🇳
              </span>{" "}
              +91
            </span>
            <span className="h-5 w-px shrink-0 bg-slate-300" />
            <span className="flex gap-0.5 text-sm 2xl:text-base font-bold tracking-wide text-slate-900">
              {digits.map((d, i) => (
                <motion.span
                  key={i}
                  initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.35 + i * 0.04,
                    duration: 0.2,
                  }}
                >
                  {d}
                </motion.span>
              ))}
            </span>
            <ShieldCheck
              className="ml-auto h-5 w-5 2xl:h-6 2xl:w-6 shrink-0 text-emerald-500"
              strokeWidth={2.4}
              aria-hidden
            />
          </div>

          <motion.button
            type="button"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.75 }}
            className="mt-3.5 2xl:mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 2xl:py-4 text-sm 2xl:text-base font-bold text-white shadow-md transition-colors hover:bg-brand-600 cursor-pointer"
            aria-label="Send OTP"
            tabIndex={0}
          >
            Send OTP <span aria-hidden>→</span>
          </motion.button>

          <p className="mt-3 text-[10px] leading-relaxed text-slate-400 sm:text-[11px] 2xl:text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
            and consent to receive job-related updates.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Job Details ---------- */

const DetailsScreen = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-3 sm:p-5 md:p-6 2xl:p-8 text-slate-900">
    <div className="w-full max-w-4xl lg:max-w-5xl 2xl:max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 2xl:p-8 shadow-sm">
      <div className="mb-4 sm:mb-5 2xl:mb-6 flex items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="grid h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs sm:h-11 sm:w-11">
            <Briefcase size={20} className="2xl:h-6 2xl:w-6" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl 2xl:text-2xl">
              Job Information
            </p>
            <p className="text-xs text-slate-500 sm:text-sm 2xl:text-base">
              Core details candidates see first — title, location, type & salary.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3 py-1.5 text-xs font-bold text-brand-700 sm:px-4 sm:py-2 sm:text-sm 2xl:text-base shadow-2xs">
          <span className="grid h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
          <span>Step 1 of 4</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3.5 md:gap-y-4 2xl:gap-y-5 2xl:gap-x-6">
        <Field
          label="Job Title / Designation"
          required
          value="Software Developer"
          icon={Briefcase}
          delay={0.05}
          reducedMotion={reducedMotion}
        />
        <Field
          label="Job Role / Category"
          required
          value="IT / Software — Software Developer"
          icon={LayoutGrid}
          delay={0.1}
          dropdown
          reducedMotion={reducedMotion}
        />
        <Field
          label="Total Vacancies"
          value="10"
          icon={Users}
          delay={0.15}
          reducedMotion={reducedMotion}
        />
        <Field
          label="Job Location (City)"
          required
          value="Noida"
          icon={MapPin}
          delay={0.2}
          dropdown
          reducedMotion={reducedMotion}
        />
        <Field
          label="Salary Range (Monthly)"
          required
          value="₹30k – ₹50k"
          icon={IndianRupee}
          delay={0.25}
          dropdown
          hint="Set Custom Range"
          reducedMotion={reducedMotion}
        />
        <div>
          <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px] 2xl:text-sm">
            Job Type
          </p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 sm:gap-2.5"
          >
            <Chip on>Full-time</Chip>
            <Chip>Part-time</Chip>
          </motion.div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px] 2xl:text-sm">
            Work Mode
          </p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-2 sm:gap-2.5"
          >
            <Chip on>Work from Office</Chip>
            <Chip>Field Job</Chip>
            <Chip>Work from Home</Chip>
          </motion.div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px] 2xl:text-sm">
            Work Shift
          </p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 sm:gap-2.5"
          >
            <Chip on>Day Shift</Chip>
            <Chip>Night Shift</Chip>
            <Chip>Hybrid</Chip>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
)

/* ---------- Requirements ---------- */

const RequirementsScreen = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const lines = [
    {
      h: "Required Qualifications",
      t: "Bachelor's degree in Computer Science or related field.",
    },
    {
      h: "Experience Requirements",
      t: "2–5 years building production-grade apps in Java / Python.",
    },
    {
      h: "Benefits",
      t: "Competitive salary, health insurance, paid time off & learning budget.",
    },
  ]

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-3 sm:p-5 md:p-6 2xl:p-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl lg:max-w-5xl 2xl:max-w-6xl flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 2xl:p-8 shadow-sm">
        <div className="mb-4 sm:mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs sm:h-11 sm:w-11">
              <FileText size={18} className="2xl:h-5 2xl:w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl 2xl:text-2xl">
                Candidate Requirements
              </p>
              <p className="text-xs text-slate-500 sm:text-sm 2xl:text-base">
                AI draft, then fine-tune
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3 py-1.5 text-xs font-bold text-brand-700 sm:px-4 sm:py-2 sm:text-sm 2xl:text-base shadow-2xs">
              <span className="grid h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <span>Step 2 of 4</span>
            </div>
            <motion.button
              type="button"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs sm:px-4 sm:py-2 sm:text-sm 2xl:text-base cursor-pointer"
              aria-label="Generate with AI"
              tabIndex={0}
            >
              <Wand2 size={14} className="2xl:h-4 2xl:w-4" />
              Generate with AI
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-400 sm:text-sm 2xl:text-base">
            <span>Normal</span>
            <span className="font-bold text-slate-600">B</span>
            <span className="italic">I</span>
            <span className="underline">U</span>
          </div>
          <div className="space-y-4 p-4 sm:p-5 2xl:p-6 text-xs sm:text-sm md:text-base 2xl:text-lg text-slate-600">
            {lines.map((line, i) => (
              <motion.div
                key={line.h}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.4 + i * 0.2,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-sm font-bold text-slate-900 sm:text-base 2xl:text-lg">
                  {line.h}
                </p>
                <p className="mt-1 pl-2 text-xs leading-relaxed text-slate-600 sm:text-sm 2xl:text-base">
                  • {line.t}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Match ---------- */

const MatchScreen = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const opts = [
    {
      t: "Open match",
      d: "More candidates, broader results",
      icon: Users,
      iconColor: "text-purple-600",
      key: "open",
    },
    {
      t: "Smart match",
      d: "Balanced volume and quality",
      icon: Sparkles,
      iconColor: "text-sky-500",
      recommended: true,
      key: "smart",
    },
    {
      t: "Perfect match",
      d: "Highly relevant candidates",
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      key: "perfect",
    },
  ]
  const selected = "smart"

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-3 sm:p-5 md:p-6 2xl:p-8 text-slate-900">
      <div className="w-full max-w-4xl lg:max-w-5xl 2xl:max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 2xl:p-8 shadow-sm">
        {/* Header */}
        <div className="mb-4 sm:mb-5 2xl:mb-6 flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="grid h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white shadow-xs sm:h-11 sm:w-11">
              <Sparkles size={20} className="2xl:h-6 2xl:w-6" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl 2xl:text-2xl">
                Applicant Quality Filter
              </p>
              <p className="text-xs text-slate-500 sm:text-sm 2xl:text-base">
                Hirance scores every candidate on skills, experience &amp; qualifications.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm 2xl:text-base shadow-2xs">
            <span className="grid h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Step 3 of 4</span>
          </div>
        </div>

        {/* Sublabel */}
        <p className="mb-3 text-xs font-semibold text-slate-700 sm:text-sm 2xl:text-base">
          Select matching type
        </p>

        {/* Horizontal 3 Cards */}
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5 2xl:gap-6"
          role="radiogroup"
          aria-label="Match type"
        >
          {opts.map((o, i) => {
            const on = o.key === selected
            const Icon = o.icon
            return (
              <motion.div
                key={o.key}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.08 + i * 0.1,
                  duration: 0.35,
                }}
                className={`relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 2xl:p-6 transition-all ${
                  on
                    ? "border-2 border-brand-500 bg-white shadow-xs"
                    : "border border-slate-200 bg-white hover:border-slate-300"
                }`}
                role="radio"
                aria-checked={on}
                tabIndex={0}
                aria-label={o.t}
              >
                {o.recommended && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-[9px] 2xl:text-[10px] font-black uppercase tracking-wider text-white shadow-xs">
                    RECOMMENDED
                  </span>
                )}

                <div className="flex items-center justify-between gap-2">
                  <Icon size={20} className={`${o.iconColor} 2xl:h-6 2xl:w-6`} />
                  <span
                    className={`grid h-4.5 w-4.5 2xl:h-5 2xl:w-5 shrink-0 place-items-center rounded-full ${
                      on
                        ? "border-2 border-brand-600 bg-brand-600"
                        : "border-2 border-slate-200"
                    }`}
                  >
                    {on && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                </div>

                <div className="mt-4 2xl:mt-5">
                  <p
                    className={`text-sm font-bold sm:text-base 2xl:text-lg ${
                      on ? "text-brand-600" : "text-slate-900"
                    }`}
                  >
                    {o.t}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm 2xl:text-base text-slate-500">{o.d}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Info Banner */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-5 flex items-center gap-2.5 rounded-xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-xs sm:text-sm 2xl:text-base text-sky-800"
        >
          <Sparkles size={16} className="shrink-0 text-sky-600 2xl:h-5 2xl:w-5" />
          <p className="font-medium">
            Balanced volume and quality. Suitable for most roles.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Publish ---------- */

const PublishScreen = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden bg-slate-50 p-2.5 sm:p-3.5 md:p-4 text-slate-900">
      {/* Background Job Preview (Exact Hirance Preview & Post Screen) */}
      <div className="pointer-events-none absolute inset-0 overflow-y-auto p-2.5 sm:p-3.5 md:p-4 opacity-40 select-none">
        <div className="mx-auto max-w-5xl 2xl:max-w-6xl space-y-2.5">
          {/* Top 2 Cards: Job Details & Candidate Requirements */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {/* Job Details Card */}
            <div className="rounded-2xl border border-slate-200 border-t-2 border-t-blue-500 bg-white p-3.5 shadow-xs">
              <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Briefcase size={13} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-900">
                    Job Details
                  </span>
                </div>
                <Pencil size={11} className="text-blue-500" />
              </div>
              <div className="space-y-1 text-[10px] sm:text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Job Title / Designation</span>
                  <span className="font-bold text-slate-800">
                    Software Developer
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Job Role</span>
                  <span className="font-semibold text-slate-700">
                    IT / Software
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Vacancies</span>
                  <span className="font-semibold text-slate-700">10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Job City</span>
                  <span className="font-semibold text-slate-700">Noida</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Salary Range (Monthly)</span>
                  <span className="font-semibold text-slate-700">₹30k–₹50k</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Application Deadline</span>
                  <span className="font-semibold text-slate-700">Sep 23, 2026</span>
                </div>
                <div className="pt-0.5 flex items-center justify-between">
                  <span className="text-slate-500">Job Preferences</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                      Full-time
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                      Work from Office
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                      Day Shift
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Requirements Card */}
            <div className="rounded-2xl border border-slate-200 border-t-2 border-t-purple-500 bg-white p-3.5 shadow-xs">
              <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-purple-500" />
                  <span className="text-xs font-bold text-slate-900">
                    Candidate Requirements
                  </span>
                </div>
                <Pencil size={11} className="text-purple-500" />
              </div>
              <div className="space-y-1 text-[10px] sm:text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Skills</span>
                  <div className="flex items-center gap-1">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                      Java | Python
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                      +4 more
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Education</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                    Undergraduate / B.Tech
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-semibold text-slate-700">
                    Experienced (Min: 2–5 Years)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">English Fluency</span>
                  <span className="font-semibold text-slate-700">Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Walk-in Interview</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                    No
                  </span>
                </div>
                <div className="pt-0.5">
                  <span className="text-slate-500 text-[10px]">Job Description</span>
                  <div className="mt-0.5 rounded border border-slate-100 bg-slate-50/80 p-1 text-[9px] leading-relaxed text-slate-600">
                    We are hiring a Software Developer to join our Engineering team. Build scalable services, APIs & apps. <span className="font-semibold text-brand-600">See all</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Applicant Quality Filter & Confirmation */}
          <div className="rounded-2xl border border-slate-200 border-t-2 border-t-emerald-500 bg-white p-3.5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-900">
                  Applicant Quality Filter
                </span>
              </div>
              <Pencil size={11} className="text-emerald-500" />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                <Sparkles size={12} className="text-sky-500" />
                <span>Smart Match</span>
              </div>
              <span className="rounded border border-sky-100 bg-sky-50 px-2 py-0.5 text-[9px] font-medium text-sky-700">
                Balanced volume and quality. Suitable for most roles.
              </span>
            </div>

            <div className="space-y-1 border-t border-slate-100 pt-1.5">
              <div className="flex items-start gap-1.5 rounded-lg bg-blue-50/60 p-1.5 text-[9px] leading-snug text-slate-700">
                <span className="mt-0.5 grid h-3 w-3 shrink-0 place-items-center rounded-full border-2 border-brand-600 bg-brand-600">
                  <span className="h-0.5 w-0.5 rounded-full bg-white" />
                </span>
                <span>
                  I confirm that this job is completely <strong className="text-brand-700">FREE</strong> for candidates, and no application fee, registration fee, or deposit will be charged.
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-1.5 text-[9px] text-slate-400">
                <span className="h-3 w-3 shrink-0 rounded-full border-2 border-slate-300" />
                <span>Yes, candidates may be <strong className="text-amber-600">required to pay</strong>.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Modal Popup with subtle backdrop */}
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1.5px]" />

      <motion.div
        initial={
          reducedMotion ? false : { opacity: 0, y: 14, scale: 0.97 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 24 }
        }
        className="relative z-10 w-full max-w-md 2xl:max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6 2xl:p-7"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-slate-900 sm:text-xl 2xl:text-2xl">
              Publish this job?
            </p>
            <p className="mt-0.5 text-xs 2xl:text-sm text-slate-500">
              Your listing goes live for candidates immediately.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3 py-1.5 text-xs font-bold text-brand-700 sm:text-sm 2xl:text-base shadow-2xs">
            <span className="grid h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span>Step 4 of 4</span>
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-3.5 2xl:p-4">
          <div className="grid h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs">
            <Briefcase size={17} className="2xl:h-5 2xl:w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm 2xl:text-base font-bold text-slate-900">
              Software Developer
            </p>
            <p className="text-xs 2xl:text-sm text-slate-500">Noida · Full-time</p>
            <p className="mt-0.5 text-xs 2xl:text-sm font-semibold text-brand-600">
              Uses 5 of 10 job credits this month
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 2xl:gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-200 py-2.5 2xl:py-3 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            tabIndex={0}
            aria-label="Save as draft"
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 2xl:py-3 text-xs 2xl:text-sm font-semibold text-white hover:bg-brand-700 shadow-xs transition-colors cursor-pointer"
            tabIndex={0}
            aria-label="Publish job"
          >
            <Send size={13} className="2xl:h-4 2xl:w-4" /> Publish Job
          </button>
        </div>
      </motion.div>
    </div>
)

/* ---------- App shell (dashboard / manage) ---------- */

const AppSidebar = ({
  active,
}: {
  active: "dashboard" | "jobs" | "matches"
}) => (
  <aside className="hidden w-[140px] shrink-0 flex-col border-r border-slate-200 bg-white p-2.5 sm:flex lg:w-[155px] 2xl:w-[180px] 2xl:p-3.5">
    <div className="mb-3 flex items-center gap-2 px-1">
      <Image
        src="/images/icon.png"
        alt="Hirance Icon"
        width={24}
        height={24}
        className="h-5 w-auto shrink-0 object-contain"
      />
      <Image
        src="/images/wordmark-navy.png"
        alt="Hirance"
        width={80}
        height={18}
        className="h-3.5 w-auto shrink-0 object-contain"
      />
    </div>
    <nav className="flex flex-1 flex-col gap-0.5 2xl:gap-1 text-[11px] sm:text-xs 2xl:text-sm font-medium">
      {[
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        { id: "jobs", label: "Jobs", icon: Briefcase },
        { id: "matches", label: "Matches", icon: Heart },
        { id: "messages", label: "Messages", icon: MessageSquare },
      ].map((item) => {
        const on = item.id === active
        const Icon = item.icon
        return (
          <div
            key={item.id}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 2xl:py-2 transition-colors ${
              on
                ? "bg-brand-50 font-semibold text-brand-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon size={13} className="2xl:h-4 2xl:w-4" />
            {item.label}
          </div>
        )
      })}
    </nav>
    <div className="mt-auto pt-1.5">
      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 2xl:py-2 text-[11px] sm:text-xs 2xl:text-sm text-slate-500 hover:text-slate-700 cursor-pointer">
        <Settings size={13} className="2xl:h-4 2xl:w-4" /> Settings
      </div>
    </div>
  </aside>
)

const AppHeader = ({
  title,
  showCreateMenu,
}: {
  title: string
  showCreateMenu?: boolean
}) => (
  <header className="relative flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-1.5 sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5">
    <p className="truncate text-xs sm:text-sm 2xl:text-base font-bold text-slate-900">{title}</p>
    <div className="flex items-center gap-1.5 sm:gap-2 2xl:gap-3">
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-1 2xl:gap-1.5 rounded-lg bg-brand-600 px-2 py-1 sm:px-2.5 sm:py-1.5 2xl:px-3.5 2xl:py-2 text-[10px] sm:text-[11px] 2xl:text-xs font-semibold text-white hover:bg-brand-700 transition-colors cursor-pointer"
          aria-label="Create Job"
          tabIndex={0}
        >
          <Plus size={12} className="2xl:h-3.5 2xl:w-3.5" /> Create Job
        </button>
        {showCreateMenu && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-full right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-3 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Plus size={14} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Start from scratch
                </p>
                <p className="text-[10px] text-slate-500">Blank form</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
                <FileText size={13} />
              </span>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  Use template
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-semibold text-brand-700">
                    <Zap size={8} /> Save 80%
                  </span>
                </p>
                <p className="text-[10px] text-slate-500">Hire faster</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <span className="relative grid h-7 w-7 2xl:h-8 2xl:w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
        <Bell size={12} className="2xl:h-3.5 2xl:w-3.5" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3 min-w-3 2xl:h-3.5 2xl:min-w-3.5 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[7px] 2xl:text-[8px] font-bold text-white">
          9
        </span>
      </span>
      <span className="grid h-7 w-7 2xl:h-8 2xl:w-8 place-items-center rounded-full bg-brand-600 text-[9px] 2xl:text-[11px] font-bold text-white">
        KL
      </span>
    </div>
  </header>
)

/* ---------- Dashboard (screenshot 2) ---------- */

const DashboardScreen = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const metrics = [
    {
      label: "Active Jobs",
      value: "7",
      hint: "+7 jobs this period",
      hintColor: "text-emerald-600",
      icon: Briefcase,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Candidates",
      value: "37",
      hint: "+100% vs last period",
      hintColor: "text-emerald-600",
      icon: Users,
      iconBg: "bg-sky-50 text-sky-600",
    },
    {
      label: "Shortlisted",
      value: "4",
      hint: "All-time snapshot",
      hintColor: "text-slate-400",
      icon: Star,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      label: "Interviews",
      value: "5",
      hint: "All-time snapshot",
      hintColor: "text-slate-400",
      icon: Calendar,
      iconBg: "bg-orange-50 text-orange-600",
    },
    {
      label: "Positions Filled",
      value: "4",
      hint: "All-time snapshot",
      hintColor: "text-slate-400",
      icon: Check,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ]

  const funnel = [
    { l: "Matches", n: 37, w: 100, c: "#2563EB" },
    { l: "Reviewed", n: 30, w: 81, c: "#7C3AED" },
    { l: "Shortlisted", n: 13, w: 35, c: "#F59E0B" },
    { l: "Interviewed", n: 9, w: 24, c: "#EF4444" },
    { l: "Selected", n: 4, w: 11, c: "#16A34A" },
  ]

  const performanceJobs = [
    {
      title: "Software Developer",
      meta: "Noida · Full-time",
      status: "Active",
      apps: 18,
      shortlisted: 7,
      daysLeft: "24d left",
    },
    {
      title: "Senior Backend Engineer",
      meta: "Bengaluru · Hybrid",
      status: "Active",
      apps: 12,
      shortlisted: 5,
      daysLeft: "19d left",
    },
    {
      title: "Generative AI Engineer",
      meta: "Noida · Office",
      status: "Active",
      apps: 7,
      shortlisted: 2,
      daysLeft: "15d left",
    },
  ]

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 text-slate-900">
      <AppSidebar active="dashboard" />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AppHeader title="Welcome, kodees labs" />
        <div className="flex-1 min-h-0 overflow-hidden p-2 sm:p-2.5 md:p-3 2xl:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between shrink-0 mb-0.5">
            <p className="text-[11px] sm:text-xs 2xl:text-sm font-bold text-slate-900">
              Real-time Hiring Analytics
            </p>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {["7D", "30D", "90D"].map((d) => (
                <span
                  key={d}
                  className={`rounded px-1.5 py-0.5 text-[9px] sm:text-[10px] 2xl:text-xs font-semibold ${
                    d === "30D"
                      ? "bg-brand-600 text-white"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {d}
                </span>
              ))}
              <RefreshCw size={10} className="ml-0.5 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5 sm:gap-2 2xl:gap-3 shrink-0">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.05 + i * 0.05 }}
                  className="rounded-lg sm:rounded-xl border border-slate-200 bg-white p-1.5 sm:p-2 2xl:p-2.5 shadow-2xs"
                >
                  <div className="mb-0.5 flex items-center justify-between">
                    <p className="text-[9px] sm:text-[10px] 2xl:text-xs font-medium text-slate-500 truncate">
                      {m.label}
                    </p>
                    <span
                      className={`grid h-4.5 w-4.5 2xl:h-5 2xl:w-5 place-items-center rounded ${m.iconBg}`}
                    >
                      <Icon size={10} className="2xl:h-3 2xl:w-3" />
                    </span>
                  </div>
                  <p className="text-base sm:text-lg 2xl:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                    {m.value}
                  </p>
                  <p className={`text-[8px] sm:text-[9px] 2xl:text-[10px] font-medium ${m.hintColor} truncate`}>
                    {m.hint}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="flex-1 min-h-0 grid gap-1.5 sm:grid-cols-2 sm:gap-2 2xl:gap-3 my-0.5">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-between rounded-lg sm:rounded-xl border border-slate-200 bg-white p-2 sm:p-2.5 2xl:p-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] sm:text-xs 2xl:text-sm font-bold text-slate-900">
                    Publish Milestone
                  </p>
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-bold text-emerald-700">
                    Level 1
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] 2xl:text-xs text-slate-500">
                  Publish 20 unique jobs to earn +2 active posts.
                </p>
              </div>

              <div className="relative mx-auto my-0.5 flex h-16 sm:h-18 2xl:h-20 w-36 sm:w-40 2xl:w-44 flex-col items-center justify-end">
                <svg
                  viewBox="0 0 180 100"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="milestoneGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="60%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  {/* Background Track */}
                  <path
                    d="M 24 86 A 66 66 0 0 1 156 86"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 24 86 A 66 66 0 0 1 156 86"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />
                  {/* Active Progress Arc */}
                  <motion.path
                    d="M 24 86 A 66 66 0 0 1 156 86"
                    fill="none"
                    stroke="url(#milestoneGaugeGrad)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray="207.35"
                    initial={{ strokeDashoffset: 207.35 }}
                    animate={{ strokeDashoffset: reducedMotion ? 207.35 * 0.75 : 207.35 * 0.75 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Milestone Marker Dot */}
                  <circle
                    cx="48"
                    cy="40"
                    r="4.5"
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="relative z-10 mb-0.5 text-center">
                  <p className="text-sm sm:text-base 2xl:text-lg font-black text-slate-900 leading-none">
                    2 / 20
                  </p>
                  <p className="mt-0.5 text-[8.5px] sm:text-[9px] font-semibold text-brand-600">
                    Getting started
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-1 text-[8.5px] sm:text-[9px] text-slate-500">
                <span>Reward: <strong className="font-semibold text-emerald-600">+2 Active</strong></span>
                <span className="font-semibold text-slate-400">18 more</span>
              </div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col justify-between rounded-lg sm:rounded-xl border border-slate-200 bg-white p-2 sm:p-2.5 2xl:p-3 shadow-2xs"
            >
              <p className="text-[11px] sm:text-xs 2xl:text-sm font-bold text-slate-900">
                Hiring Funnel
              </p>
              <div className="space-y-0.5 sm:space-y-1 flex-1 flex flex-col justify-center my-0.5">
                {funnel.map((f, i) => (
                  <div key={f.l} className="flex items-center gap-1.5">
                    <span className="w-14 sm:w-16 2xl:w-18 shrink-0 text-[9px] sm:text-[10px] 2xl:text-xs font-medium text-slate-600">
                      {f.l}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: reducedMotion ? `${f.w}%` : 0 }}
                        animate={{ width: `${f.w}%` }}
                        transition={{
                          delay: reducedMotion ? 0 : 0.4 + i * 0.07,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full rounded-full"
                        style={{ background: f.c }}
                      />
                    </div>
                    <span className="w-4 sm:w-5 text-right text-[9px] sm:text-[10px] font-semibold text-slate-500">
                      {f.n}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-2 text-[8px] sm:text-[8.5px] 2xl:text-[9.5px] text-slate-400">
                <span>81% Reviewed</span>
                <span>35% Shortlisted</span>
                <span>24% Interviewed</span>
              </div>
            </motion.div>
          </div>

          <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-white p-1.5 sm:p-2 2xl:p-2.5 shadow-2xs shrink-0">
            <div className="mb-0.5 flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs 2xl:text-sm font-bold text-slate-900 leading-tight">
                  Job Performance
                </p>
              </div>
              <span className="rounded-full border border-slate-200 px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-semibold text-slate-600">
                7 Active Jobs
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-[9px] sm:text-[9.5px] 2xl:text-[11px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="pb-0.5 font-medium">Job Title</th>
                    <th className="pb-0.5 font-medium">Status</th>
                    <th className="pb-0.5 font-medium">Apps</th>
                    <th className="pb-0.5 font-medium">Shortlisted</th>
                    <th className="pb-0.5 font-medium text-right">Days Left</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {performanceJobs.map((j) => (
                    <tr
                      key={j.title}
                      className="text-slate-700 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-0.5">
                        <span className="font-semibold text-slate-900">
                          {j.title}
                        </span>
                        <span className="ml-1 text-[8.5px] text-slate-400">
                          {j.meta}
                        </span>
                      </td>
                      <td className="py-0.5">
                        <span className="inline-flex items-center gap-0.5 font-medium text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {j.status}
                        </span>
                      </td>
                      <td className="py-0.5 font-semibold text-slate-800">
                        {j.apps}
                      </td>
                      <td className="py-0.5 font-semibold text-slate-800">
                        {j.shortlisted}
                      </td>
                      <td className="py-0.5 text-right font-medium text-slate-500">
                        {j.daysLeft}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Candidate Matches ---------- */

const CANDIDATES = [
  {
    id: 1,
    name: "Saumya Gupta",
    verified: true,
    initials: "SG",
    avatarBg: "bg-indigo-600 text-white",
    location: "Lucknow, UP",
    match: 94,
    matchBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    role: "Generative AI Engineer",
    exp: "3.5 Yrs Exp",
    notice: "Immediate Joiner",
    summary: "Built multi-agent RAG pipelines & fine-tuned LLaMA 3 models.",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    statusDot: "bg-emerald-500",
    applied: "2h ago",
    skills: ["Python", "PyTorch", "LLMs", "+4 more"],
  },
  {
    id: 2,
    name: "Amit Verma",
    verified: true,
    initials: "AV",
    avatarBg: "bg-amber-600 text-white",
    location: "Noida, UP",
    match: 88,
    matchBg: "bg-brand-50 text-brand-700 border-brand-200",
    role: "Full Stack Developer",
    exp: "Fresher · '24",
    notice: "15 Days Notice",
    summary: "Strong portfolio in Next.js 15, PostgreSQL & Tailwind CSS.",
    status: "In Review",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    statusDot: "bg-amber-500",
    applied: "4h ago",
    skills: ["React", "Node.js", "TypeScript", "+6 more"],
  },
  {
    id: 3,
    name: "Yash Kumar",
    verified: false,
    initials: "YK",
    avatarBg: "bg-purple-600 text-white",
    location: "Bareilly, UP",
    match: 82,
    matchBg: "bg-brand-50 text-brand-700 border-brand-200",
    role: "Senior Backend Engineer",
    exp: "4.5 Yrs Exp",
    notice: "30 Days Notice",
    summary: "Architected high-throughput microservices handling 50k RPS.",
    status: "Interviewed",
    statusColor: "bg-teal-50 text-teal-700 border-teal-200",
    statusDot: "bg-teal-500",
    applied: "1d ago",
    skills: ["Node.js", "PostgreSQL", "Redis", "+7 more"],
  },
  {
    id: 4,
    name: "Deepika Mishra",
    verified: true,
    initials: "DM",
    avatarBg: "bg-rose-500 text-white",
    location: "Chandigarh, PB",
    match: 91,
    matchBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    role: "Senior Backend Engineer",
    exp: "4 Yrs Exp",
    notice: "Immediate Joiner",
    summary: "Expert in Spring Boot, distributed caching & event streaming.",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    statusDot: "bg-emerald-500",
    applied: "1d ago",
    skills: ["Java", "Spring Boot", "Kafka", "+5 more"],
  },
  {
    id: 5,
    name: "Nitin Joshi",
    verified: false,
    initials: "NJ",
    avatarBg: "bg-teal-600 text-white",
    location: "Pune, MH",
    match: 78,
    matchBg: "bg-amber-50 text-amber-700 border-amber-200",
    role: "DevOps & Cloud Engineer",
    exp: "2.5 Yrs Exp",
    notice: "15 Days Notice",
    summary: "Automated multi-region AWS infrastructure with Terraform.",
    status: "Applied",
    statusColor: "bg-sky-50 text-sky-700 border-sky-200",
    statusDot: "bg-sky-500",
    applied: "2d ago",
    skills: ["Docker", "Kubernetes", "AWS", "+4 more"],
  },
  {
    id: 6,
    name: "Priya Singh",
    verified: true,
    initials: "PS",
    avatarBg: "bg-blue-600 text-white",
    location: "Bengaluru, KA",
    match: 96,
    matchBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    role: "QA Automation Lead",
    exp: "5 Yrs Exp",
    notice: "Immediate Joiner",
    summary: "End-to-end test framework architect with 99.8% pass rate.",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    statusDot: "bg-emerald-500",
    applied: "3h ago",
    skills: ["Playwright", "Cypress", "Python", "+7 more"],
  },
]

const MatchesScreen = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="flex h-full w-full overflow-hidden bg-slate-50 text-slate-900">
    <AppSidebar active="matches" />
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <AppHeader title="Candidate Applications" />
      <div className="flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3 md:p-3.5 2xl:p-4 flex flex-col justify-between">
        {/* Filters & Status Tabs */}
        <div className="space-y-1.5 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm 2xl:text-base font-bold text-slate-900">
                  Candidate Applications
                </p>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-semibold text-brand-700 border border-brand-200/60">
                  37 Total
                </span>
              </div>
              <p className="text-[9.5px] sm:text-[10px] 2xl:text-xs text-slate-500">
                AI-ranked applicants matching your role requirements
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[9.5px] sm:text-[10px] 2xl:text-xs font-medium text-slate-600 shadow-2xs">
                <Search size={11} className="text-slate-400" />
                <span className="text-slate-400">Search candidates...</span>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[9.5px] sm:text-[10px] 2xl:text-xs font-semibold text-slate-700 shadow-2xs">
                <span>Match Score</span>
                <ChevronDown size={11} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 border-y border-slate-200/80 py-1 text-[9.5px] sm:text-[10px] 2xl:text-xs">
            <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 font-semibold text-white shadow-2xs">
              All (37)
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 font-medium text-slate-600 hover:border-slate-300 transition-colors cursor-pointer">
              ● Applied (12)
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 font-medium text-slate-600 hover:border-slate-300 transition-colors cursor-pointer">
              ● Shortlisted (13)
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 font-medium text-slate-600 hover:border-slate-300 transition-colors cursor-pointer">
              ● Interview (9)
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 font-medium text-slate-600 hover:border-slate-300 transition-colors cursor-pointer">
              ● Hired (4)
            </span>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2 sm:gap-2.5 2xl:gap-3.5 pt-1.5">
          {CANDIDATES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : 0.05 + i * 0.04,
                duration: 0.35,
              }}
              className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-2.5 sm:p-3 2xl:p-3.5 shadow-2xs hover:border-brand-300 hover:shadow-xs transition-all"
            >
              <div>
                {/* Header: Avatar, Name, Role, Match Score */}
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`relative grid h-7 w-7 sm:h-8 sm:w-8 2xl:h-9 2xl:w-9 shrink-0 place-items-center rounded-lg text-[10px] sm:text-[11px] 2xl:text-xs font-bold ${c.avatarBg} shadow-2xs`}
                    >
                      {c.initials}
                      {c.verified && (
                        <span className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 sm:h-3.5 sm:w-3.5 place-items-center rounded-full bg-brand-600 text-[7px] sm:text-[8px] font-bold text-white ring-1 ring-white">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs sm:text-[13px] 2xl:text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {c.name}
                      </p>
                      <p className="truncate text-[10px] sm:text-[11px] 2xl:text-xs font-semibold text-slate-700">
                        {c.role}
                      </p>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div
                    className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] sm:text-[10px] 2xl:text-[11px] font-bold shrink-0 ${c.matchBg}`}
                  >
                    <Sparkles size={10} className="shrink-0" />
                    <span>{c.match}%</span>
                  </div>
                </div>

                {/* Metadata Row: Location, Experience, Notice */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[9px] sm:text-[10px] 2xl:text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin size={10} className="text-slate-400 shrink-0" />
                    {c.location}
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <Briefcase size={10} className="text-slate-400 shrink-0" />
                    {c.exp}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-slate-400">
                    <Clock size={9.5} className="shrink-0" />
                    {c.notice}
                  </span>
                </div>

                {/* Summary Snippet */}
                <p className="mt-1 line-clamp-1 text-[9px] sm:text-[10px] 2xl:text-[11px] text-slate-600 font-normal">
                  {c.summary}
                </p>

                {/* Skills Badges */}
                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  {c.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded border border-slate-200/80 bg-slate-50 px-1.5 py-0.2 text-[8.5px] sm:text-[9px] 2xl:text-[10px] font-medium text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                  {c.skills.length > 3 && (
                    <span className="rounded border border-dashed border-slate-200 bg-white px-1 py-0.2 text-[8.5px] sm:text-[9px] 2xl:text-[10px] font-medium text-slate-400">
                      {c.skills[3]}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.2 text-[8.5px] sm:text-[9px] 2xl:text-[10px] font-semibold ${c.statusColor}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${c.statusDot}`} />
                    {c.status}
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] 2xl:text-[10px] text-slate-400 hidden sm:inline">
                    {c.applied}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="Schedule Interview"
                    className="grid h-5.5 w-5.5 sm:h-6 sm:w-6 2xl:h-7 2xl:w-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition-colors cursor-pointer"
                  >
                    <Calendar size={11} className="2xl:h-3.5 2xl:w-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Send Message"
                    className="grid h-5.5 w-5.5 sm:h-6 sm:w-6 2xl:h-7 2xl:w-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={11} className="2xl:h-3.5 2xl:w-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Shortlist"
                    className="grid h-5.5 w-5.5 sm:h-6 sm:w-6 2xl:h-7 2xl:w-7 place-items-center rounded-md border border-slate-200 bg-white text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <Check size={11} strokeWidth={2.5} className="2xl:h-3.5 2xl:w-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Reject"
                    className="grid h-5.5 w-5.5 sm:h-6 sm:w-6 2xl:h-7 2xl:w-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-400 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X size={11} className="2xl:h-3.5 2xl:w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const SCREENS = [
  SignInScreen,
  DetailsScreen,
  RequirementsScreen,
  MatchScreen,
  PublishScreen,
  MatchesScreen,
  DashboardScreen,
]

interface JobPostDemoProps {
  className?: string
}

export function JobPostDemo({ className }: JobPostDemoProps) {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const reducedMotion = useReducedMotion() ?? false
  const Screen = SCREENS[i]

  const go = useCallback((n: number) => {
    setI((n + STEPS.length) % STEPS.length)
  }, [])

  const handlePrev = () => go(i - 1)
  const handleNext = () => go(i + 1)
  const handleTogglePlay = () => setPlaying((p) => !p)
  const handleGoStep = (idx: number) => go(idx)

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(
      () => setI((v) => (v + 1) % STEPS.length),
      reducedMotion ? 5000 : (STEP_DURATIONS[i] ?? 3800)
    )
    return () => clearTimeout(t)
  }, [i, playing, reducedMotion])

  return (
    <div
      className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-slate-900 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12),0_0_1px_1px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:rounded-2xl ${
        className || ""
      }`}
      data-testid="job-post-demo"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-3 py-1.5 sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5">
        {/* Left: Employer Workspace Identity */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] sm:text-xs 2xl:text-sm font-semibold text-slate-800 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hirance Recruiter</span>
          </div>
          <div className="hidden items-center gap-1 text-[10px] sm:text-[11px] 2xl:text-xs font-medium text-slate-500 sm:flex">
            <Lock size={10} className="text-slate-400" />
            <span>https://employer.hirance.com/</span>
          </div>
        </div>

        {/* Right: Step Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-brand-100 bg-brand-50/80 px-2 py-0.5 text-[10px] sm:text-[11px] 2xl:text-xs font-bold text-brand-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            <span>Step {i + 1} of {STEPS.length}</span>
          </div>
          <span className="hidden text-[11px] sm:text-xs 2xl:text-sm font-semibold text-slate-700 md:inline">
            {STEPS[i].name}
          </span>
        </div>
      </div>

      <div className="h-[2px] w-full shrink-0 overflow-hidden bg-slate-100">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600"
          animate={{ width: `${((i + 1) / STEPS.length) * 100}%` }}
          transition={{
            duration: reducedMotion ? 0 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      <div
        className="relative w-full flex-1 min-h-0 overflow-hidden bg-white"
        data-testid="job-post-demo-stage"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 h-full w-full"
          >
            <Screen reducedMotion={reducedMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 flex-col items-center justify-between gap-1.5 border-t border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex-row sm:gap-2 sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5">
        <p className="max-w-xl truncate text-center text-[11px] sm:text-xs 2xl:text-sm font-medium text-slate-600 sm:text-left">
          {STEPS[i].caption}
        </p>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous step"
            tabIndex={0}
            className="rounded-full border border-slate-200 p-1 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600 cursor-pointer"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={playing ? "Pause demo" : "Play demo"}
            tabIndex={0}
            className="rounded-full bg-brand-600 p-1 text-white transition-transform hover:scale-105 hover:bg-brand-700 cursor-pointer"
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next step"
            tabIndex={0}
            className="rounded-full border border-slate-200 p-1 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600 cursor-pointer"
          >
            <ChevronRight size={13} />
          </button>

          <div className="ml-1 flex items-center gap-1">
            {STEPS.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => handleGoStep(idx)}
                aria-label={s.name}
                aria-current={idx === i ? "step" : undefined}
                tabIndex={0}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === i
                    ? "w-5 bg-brand-600 sm:w-6"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPostDemo
