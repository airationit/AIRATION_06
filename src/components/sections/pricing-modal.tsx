"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Crown,
  Check,
  ArrowRight,
  Star,
  CalendarDays,
  Zap,
  ShieldCheck,
  Users,
  X,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  price: string;
  original: string;
  off: string;
  per: string;
  stats: { v: string; l: string }[];
  heading: string;
  features: string[];
  popular: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "STARTER",
    icon: Rocket,
    tagline: "Perfect for small teams getting started.",
    price: "₹1,199",
    original: "₹1,410",
    off: "15% OFF",
    per: "Total for 1 Month",
    stats: [
      { v: "2", l: "Active Job Posts" },
      { v: "₹600", l: "Cost / Job Post" },
      { v: "30 Days", l: "Plan Validity" },
    ],
    heading: "Features included",
    features: [
      "2 Active Job Posts",
      "15-Day Job Visibility per Post",
      "Post Any Job in Under 1 Minute",
      "Set Filters to Control Who Can Apply",
      "Candidate Matching & Filtering",
      "Candidate Shortlisting & Interview Scheduling",
      "Candidate Contact Access",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "GROWTH",
    icon: TrendingUp,
    tagline: "Great for growing companies hiring consistently.",
    price: "₹2,799",
    original: "₹3,293",
    off: "15% OFF",
    per: "Total for 3 Months",
    stats: [
      { v: "5", l: "Active Job Posts" },
      { v: "₹560", l: "Cost / Job Post" },
      { v: "90 Days", l: "Plan Validity" },
    ],
    heading: "Everything in Starter, plus",
    features: [
      "5 Active Job Posts",
      "Unlimited Applicants per Job",
      "Unlimited AI Job Description Credits",
      "Advanced Candidate Filtering",
      "Bulk Candidate Shortlisting & Messaging",
      "Bulk Interview Scheduling",
      "Candidate Contact Access",
    ],
    popular: true,
  },
  {
    id: "scale",
    name: "SCALE",
    icon: Crown,
    tagline: "Built for large teams and staffing agencies.",
    price: "₹7,499",
    original: "₹8,822",
    off: "15% OFF",
    per: "Total for 6 Months",
    stats: [
      { v: "15", l: "Active Job Posts" },
      { v: "₹500", l: "Cost / Job Post" },
      { v: "180 Days", l: "Plan Validity" },
    ],
    heading: "Everything in Growth, plus",
    features: [
      "15 Active Job Posts",
      "180-Day Plan Validity",
      "Unlimited Applicants & AI Credits",
      "Advanced Candidate Filtering",
      "Bulk Shortlisting, Messaging & Interviews",
      "Priority Candidate Contact Access",
      "Dedicated Account Support",
    ],
    popular: false,
  },
];

export const BOTTOM_HIGHLIGHTS = [
  {
    icon: CalendarDays,
    title: "15-Day Job Visibility",
    text: "Every job post stays visible for 15 days.",
  },
  {
    icon: Zap,
    title: "Post in Under 1 Minute",
    text: "Quick, simple and built for faster hiring.",
  },
  {
    icon: ShieldCheck,
    title: "Control & Privacy",
    text: "Set filters to control who can apply.",
  },
  {
    icon: Users,
    title: "Candidate Access",
    text: "Get full access to candidate contacts anytime.",
  },
];

interface PlanCardProps {
  plan: PricingPlan;
  onStartHiring?: () => void;
  index: number;
}

