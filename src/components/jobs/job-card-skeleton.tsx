"use client";

import { cn } from "@/lib/utils";

interface JobCardSkeletonProps {
  count?: number;
}

export function JobCardSkeleton({ count = 6 }: JobCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/60 dark:bg-card/40 p-4 backdrop-blur-sm overflow-hidden animate-pulse"
        >
          {/* Subtle shimmer gradient overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent pointer-events-none" />

          <div className="space-y-3">
            {/* Top Header: Logo + Title/Company + Salary */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Logo Skeleton */}
                <div className="h-10 w-10 shrink-0 rounded-lg bg-muted/80 dark:bg-muted/50" />

                {/* Title & Company Skeleton */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-4/5 rounded-md bg-muted/80 dark:bg-muted/60" />
                  <div className="h-3 w-1/2 rounded-md bg-muted/60 dark:bg-muted/40" />
                </div>
              </div>

              {/* Salary Skeleton */}
              <div className="flex flex-col items-end shrink-0 space-y-1.5 pl-1">
                <div className="h-4 w-20 rounded-md bg-muted/80 dark:bg-muted/60" />
                <div className="h-3 w-14 rounded-md bg-muted/50 dark:bg-muted/30" />
              </div>
            </div>

            {/* Essential Details Row (Location + Badges) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="h-5 w-24 rounded-md bg-muted/60 dark:bg-muted/40" />
              <div className="h-5 w-20 rounded-md bg-muted/50 dark:bg-muted/30" />
              <div className="h-5 w-18 rounded-md bg-muted/50 dark:bg-muted/30" />
              <div className="h-5 w-16 rounded-md bg-muted/50 dark:bg-muted/30" />
            </div>
          </div>

          {/* Card Footer: Skills + Actions */}
          <div className="mt-3.5 flex items-center justify-between border-t border-border/50 pt-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-16 rounded bg-muted/50 dark:bg-muted/30" />
              <div className="h-4 w-14 rounded bg-muted/50 dark:bg-muted/30" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-6 w-12 rounded bg-muted/40" />
              <div className="h-7 w-16 rounded-lg bg-brand-500/20 dark:bg-brand-500/30" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
