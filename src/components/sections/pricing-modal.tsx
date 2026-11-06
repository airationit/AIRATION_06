"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  BarChart3,
  Network,
  Coins,
  Gift,
  Check,
  ArrowUpRight,
  X,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface TokenPricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  tokens: string;
  bonus?: string;
  icon: LucideIcon;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "primary";
  hasArrow?: boolean;
}

export const TOKEN_PRICING_PLANS: TokenPricingPlan[] = [
  {
    id: "lite",
    name: "Lite Pack",
    tagline: "Great for occasional hiring",
    price: "₹1,999",
    priceSuffix: "/ pack (Ex. GST)",
    tokens: "2,000",
    icon: Sprout,
    popular: false,
    features: [
      "Unlock up to 25 profiles",
      "Tokens valid for 1 year",
      "Unlimited free job posts",
      "Receive unlimited candidate applications",
      "One click job description (JD)",
    ],
    buttonText: "Buy Lite Pack",
    buttonVariant: "outline",
    hasArrow: false,
  },
  {
    id: "pro",
    name: "Pro Pack",
    tagline: "Perfect for growing teams.",
    price: "₹4,999",
    priceSuffix: "/ pack (Ex. GST)",
    tokens: "6,400",
    bonus: "Inc. 1400 Bonus",
    icon: BarChart3,
    popular: true,
    features: [
      "Unlock up to 80 profiles",
      "Tokens valid for 1 year",
      "Unlimited free job posts",
      "Receive unlimited candidate applications",
      "One click job description (JD)",
    ],
    buttonText: "Buy Pro Pack",
    buttonVariant: "primary",
    hasArrow: true,
  },
  {
    id: "max",
    name: "Max Pack",
    tagline: "Best value for bulk hiring.",
    price: "₹8,999",
    priceSuffix: "/ pack (Ex. GST)",
    tokens: "16,000",
    bonus: "Inc. 2000 Bonus",
    icon: Network,
    popular: false,
    features: [
      "Unlock up to 200 profiles",
      "Tokens valid for 1 year",
      "Unlimited free job posts",
      "Receive unlimited candidate applications",
      "One click job description (JD)",
    ],
    buttonText: "Buy Max Pack",
    buttonVariant: "outline",
    hasArrow: false,
  },
];

// Backward-compatibility aliases
export type PricingPlan = TokenPricingPlan;
export const PRICING_PLANS = TOKEN_PRICING_PLANS;

interface PlanCardProps {
  plan: TokenPricingPlan;
  onStartHiring?: () => void;
  index: number;
}

function PlanCard({ plan, onStartHiring, index }: PlanCardProps) {
  const { icon: Icon, popular } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`pricing-card-${plan.id}`}
      className={cn(
        "relative rounded-2xl flex flex-col p-4 sm:p-5 transition-all duration-200",
        popular
          ? "border-2 border-blue-600 dark:border-blue-500 bg-card shadow-lg shadow-blue-500/10"
          : "border border-border/80 bg-card hover:border-border transition-colors shadow-2xs"
      )}
    >
      {/* Most Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 dark:bg-blue-600 px-3 py-0.5 text-[10px] font-bold text-white shadow-xs tracking-wider uppercase whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Plan Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            {plan.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">
            {plan.tagline}
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
          <Icon size={16} />
        </div>
      </div>

      {/* Pricing Block */}
      <div className="mt-3.5 pb-0.5">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-foreground">
            {plan.price}
          </span>
          <span className="text-[11px] sm:text-xs text-muted-foreground font-normal">
            {plan.priceSuffix}
          </span>
        </div>
      </div>

      {/* Token Box */}
      <div className="mt-3 mb-4 rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900/50">
        <div
          className={cn(
            "bg-[#F0F6FF] dark:bg-blue-950/40 px-3 py-2.5 flex flex-col items-center justify-center text-center",
            !plan.bonus && "rounded-xl"
          )}
        >
          <Coins className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Tokens
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight mt-0.5">
            {plan.tokens}
          </span>
        </div>
        {plan.bonus && (
          <div className="bg-[#FEF3C7] dark:bg-amber-950/60 border-t border-amber-200/80 dark:border-amber-900/50 py-1 px-2.5 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#92400E] dark:text-amber-300">
            <Gift className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{plan.bonus}</span>
          </div>
        )}
      </div>

      {/* Plan Features & CTA */}
      <div className="flex-1 flex flex-col justify-between">
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-[11px] sm:text-xs text-muted-foreground leading-snug"
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

        {/* CTA Button - Redirects directly to Employer Dashboard */}
        <div className="mt-5 pt-1">
          <a
            href={siteConfig.links.employer}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (onStartHiring) onStartHiring();
            }}
            data-testid={`pricing-buy-${plan.id}`}
            className={cn(
              "w-full flex items-center justify-center gap-1.5 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]",
              plan.buttonVariant === "primary"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 shadow-md"
                : "border border-border hover:border-blue-600 bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80"
            )}
          >
            <span>{plan.buttonText}</span>
            {plan.hasArrow && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />}
          </a>
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

export function TokenPricingContent({ onStartHiring }: { onStartHiring?: () => void }) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header (Clean, crisp, no chips over title) */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-foreground leading-tight">
          Post jobs <span className="font-serif italic font-normal">free.</span> Pay for{" "}
          <span className="font-serif italic font-normal">matches.</span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-[13px] text-muted-foreground text-pretty leading-relaxed max-w-lg mx-auto">
          Use tokens to access candidate contact details and management features.
        </p>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
        {TOKEN_PRICING_PLANS.map((plan, index) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onStartHiring={onStartHiring}
            index={index}
          />
        ))}
      </div>

      {/* Footer Tax & Features Note */}
      <p className="mt-5 sm:mt-6 text-center text-[11px] sm:text-xs text-muted-foreground/80 leading-normal">
        Prices are exclusive of 18% GST • GST calculated at checkout. All plans include the same core hiring platform &amp; features.
      </p>
    </div>
  );
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
          <div className="relative min-h-full flex items-center justify-center p-3 sm:p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-background border border-border/80 shadow-2xl p-4 sm:p-6 md:p-7 text-foreground overflow-hidden my-auto max-h-[92vh] flex flex-col"
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

              <div className="overflow-y-auto pr-1">
                {/* Header (Clean, crisp, no chips over title) */}
                <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6 px-6 sm:px-0">
                  <h2
                    id="pricing-modal-title"
                    className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-foreground leading-tight"
                  >
                    Post jobs <span className="font-serif italic font-normal">free.</span> Pay for{" "}
                    <span className="font-serif italic font-normal">matches.</span>
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-[13px] text-muted-foreground text-pretty leading-relaxed max-w-lg mx-auto">
                    Use tokens to access candidate contact details and management features.
                  </p>
                </div>

                {/* 3 Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
                  {TOKEN_PRICING_PLANS.map((plan, index) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onStartHiring={onStartHiring}
                      index={index}
                    />
                  ))}
                </div>

                {/* Footer Tax & Features Note */}
                <p className="mt-5 sm:mt-6 text-center text-[11px] sm:text-xs text-muted-foreground/80 leading-normal">
                  Prices are exclusive of 18% GST • GST calculated at checkout. All plans include the same core hiring platform &amp; features.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
