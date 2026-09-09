"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface FloatingAppBannerProps {
  className?: string;
  delayMs?: number;
  reappearDelayMs?: number;
}

/* ─── Google Play SVG Icon ─── */
function GooglePlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden="true"
      role="img"
    >
      <path
        fill="#00D3FF"
        d="M47 24.6c-5.2 5.6-8.3 14.2-8.3 25.4v412c0 11.2 3.1 19.8 8.3 25.4l1.4 1.3 230.9-230.9v-5.4L48.4 23.4 47 24.6z"
      />
      <path
        fill="#00F076"
        d="M356.4 343.9l-77-77v-5.4l77-77 1.7 1 91.2 51.8c26 14.8 26 39 0 53.8l-91.2 51.8-1.7 1z"
      />
      <path
        fill="#FFD900"
        d="M358.1 342.9l-78.7-78.7L47 497.3c8.6 9.1 22.7 10.2 38.7 1.1l272.4-155.5z"
      />
      <path
        fill="#F43249"
        d="M358.1 185.5L85.7 30C69.7 20.9 55.6 22 47 31.1l232.4 232.4 78.7-78z"
      />
    </svg>
  );
}

const STORAGE_KEY = "hirance_app_banner_dismissed_at";

export function FloatingAppBanner({
  className,
  delayMs = 1200,
  reappearDelayMs = 45000, // 45 seconds after dismiss
}: FloatingAppBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);

    try {
      const dismissedAt = sessionStorage.getItem(STORAGE_KEY);
      if (dismissedAt) {
        const elapsed = Date.now() - parseInt(dismissedAt, 10);
        if (elapsed < reappearDelayMs) {
          // Wait remaining time of the 45s window
          const remaining = reappearDelayMs - elapsed;
          timerRef.current = setTimeout(() => {
            setIsVisible(true);
            sessionStorage.removeItem(STORAGE_KEY);
          }, remaining);
        } else {
          // 45s has already elapsed
          sessionStorage.removeItem(STORAGE_KEY);
          timerRef.current = setTimeout(() => {
            setIsVisible(true);
          }, delayMs);
        }
      } else {
        // Initial delay
        timerRef.current = setTimeout(() => {
          setIsVisible(true);
        }, delayMs);
      }
    } catch {
      timerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delayMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delayMs, reappearDelayMs]);

  const handleDismiss = () => {
    setIsVisible(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Ignore sessionStorage write errors
    }

    // Schedule re-appearance after 45 seconds
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    }, reappearDelayMs);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
          }}
          aria-label="Download Hirance Mobile App"
          role="complementary"
          className={cn(
            "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 select-none",
            "rounded-2xl border border-slate-200/90 dark:border-slate-800/90",
            "bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-md",
            "shadow-[0_12px_36px_-6px_rgba(0,0,0,0.14),0_4px_12px_-2px_rgba(0,0,0,0.06)]",
            "dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.65)]",
            "p-3 sm:p-3.5 max-w-[calc(100vw-2rem)]",
            className
          )}
        >
          {/* Close / Dismiss Button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss app download banner"
            className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-3.5 pr-4 sm:pr-5">
            {/* 1. Left Column: QR Code & Text */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[66px] h-[66px] sm:w-[72px] sm:h-[72px] bg-white rounded-xl p-1 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-xs">
                <Image
                  src="/images/qr.png"
                  alt="QR code to download Hirance app"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain rounded-md"
                  priority
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 text-center mt-1 leading-tight">
                Scan the QR
              </span>
            </div>

            {/* 2. Middle Column: Vertical Divider with "Or" */}
            <div className="flex items-center self-stretch select-none px-0.5">
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-px h-full bg-slate-200 dark:bg-slate-800/80" />
                <span className="absolute bg-white dark:bg-[#0c1322] px-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Or
                </span>
              </div>
            </div>

            {/* 3. Right Column: Google Play Button & App Info */}
            <div className="flex flex-col gap-2.5">
              {/* Google Play Store Button */}
              <div>
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Hirance on Google Play Store"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0a0d14] hover:bg-black text-white px-3 py-1.5 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-xs border border-white/10 group"
                >
                  <GooglePlayIcon className="h-4 w-4 shrink-0" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[7.5px] uppercase tracking-wider text-slate-300 font-medium">
                      GET IT ON
                    </span>
                    <span className="text-[11px] font-bold text-white mt-0.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>

              {/* Hirance App Branding & Value Proposition Row */}
              <div className="flex items-center gap-2.5 pl-0.5">
                {/* Hirance App Icon */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white p-0.5 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-center shrink-0">
                  <Image
                    src="/images/icon.png"
                    alt="Hirance App Icon"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain rounded-[6px]"
                  />
                </div>

                {/* App Name & Tagline */}
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                      Hirance Job Search
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                    Swipe. Match. Get Hired.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default FloatingAppBanner;
