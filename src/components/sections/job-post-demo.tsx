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
        <div className="flex min-w-[170px] items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:min-w-[190px]">
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
        <div className="flex min-w-[170px] flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:min-w-[190px]">
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
        <div className="flex min-w-[180px] flex-col gap-1.5 rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-sm sm:min-w-[200px] sm:p-3">
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
        <div className="flex min-w-[170px] items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:min-w-[190px]">
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
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white p-3 sm:p-5 lg:p-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-3.5 sm:gap-4 lg:col-span-7">
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
              className="flex items-center justify-between gap-3"
            >
              <div className="relative flex min-w-0 flex-1 items-start gap-3">
                {idx < journey.length - 1 && (
                  <div className="absolute top-8 bottom-[-18px] left-3.5 z-0 w-px bg-slate-200 sm:left-4" />
                )}
                <div
                  className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white shadow-xs sm:h-8 sm:w-8 sm:text-sm"
                  style={{ backgroundColor: s.c }}
                >
                  {s.n}
                </div>
                <div className="min-w-0 pr-1">
                  <p
                    className={`text-xs leading-tight font-bold sm:text-sm ${s.titleColor}`}
                  >
                    {s.t}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-xs">
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
          className="flex flex-col justify-center lg:col-span-5 lg:pl-2"
        >
          <h2 className="text-2xl leading-[1.12] font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.4rem]">
            Smarter Hiring
            <br />
            Starts Here
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Post any job in under 1 minute. For every job you post, someone
            swipes in seconds.
          </p>

          <p className="mt-5 mb-2 text-xs font-bold text-slate-900 sm:text-sm">
            Mobile number
          </p>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-300/90 bg-white px-4 py-3">
            <span className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-slate-900">
              <span className="text-base" aria-hidden>
                🇮🇳
              </span>{" "}
              +91
            </span>
            <span className="h-5 w-px shrink-0 bg-slate-300" />
            <span className="flex gap-0.5 text-sm font-bold tracking-wide text-slate-900">
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
              className="ml-auto h-5 w-5 shrink-0 text-emerald-500"
              strokeWidth={2.4}
              aria-hidden
            />
          </div>

          <motion.button
            type="button"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.75 }}
            className="mt-3.5 flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-600"
            aria-label="Send OTP"
            tabIndex={0}
          >
            Send OTP <span aria-hidden>→</span>
          </motion.button>

          <p className="mt-3 text-[10px] leading-relaxed text-slate-400 sm:text-[11px]">
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
  <div className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-4 sm:p-6 md:p-8 text-slate-900">
    <div className="w-full max-w-5xl xl:max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-sm">
      <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs sm:h-12 sm:w-12">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl">
              Job Information
            </p>
            <p className="text-xs text-slate-500 sm:text-sm">
              Core details candidates see first — title, location, type & salary.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-bold text-brand-700 sm:px-4 sm:py-2 sm:text-sm shadow-2xs">
          <span className="grid h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
          <span>Step 1 of 4</span>
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 md:gap-y-5">
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
          <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px]">
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
          <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px]">
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
          <p className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-[13px]">
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
    <div className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-4 sm:p-6 md:p-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl xl:max-w-6xl flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-sm">
        <div className="mb-4 sm:mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs sm:h-12 sm:w-12">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl">
                Candidate Requirements
              </p>
              <p className="text-xs text-slate-500 sm:text-sm">
                AI draft, then fine-tune
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-bold text-brand-700 sm:px-4 sm:py-2 sm:text-sm shadow-2xs">
              <span className="grid h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <span>Step 2 of 4</span>
            </div>
            <motion.button
              type="button"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs sm:px-4 sm:py-2.5 sm:text-sm"
              aria-label="Generate with AI"
              tabIndex={0}
            >
              <Wand2 size={14} />
              Generate with AI
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-400 sm:text-sm">
            <span>Normal</span>
            <span className="font-bold text-slate-600">B</span>
            <span className="italic">I</span>
            <span className="underline">U</span>
          </div>
          <div className="space-y-4 p-4 sm:p-5 text-xs sm:text-sm md:text-base text-slate-600">
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
                <p className="text-sm font-bold text-slate-900 sm:text-base">
                  {line.h}
                </p>
                <p className="mt-1 pl-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
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
    <div className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-4 sm:p-6 md:p-8 text-slate-900">
      <div className="w-full max-w-5xl xl:max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-sm">
        {/* Header */}
        <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white shadow-xs sm:h-12 sm:w-12">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl">
                Applicant Quality Filter
              </p>
              <p className="text-xs text-slate-500 sm:text-sm">
                Hirance scores every candidate on skills, experience &amp; qualifications.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm shadow-2xs">
            <span className="grid h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Step 3 of 4</span>
          </div>
        </div>

        {/* Sublabel */}
        <p className="mb-3.5 text-xs font-semibold text-slate-700 sm:text-sm">
          Select matching type
        </p>

        {/* Horizontal 3 Cards */}
        <div
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:gap-5"
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
                className={`relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all ${
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
                  <span className="absolute -top-2.5 left-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
                    RECOMMENDED
                  </span>
                )}

                <div className="flex items-center justify-between gap-2">
                  <Icon size={20} className={o.iconColor} />
                  <span
                    className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full ${
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

                <div className="mt-4">
                  <p
                    className={`text-sm font-bold sm:text-base ${
                      on ? "text-brand-600" : "text-slate-900"
                    }`}
                  >
                    {o.t}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">{o.d}</p>
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
          className="mt-4 sm:mt-5 flex items-center gap-2.5 rounded-xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-xs sm:text-sm text-sky-800"
        >
          <Sparkles size={16} className="shrink-0 text-sky-600" />
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
        <div className="mx-auto max-w-5xl space-y-2.5">
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
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-slate-900 sm:text-xl">
              Publish this job?
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Your listing goes live for candidates immediately.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-bold text-brand-700 sm:text-sm shadow-2xs">
            <span className="grid h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span>Step 4 of 4</span>
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-3.5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs">
            <Briefcase size={17} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              Software Developer
            </p>
            <p className="text-xs text-slate-500">Noida · Full-time</p>
            <p className="mt-0.5 text-xs font-semibold text-brand-600">
              Uses 5 of 10 job credits this month
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            className="rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            tabIndex={0}
            aria-label="Save as draft"
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-xs font-semibold text-white hover:bg-brand-700 shadow-xs transition-colors"
            tabIndex={0}
            aria-label="Publish job"
          >
            <Send size={13} /> Publish Job
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
  <aside className="hidden w-[148px] shrink-0 flex-col border-r border-slate-200 bg-white p-3 sm:flex lg:w-[168px]">
    <div className="mb-4 flex items-center gap-2 px-1">
      <Image
        src="/images/icon.png"
        alt="Hirance Icon"
        width={26}
        height={26}
        className="h-6 w-auto shrink-0 object-contain"
      />
      <Image
        src="/images/wordmark-navy.png"
        alt="Hirance"
        width={85}
        height={20}
        className="h-4 w-auto shrink-0 object-contain"
      />
    </div>
    <nav className="flex flex-1 flex-col gap-0.5 text-xs font-medium">
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
            className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${
              on
                ? "bg-brand-50 font-semibold text-brand-700"
                : "text-slate-600"
            }`}
          >
            <Icon size={14} />
            {item.label}
          </div>
        )
      })}
    </nav>
    <div className="mt-auto pt-2">
      <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-slate-500 hover:text-slate-700">
        <Settings size={14} /> Settings
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
  <header className="relative flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2.5 sm:px-4">
    <p className="truncate text-sm font-bold text-slate-900">{title}</p>
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1.5 text-[11px] font-semibold text-white"
          aria-label="Create Job"
          tabIndex={0}
        >
          <Plus size={13} /> Create Job
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
      <span className="relative grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
        <Bell size={14} />
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[8px] font-bold text-white">
          9
        </span>
      </span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
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
    <div className="flex h-full overflow-hidden bg-slate-50 text-slate-900">
      <AppSidebar active="dashboard" />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title="Welcome, kodees labs" />
        <div className="flex-1 overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900 sm:text-sm">
              Real-time Hiring Analytics
            </p>
            <div className="flex items-center gap-1.5">
              {["7D", "30D", "90D"].map((d) => (
                <span
                  key={d}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                    d === "30D"
                      ? "bg-brand-600 text-white"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {d}
                </span>
              ))}
              <RefreshCw size={11} className="ml-1 text-slate-400" />
            </div>
          </div>

          <div className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.05 + i * 0.05 }}
                  className="rounded-xl border border-slate-200 bg-white p-2 sm:p-2.5 shadow-xs"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-medium text-slate-500">
                      {m.label}
                    </p>
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-lg ${m.iconBg}`}
                    >
                      <Icon size={11} />
                    </span>
                  </div>
                  <p className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    {m.value}
                  </p>
                  <p className={`mt-0.5 text-[9px] font-medium ${m.hintColor}`}>
                    {m.hint}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="mb-2 grid gap-2 sm:grid-cols-2">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">
                    Publish Milestone
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                    Level 1
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Publish 20 unique jobs to earn +2 active posts for 30 days.
                </p>
              </div>

              <div className="relative mx-auto my-0.5 flex h-20 w-44 flex-col items-center justify-end">
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
                    r="5"
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </svg>
                <div className="relative z-10 mb-0.5 text-center">
                  <p className="text-lg font-black text-slate-900 leading-none">
                    2 / 20
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold text-brand-600">
                    Getting started
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-1 text-[9px] text-slate-500">
                <span>Reward: <strong className="font-semibold text-emerald-600">+2 Active Posts</strong></span>
                <span className="font-semibold text-slate-400">18 more to unlock</span>
              </div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-xs"
            >
              <p className="mb-1.5 text-xs font-bold text-slate-900">
                Hiring Funnel
              </p>
              <div className="space-y-1">
                {funnel.map((f, i) => (
                  <div key={f.l} className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-[10px] font-medium text-slate-600">
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
                    <span className="w-5 text-right text-[10px] font-semibold text-slate-500">
                      {f.n}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-slate-400">
                <span>81% Reviewed</span>
                <span>35% Shortlisted</span>
                <span>24% Interviewed</span>
                <span>11% Selected</span>
              </div>
            </motion.div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-xs">
            <div className="mb-1.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Job Performance
                </p>
                <p className="text-[10px] text-slate-500">
                  Track application progress across active jobs
                </p>
              </div>
              <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                7 Active Jobs
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-[10px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="pb-1 font-medium">Job Title</th>
                    <th className="pb-1 font-medium">Status</th>
                    <th className="pb-1 font-medium">Apps</th>
                    <th className="pb-1 font-medium">Shortlisted</th>
                    <th className="pb-1 font-medium text-right">Days Left</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {performanceJobs.map((j) => (
                    <tr
                      key={j.title}
                      className="text-slate-700 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-1.5">
                        <span className="font-semibold text-slate-900">
                          {j.title}
                        </span>
                        <span className="ml-1.5 text-[9px] text-slate-400">
                          {j.meta}
                        </span>
                      </td>
                      <td className="py-1.5">
                        <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {j.status}
                        </span>
                      </td>
                      <td className="py-1.5 font-semibold text-slate-800">
                        {j.apps}
                      </td>
                      <td className="py-1.5 font-semibold text-slate-800">
                        {j.shortlisted}
                      </td>
                      <td className="py-1.5 text-right font-medium text-slate-500">
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
    avatarBg: "bg-blue-600 text-white",
    location: "Lucknow, Uttar Pradesh",
    match: 94,
    role: "Generative AI Engineer",
    exp: "2–4 Years",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    skills: ["Python", "PyTorch", "LLMs", "+8 more"],
  },
  {
    id: 2,
    name: "Amit Verma",
    verified: false,
    initials: "AV",
    avatarBg: "bg-amber-500 text-white",
    location: "Noida, Uttar Pradesh",
    match: 88,
    role: "Full Stack Developer",
    exp: "Fresher",
    status: "Under Review",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200/70",
    skills: ["React", "Node.js", "TypeScript", "+6 more"],
  },
  {
    id: 3,
    name: "Yash Kumar",
    verified: false,
    initials: "YK",
    avatarBg: "bg-purple-600 text-white",
    location: "Bareilly, Uttar Pradesh",
    match: 82,
    role: "Senior Backend Engineer",
    exp: "3–5 Years",
    status: "Interview Completed",
    statusColor: "bg-teal-50 text-teal-700 border-teal-200/70",
    skills: ["Node.js", "Express.js", "PostgreSQL", "+7 more"],
  },
  {
    id: 4,
    name: "Deepika Mishra",
    verified: true,
    initials: "DM",
    avatarBg: "bg-rose-500 text-white",
    location: "Chandigarh, Punjab",
    match: 91,
    role: "Senior Backend Engineer",
    exp: "2–5 Years",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    skills: ["Java", "Spring Boot", "Microservices", "+5 more"],
  },
  {
    id: 5,
    name: "Nitin Joshi",
    verified: false,
    initials: "NJ",
    avatarBg: "bg-emerald-600 text-white",
    location: "Pune, Maharashtra",
    match: 78,
    role: "DevOps Engineer",
    exp: "1–3 Years",
    status: "Applied",
    statusColor: "bg-sky-50 text-sky-700 border-sky-200/70",
    skills: ["Docker", "Kubernetes", "AWS", "+4 more"],
  },
  {
    id: 6,
    name: "Priya Singh",
    verified: true,
    initials: "PS",
    avatarBg: "bg-indigo-600 text-white",
    location: "Bengaluru, Karnataka",
    match: 96,
    role: "QA Automation Engineer",
    exp: "3–6 Years",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    skills: ["Selenium", "Cypress", "Python", "+7 more"],
  },
]

const MatchRing = ({ score }: { score: number }) => {
  const stroke =
    score >= 90
      ? "#10B981"
      : score >= 80
        ? "#2563EB"
        : score >= 60
          ? "#F59E0B"
          : "#EF4444"
  const textClass =
    score >= 90
      ? "text-emerald-600"
      : score >= 80
        ? "text-brand-600"
        : score >= 60
          ? "text-amber-600"
          : "text-rose-500"

  const radius = 12
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
      <svg className="h-7 w-7 -rotate-90">
        <circle
          cx="14"
          cy="14"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="2.5"
        />
        <circle
          cx="14"
          cy="14"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute text-[8px] font-black ${textClass}`}>
        {score}%
      </span>
    </div>
  )
}

