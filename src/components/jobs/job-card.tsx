"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Building2,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";
import { Job } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";

interface JobCardProps {
  job: Job;
  index?: number;
}

export function JobCard({ job, index = 0 }: JobCardProps) {
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

  // Compact experience string
  const formatExp = (exp: string) => {
    if (!exp) return "Fresher";
    const lower = exp.toLowerCase();
    if (lower.includes("min") || lower.includes("fresher")) return exp;
    if (lower.includes("0-1") || lower.includes("entry")) return "Fresher";
    return `${exp.replace(/years?|yrs?/gi, "").trim()} yrs`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.1) }}
      className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition-all duration-200 hover:border-brand-500/40 hover:shadow-md hover:shadow-brand-500/5 dark:hover:border-brand-400/30"
    >
      <div className="space-y-2.5">
        {/* Top Header: Logo + Full Title & Company + Salary */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Company Logo */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-muted/40 font-mono text-xs font-bold text-brand-600 dark:text-brand-400 shadow-2xs">
              {job.companyLogo && !imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  onError={() => setImgError(true)}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Full Title (No truncate) & Company Name */}
            <div className="min-w-0 flex-1">
              <Link href={`/jobs/view/${job.slug}`} className="group/title block">
                <h3 className="text-sm sm:text-[15px] font-bold text-foreground group-hover/title:text-brand-600 dark:group-hover/title:text-brand-400 transition-colors leading-snug break-words">
                  {job.title}
                </h3>
              </Link>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <span className="truncate max-w-[200px]">{job.company}</span>
                {job.isVerified && (
                  <CheckCircle2
                    className="h-3.5 w-3.5 shrink-0 text-brand-600 dark:text-brand-400"
                    aria-label="Verified Employer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="flex flex-col items-end shrink-0 pl-1">
            <div className="flex items-center gap-0.5 text-sm sm:text-[15px] font-bold text-foreground tracking-tight">
              <IndianRupee className="h-3.5 w-3.5 shrink-0 text-foreground/80" />
              <span>{job.salaryRange.replace(/^₹\s*/, "")}</span>
            </div>
          </div>
        </div>

        {/* Essential Details Row (Location + Core Pills) */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground pt-0.5">
          {/* Location */}
          <div className="flex items-center gap-1 font-medium text-foreground/90 shrink-0">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="truncate max-w-[160px]">{job.location}</span>
          </div>

          {/* Work Mode */}
          {job.workMode && (
            <div className="inline-flex items-center gap-1 rounded-md bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
              <Building2 className="h-3 w-3 text-muted-foreground" />
              <span>{job.workMode}</span>
            </div>
          )}

          {/* Job Type */}
          {job.jobType && (
            <div className="inline-flex items-center gap-1 rounded-md bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{job.jobType}</span>
            </div>
          )}

          {/* Experience */}
          <div className="inline-flex items-center gap-1 rounded-md bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
            <Briefcase className="h-3 w-3 text-muted-foreground" />
            <span>{formatExp(job.experience)}</span>
          </div>
        </div>
      </div>

      {/* Thin Crisp Footer: Top 2 Skills + Quick Actions */}
      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
        {/* Top 2 Skills */}
        <div className="flex items-center gap-1.5 overflow-hidden pr-2">
          {job.skills && job.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="truncate rounded bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {job.skills && job.skills.length > 2 && (
            <span className="text-[10px] text-muted-foreground font-medium">
              +{job.skills.length - 2}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/jobs/view/${job.slug}`}
            className="text-xs font-semibold text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-1"
          >
            Details
          </Link>
          <a
            href={siteConfig.links.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-brand-500 active:scale-95 cursor-pointer"
          >
            <span>Apply</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
