"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Crown,
  Check,
  ArrowRight,
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
  off?: string;
  duration: string;
  perJob: string;
  validity: string;
  heading: string;
  features: string[];
  popular: boolean;
  per?: string;
  stats?: { v: string; l: string }[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Rocket,
    tagline: "Ideal for small teams hiring occasionally.",
    price: "₹1,199",
    original: "₹1,410",
    off: "15% off",
    duration: "1 month",
    perJob: "₹600 / job post",
    validity: "30-day validity",
    heading: "Included with Starter",
    features: [
      "2 Active job posts (15 days live each)",
      "Real-time candidate matching & filters",
      "Direct candidate WhatsApp & phone contact",
      "In-app interview scheduling",
    ],
    popular: false,
    per: "Total for 1 Month",
    stats: [
      { v: "2", l: "Active Job Posts" },
      { v: "₹600", l: "Cost / Job Post" },
      { v: "30 Days", l: "Plan Validity" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    icon: TrendingUp,
    tagline: "Most popular for teams hiring every month.",
    price: "₹2,799",
    original: "₹3,293",
    off: "15% off",
    duration: "3 months",
    perJob: "₹560 / job post",
    validity: "90-day validity",
    heading: "Everything in Starter, plus",
    features: [
      "5 Active job posts (15 days live each)",
      "Unlimited applicants per job",
      "AI job description generator & smart filters",
      "Bulk candidate shortlisting & outreach",
    ],
    popular: true,
    per: "Total for 3 Months",
    stats: [
      { v: "5", l: "Active Job Posts" },
      { v: "₹560", l: "Cost / Job Post" },
      { v: "90 Days", l: "Plan Validity" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    icon: Crown,
    tagline: "Best value for high-volume hiring and agencies.",
    price: "₹7,499",
    original: "₹8,822",
    off: "15% off",
    duration: "6 months",
    perJob: "₹500 / job post",
    validity: "180-day validity",
    heading: "Everything in Growth, plus",
    features: [
      "15 Active job posts (Lowest cost at ₹500 / post)",
      "Priority candidate match placement",
      "Bulk pipeline management & scheduling",
      "Dedicated account support manager",
    ],
    popular: false,
    per: "Total for 6 Months",
    stats: [
      { v: "15", l: "Active Job Posts" },
      { v: "₹500", l: "Cost / Job Post" },
      { v: "180 Days", l: "Plan Validity" },
    ],
  },
];

export const BOTTOM_HIGHLIGHTS = [
  {
    icon: Zap,
    title: "Post in 1 Min",
    text: "Go live in 60 seconds",
  },
  {
    icon: CalendarDays,
    title: "15-Day Visibility",
    text: "Stays active for 15 days",
  },
  {
    icon: Users,
    title: "Candidate Access",
    text: "Full candidate contact access",
  },
  {
    icon: ShieldCheck,
    title: "Zero Commission",
    text: "Hire without agency fees",
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`pricing-card-${plan.id}`}
      className={cn(
        "relative rounded-2xl flex flex-col p-3.5 sm:p-4 lg:p-4.5 transition-all duration-200",
        popular
          ? "border-2 border-blue-600 dark:border-blue-500 bg-card shadow-lg shadow-blue-500/10"
          : "border border-border/80 bg-card/60 hover:bg-card hover:border-border transition-colors shadow-2xs"
      )}
    >
      {/* Most Popular Tag */}
      {popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs tracking-wide uppercase">
          Most Popular
        </div>
      )}

      {/* Plan Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base sm:text-[17px] font-bold text-foreground tracking-tight">
            {plan.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">
            {plan.tagline}
          </p>
        </div>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs",
            popular
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
          )}
        >
          <Icon size={16} />
        </div>
      </div>

      {/* Pricing Block */}
      <div className="mt-3 pb-3 border-b border-border/60">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-foreground">
            {plan.price}
          </span>
          <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
            / {plan.duration}
          </span>
          {plan.original && (
            <span className="text-[11px] text-muted-foreground/60 line-through">
              {plan.original}
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px]">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {plan.perJob}
          </span>
          <span className="text-muted-foreground/60">·</span>
          <span className="text-muted-foreground">{plan.validity}</span>
          {plan.off && (
            <>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {plan.off}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Plan Features */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
            {plan.heading}
          </p>
          <ul className="mt-2 space-y-1.5 sm:space-y-2">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground leading-snug"
              >
                <Check
                  size={14}
                  strokeWidth={2.5}
                  className="shrink-0 mt-0.5 text-blue-600 dark:text-blue-400"
                />
                <span className="text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-3.5 sm:mt-4">
          {onStartHiring ? (
            <button
              type="button"
              onClick={onStartHiring}
              data-testid={`pricing-start-${plan.id}`}
              className={cn(
                "group w-full flex items-center justify-center gap-1.5 font-semibold py-2 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]",
                popular
                  ? "bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-sm shadow-[#0077c8]/25"
                  : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <span>Start Hiring</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          ) : (
            <a
              href={siteConfig.links.employer}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`pricing-start-${plan.id}`}
              className={cn(
                "group w-full flex items-center justify-center gap-1.5 font-semibold py-2 rounded-xl text-xs sm:text-[13px] transition-all duration-200 shadow-xs active:scale-[0.98]",
                popular
                  ? "bg-[#0077c8] hover:bg-[#0066ad] dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-sm shadow-[#0077c8]/25"
                  : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <span>Start Hiring</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          )}
        </div>
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
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
        >
          {/* Backdrop: Sits behind modal content, above navbar (z-[100]) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Centering Wrapper: Uses min-h-full with padding so it centers when it fits and scrolls smoothly when viewport is small */}
          <div className="relative min-h-full flex items-center justify-center p-3 sm:p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-background border border-border/80 shadow-2xl p-4 sm:p-5 md:p-6 text-foreground overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                data-testid="pricing-modal-close"
                aria-label="Close pricing plans"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
              >
                <X size={16} />
              </button>

              {/* Header (Clean, compact, no chips over title) */}
              <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4 px-6 sm:px-0">
                <h2
                  id="pricing-modal-title"
                  className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight text-foreground leading-tight text-balance"
                >
                  Simple, Transparent{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                    Pricing
                  </span>
                </h2>
                <p className="mt-1 text-xs sm:text-[13px] text-muted-foreground text-pretty leading-relaxed max-w-lg mx-auto">
                  Post roles in 60 seconds, match with verified candidates, and hire without agency commissions.
                </p>

                {/* Free Posts Banner */}
                <div className="mt-2 flex justify-center">
                  <div
                    data-testid="free-posts-banner"
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 px-3 py-0.5 text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 font-medium"
                  >
                    <Sparkles size={12} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Your first 2 job posts are free — start hiring at zero cost</span>
                  </div>
                </div>
              </div>

              {/* Responsive Pricing Plans Grid: Mobile (1 col) -> Tablet / Laptop / Desktop (3 cols) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 items-stretch">
                {PRICING_PLANS.map((plan, index) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onStartHiring={onStartHiring}
                    index={index}
                  />
                ))}
              </div>

              {/* Value Highlights Strip (Clean single row, compact & responsive) */}
              <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-border/70 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Go live in 60 seconds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>15 days live visibility</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Direct candidate contact</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Zero commission on hires</span>
                </div>
              </div>

              {/* Tax & Contact Note */}
              <p className="mt-2 text-center text-[10.5px] text-muted-foreground/80 leading-normal">
                Prices exclude 18% GST (calculated at checkout). Need custom enterprise plans?{" "}
                <a
                  href="mailto:support@hirance.com"
                  className="text-foreground font-medium hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors"
                >
                  Contact our hiring team
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