const MatchesScreen = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="flex h-full overflow-hidden bg-slate-50 text-slate-900">
    <AppSidebar active="matches" />
    <div className="flex min-w-0 flex-1 flex-col">
      <AppHeader title="Candidate Applications" />
      <div className="flex-1 overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between">
        {/* Filters & Status Tabs */}
        <div className="mb-3 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                Candidate Applications
              </p>
              <p className="text-[10px] text-slate-500">
                Review and manage AI-ranked candidate applications in real time.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-600">
                <Search size={11} className="text-slate-400" />
                <span className="hidden text-slate-400 sm:inline">
                  Search...
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-700">
                <span>Match Score</span>
                <ChevronDown size={11} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 border-y border-slate-100 py-1.5 text-[10px]">
            <span className="rounded-md bg-brand-600 px-2 py-0.5 font-semibold text-white">
              All 37
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600">
              ● Applied 12
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600">
              ● Shortlisted 13
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600">
              ● Interview 9
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600">
              ● Hired 4
            </span>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {CANDIDATES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : 0.05 + i * 0.05,
                duration: 0.35,
              }}
              className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-3 shadow-xs hover:border-slate-300"
            >
              <div>
                {/* Header: Avatar, Name, Location, Score Ring */}
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ${c.avatarBg}`}
                    >
                      {c.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="truncate text-xs font-bold text-slate-900">
                          {c.name}
                        </p>
                        {c.verified && (
                          <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-brand-600 text-[8px] font-bold text-white">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="flex items-center gap-0.5 truncate text-[10px] text-slate-400">
                        <MapPin size={9} className="shrink-0" />
                        <span className="truncate">{c.location}</span>
                      </p>
                    </div>
                  </div>
                  <MatchRing score={c.match} />
                </div>

                {/* Role and Status */}
                <div className="mt-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Applied For
                  </p>
                  <p className="truncate text-xs font-bold text-slate-800">
                    {c.role}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-medium text-slate-600">
                      <Users size={9} /> {c.exp}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${c.statusColor}`}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Top Skills
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-brand-100 bg-brand-50/60 px-1.5 py-0.5 text-[9px] font-medium text-brand-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                <button
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded-md border border-slate-200 text-emerald-600 transition-colors hover:bg-emerald-50"
                  aria-label="Shortlist candidate"
                  tabIndex={0}
                >
                  <Check size={12} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded-md border border-slate-200 text-amber-600 transition-colors hover:bg-amber-50"
                  aria-label="Under review"
                  tabIndex={0}
                >
                  <Clock size={11} />
                </button>
                <button
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded-md border border-slate-200 text-rose-500 transition-colors hover:bg-rose-50"
                  aria-label="Reject candidate"
                  tabIndex={0}
                >
                  <X size={11} />
                </button>
                <button
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded-md border border-slate-200 text-brand-600 transition-colors hover:bg-brand-50"
                  aria-label="Schedule interview"
                  tabIndex={0}
                >
                  <Calendar size={11} />
                </button>
                <button
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded-md border border-slate-200 text-sky-600 transition-colors hover:bg-sky-50"
                  aria-label="Candidate profile"
                  tabIndex={0}
                >
                  <MessageSquare size={11} />
                </button>
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
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-3.5 py-2 sm:px-5">
        {/* Left: Employer Workspace Identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hirance Recruiter</span>
          </div>
          <div className="hidden items-center gap-1 text-[11px] font-medium text-slate-500 sm:flex">
            <Lock size={11} className="text-slate-400" />
            <span>https://employer.hirance.com/</span>
          </div>
        </div>

        {/* Right: Step Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50/80 px-2.5 py-1 text-[11px] font-bold text-brand-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            <span>Step {i + 1} of {STEPS.length}</span>
          </div>
          <span className="hidden text-xs font-semibold text-slate-700 md:inline">
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
        className="relative w-full flex-1 overflow-hidden bg-white"
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

      <div className="flex shrink-0 flex-col items-center justify-between gap-2.5 border-t border-slate-200 bg-slate-50 px-4 py-2.5 sm:flex-row sm:gap-3 sm:px-5">
        <p className="max-w-lg truncate text-center text-xs font-medium text-slate-600 sm:text-left sm:text-sm">
          {STEPS[i].caption}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous step"
            tabIndex={0}
            className="rounded-full border border-slate-200 p-1.5 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={playing ? "Pause demo" : "Play demo"}
            tabIndex={0}
            className="rounded-full bg-brand-600 p-1.5 text-white transition-transform hover:scale-105 hover:bg-brand-700"
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next step"
            tabIndex={0}
            className="rounded-full border border-slate-200 p-1.5 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600"
          >
            <ChevronRight size={15} />
          </button>

          <div className="ml-1 flex items-center gap-1 sm:gap-1.5">
            {STEPS.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => handleGoStep(idx)}
                aria-label={s.name}
                aria-current={idx === i ? "step" : undefined}
                tabIndex={0}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-6 bg-brand-600 sm:w-7"
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
