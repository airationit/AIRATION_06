"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface GooglePlayButtonProps {
  className?: string;
  compact?: boolean;
  animate?: boolean;
}

/**
 * "Get it on Google Play" style button that opens the Play Store listing
 * in a new tab. `compact` renders an icon-only pill for tight spaces.
 */
export function GooglePlayButton({
  className,
  compact = false,
  animate = true,
}: GooglePlayButtonProps) {
  const Tag = animate ? motion.a : "a";
  const motionProps = animate
    ? {
        whileHover: { y: -2, scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring", stiffness: 400, damping: 22 },
      }
    : {};

  return (
    <Tag
      href={siteConfig.links.playStore}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Hirance on Google Play"
      {...(motionProps as any)}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-foreground px-4 py-2.5 text-left text-background shadow-sm",
        animate && "glow-hover",
        className
      )}
    >
      <PlayIcon className="h-6 w-6 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-medium uppercase tracking-wider text-background/70">
            Get it on
          </span>
          <span className="text-sm font-semibold text-background">
            Google Play
          </span>
        </span>
      )}
    </Tag>
  );
}

function PlayIcon({ className }: { className?: string }) {
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
