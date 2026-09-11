"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Rocket } from "lucide-react";
import { useLaunchConfig } from "@/hooks/use-launch-config";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
interface LaunchWrapperProps {
  children: React.ReactNode;
}

export function LaunchWrapper({ children }: LaunchWrapperProps) {
    const pathname = usePathname();
  const { hasLaunched, launchDateStr, timeLeft, isLoading } =
    useLaunchConfig();

    // Allow access to /delete-account (and legal routes) even during launch countdown
  const isExemptRoute =
    pathname === "/delete-account" ||
    pathname?.startsWith("/delete-account/") ||
    pathname === "/privacy" ||
    pathname?.startsWith("/privacy-policy") ||
    pathname?.startsWith("/mobile-privacy-policy") ||
    pathname === "/terms" ||
    pathname?.startsWith("/terms-and-conditions");


  // Formatted date (e.g. "September 21, 2026")
  const formattedDate = useMemo(() => {
    const d = new Date(launchDateStr);
    return isNaN(d.getTime())
      ? "September 21, 2026"
      : d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
  }, [launchDateStr]);

   // If already launched or viewing an exempt page like /delete-account, render full page
  if ((!isLoading && hasLaunched) || isExemptRoute) {
    return <>{children}</>;
  }

  const countdownUnits = [
    { label: "DAYS", val: timeLeft.days },
    { label: "HOURS", val: timeLeft.hours },
    { label: "MINUTES", val: timeLeft.minutes },
    { label: "SECONDS", val: timeLeft.seconds },
  ];

  return (
    <div className="relative min-h-dvh flex flex-col justify-between overflow-x-clip bg-gradient-to-b from-[#eef6ff] via-[#f7faff] to-[#ffffff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white select-none font-sans">
      {/* ─────────────────────────────────────────────────────────────
          BACKGROUND DECORATIVE WAVES
         ───────────────────────────────────────────────────────────── */}
      {/* Bottom Left Organic Soft Wave */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full md:w-3/4 max-w-3xl h-[280px] sm:h-[400px] -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 700 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
        >
          <path
            d="M-100 400 L-100 120 C80 140 180 240 320 250 C460 260 560 330 700 370 L700 400 Z"
            fill="url(#leftWaveGrad)"
            opacity="0.6"
          />
          <path
            d="M-100 400 L-100 190 C100 180 220 280 360 300 C500 320 600 370 700 395 L700 400 Z"
            fill="url(#leftWaveGrad2)"
            opacity="0.75"
          />
          <defs>
            <linearGradient id="leftWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="leftWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Right Organic Soft Wave */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-full md:w-2/3 max-w-2xl h-[240px] sm:h-[350px] -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
        >
          <path
            d="M700 350 L700 140 C520 150 400 230 260 250 C140 270 50 320 -50 340 L-50 350 Z"
            fill="url(#rightWaveGrad)"
            opacity="0.55"
          />
          <defs>
            <linearGradient id="rightWaveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HEADER / TOP NAVIGATION
         ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 w-full px-6 py-5 sm:px-10 lg:px-16 transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/icon.png"
                alt={`${siteConfig.name} icon`}
                width={36}
                height={36}
                priority
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/images/wordmark-navy.png"
                alt={siteConfig.name}
                width={116}
                height={28}
                priority
                className="h-6 w-auto object-contain dark:hidden transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/images/wordmark-white.png"
                alt={siteConfig.name}
                width={116}
                height={28}
                priority
                className="hidden h-6 w-auto object-contain dark:block transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <span className="hidden md:inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              <span>Swipe</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>Match</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>Get Hired</span>
            </span>
          </div>

          {/* Status & Support */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="tracking-wide">Countdown Synchronized</span>
            </div>

            <a
              href="mailto:support@hirance.com"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 dark:border-blue-900 bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all shadow-xs"
            >
              <Mail className="h-4 w-4 text-blue-500" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN HERO & COUNTDOWN
         ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:py-14">
        <div className="relative w-full">
          {/* 3D Rocket Illustration on Left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              x: { duration: 0.8 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hidden md:block absolute -left-10 lg:-left-20 xl:-left-28 top-6 lg:top-4 w-32 sm:w-40 lg:w-48 xl:w-52 pointer-events-none z-10 select-none"
            aria-hidden="true"
          >
            <Image
              src="/images/launch_rocket_final.png"
              alt="Hirance Launch Rocket"
              width={240}
              height={270}
              priority
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Floating Accent Marks on Right */}
          <div
            className="hidden lg:block absolute right-2 xl:right-10 top-24 pointer-events-none opacity-85 select-none"
            aria-hidden="true"
          >
            <div className="relative w-8 h-8">
              <div className="absolute top-0 right-3 w-1.5 h-6 bg-blue-500 rounded-full rotate-[35deg]" />
              <div className="absolute bottom-0 right-0 w-1.5 h-6 bg-blue-400 rounded-full rotate-[35deg]" />
            </div>
          </div>

          {/* Kicker Badge with Horizontal Dividers */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-14 h-px bg-blue-200/80 dark:bg-blue-800/60" />
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs sm:text-[13px] font-bold tracking-wider uppercase shadow-2xs">
              <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 fill-blue-500/20" />
              <span>OFFICIAL PLATFORM LAUNCH</span>
            </div>
            <div className="w-8 sm:w-14 h-px bg-blue-200/80 dark:bg-blue-800/60" />
          </div>

          {/* Headline */}
          <h1 className="text-center font-black tracking-tight text-slate-900 dark:text-white text-3xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.08] max-w-4xl mx-auto">
            We Are Launching
            <span className="block text-blue-600 dark:text-blue-500 mt-1 sm:mt-2">
              On {formattedDate}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-center text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            India’s swipe-based hiring platform is almost here. Fastest way to Post &amp; Apply for jobs —{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400 block sm:inline">
              No forms, No scrolling, No waiting.
            </span>
          </p>

          {/* Countdown Card */}
          <div className="relative mt-8 sm:mt-12 w-full max-w-3xl mx-auto rounded-3xl bg-white dark:bg-slate-900/90 p-4 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(37,99,235,0.07),0_2px_10px_rgba(0,0,0,0.02)] border border-blue-100/70 dark:border-slate-800">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {countdownUnits.map((unit, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-2xl bg-[#f4f8fe] dark:bg-slate-950/60 border border-blue-100/50 dark:border-slate-800/80 py-5 px-3 sm:py-7 sm:px-5 md:py-8 md:px-6 transition-all duration-300 hover:bg-[#eef5fd] hover:border-blue-200/80 hover:scale-[1.02] shadow-2xs group"
                >
                  {/* Value */}
                  <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {String(unit.val).padStart(2, "0")}
                  </span>

                  {/* Label */}
                  <span className="mt-2.5 sm:mt-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 w-full border-t border-blue-100/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 px-6 py-6 text-center text-xs text-slate-500 dark:text-slate-400 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Hirance Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
             <span className="text-border">•</span>
            <Link href="/mobile-privacy-policy" className="hover:text-foreground transition-colors">
              Mobile Privacy
            </Link>
            <span className="text-border">•</span>
            <Link href="/delete-account" className="hover:text-foreground transition-colors">
              Delete Account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

