"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Smartphone,
  Share2,
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
} from "lucide-react";
import { Job } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";
import { formatRelativeTime } from "@/lib/html-utils";
import { RichDescription } from "./rich-description";
import { Footer, InteractiveDots } from "@/components/shared";

interface JobDetailContentProps {
  job: Job;
  relatedJobs?: Job[];
}

export function JobDetailContent({ job, relatedJobs = [] }: JobDetailContentProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

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

        {/* Hero Header Card */}
        <div className="mt-6 rounded-2xl sm:rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-8 backdrop-blur-md shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
              {/* Company Logo / Avatar */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-muted/50 font-mono text-base font-bold text-brand-600 dark:text-brand-400 shadow-2xs overflow-hidden">
                {job.companyLogo && !imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    onError={() => setImgError(true)}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground/90">
                    {job.company}
                  </span>
                  {job.isVerified && (
                    <span
                      title="Verified Employer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="text-[11px]">Verified</span>
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    • {formatRelativeTime(job.postedDate)}
                  </span>
                </div>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
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
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand-500 hover:shadow-sm active:scale-95 shrink-0 cursor-pointer"
              >
                <Smartphone className="h-4 w-4" />
                <span>Swipe to Apply</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {/* Share Ribbon */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-2xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-colors shadow-2xs cursor-pointer"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 transition-colors shadow-2xs cursor-pointer"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Meta Ribbon */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-y-5 gap-x-4 border-t border-border/60 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            <div>
              <span className="text-xs text-muted-foreground font-medium">Offered Salary</span>
              <p className="mt-1 font-mono text-sm sm:text-base font-bold text-foreground flex items-center gap-0.5">
                <IndianRupee className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                <span>{job.salaryRange.replace(/^₹\s*/, "")}</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-muted-foreground font-medium">Job Location</span>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-foreground flex items-center gap-1 truncate">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">{job.location}</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-muted-foreground font-medium">Work Mode & Type</span>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-foreground flex items-center gap-1 truncate">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">{job.workMode || job.jobType}</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-muted-foreground font-medium">Experience Needed</span>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-foreground flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span>{job.experience}</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-muted-foreground font-medium">Openings</span>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-foreground flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span>{job.openings || 1} position(s)</span>
              </p>
            </div>

            {job.department && (
              <div>
                <span className="text-xs text-muted-foreground font-medium">Department</span>
                <p className="mt-1 text-sm sm:text-[15px] font-medium text-foreground flex items-center gap-1 truncate">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{job.department}</span>
                </p>
              </div>
            )}

            <div>
              <span className="text-xs text-muted-foreground font-medium">Verification</span>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-foreground flex items-center gap-1 truncate">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">
                  {job.isVerified ? "Verified Employer" : "Standard Employer"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Details (Left Column) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Required Skills & Tech Stack */}
            {job.skills && job.skills.length > 0 && (
              <section className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-2xs">
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Required Skills & Technologies
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border/70 bg-secondary/70 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground/90 transition-colors hover:border-brand-500/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* About the Role / Description */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                About the Role
              </h2>
              <div className="mt-4">
                <RichDescription
                  content={job.description}
                  fallbackText={`We are hiring a ${job.title} to join ${job.company}. You will collaborate with the team on key objectives, deliver quality outcomes, and advance your career in a dynamic environment.`}
                />
              </div>
            </section>

            {/* Key Responsibilities (if available) */}
            {job.responsibilities && (
              <section className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-2xs">
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Key Responsibilities
                </h2>
                <div className="mt-4">
                  <RichDescription content={job.responsibilities} />
                </div>
              </section>
            )}

            {/* Candidate Eligibility & Requirements */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Candidate Profile & Eligibility
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                  <span className="text-xs text-muted-foreground font-medium">Education</span>
                  <p className="mt-1 font-semibold text-foreground flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                    <span>
                      {job.educationLevel || "Graduation / Diploma or equivalent"}
                      {job.educationSpecialization ? ` (${job.educationSpecialization})` : ""}
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                  <span className="text-xs text-muted-foreground font-medium">Work Shift</span>
                  <p className="mt-1 font-semibold text-foreground flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                    <span>{job.workShift || "Standard Day Shift"}</span>
                  </p>
                </div>

                {job.englishProficiency && (
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                    <span className="text-xs text-muted-foreground font-medium">Language Skills</span>
                    <p className="mt-1 font-semibold text-foreground flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                      <span>{job.englishProficiency}</span>
                    </p>
                  </div>
                )}

                <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                  <span className="text-xs text-muted-foreground font-medium">Hiring Process</span>
                  <p className="mt-1 font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{job.isWalkIn ? "Walk-In Drive Available" : "Direct Online Screening & Chat"}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* How Hiring Works on Hirance */}
            <section className="rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-50/80 via-card to-indigo-50/50 dark:from-brand-950/20 dark:via-card dark:to-indigo-950/20 p-6 sm:p-8 backdrop-blur-md shadow-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-lg font-bold text-foreground">
                  How Fast Hiring Works on Hirance
                </h3>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                No long application forms or ignored resumes. On Hirance, candidates and employers connect directly.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border/60 bg-card/80 p-4">
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">01</span>
                  <h4 className="mt-1 text-sm font-bold text-foreground">Swipe to Apply</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    1-tap application with your verified profile.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/80 p-4">
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">02</span>
                  <h4 className="mt-1 text-sm font-bold text-foreground">Direct Recruiter Chat</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Chat directly with the hiring team without middlemen.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/80 p-4">
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">03</span>
                  <h4 className="mt-1 text-sm font-bold text-foreground">Fast-Track Interview</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Schedule your interview and receive quick updates.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Quick Hirance Apply Box */}
            <div className="rounded-2xl border border-brand-500/25 bg-brand-50/50 dark:bg-brand-950/20 p-6 shadow-xs">
              <h3 className="text-base font-bold text-foreground">
                Apply in Seconds on Hirance App
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Connect directly with {job.company}&apos;s recruitment team. Download the mobile app and swipe to apply.
              </p>

              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand-500 active:scale-98 cursor-pointer"
              >
                <Smartphone className="h-4 w-4" />
                <span>Download App & Apply</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Similar Openings (if available) */}
            {relatedJobs && relatedJobs.length > 0 && (
              <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Similar Openings in {job.cityName || "India"}
                </h3>

                <div className="space-y-2.5 pt-1">
                  {relatedJobs.map((relJob) => (
                    <Link
                      key={relJob.id}
                      href={`/jobs/view/${relJob.slug}`}
                      className="group block rounded-xl border border-border/60 bg-muted/20 p-3 hover:border-brand-500/40 hover:bg-muted/40 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                            {relJob.title}
                          </h4>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {relJob.company} • {relJob.location}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-foreground font-mono shrink-0">
                          {relJob.salaryRange.replace(/^₹\s*/, "₹")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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
