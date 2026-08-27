"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployerCTAProps {
  onPostJob?: () => void;
  onExplorePlans?: () => void;
  className?: string;
}

export function EmployerCTA({
  onPostJob,
  onExplorePlans,
  className,
}: EmployerCTAProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16",
        "bg-[#060c18] text-white border border-white/10 shadow-2xl shadow-slate-950/40",
        className
      )}
      data-testid="employer-cta-section"
    >
      {/* Background Dot Grid & Ambient Cyan Glow */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-blue-600/15 blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Layout */}
      <div className="relative z-10 lg:flex items-center justify-between gap-10">
        {/* Left Column: Offer Chip, Headline, Subtext */}
        <div className="max-w-xl text-left">
          {/* Chip Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 border border-cyan-400/30 px-4 py-1.5 mb-5 select-none">
            <Zap size={14} className="text-cyan-300 fill-cyan-300 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-cyan-200">
              First 2 job posts free
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-balance text-white">
            Ready to Hire <span className="text-gradient-blue">Smarter?</span>
          </h3>

          {/* Subtext */}
          <p className="mt-3.5 text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Post your next job in just 1 minute and start receiving relevant candidates.
          </p>

          {/* Mono Tagline */}
          <p className="mt-2 font-mono-hi text-xs sm:text-sm font-medium text-cyan-300 tracking-wide">
            Less time searching. More time hiring.
          </p>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full sm:w-auto lg:w-72">
          {/* Primary Action Button */}
          {onPostJob ? (
            <button
              type="button"
              onClick={onPostJob}
              data-testid="employer-cta-post-job-button"
              className="group flex items-center justify-center gap-2.5 font-bold text-[#060c18] bg-[#67e8f9] hover:bg-cyan-300 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Post a Job</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <a
              href="https://uat.hirance.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="employer-cta-post-job-button"
              className="group flex items-center justify-center gap-2.5 font-bold text-[#060c18] bg-[#67e8f9] hover:bg-cyan-300 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Post a Job</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}

          {/* Secondary Action Button */}
          {onExplorePlans ? (
            <button
              type="button"
              onClick={onExplorePlans}
              data-testid="employer-cta-explore-plans-button"
              className="flex items-center justify-center font-semibold text-white border border-white/25 hover:border-white/50 hover:bg-white/10 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200"
            >
              Explore Employer Plans
            </button>
          ) : (
            <Link
              href="/request-demo"
              data-testid="employer-cta-explore-plans-button"
              className="flex items-center justify-center font-semibold text-white border border-white/25 hover:border-white/50 hover:bg-white/10 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200"
            >
              Explore Employer Plans
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EmployerCTA;