function PlanCard({ plan, onStartHiring, index }: PlanCardProps) {
  const { icon: Icon, popular } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`pricing-card-${plan.id}`}
      className={cn(
        "relative rounded-3xl flex flex-col transition-all duration-200",
        popular
          ? "border-2 border-blue-600 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/10 lg:-mt-3 lg:mb-3"
          : "border border-border/80 bg-card dark:bg-slate-900/80 shadow-md"
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-white text-[11px] font-extrabold shadow-md uppercase tracking-wider">
          <Star size={12} fill="currentColor" />
          <span>Most Popular</span>
        </div>
      )}

      <div className="p-6 sm:p-7">
        {/* Plan Header */}
        <div className="flex items-center gap-3.5">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs",
              popular
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                : "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
            )}
          >
            <Icon size={24} />
          </div>
          <div className="min-w-0">
            <h3
              className={cn(
                "text-lg font-black tracking-wide leading-tight",
                popular ? "text-blue-600 dark:text-blue-400" : "text-foreground"
              )}
            >
              {plan.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-snug mt-0.5">
              {plan.tagline}
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              {plan.price}
            </span>
            <span className="text-muted-foreground/70 line-through text-base font-semibold">
              {plan.original}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
              <Sparkles size={11} /> {plan.off}
            </span>
            <span className="text-xs text-muted-foreground font-medium">{plan.per}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-5 grid grid-cols-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-700/60 overflow-hidden">
          {plan.stats.map((s) => (
            <div key={s.l} className="px-1.5 py-2.5 text-center">
              <p className="font-extrabold text-foreground text-xs sm:text-sm leading-tight">
                {s.v}
              </p>
              <p className="text-[9.5px] text-muted-foreground mt-0.5 leading-tight truncate">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features List */}
      <div className="px-6 sm:px-7 pb-6 sm:pb-7 flex-1 flex flex-col">
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-wider mb-3",
            popular ? "text-blue-600 dark:text-blue-400" : "text-foreground"
          )}
        >
          {plan.heading}
        </p>

        <ul className="space-y-2.5 flex-1">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-snug"
            >
              <span
                className={cn(
                  "shrink-0 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center mt-0.5",
                  popular
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                )}
              >
                <Check size={11} strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        {onStartHiring ? (
          <button
            type="button"
            onClick={onStartHiring}
            data-testid={`pricing-start-${plan.id}`}
            className={cn(
              "group mt-6 w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]",
              popular
                ? "bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-md shadow-[#0077c8]/25"
                : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <span>Start Hiring</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        ) : (
          <a
            href={siteConfig.links.employer}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`pricing-start-${plan.id}`}
            className={cn(
              "group mt-6 w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-xs active:scale-[0.98]",
              popular
                ? "bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-md shadow-[#0077c8]/25"
                : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <span>Start Hiring</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export interface PricingModalProps {
  open: boolean;
  onClose: () => void;
  onStartHiring?: () => void;
}

export function PricingModal({ open, onClose, onStartHiring }: PricingModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pricing-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-background border border-border/80 shadow-2xl p-5 sm:p-8 lg:p-10 text-foreground"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              data-testid="pricing-modal-close"
              aria-label="Close pricing plans"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
                Employer Plans
              </p>
              <h2
                id="pricing-modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight text-balance"
              >
                Simple Plans.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                  Powerful Hiring.
                </span>
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                Choose the perfect plan for your team. Pay less per job as your hiring scale increases.
              </p>

              {/* Free Posts Banner */}
              <div
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-5 py-2 shadow-md shadow-blue-500/20 text-xs sm:text-sm font-semibold"
                data-testid="free-posts-banner"
              >
                <Sparkles size={14} className="text-cyan-200 shrink-0" />
                <span>Your first 2 job posts are free — start hiring at zero cost.</span>
              </div>

              {/* Cost Drop Indicator */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span>Per-job cost drops:</span>
                <span className="font-mono font-bold text-foreground">
                  ₹600 <span className="text-blue-600 dark:text-blue-400">→</span> ₹560{" "}
                  <span className="text-blue-600 dark:text-blue-400">→</span> ₹500
                </span>
              </div>
            </div>

            {/* 3 Pricing Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {PRICING_PLANS.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onStartHiring={onStartHiring}
                  index={index}
                />
              ))}
            </div>

            {/* Bottom 4 Feature Value Highlights */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BOTTOM_HIGHLIGHTS.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-border/70 p-3.5 sm:p-4 text-left"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <ItemIcon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-xs sm:text-sm leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tax & Platform Note */}
            <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
              Prices are exclusive of <strong className="text-foreground">18% GST</strong> · GST calculated at checkout. All plans include full platform candidate access &amp; instant screening filters.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
