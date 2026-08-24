"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
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
} from "lucide-react";

export interface StepItem {
  key: string;
  name: string;
  caption: string;
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
];

const WIZARD = ["Job Details", "Candidate Requirements", "Match %", "Preview & Post"];

/* Small building blocks */
interface FieldProps {
  label: string;
  value: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  delay?: number;
  dropdown?: boolean;
}

const Field = ({ label, value, icon: Icon, delay = 0, dropdown }: FieldProps) => (
  <div>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xs"
    >
      {Icon && <Icon size={16} className="text-slate-400 shrink-0" />}
      <span className="text-sm font-medium text-slate-900 truncate">{value}</span>
      {dropdown && <ChevronDown size={15} className="text-slate-400 ml-auto shrink-0" />}
    </motion.div>
  </div>
);

interface ChipProps {
  children: React.ReactNode;
  on?: boolean;
}

const Chip = ({ children, on }: ChipProps) => (
  <span
    className={`text-xs px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
      on
        ? "border-sky-500 bg-sky-50 text-sky-600 font-semibold shadow-xs"
        : "border-slate-200 bg-white text-slate-600"
    }`}
  >
    {children}
  </span>
);

const WizardHeader = ({ active }: { active: number }) => (
  <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 px-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
    {WIZARD.map((w, i) => {
      const done = i < active;
      const on = i === active;
      return (
        <React.Fragment key={w}>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
                done || on ? "text-white" : "text-slate-400 bg-slate-200"
              }`}
              style={
                done || on
                  ? { background: "linear-gradient(135deg, #0284C7, #0369A1)" }
                  : {}
              }
            >
              {done ? <Check size={12} strokeWidth={3} /> : i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs font-semibold ${
                on ? "text-sky-600" : done ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {w}
            </span>
          </div>
          {i < 3 && (
            <div
              className={`h-0.5 w-4 sm:w-8 rounded ${
                done ? "bg-sky-600" : "bg-slate-200"
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ---------- Per-Step Screens ---------- */
const SignInScreen = () => {
  const steps = [
    {
      n: 1,
      c: "#7000FF",
      titleColor: "text-[#7000FF]",
      t: "Create Your Company Profile",
      d: "Tell us about your company and hiring needs - takes less than 2 mins",
      card: (
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs min-w-[190px] sm:min-w-[210px]">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Building2 size={20} />
            <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
              <Check size={9} strokeWidth={3.5} />
            </div>
          </div>
          <div>
            <p className="font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
              Airation Softtech
            </p>
            <div className="mt-1.5 h-1.5 w-14 rounded-full bg-slate-100" />
          </div>
        </div>
      ),
    },
    {
      n: 2,
      c: "#0066FF",
      titleColor: "text-[#0066FF]",
      t: "Post A Job",
      d: "Post any job under 1 min. Candidates start swiping in seconds",
      card: (
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs min-w-[190px] sm:min-w-[210px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
              <Briefcase size={15} />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
                Sales Executive
              </p>
              <p className="text-[10px] text-slate-500">Full time, Noida</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-[#0066FF] py-1.5 text-center text-xs font-semibold text-white shadow-xs"
          >
            Post Job
          </button>
        </div>
      ),
    },
    {
      n: 3,
      c: "#FF6600",
      titleColor: "text-[#FF6600]",
      t: "Review AI-Matched Candidates",
      d: "Review candidates ranked by match % so no manual filtering, no resume pile",
      card: (
        <div className="flex flex-col gap-1.5 rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-xs min-w-[200px] sm:min-w-[220px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-[10px] sm:text-[11px] font-bold">
                RA
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 leading-tight">Rohan Jha</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-0.5">
                  <MapPin size={9} /> Noida
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-full border-2 border-emerald-500 px-1.5 py-0.5 text-center shrink-0">
              <span className="text-[10px] font-black text-emerald-600 leading-none">87%</span>
              <span className="text-[8px] font-semibold text-emerald-600 leading-none mt-0.5">Match</span>
            </div>
          </div>
          <p className="font-bold text-[11px] text-slate-900">Sales Executive</p>
          <div className="flex items-center gap-1.5">
            <span className="flex-1 rounded-md bg-rose-50 border border-rose-100 py-0.5 text-center text-[10px] font-semibold text-rose-500">
              ✕ Skip
            </span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 text-slate-400 text-[10px]">
              🔖
            </span>
            <span className="flex-1 rounded-md bg-emerald-50 border border-emerald-100 py-0.5 text-center text-[10px] font-semibold text-emerald-600">
              ✓ Shortlist
            </span>
          </div>
        </div>
      ),
    },
    {
      n: 4,
      c: "#009944",
      titleColor: "text-[#009944]",
      t: "Hire The Right Talent",
      d: "Connect, interview and hire the right talent - all from 1 dashboard",
      card: (
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs min-w-[190px] sm:min-w-[210px]">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
            <Check size={16} strokeWidth={3} />
          </div>
          <div>
            <p className="font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
              Hired Successfully!
            </p>
            <p className="text-[10px] text-slate-500">Welcome aboard!</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center overflow-y-auto bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto my-auto grid max-w-6xl w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        
        {/* Left Column: 4-Step Vertical Timeline with Cards */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-7">
          {steps.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + idx * 0.08 }}
              className="flex items-center justify-between gap-3 sm:gap-4"
            >
              {/* Left Timeline Number & Text */}
              <div className="relative flex items-start gap-3 sm:gap-3.5 flex-1 min-w-0">
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-3.5 sm:left-4 top-8 sm:top-9 -bottom-5 w-[1.5px] bg-slate-200 -z-0" />
                )}

                {/* Number Circle Badge */}
                <div
                  className="relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-white text-xs sm:text-sm font-black shadow-xs mt-0.5"
                  style={{ backgroundColor: s.c }}
                >
                  {s.n}
                </div>

                {/* Step Copy */}
                <div className="min-w-0 pr-1">
                  <p className={`font-bold text-xs sm:text-sm leading-tight ${s.titleColor}`}>
                    {s.t}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
                    {s.d}
                  </p>
                </div>
              </div>

              {/* Right Floating Preview Card */}
              <div className="shrink-0 hidden md:block">
                {s.card}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Sign In Form */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-center lg:col-span-5 lg:pl-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 tracking-tight leading-[1.12]">
            Smarter Hiring<br />Starts Here
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
            Post any job in under 1 minute. For every job you post, someone swipes in seconds.
          </p>

          <p className="text-xs sm:text-sm font-bold text-slate-900 mt-6 mb-2">
            Mobile number
          </p>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-300/90 bg-white px-4 py-3 shadow-xs">
            <span className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-slate-900 shrink-0">
              <span className="text-lg">🇮🇳</span> +91
            </span>
            <span className="h-5 w-px bg-slate-300 shrink-0" />
            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-wide">
              9026728748
            </span>
            <ShieldCheck className="ml-auto h-5 w-5 text-emerald-500 shrink-0" strokeWidth={2.4} />
          </div>

          <button
            type="button"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#1d6bf3] hover:bg-blue-700 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Send OTP <span className="text-base leading-none">→</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
};

const DetailsScreen = () => (
  <div className="h-full flex flex-col bg-white text-slate-900">
    <WizardHeader active={0} />
    <div className="flex-1 overflow-y-auto p-5 sm:p-7">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-xl grid place-items-center text-white"
          style={{ background: "linear-gradient(135deg, #0284C7, #0369A1)" }}
        >
          <Briefcase size={16} />
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm leading-tight">Job Information</p>
          <p className="text-xs text-slate-500">Core details candidates see first.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <Field label="Job Title / Designation *" value="Software Developer" icon={Briefcase} delay={0.05} />
        <Field label="Job Role / Category *" value="IT / Software — Software Developer" delay={0.1} dropdown />
        <Field label="Total Vacancies" value="10" icon={Users} delay={0.15} />
        <Field label="Job Location (City) *" value="Noida" icon={MapPin} delay={0.2} dropdown />
        <Field label="Salary Range (Monthly) *" value="₹30k – ₹50k" delay={0.25} dropdown />
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Job Type</p>
          <div className="flex gap-2"><Chip on>Full-time</Chip><Chip>Part-time</Chip></div>
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Work Mode</p>
          <div className="flex flex-wrap gap-2"><Chip on>Work from Office</Chip><Chip>Field Job</Chip><Chip>Remote</Chip></div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Work Shift</p>
          <div className="flex flex-wrap gap-2"><Chip on>Day Shift</Chip><Chip>Night Shift</Chip><Chip>Hybrid</Chip></div>
        </div>
      </div>
    </div>
  </div>
);

const RequirementsScreen = () => (
  <div className="h-full flex flex-col bg-white text-slate-900">
    <WizardHeader active={1} />
    <div className="flex-1 overflow-y-auto p-5 sm:p-7">
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
        <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-100 bg-slate-50 text-slate-400 text-xs">
          Normal <span className="font-bold text-slate-600">B</span> <span className="italic">I</span> <span className="underline">U</span> <span>• ≡</span>
        </div>
        <div className="p-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {[
            ["Required Qualifications", "Bachelor's degree in Computer Science or related field."],
            ["Experience Requirements", "2–5 years building production-grade apps in Java / Python."],
            ["Benefits", "Competitive salary, health insurance, paid time off & learning budget."],
          ].map(([h, t], i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.15 }}
            >
              <p className="font-bold text-slate-900 text-xs sm:text-sm">{h}</p>
              <p className="pl-3 text-slate-600">• {t}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2">
          <ShieldCheck size={15} /> Review AI content before publishing.
        </div>
        <motion.button
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white px-4 py-2.5 rounded-xl shadow-md"
          style={{ background: "linear-gradient(135deg, #7c3aed, #0284C7)" }}
        >
          <Wand2 size={15} /> Generate with AI
        </motion.button>
      </div>
    </div>
  </div>
);

const MatchScreen = () => {
  const opts = [
    { t: "Open match", d: "More candidates, broader results", icon: Users, c: "#7c3aed" },
    { t: "Smart match", d: "Balanced volume and quality", icon: Sparkles, c: "#0284C7", rec: true },
    { t: "Perfect match", d: "Highly relevant candidates", icon: ShieldCheck, c: "#059669" },
  ];

  return (
    <div className="h-full flex flex-col bg-white text-slate-900">
      <WizardHeader active={2} />
      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-xl grid place-items-center text-white"
            style={{ background: "linear-gradient(135deg, #10b981, #0d9488)" }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">Applicant Quality Filter</p>
            <p className="text-xs text-slate-500">
              Hirance scores every candidate on skills, experience &amp; qualifications.
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold text-slate-500 mb-2">Select matching type</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {opts.map((o, i) => (
            <motion.div
              key={o.t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`relative rounded-xl border p-4 ${
                o.rec ? "border-sky-500 bg-sky-50/70 shadow-sm" : "border-slate-200 bg-white shadow-xs"
              }`}
            >
              {o.rec && (
                <span
                  className="absolute -top-2.5 left-3 text-[9px] font-bold text-white px-2 py-0.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, #0284C7, #0369A1)" }}
                >
                  RECOMMENDED
                </span>
              )}
              <div className="flex items-center justify-between">
                <o.icon size={20} style={{ color: o.c }} />
                <span
                  className={`w-4 h-4 rounded-full grid place-items-center ${
                    o.rec ? "" : "border-2 border-slate-300"
                  }`}
                  style={o.rec ? { background: "linear-gradient(135deg, #00E5FF, #0284C7)" } : {}}
                >
                  {o.rec && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p
                className={`mt-2 font-bold text-sm ${
                  o.rec ? "text-sky-600" : "text-slate-900"
                }`}
              >
                {o.t}
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-tight">{o.d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center gap-2 text-xs text-sky-700 bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5"
        >
          <Sparkles size={15} className="shrink-0 text-sky-600" />
          <span>Balanced volume and quality. Suitable for most roles.</span>
        </motion.div>
      </div>
    </div>
  );
};

const PublishScreen = () => (
  <div className="h-full relative grid place-items-center bg-slate-50 overflow-hidden p-6">
    <div className="absolute inset-0 p-4 opacity-30 blur-[1px] pointer-events-none">
      <WizardHeader active={3} />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mx-3"
    >
      <p className="font-bold text-xl text-slate-900">Publish this job?</p>
      <p className="text-xs text-slate-500 mt-1">
        This will make your listing live and visible to candidates.
      </p>
      <div className="mt-4 rounded-xl bg-sky-50/80 border border-sky-100 p-3.5 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl grid place-items-center text-white shrink-0 shadow-xs"
          style={{ background: "linear-gradient(135deg, #0284C7, #0369A1)" }}
        >
          <Briefcase size={18} />
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">Software Developer</p>
          <p className="text-xs text-slate-500">Role: Software Developer</p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5">
            Uses 5 of 10 job credits this month
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          className="rounded-full border border-slate-200 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Save as Draft
        </button>
        <motion.button
          type="button"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(2, 132, 199, 0.4)",
              "0 0 0 10px rgba(2, 132, 199, 0)",
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm"
          style={{ background: "linear-gradient(135deg, #0284C7, #0369A1)" }}
        >
          <Send size={14} /> Publish Job
        </motion.button>
      </div>
    </motion.div>
  </div>
);

interface StatProps {
  label: string;
  value: string;
  delay: number;
  accent: string;
}

const Stat = ({ label, value, delay, accent }: StatProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs"
  >
    <p className="text-xs text-slate-500">{label}</p>
    <p className="font-black text-2xl leading-tight mt-1" style={{ color: accent }}>
      {value}
    </p>
  </motion.div>
);

const DashboardScreen = () => (
  <div className="h-full flex flex-col p-5 sm:p-7 overflow-y-auto bg-white text-slate-900">
    <div className="flex items-center gap-2 mb-4">
      <LayoutDashboard size={18} className="text-sky-600" />
      <p className="font-bold text-slate-900 text-sm">Real-time hiring analytics</p>
      <span className="ml-2 text-[10px] font-bold text-sky-700 bg-sky-100 rounded-full px-2 py-0.5">
        PRO
      </span>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat label="Active Jobs" value="5" delay={0.05} accent="#0284C7" />
      <Stat label="Total Candidates" value="128" delay={0.1} accent="#7c3aed" />
      <Stat label="Shortlisted" value="14" delay={0.15} accent="#ea580c" />
      <Stat label="Positions Filled" value="3" delay={0.2} accent="#059669" />
    </div>
    <div className="mt-4 flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      <p className="font-bold text-slate-900 text-xs sm:text-sm mb-3">Hiring funnel</p>
      {[
        ["Matches", 100, "#0284C7"],
        ["Reviewed", 72, "#38bdf8"],
        ["Shortlisted", 44, "#f59e0b"],
        ["Interviewed", 26, "#a855f7"],
        ["Selected", 12, "#10b981"],
      ].map(([l, w, c], i) => (
        <div key={l as string} className="flex items-center gap-3 mb-2">
          <span className="w-24 text-xs text-slate-600 shrink-0 font-medium">{l}</span>
          <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              className="h-full rounded-full"
              style={{ background: c as string }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500 w-8 text-right">
            {w}%
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ManageScreen = () => {
  const jobs = [
    { t: "Software Developer", loc: "Noida", pay: "₹30k – ₹50k", app: 42, m: "Smart match", mc: "#0284C7" },
    { t: "Node.js Developer — Mid", loc: "Ahmedabad", pay: "₹10k – ₹15k", app: 18, m: "Perfect match", mc: "#059669" },
    { t: "Area Sales Manager", loc: "Ahmedabad", pay: "₹10k – ₹15k", app: 27, m: "Perfect match", mc: "#059669" },
    { t: "HR Executive — Junior", loc: "Lucknow", pay: "₹1L – ₹1.5L", app: 9, m: "Smart match", mc: "#0284C7" },
  ];

  return (
    <div className="h-full flex flex-col p-5 sm:p-7 overflow-y-auto bg-white text-slate-900">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-bold text-slate-900 text-sm">Jobs Dashboard</p>
          <p className="text-xs text-slate-500">Manage your active listings.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 font-semibold">
            Active 6
          </span>
          <span className="rounded-full bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 font-semibold">
            Drafts 6
          </span>
        </div>
      </div>
      <div className="space-y-2.5">
        {jobs.map((j, i) => (
          <motion.div
            key={j.t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.08 }}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs"
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{j.t}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} /> {j.loc} · {j.pay}
              </p>
            </div>
            <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-800 bg-slate-100 rounded-full px-3 py-1">
              <Users size={12} /> {j.app}
            </span>
            <span
              className="flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1"
              style={{ color: j.mc, background: `${j.mc}14` }}
            >
              <Sparkles size={12} /> {j.m}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SCREENS = [
  SignInScreen,
  DetailsScreen,
  RequirementsScreen,
  MatchScreen,
  PublishScreen,
  DashboardScreen,
  ManageScreen,
];

interface JobPostDemoProps {
  className?: string;
}

export function JobPostDemo({ className }: JobPostDemoProps) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const Screen = SCREENS[i];

  const go = useCallback((n: number) => {
    setI((n + STEPS.length) % STEPS.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => setI((v) => (v + 1) % STEPS.length),
      i === 0 ? 4200 : 3600
    );
    return () => clearTimeout(t);
  }, [i, playing]);

  return (
    <div
      className={`w-full h-full flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-white shadow-2xl text-slate-900 ${
        className || ""
      }`}
      data-testid="job-post-demo"
    >
      {/* Top Browser Window Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-slate-200 bg-slate-50 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-xs text-slate-500 font-medium">
            hirance.in/recruiter
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">
            Step {i + 1} of {STEPS.length} · <span className="text-sky-600">{STEPS[i].name}</span>
          </span>
        </div>
      </div>

      {/* Thin Progress bar */}
      <div className="h-1 bg-slate-200 w-full overflow-hidden shrink-0">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #00E5FF, #0284C7)" }}
          animate={{ width: `${((i + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Main Screen Graphic Stage (Directly covers full inner area) */}
      <div className="relative flex-1 w-full overflow-hidden bg-white" data-testid="job-post-demo-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Info & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-t border-slate-200 bg-slate-900 text-white shrink-0">
        <p className="text-xs sm:text-sm text-slate-300 font-medium text-center sm:text-left truncate max-w-lg">
          {STEPS[i].caption}
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Previous step"
            className="p-1.5 rounded-full border border-white/20 text-slate-300 hover:border-sky-400 hover:text-sky-400 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className="p-1.5 rounded-full text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0284C7, #0369A1)" }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Next step"
            className="p-1.5 rounded-full border border-white/20 text-slate-300 hover:border-sky-400 hover:text-sky-400 transition-colors"
          >
            <ChevronRight size={16} />
          </button>

          <div className="flex items-center gap-1 sm:gap-1.5 ml-1">
            {STEPS.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(idx)}
                aria-label={s.name}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-6 sm:w-7 bg-sky-400"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPostDemo;
