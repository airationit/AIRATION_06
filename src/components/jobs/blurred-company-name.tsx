"use client";

import React, { useState, useRef, useEffect } from "react";
import { Lock, Smartphone, ArrowUpRight, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BlurredCompanyNameProps {
  name: string;
  className?: string;
  showLockIcon?: boolean;
  inline?: boolean;
}

export function BlurredCompanyName({
  name,
  className,
  showLockIcon = true,
  inline = false,
}: BlurredCompanyNameProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <span
      ref={containerRef}
      className={cn(
        "relative group/blur inline-flex items-center align-middle select-none",
        inline ? "inline" : "max-w-full"
      )}
    >
      {/* Clickable Natural Blurred Text (NO chips, NO thick borders) */}
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label="Company name is visible on Hirance App. Click for details."
        title="Company name is visible on Hirance App. Click for details."
        className="group/btn inline-flex items-center gap-1.5 transition-colors duration-150 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 rounded"
      >
        {/* Natural Blurred Text */}
        <span
          className={cn(
            "filter blur-[4.5px] select-none transition-all duration-200 text-muted-foreground/90 group-hover/btn:blur-[3.5px] group-hover/btn:text-foreground",
            className
          )}
          aria-hidden="true"
        >
          {name || "Company Name"}
        </span>

        {/* Minimal subtle lock icon */}
        {showLockIcon && (
          <Lock
            className={cn(
              "h-3 w-3 shrink-0 transition-colors duration-200",
              isOpen
                ? "text-brand-600 dark:text-brand-400"
                : "text-muted-foreground/60 group-hover/btn:text-brand-600 dark:group-hover/btn:text-brand-400"
            )}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Floating Popover: Opens DOWNWARDS so it NEVER gets cut off by headers/breadcrumbs */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Company details on Hirance App"
          className="absolute left-0 top-full mt-2.5 z-[100] w-64 sm:w-72 rounded-2xl border border-border/80 bg-white dark:bg-slate-900 p-4 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150 text-left pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Pointer Arrow pointing up to the text */}
          <div className="absolute -top-1.5 left-5 h-3 w-3 rotate-45 border-l border-t border-border/80 bg-white dark:bg-slate-900" />

          {/* Header Row */}
          <div className="relative z-10 flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
                <Smartphone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-foreground leading-tight">
                  Visible on Hirance App
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Verified Recruiter
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Description */}
          <p className="relative z-10 mt-2 text-xs text-muted-foreground leading-relaxed">
            Company name and recruiter contacts are unlocked directly inside the Hirance mobile app.
          </p>

          {/* Action CTA Button */}
          <a
            href={siteConfig.links.playStore}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-600 hover:bg-brand-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>Get Hirance on Google Play</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </span>
  );
}

export default BlurredCompanyName;
