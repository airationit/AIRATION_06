"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Smartphone,
  Copy,
  Check,
  Building2,
  GraduationCap,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  IndianRupee,
  Users,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Job } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";
import { generateCompanySlug } from "@/lib/api/companies";
import { formatRelativeTime } from "@/lib/html-utils";
import { RichDescription } from "./rich-description";
import { Footer, InteractiveDots } from "@/components/shared";

interface JobDetailContentProps {
  job: Job;
  relatedJobs?: Job[];
}

export function JobDetailContent({ job, relatedJobs = [] }: JobDetailContentProps) {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentHero = heroRef.current;
    if (!currentHero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating header bar when hero card is NOT visible in viewport
        setShowFloatingHeader(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(currentHero);

    return () => {
      observer.unobserve(currentHero);
    };
  }, []);

  // Fallback company initials
  const initials = job.company
    ? job.company
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "HI";

  const companySlug = generateCompanySlug(job.company, job.companyId) || job.company;

  // Share handler
  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const shareUrl = `${siteConfig.url}/jobs/view/${job.slug}`;
  const shareText = `Check out this opening for ${job.title} at ${job.company} on Hirance!`;

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Background Interactive Dots Canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Floating Compact Full-Width Header Bar — Appears when Hero Card scrolls out of view */}
      <AnimatePresence>
        {showFloatingHeader && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 z-[100] border-b border-border/80 bg-background/98 backdrop-blur-md px-4 sm:px-8 py-2.5 shadow-md"
          >
            <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/50 font-mono text-xs font-bold text-brand-600 dark:text-brand-400 overflow-hidden">
                  {job.companyLogo && !imgError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground truncate">
                      {job.company}
                    </span>
                    {job.isVerified && (
                      <span className="inline-flex items-center text-xs text-brand-600 dark:text-brand-400">
                        <CheckCircle2 className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground truncate leading-tight">
                    {job.title}
                  </h3>
                  {job.department && (
                    <p className="text-[11px] text-muted-foreground truncate hidden sm:block">
                      {job.department}
                    </p>
                  )}
                </div>
              </div>

              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:bg-brand-500 active:scale-95 shrink-0 cursor-pointer"
              >
                <Smartphone className="h-4 w-4" />
                <span>Swipe to Apply</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.12),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-6 pb-24 sm:pt-8">
        {/* Navigation / Breadcrumb Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border/50">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <Link href="/jobs" className="hover:text-foreground transition-colors">
              Jobs
            </Link>
            {job.cityName && (
              <>
                <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
                <Link
                  href={`/jobs/jobs-in-${job.citySlug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {job.cityName}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <span className="font-medium text-foreground truncate max-w-[180px] sm:max-w-[280px]">
              {job.title}
            </span>
          </nav>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Jobs</span>
          </Link>
        </div>

        {/* Hero Header Card (Non-sticky, attached ref for observer) */}
        <div ref={heroRef} className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl border border-border/80 bg-card/90 p-4 sm:p-5 backdrop-blur-md shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-6">
            <div className="flex items-start gap-3.5 sm:gap-5 flex-1 min-w-0">
              {/* Company Logo / Avatar */}
              <Link href={`/company/${companySlug}`} className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-border/80 bg-muted/50 font-mono text-sm sm:text-base font-bold text-brand-600 dark:text-brand-400 shadow-2xs overflow-hidden hover:opacity-80 transition-opacity">
                {job.companyLogo && !imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    onError={() => setImgError(true)}
                    className="h-full w-full object-contain p-1.5 sm:p-2"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </Link>

              {/* Title & Metadata */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/company/${companySlug}`} className="text-xs sm:text-sm font-semibold text-foreground/90 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {job.company}
                  </Link>
                  {job.isVerified && (
                    <span
                      title="Verified Employer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="text-[11px]">Verified</span>
                    </span>
                  )}

                </div>

                <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-2xl leading-tight break-words [overflow-wrap:anywhere]">
                  {job.title}
                </h1>

                {job.department && (
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    {job.department}
                  </p>
                )}
              </div>
            </div>

            {/* Top Action / Apply & Share */}
            <div className="flex flex-col items-start lg:items-end justify-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border/60">
              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:bg-brand-500 hover:shadow-sm active:scale-95 shrink-0 cursor-pointer"
              >
                <Smartphone className="h-4 w-4" />
                <span>Swipe to Apply</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Meta Ribbon — Above the horizontal line */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3.5 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-normal text-muted-foreground/70">
              <Briefcase className="h-4 w-4 text-muted-foreground/60 shrink-0" />
              {job.experience}
            </span>
            <span className="text-border/80 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 font-normal text-muted-foreground/70">
              <IndianRupee className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              {job.salaryRange.replace(/^₹\s*/, "")}
            </span>
            <span className="text-border/80 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 font-normal text-muted-foreground/70">
              <Building2 className="h-4 w-4 text-muted-foreground/60 shrink-0" />
              {job.workMode || "Work from Office"}
            </span>
            <span className="text-border/80 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 font-normal text-muted-foreground/70">
              <Clock className="h-4 w-4 text-muted-foreground/60 shrink-0" />
              {job.jobType}
            </span>
            <span className="text-border/80 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 font-normal text-muted-foreground/70">
              <MapPin className="h-4 w-4 text-muted-foreground/60 shrink-0" />
              {job.location}
            </span>
          </div>

          {/* Horizontal Line Divider & Bottom Row — Compact Spacing */}
          <div className="mt-2 border-t border-border/60 pt-2 flex flex-row items-center justify-between gap-2">
            {/* Left: Posted | Openings */}
            <div className="flex flex-wrap items-center gap-x-3 text-xs sm:text-sm text-muted-foreground">
              <span className="font-normal text-muted-foreground/75">{formatRelativeTime(job.postedDate)}</span>
              <span className="text-border/80">|</span>
              <span>
                Openings: <span className="font-medium text-foreground">{job.openings || 1}</span>
              </span>
            </div>

            {/* Right: Share Buttons aligned with Swipe to Apply (Transparent & Icon-Only) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy Link"
                title={copied ? "Copied!" : "Copy Link"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                )}
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#25D366] hover:bg-[#25D366]/10 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors cursor-pointer"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Details (Left Column - Unified Single Card Container) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-8 shadow-2xs space-y-6 sm:space-y-8">
              {/* About the Role / Description */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                  Responsibilities & Requirements
                </h2>
                <div className="mt-3 sm:mt-4">
                  <RichDescription
                    content={job.description}
                    fallbackText={`We are hiring a ${job.title} to join ${job.company}. You will collaborate with the team on key objectives, deliver quality outcomes, and advance your career in a dynamic environment.`}
                  />
                </div>
              </section>

              {/* Key Responsibilities (if available) */}
              {job.responsibilities && (
                <section className="pt-6 sm:pt-8 border-t border-border/60">
                  <h2 className="text-base font-medium tracking-tight text-foreground">
                    Key Responsibilities
                  </h2>
                  <div className="mt-3 sm:mt-4">
                    <RichDescription content={job.responsibilities} />
                  </div>
                </section>
              )}

              {/* Required Skills & Tech Stack */}
              {job.skills && job.skills.length > 0 && (
                <section className="pt-6 sm:pt-8 border-t border-border/60">
                  <h2 className="text-base font-medium tracking-tight text-foreground">
                    Required Skills & Technologies
                  </h2>
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border/70 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-foreground/90 transition-colors hover:border-brand-500/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Candidate Eligibility & Requirements */}
              <section className="pt-6 sm:pt-8 border-t border-border/60">
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  Candidate Profile & Eligibility
                </h2>
                <div className="mt-3 flex flex-col sm:flex-row gap-0">
                  {/* Left column */}
                  <div className="flex-1 divide-y divide-border/60">
                    <div className="flex items-center justify-between py-2.5 sm:pr-5 text-xs sm:text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4 shrink-0" />
                        Education
                      </span>
                      <span className="font-medium text-foreground text-right">
                        {job.educationLevel || "Graduation / Diploma"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 sm:pr-5 text-xs sm:text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        Language
                      </span>
                      <span className="font-medium text-foreground">
                        {job.englishProficiency || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden sm:block w-px bg-border/60 mx-1 self-stretch" />

                  {/* Right column */}
                  <div className="flex-1 divide-y divide-border/60">
                    <div className="flex items-center justify-between py-2.5 sm:pl-5 text-xs sm:text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0" />
                        Work Shift
                      </span>
                      <span className="font-medium text-foreground">{job.workShift || "Day Shift"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 sm:pl-5 text-xs sm:text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 shrink-0" />
                        Hiring
                      </span>
                      <span className="font-medium text-foreground">
                        {job.isWalkIn ? "Walk-In" : "Online Screening"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">

            {/* Similar Openings */}
            {relatedJobs && relatedJobs.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Similar Openings
                  </h3>

                </div>

                <div className="space-y-3">
                  {relatedJobs.slice(0, 3).map((relJob) => (
                    <Link
                      key={relJob.id}
                      href={`/jobs/view/${relJob.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-border/80 bg-card p-4 shadow-2xs transition-all hover:shadow-sm space-y-3"
                    >
                      {/* Top Header: Logo on Left, Title & Company on Right */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-md border border-border/60 bg-muted/40 flex items-center justify-center overflow-hidden">
                          {relJob.companyLogo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={relJob.companyLogo}
                              alt={relJob.company}
                              className="h-full w-full object-contain p-1.5"
                            />
                          ) : (
                            <span className="text-xs font-bold text-foreground/80">
                              {relJob.company.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                            {relJob.title}
                          </h4>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 font-medium">
                            {relJob.company}
                          </p>
                        </div>
                      </div>

                      {/* Rows Container with top padding & tight line spacing */}
                      <div className="pt-1 space-y-1.5">
                        {/* Row 1: Experience & Work Type (Left) · Salary (Right) */}
                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2.5">
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="h-3.5 w-3.5 shrink-0" />
                              {relJob.experience}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 shrink-0" />
                              {relJob.jobType}
                            </span>
                          </div>
                          <span className="flex items-center gap-0.5 shrink-0 font-medium text-foreground">
                            <IndianRupee className="h-3.5 w-3.5 shrink-0" />
                            {relJob.salaryRange.replace(/^₹\s*/, "")}
                          </span>
                        </div>

                        {/* Row 2: Location (Left) · Posted Date (Right) */}
                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span className="truncate">{relJob.location}</span>
                          </span>
                          <span className="shrink-0 text-[11px] text-muted-foreground font-medium">
                            {formatRelativeTime(relJob.postedDate)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {relatedJobs.length > 3 && (
                  <div className="pt-1 text-center">
                    <Link
                      href={job.roleName ? `/jobs?role=${encodeURIComponent(job.roleName)}` : "/jobs"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline transition-all py-1"
                    >
                      <span>View All {relatedJobs.length} Similar Jobs</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Premium Hirance App Card */}
            <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/5 via-card to-brand-500/10 p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Apply in Seconds
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Direct connect on Hirance App
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect directly with {job.company}&apos;s recruitment team. Download the mobile app and swipe to apply instantly.
              </p>

              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-brand-500 active:scale-98 cursor-pointer"
              >
                <span>Download App & Apply</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions — Full Width */}
        <section id="job-faq" className="mt-10 space-y-4">
          <div className="text-center space-y-1 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground text-center">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Common questions about this {job.title} opening at {job.company}.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xs divide-y divide-border/60">
            {[
              // 4 English FAQs (1-4)
              {
                q: `What is the eligibility criteria to apply for this ${job.title} job in ${job.cityName || job.location || "Lucknow"}?`,
                a: `Candidates must have ${job.educationLevel || "Graduation / Diploma or equivalent"} qualification and ${job.experience || "relevant"} experience for this ${job.title} job in ${job.cityName || job.location || "Lucknow"}.`,
              },
              {
                q: `How much salary can I expect for this ${job.title} job at ${job.company}?`,
                a: `You can expect a monthly salary range of ${job.salaryRange.replace(/^₹\s*/, "₹")} for this ${job.title} vacancy at ${job.company} in ${job.cityName || job.location || "Lucknow"}.`,
              },
              {
                q: `Is this ${job.title} vacancy in ${job.cityName || job.location || "Lucknow"} a work from home job?`,
                a: job.workMode && job.workMode.toLowerCase().includes("home")
                  ? `Yes, this is a remote / work from home ${job.title} job at ${job.company}.`
                  : `No, this is an on-site ${job.workMode || "Work from Office"} job based in ${job.location || "Lucknow"}.`,
              },
              {
                q: `How do I apply for this ${job.title} job at ${job.company}?`,
                a: `Click "Swipe to Apply" on Hirance, download the mobile app, and apply directly to ${job.company}'s recruitment team for ${job.title} jobs in ${job.cityName || job.location || "Lucknow"}.`,
              },
              // 3 Hinglish FAQs (5-7 for SEO)
              {
                q: `Kya is ${job.title} job in ${job.cityName || job.location || "Lucknow"} ke liye freshers apply kar sakte hain?`,
                a: job.experience && (job.experience.toLowerCase().includes("fresher") || job.experience.toLowerCase().includes("0-1"))
                  ? `Haan, ${job.company} mein is ${job.title} job in ${job.cityName || job.location || "Lucknow"} ke liye freshers bhi apply kar sakte hain.`
                  : `Is role ke liye minimum ${job.experience || "relevant experience"} required hai. Detailed eligibility ke liye candidate profile check karein.`,
              },
              {
                q: `${job.company} mein is ${job.title} job in ${job.cityName || job.location || "Lucknow"} ki exact location kya hai?`,
                a: `Is ${job.title} job in ${job.cityName || job.location || "Lucknow"} ki official hiring location ${job.location || "Lucknow"} hai. Direct HR connection ke liye Hirance app se apply karein.`,
              },
              {
                q: `Hirance app par ${job.title} jobs in ${job.cityName || job.location || "Lucknow"} ke liye apply karne ka koi charge hai kya?`,
                a: `Nahi, Hirance app par ${job.title} jobs in ${job.cityName || job.location || "Lucknow"} ke liye apply karna 100% free hai. Aap direct employer hiring team se bina kisi middleman ke connect kar sakte hain.`,
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-3 sm:py-3.5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`job-faq-answer-${idx}`}
                    className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg py-1"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`job-faq-answer-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 pb-1 text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Mobile Sticky Bottom Floating Apply Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border/80 bg-card/95 backdrop-blur-md p-3.5 lg:hidden shadow-lg">
        <div className="container mx-auto px-2 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-foreground truncate">
              {job.title}
            </p>
            <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 font-mono">
              {job.salaryRange}
            </p>
          </div>

          <a
            href={siteConfig.links.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-brand-500 shrink-0 cursor-pointer"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Apply on App</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.167-3.485-8.414" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4" />
    </svg>
  );
}
