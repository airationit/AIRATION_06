"use client"

import React, { useState, useEffect, useCallback } from "react"
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
  Clock,
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
    key: "dashboard",
    name: "Dashboard",
    caption: "Track real-time hiring analytics and your funnel at a glance.",
  },
  {
    key: "manage",
    name: "Manage Jobs",
    caption: "Manage all active, draft and closed listings from one place.",
  },
]

const WIZARD = [
  "Job Details",
  "Candidate Requirements",
  "Match %",
  "Preview & Post",
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
    <p className="mb-1.5 text-[11px] font-semibold text-slate-700">
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </p>
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
    >
      {Icon && <Icon size={15} className="shrink-0 text-slate-400" />}
      <span className="truncate text-sm font-medium text-slate-900">{value}</span>
      {dropdown && (
        <ChevronDown size={14} className="ml-auto shrink-0 text-slate-400" />
      )}
    </motion.div>
    {hint && (
      <p className="mt-1 text-[11px] font-medium text-brand-600">{hint}</p>
    )}
  </div>
)

interface ChipProps {
  children: React.ReactNode
  on?: boolean
}

const Chip = ({ children, on }: ChipProps) => (
  <span
    className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
      on
        ? "border-brand-500 bg-brand-50 text-brand-700"
        : "border-slate-200 bg-white text-slate-600"
    }`}
  >
    {children}
  </span>
)

const WizardChrome = ({
  active,
  reducedMotion,
}: {
  active: number
  reducedMotion: boolean
}) => (
  <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2.5 sm:px-4">
    <div className="flex min-w-0 items-center gap-2">
      <ArrowLeft size={16} className="shrink-0 text-slate-500" aria-hidden />
      <span className="truncate text-xs font-bold text-slate-900 sm:text-sm">
        Post a New Job
      </span>
    </div>

    <div className="hidden items-center gap-1.5 md:flex lg:gap-2">
      {WIZARD.map((w, i) => {
        const done = i < active
        const on = i === active
        return (
          <React.Fragment key={w}>
            <div className="flex items-center gap-1.5">
              <div
                className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
                  done || on
                    ? "bg-brand-600 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {done ? <Check size={10} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-[10px] font-semibold whitespace-nowrap ${
                  on
                    ? "text-brand-600"
                    : done
                      ? "text-slate-700"
                      : "text-slate-400"
                }`}
              >
                {w}
              </span>
            </div>
            {i < WIZARD.length - 1 && (
              <div
                className={`h-px w-4 rounded ${
                  done ? "bg-brand-500" : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>

    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <motion.button
        type="button"
        initial={reducedMotion ? false : { opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center gap-1 rounded-lg bg-brand-600 px-2 py-1.5 text-[10px] font-semibold text-white sm:px-2.5 sm:text-[11px]"
        aria-label="Use template"
        tabIndex={0}
      >
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded bg-amber-400 px-1 text-[8px] font-black text-slate-900">
          FASTER
        </span>
        <FileText size={12} />
        <span className="hidden sm:inline">Use Template</span>
      </motion.button>
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-600 sm:text-[11px]"
        aria-label="Save draft"
        tabIndex={0}
      >
        <Save size={12} />
        <span className="hidden sm:inline">Save Draft</span>
      </button>
      <button
        type="button"
        className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
        aria-label="Close"
        tabIndex={0}
      >
        <X size={16} />
      </button>
    </div>
  </div>
)

const WizardFooter = ({ step }: { step: number }) => (
  <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-4 py-2.5">
    <span className="text-xs font-medium text-slate-400">
      Step {step} of 4
    </span>
    <button
      type="button"
      className="flex items-center gap-1 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white"
      aria-label="Continue"
      tabIndex={0}
    >
      Continue
      <ChevronRight size={14} />
    </button>
  </div>
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

/* ---------- Job Details (screenshot 4 + create-job menu beat) ---------- */

const DetailsScreen = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const [phase, setPhase] = useState<"menu" | "form">(
    reducedMotion ? "form" : "menu"
  )

  useEffect(() => {
    if (reducedMotion) return
    const t = setTimeout(() => setPhase("form"), 1600)
    return () => clearTimeout(t)
  }, [reducedMotion])

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-slate-50 text-slate-900">
      <AnimatePresence mode="wait">
        {phase === "menu" ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col bg-slate-100/80 p-4 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-end gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                aria-label="Create Job"
                tabIndex={0}
              >
                <Plus size={14} /> Create Job
              </button>
              <span className="relative grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
                <Bell size={14} />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </span>
            </div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="ml-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            >
              <button
                type="button"
                className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
                tabIndex={0}
                aria-label="Start from scratch"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Plus size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    Start from scratch
                  </span>
                  <span className="block text-xs text-slate-500">
                    Use our blank form to create your job.
                  </span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-slate-300" />
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
                tabIndex={0}
                aria-label="Use template"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                  <FileText size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      Use template
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                      <Clock size={10} /> Save 80% Time
                    </span>
                  </span>
                  <span className="block text-xs text-slate-500">
                    Hire faster with templates.
                  </span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-slate-300" />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col bg-slate-50"
          >
            <WizardChrome active={0} reducedMotion={reducedMotion} />
            <div className="flex-1 overflow-y-auto p-3 sm:p-5">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Job Information
                    </p>
                    <p className="text-[11px] text-slate-500 sm:text-xs">
                      Core details candidates see first — title, location, type
                      & salary.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
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
                    <p className="mb-1.5 text-[11px] font-semibold text-slate-700">
                      Job Type
                    </p>
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2"
                    >
                      <Chip on>Full-time</Chip>
                      <Chip>Part-time</Chip>
                    </motion.div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold text-slate-700">
                      Work Mode
                    </p>
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="flex flex-wrap gap-2"
                    >
                      <Chip on>Work from Office</Chip>
                      <Chip>Field Job</Chip>
                      <Chip>Work from Home</Chip>
                    </motion.div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold text-slate-700">
                      Work Shift
                    </p>
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-2"
                    >
                      <Chip on>Day Shift</Chip>
                      <Chip>Night Shift</Chip>
                      <Chip>Hybrid</Chip>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <WizardFooter step={1} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
    <div className="flex h-full flex-col bg-slate-50 text-slate-900">
      <WizardChrome active={1} reducedMotion={reducedMotion} />
      <div className="flex flex-1 flex-col overflow-y-auto p-3 sm:p-5">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white">
                <FileText size={14} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Candidate Requirements
                </p>
                <p className="text-[11px] text-slate-500">
                  AI draft, then fine-tune
                </p>
              </div>
            </div>
            <motion.button
              type="button"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white"
              aria-label="Generate with AI"
              tabIndex={0}
            >
              <Wand2 size={13} />
              Generate with AI
            </motion.button>
          </div>

          <div className="flex-1 overflow-hidden rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-400">
              <span>Normal</span>
              <span className="font-bold text-slate-600">B</span>
              <span className="italic">I</span>
              <span className="underline">U</span>
            </div>
            <div className="space-y-3.5 p-4 text-sm text-slate-600">
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
                  <p className="text-xs font-bold text-slate-900 sm:text-sm">
                    {line.h}
                  </p>
                  <p className="mt-0.5 pl-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    • {line.t}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <WizardFooter step={2} />
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
      key: "open",
    },
    {
      t: "Smart match",
      d: "Balanced volume and quality",
      icon: Sparkles,
      key: "smart",
    },
    {
      t: "Perfect match",
      d: "Highly relevant candidates only",
      icon: ShieldCheck,
      key: "perfect",
    },
  ]
  const selected = "smart"

  return (
    <div className="flex h-full flex-col bg-slate-50 text-slate-900">
      <WizardChrome active={2} reducedMotion={reducedMotion} />
      <div className="flex-1 overflow-y-auto p-3 sm:p-5">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white">
              <Sparkles size={14} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Match %</p>
              <p className="text-[11px] text-slate-500">
                How strictly Hirance scores candidates for this role
              </p>
            </div>
          </div>

          <div className="space-y-2" role="radiogroup" aria-label="Match type">
            {opts.map((o, i) => {
              const on = o.key === selected
              const Icon = o.icon
              return (
                <motion.div
                  key={o.key}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.12 + i * 0.12,
                    duration: 0.35,
                  }}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 ${
                    on
                      ? "border-brand-500 bg-brand-50/80"
                      : "border-slate-200 bg-white"
                  }`}
                  role="radio"
                  aria-checked={on}
                  tabIndex={0}
                  aria-label={o.t}
                >
                  <div
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                      on
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-bold ${
                        on ? "text-brand-700" : "text-slate-900"
                      }`}
                    >
                      {o.t}
                    </p>
                    <p className="text-xs text-slate-500">{o.d}</p>
                  </div>
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                      on ? "bg-brand-600" : "border-2 border-slate-300"
                    }`}
                  >
                    {on && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      <WizardFooter step={3} />
    </div>
  )
}

