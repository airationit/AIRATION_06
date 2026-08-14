"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Building2,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Job } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";

interface JobCardProps {
  job: Job;
  index?: number;
}

export function JobCard({ job, index = 0 }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-card/90 hover:shadow-lg hover:shadow-blue-500/5"
    >
      <div>
        {/* Top row: Company info + AI Match score */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 text-foreground shadow-inner">
              <Building2 className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">
                  {job.company}
                </span>
                {job.isVerified && (
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-blue-500"
                    title="Verified Employer"
                  />
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {job.department}
              </span>
            </div>
          </div>

          {/* AI Match Score Badge - Hirance Signature */}
          <div className="flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3 w-3" />
            <span>{job.matchScore}% Match</span>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {job.title}
        </h3>

        {/* Meta Info: Location, Type, Experience, Salary */}
        <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>{job.experience}</span>
          </div>
        </div>

        {/* Salary Highlight */}
        <div className="mt-3 font-mono text-sm font-medium text-foreground">
          {job.salaryRange}
        </div>

        {/* Skills Preview */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-border/40 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
        <span className="text-[11px] text-muted-foreground">
          Posted {new Date(job.postedDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
        </span>

        <a
          href={siteConfig.links.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
        >
          <span>Swipe to Apply</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
