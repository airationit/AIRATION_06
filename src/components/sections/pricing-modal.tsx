"use client";

import { useEffect } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  icon: LucideIcon;
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
    title: "15-Day Visibility",
    text: "Stays active for 15 days",
  },
  {
    icon: Zap,
    title: "Post in 1 Min",
    text: "Go live in 60 seconds",
  },
  {
    icon: ShieldCheck,
    title: "Applicant Filters",
    text: "Easily control who can apply",
  },
  {
    icon: Users,
    title: "Candidate Access",
    text: "Full candidate contact access",
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`pricing-card-${plan.id}`}
      className={cn(
        "relative rounded-2xl flex flex-col transition-all duration-200",
        popular
          ? "border-2 border-blue-600 bg-white dark:bg-slate-900 shadow-md shadow-blue-500/10"
          : "border border-border/80 bg-card dark:bg-slate-900/80 shadow-xs"
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-white text-[10px] font-bold shadow-xs uppercase tracking-wider">
          <Star size={11} fill="currentColor" />
          <span>Most Popular</span>
        </div>
      )}

      <div className="p-3 sm:p-3.5">
        {/* Plan Header */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs",
              popular
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                : "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
            )}
          >
            <Icon size={16} />
          </div>
          <div className="min-w-0">
            <h3
              className={cn(
                "text-xs sm:text-[13px] font-bold tracking-wide leading-tight",
                popular ? "text-blue-600 dark:text-blue-400" : "text-foreground"
              )}
            >
              {plan.name}
            </h3>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">
              {plan.tagline}
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xl sm:text-[22px] font-semibold text-foreground tracking-tight">
              {plan.price}
            </span>
            <span className="text-muted-foreground/60 line-through text-[11px] font-normal">
              {plan.original}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles size={9} /> {plan.off}
            </span>
            <span className="text-[10px] text-muted-foreground font-normal">{plan.per}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-2 grid grid-cols-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-700/60 overflow-hidden">
          {plan.stats.map((s) => (
            <div key={s.l} className="px-1 py-1 text-center">
              <p className="font-bold text-foreground text-[11.5px] leading-tight">
                {s.v}
              </p>
              <p className="text-[8.5px] text-muted-foreground mt-0.5 leading-tight truncate">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features List */}
      <div className="px-3 sm:px-3.5 pb-3 sm:pb-3.5 flex-1 flex flex-col">
        <p
          className={cn(
            "text-[9.5px] font-bold uppercase tracking-wider mb-1.5",
            popular ? "text-blue-600 dark:text-blue-400" : "text-foreground"
          )}
        >
          {plan.heading}
        </p>

        <ul className="space-y-1 flex-1">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-muted-foreground leading-snug"
            >
              <span
                className={cn(
                  "shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center mt-0.5",
                  popular
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                )}
              >
                <Check size={8} strokeWidth={3} />
              </span>
              <span className="truncate sm:whitespace-normal">{feature}</span>
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
              "group mt-2.5 w-full flex items-center justify-center gap-1.5 font-semibold py-1.5 sm:py-2 rounded-full text-[11.5px] transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]",
              popular
                ? "bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-sm shadow-[#0077c8]/25"
                : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <span>Start Hiring</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        ) : (
          <a
            href={siteConfig.links.employer}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`pricing-start-${plan.id}`}
            className={cn(
              "group mt-2.5 w-full flex items-center justify-center gap-1.5 font-semibold py-1.5 sm:py-2 rounded-full text-[11.5px] transition-all duration-200 shadow-xs active:scale-[0.98]",
              popular
                ? "bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-sm shadow-[#0077c8]/25"
                : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <span>Start Hiring</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
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
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex items-start justify-center pt-[78px] sm:pt-[84px] md:pt-[88px] pb-6 px-3 sm:px-5"
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
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-background border border-border/80 shadow-2xl p-4 sm:p-5 md:p-6 text-foreground overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              data-testid="pricing-modal-close"
              aria-label="Close pricing plans"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="text-center max-w-2xl mx-auto mb-2.5 sm:mb-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-0.5">
                Employer Plans
              </p>
              <h2
                id="pricing-modal-title"
                className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight text-foreground leading-tight text-balance"
              >
                Simple Plans.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                  Powerful Hiring.
                </span>
              </h2>
              <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground text-pretty leading-normal">
                Choose the perfect plan for your team. Pay less per job as your hiring scale increases.
              </p>

              {/* Free Posts Banner & Cost Drop Inline */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                <div
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-0.5 shadow-xs text-[10px] font-medium"
                  data-testid="free-posts-banner"
                >
                  <Sparkles size={11} className="text-cyan-200 shrink-0" />
                  <span>Your first 2 job posts are free — start hiring at zero cost.</span>
                </div>

                <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
                  <span>Per-job cost drops:</span>
                  <span className="font-semibold text-foreground">
                    ₹600 <span className="text-blue-600 dark:text-blue-400">→</span> ₹560{" "}
                    <span className="text-blue-600 dark:text-blue-400">→</span> ₹500
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Pricing Plans Grid with dedicated vertical padding */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-3.5 items-stretch py-0.5 sm:py-1">
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
            <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
              {BOTTOM_HIGHLIGHTS.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-border/80 shadow-xs p-2 text-left"
                  >
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <ItemIcon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-[11px] leading-snug truncate">
                        {item.title}
                      </p>
                      <p className="text-[9.5px] text-muted-foreground mt-0.5 leading-tight truncate">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tax & Platform Note */}
            <p className="mt-2 text-center text-[10px] text-muted-foreground leading-tight">
              Prices are exclusive of <strong className="text-foreground font-medium">18% GST</strong> · GST calculated at checkout. All plans include full platform candidate access &amp; instant screening filters.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