/* ---------- Publish ---------- */

const PublishScreen = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="flex h-full flex-col bg-slate-50 text-slate-900">
    <WizardChrome active={3} reducedMotion={reducedMotion} />
    <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-30 blur-[1px]">
        <div className="space-y-2 p-8">
          <div className="h-3 w-1/3 rounded bg-slate-200" />
          <div className="h-3 w-2/3 rounded bg-slate-200" />
          <div className="h-3 w-1/2 rounded bg-slate-200" />
        </div>
      </div>

      <motion.div
        initial={
          reducedMotion ? false : { opacity: 0, y: 16, scale: 0.97 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 24 }
        }
        className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
      >
        <p className="text-lg font-bold text-slate-900 sm:text-xl">
          Publish this job?
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Your listing goes live for candidates immediately.
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-3.5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
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
            className="rounded-full border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:text-sm"
            tabIndex={0}
            aria-label="Save as draft"
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-full bg-brand-600 py-2.5 text-xs font-semibold text-white hover:bg-brand-700 sm:text-sm"
            tabIndex={0}
            aria-label="Publish job"
          >
            <Send size={13} /> Publish Job
          </button>
        </div>
      </motion.div>
    </div>
  </div>
)

/* ---------- App shell (dashboard / manage) ---------- */

const AppSidebar = ({ active }: { active: "dashboard" | "jobs" }) => (
  <aside className="hidden w-[148px] shrink-0 flex-col border-r border-slate-200 bg-white p-3 sm:flex lg:w-[168px]">
    <div className="mb-4 flex items-center gap-1.5 px-1">
      <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-xs font-black text-white">
        H
      </div>
      <span className="text-sm font-bold text-slate-900">Hirance</span>
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
    <div className="mt-auto space-y-2">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-2">
        <ShieldCheck size={14} className="text-brand-600" />
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold text-slate-800">
            Verify Account
          </p>
          <p className="truncate text-[9px] text-slate-400">PAN / GST</p>
        </div>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-violet-600 to-brand-700 p-2.5 text-white">
        <p className="text-[9px] font-bold tracking-wide opacity-90">
          GO PREMIUM
        </p>
        <p className="mt-0.5 text-[10px] leading-snug font-semibold">
          Upgrade to Premium
        </p>
        <span className="mt-2 inline-flex rounded-md bg-white/20 px-2 py-1 text-[9px] font-semibold">
          View Plans
        </span>
      </div>
      <div className="flex items-center gap-2 px-1 py-1 text-xs text-slate-500">
        <Settings size={13} /> Settings
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

  return (
    <div className="flex h-full overflow-hidden bg-slate-50 text-slate-900">
      <AppSidebar active="dashboard" />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title="Welcome, kodees labs" />
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900 sm:text-sm">
              Real-time Hiring Analytics
            </p>
            <div className="flex items-center gap-1.5">
              {["7D", "30D", "90D"].map((d) => (
                <span
                  key={d}
                  className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                    d === "30D"
                      ? "bg-brand-600 text-white"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {d}
                </span>
              ))}
              <RefreshCw size={12} className="ml-1 text-slate-400" />
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.05 + i * 0.05 }}
                  className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-xs"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[10px] font-medium text-slate-500">
                      {m.label}
                    </p>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-lg ${m.iconBg}`}
                    >
                      <Icon size={12} />
                    </span>
                  </div>
                  <p className="text-xl font-bold tracking-tight text-slate-900">
                    {m.value}
                  </p>
                  <p className={`mt-0.5 text-[9px] font-medium ${m.hintColor}`}>
                    {m.hint}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="mb-3 grid gap-2 sm:grid-cols-2">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs"
            >
              <p className="text-xs font-bold text-slate-900">
                Publish Milestone
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                Publish 20 unique jobs to earn +2 active posts for 30 days.
              </p>
              <div className="relative mx-auto mt-3 flex h-20 w-40 items-end justify-center">
                <svg viewBox="0 0 160 80" className="absolute inset-0 h-full w-full">
                  <path
                    d="M10 70 A70 70 0 0 1 150 70"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M10 70 A70 70 0 0 1 40 22"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ pathLength: reducedMotion ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                  />
                  <path
                    d="M40 22 A70 70 0 0 1 100 10"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="12"
                    strokeLinecap="round"
                    opacity={0.35}
                  />
                  <path
                    d="M100 10 A70 70 0 0 1 150 70"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="12"
                    strokeLinecap="round"
                    opacity={0.35}
                  />
                </svg>
                <div className="relative z-10 mb-1 text-center">
                  <p className="text-lg font-black text-slate-900">2 / 20</p>
                  <p className="text-[9px] font-medium text-slate-400">
                    Getting started
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs"
            >
              <p className="mb-2 text-xs font-bold text-slate-900">
                Hiring Funnel
              </p>
              <div className="space-y-1.5">
                {funnel.map((f, i) => (
                  <div key={f.l} className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-[10px] font-medium text-slate-600">
                      {f.l}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
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
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-slate-400">
                <span>81% Reviewed</span>
                <span>35% Shortlisted</span>
                <span>24% Interviewed</span>
                <span>11% Selected</span>
              </div>
            </motion.div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Job Performance
                </p>
                <p className="text-[10px] text-slate-500">
                  Track application progress across active jobs
                </p>
              </div>
              <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                7 Active Jobs
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-[10px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="pb-1.5 font-medium">Job Title</th>
                    <th className="pb-1.5 font-medium">Status</th>
                    <th className="pb-1.5 font-medium">Apps</th>
                    <th className="pb-1.5 font-medium">Shortlisted</th>
                    <th className="pb-1.5 font-medium">Days Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-slate-700">
                    <td className="py-2 font-semibold text-slate-900">
                      Python Developer (Work from Home)
                    </td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>
                    <td className="py-2">1</td>
                    <td className="py-2">0</td>
                    <td className="py-2">28d left</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Manage Jobs ---------- */

const ManageScreen = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const jobs = [
    {
      t: "Python Developer (Work from Home)",
      status: "Active",
      app: 1,
      short: 0,
      days: "28d left",
    },
    {
      t: "Software Developer",
      status: "Active",
      app: 42,
      short: 8,
      days: "21d left",
    },
    {
      t: "Node.js Developer — Mid",
      status: "Active",
      app: 18,
      short: 3,
      days: "14d left",
    },
    {
      t: "HR Executive — Junior",
      status: "Draft",
      app: 0,
      short: 0,
      days: "—",
    },
  ]

  return (
    <div className="flex h-full overflow-hidden bg-slate-50 text-slate-900">
      <AppSidebar active="jobs" />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title="Jobs" showCreateMenu />
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900">Job Performance</p>
              <p className="text-xs text-slate-500">
                Track application and hiring progress across all active jobs.
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              6 Active · 6 Drafts
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="grid grid-cols-[1fr_72px_56px_72px_72px] gap-2 border-b border-slate-100 px-3 py-2 text-[10px] font-medium text-slate-400 sm:grid-cols-[1fr_80px_72px_88px_80px]">
              <span>Job Title</span>
              <span>Status</span>
              <span>Apps</span>
              <span className="hidden sm:block">Shortlisted</span>
              <span>Days Left</span>
            </div>
            {jobs.map((j, i) => (
              <motion.div
                key={j.t}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.08 + i * 0.07,
                  duration: 0.35,
                }}
                className="grid grid-cols-[1fr_72px_56px_72px_72px] items-center gap-2 border-b border-slate-50 px-3 py-2.5 last:border-0 sm:grid-cols-[1fr_80px_72px_88px_80px]"
              >
                <p className="truncate text-xs font-semibold text-slate-900">
                  {j.t}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold ${
                    j.status === "Active"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      j.status === "Active" ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                  />
                  {j.status}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-slate-600">
                  <Users size={11} /> {j.app}
                </span>
                <span className="hidden items-center gap-1 text-[10px] font-medium text-slate-600 sm:flex">
                  <Star size={11} /> {j.short}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-slate-600">
                  <Calendar size={11} /> {j.days}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const SCREENS = [
  SignInScreen,
  DetailsScreen,
  RequirementsScreen,
  MatchScreen,
  PublishScreen,
  DashboardScreen,
  ManageScreen,
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
      className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/20 bg-white text-slate-900 shadow-2xl sm:rounded-2xl ${
        className || ""
      }`}
      data-testid="job-post-demo"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
          <span className="ml-2 font-mono text-xs font-medium text-slate-500">
            hirance.in/recruiter
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500">
          <span className="text-slate-400">
            {i + 1}/{STEPS.length}
          </span>
          <span className="mx-1.5 text-slate-300">·</span>
          <span className="text-brand-600">{STEPS[i].name}</span>
        </p>
      </div>

      <div className="h-0.5 w-full shrink-0 overflow-hidden bg-slate-100">
        <motion.div
          className="h-full bg-brand-600"
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
