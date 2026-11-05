"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  BarChart3,
  Network,
  Check,
  ArrowUpRight,
  Gift,
  X,
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
  unit: string;
  tokens: string;
  bonus: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaType?: "secondary" | "primary";
  showArrow?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "lite",
    name: "Lite Pack",
    icon: Sprout,
    tagline: "Great for occasional hiring.",
    price: "₹1,999",
    unit: "/ pack (Ex. GST)",
    tokens: "2,100",
    bonus: "inc. 100 Bonus",
    features: [
      "Unlock up to 26 profiles",
      "Tokens valid for 1 year",
      "Unlimited free job posts",
      "Receive unlimited candidate applications",
      "One click job description (JD)",
    ],
    popular: false,
    ctaText: "Buy Lite Pack",
    ctaType: "secondary",
  },
  {
    id: "pro",
    name: "Pro Pack",
    icon: BarChart3,
    tagline: "Perfect for growing teams.",
    price: "₹4,999",
    unit: "/ pack (Ex. GST)",
    tokens: "6,400",
    bonus: "inc. 1400 Bonus",
    features: [
      "Unlock up to 80 profiles",
      "Tokens valid for 1 year",
      "Unlimited free job posts",
      "Receive unlimited candidate applications",
      "One click job description (JD)",
    ],
    popular: true,
    ctaText: "Buy Pro Pack",
    ctaType: "primary",
    showArrow: true,
  },
  {
    id: "max",
    name: "Max Pack",
    icon: Network,
    tagline: "Best value for bulk hiring.",
    price: "₹8,999",
    unit: "/ pack (Ex. GST)",
    tokens: "16,000",
    bonus: "inc. 2000 Bonus",
    features: [
      "Unlock up to 200 profiles",
      "Tokens valid for 1 year",
      "Unlimited free job posts",
      "Receive unlimited candidate applications",
      "One click job description (JD)",
    ],
    popular: false,
    ctaText: "Buy Max Pack",
    ctaType: "secondary",
  },
];

/* 2 Stacked Coins SVG for Tokens Box matching image */
function TokenCoinsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="7" rx="7.5" ry="3.2" />
      <path d="M4.5 7v4.5c0 1.77 3.36 3.2 7.5 3.2s7.5-1.43 7.5-3.2V7" />
      <path d="M4.5 11.5V16c0 1.77 3.36 3.2 7.5 3.2s7.5-1.43 7.5-3.2v-4.5" />
    </svg>
  );
}

interface PlanCardProps {
  plan: PricingPlan;
  onStartHiring?: () => void;
  index: number;
}

export function PlanCard({ plan, onStartHiring, index }: PlanCardProps) {
  const { icon: Icon, popular } = plan;
  const isPrimaryButton = plan.ctaType === "primary";

  const buttonClasses = cn(
    "group w-full flex items-center justify-center gap-1.5 font-semibold py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]",
    isPrimaryButton
      ? "bg-[#155dfc] hover:bg-blue-600 text-white shadow-sm shadow-blue-500/25"
      : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-2xs"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`pricing-card-${plan.id}`}
      className={cn(
        "relative rounded-2xl sm:rounded-3xl flex flex-col justify-between p-4 sm:p-5 lg:p-6 transition-all duration-200 bg-white dark:bg-card",
        popular
          ? "border-2 border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-500/10"
          : "border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
      )}
    >
      {/* Most Popular Top Pill Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0a192f] border border-blue-900/60 px-3.5 py-0.5 text-[10px] font-bold text-white shadow-sm tracking-wider uppercase whitespace-nowrap z-10">
          Most Popular
        </div>
      )}

      {/* Card Header & Content */}
      <div className="relative z-1">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              {plan.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">
              {plan.tagline}
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shadow-2xs">
            <Icon size={16} />
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-foreground">
            {plan.price}
          </span>
          <span className="text-[11px] sm:text-xs text-muted-foreground font-normal">
            {plan.unit}
          </span>
        </div>

        {/* Token Box with Flush Bonus Strip */}
        <div className="mt-3.5 rounded-xl bg-[#f0f7ff] dark:bg-sky-950/30 border border-blue-100/80 dark:border-blue-900/40 overflow-hidden">
          <div className="py-2.5 px-3 flex items-center justify-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <TokenCoinsIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
                Tokens
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight mt-0.5">
                {plan.tokens}
              </span>
            </div>
          </div>

          <div className="bg-[#fef3c7] dark:bg-amber-950/50 border-t border-amber-200/60 dark:border-amber-900/40 py-1.5 px-2.5 text-center flex items-center justify-center gap-1.5 text-[11px] font-semibold text-amber-900 dark:text-amber-200">
            <Gift size={12} className="shrink-0 text-amber-700 dark:text-amber-300" />
            <span>{plan.bonus}</span>
          </div>
        </div>

        {/* Plan Features Checklist with Blue Checkmarks */}
        <div className="mt-5">
          <ul className="space-y-2.5">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-[11px] sm:text-xs leading-snug"
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
      </div>

      {/* CTA Button */}
      <div className="mt-5 sm:mt-6 pt-2">
        {onStartHiring ? (
          <button
            type="button"
            onClick={onStartHiring}
            data-testid={`pricing-start-${plan.id}`}
            className={buttonClasses}
          >
            <span>{plan.ctaText}</span>
            {plan.showArrow && (
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </button>
        ) : (
          <a
            href={siteConfig.links.employer}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`pricing-start-${plan.id}`}
            className={buttonClasses}
          >
            <span>{plan.ctaText}</span>
            {plan.showArrow && (
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
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
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
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

          {/* Centering Wrapper */}
          <div className="relative min-h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-background border border-border/80 shadow-2xl p-4 sm:p-6 md:p-8 text-foreground overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                data-testid="pricing-modal-close"
                aria-label="Close pricing plans"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
              >
                <X size={16} />
              </button>

              {/* Clean Header - No chips over title */}
              <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7 px-6 sm:px-0">
                <h2
                  id="pricing-modal-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                >
                  Post jobs <span className="italic">free.</span> Pay for{" "}
                  <span className="italic">matches.</span>
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground text-pretty max-w-lg mx-auto">
                  Use tokens to access candidate contact details and management features.
                </p>
              </div>

              {/* 3 Cards Grid - Exactly matching image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
                {PRICING_PLANS.map((plan, index) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onStartHiring={onStartHiring}
                    index={index}
                  />
                ))}
              </div>

              {/* Bottom Tax Disclaimer Note */}
              <p className="mt-5 sm:mt-6 text-center text-[10.5px] sm:text-xs text-muted-foreground/80 leading-normal">
                Prices are exclusive of 18% GST · GST calculated at checkout. All plans include the same core hiring platform & features.
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
