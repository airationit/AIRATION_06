"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";

export interface PageMeta {
  title: string;
  badge: string;
  direction?: "left" | "up";
  isFooter?: boolean;
}

interface StackedPagesContainerProps {
  pages: React.ReactNode[];
  pageMeta?: PageMeta[];
  className?: string;
}

interface StackedPageCardProps {
  children: React.ReactNode;
  index: number;
  total: number;
  meta?: PageMeta;
  hasFirstPageLeft?: boolean;
  scrollYProgress: MotionValue<number>;
  isFooter?: boolean;
}

function StackedPageCard({
  children,
  index,
  total,
  meta,
  hasFirstPageLeft = false,
  scrollYProgress,
  isFooter = false,
}: StackedPageCardProps) {
  const numTransitions = hasFirstPageLeft ? total : Math.max(1, total - 1);
  const step = 1 / numTransitions;

  const isLeft = meta?.direction === "left";

  // 60% of each step is a pure stationary hold phase; the remaining 40% is the slide-in phase
  const holdFraction = 0.60;

  const slideStart = hasFirstPageLeft
    ? (index + holdFraction) * step
    : Math.max(0, (index - 1 + holdFraction) * step);
  const slideFinish = hasFirstPageLeft
    ? (index + 1) * step
    : index * step;

  // Next section transition calculation for blurring the current section as next slides over
  const nextIndex = index + 1;
  const hasNext = nextIndex < total;

  const nextSlideStart = hasNext
    ? hasFirstPageLeft
      ? (nextIndex + holdFraction) * step
      : Math.max(0, (nextIndex - 1 + holdFraction) * step)
    : 1;

  const nextSlideFinish = hasNext
    ? hasFirstPageLeft
      ? (nextIndex + 1) * step
      : nextIndex * step
    : 1;

  // Slide horizontally from left (-100% -> 0%)
  const xTransform = useTransform(
    scrollYProgress,
    [0, slideStart, slideFinish, 1],
    ["-100%", "-100%", "0%", "0%"]
  );

  // Slide vertically from bottom (100% -> 0%)
  const yTransform = useTransform(
    scrollYProgress,
    [0, slideStart, slideFinish, 1],
    ["100%", "100%", "0%", "0%"]
  );

  // Blur amount when covered by next section (0px -> 16px)
  const blurAmount = useTransform(
    scrollYProgress,
    hasNext ? [0, nextSlideStart, nextSlideFinish, 1] : [0, 1],
    hasNext ? [0, 0, 16, 16] : [0, 0]
  );
  const filterBlur = useTransform(blurAmount, (val) => (val > 0.1 ? `blur(${val}px)` : "none"));

  // Scale down slightly when covered (1.0 -> 0.95)
  const scaleValue = useTransform(
    scrollYProgress,
    hasNext ? [0, nextSlideStart, nextSlideFinish, 1] : [0, 1],
    hasNext ? [1, 1, 0.95, 0.95] : [1, 1]
  );

  // Dim opacity when covered (1.0 -> 0.4)
  const opacityValue = useTransform(
    scrollYProgress,
    hasNext ? [0, nextSlideStart, nextSlideFinish, 1] : [0, 1],
    hasNext ? [1, 1, 0.4, 0.4] : [1, 1]
  );

  const x = isLeft ? xTransform : "0%";
  const y = isLeft ? "0%" : index === 0 ? "0%" : yTransform;
  const zIndex = (index + 1) * 10;

  if (isFooter) {
    return (
      <motion.div
        style={{
          x: "0%",
          y: yTransform,
          zIndex: zIndex + 20,
        }}
        className="absolute bottom-0 left-0 right-0 w-full h-auto overflow-hidden bg-[#0B1528] border-t border-blue-500/30 shadow-[0_-12px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="w-full h-auto">
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        x: x,
        y: y,
        scale: scaleValue,
        opacity: opacityValue,
        filter: filterBlur,
        zIndex,
      }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-background border-t border-border/50 shadow-2xl"
    >
      {/* Full Screen Section Content */}
      <div className="w-full h-full flex flex-col justify-center items-center px-2 sm:px-8 py-2 sm:py-4">
        {children}
      </div>
    </motion.div>
  );
}



/**
 * StackedPagesContainer pins the viewport after Hero section and smoothly stacks
 * each section on top of the previous one with a dedicated hold window.
 */
export function StackedPagesContainer({
  pages,
  pageMeta = [
    { title: "Partners", badge: "01 · TRUSTED BY LEADING COMPANIES" },
    { title: "Metrics", badge: "02 · PLATFORM IMPACT & NUMBERS" },
    { title: "Footer", badge: "03 · EXPLORE HIRANCE PLATFORM", isFooter: true },
  ],
  className = "",
}: StackedPagesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inStackView, setInStackView] = useState(false);

  const total = pages.length;
  const hasFirstPageLeft = pageMeta?.[0]?.direction === "left";
  const numTransitions = hasFirstPageLeft ? total : Math.max(1, total - 1);
  const step = 1 / numTransitions;
  const holdFraction = 0.60;

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress with spring physics
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    mass: 0.8,
    restDelta: 0.001,
  });

  // Update active section index based on scroll progress
  useMotionValueEvent(springProgress, "change", (latest) => {
    let currentIdx = 0;
    for (let i = 1; i < total; i++) {
      const slideStart = (i - 1 + holdFraction) * step;
      if (latest >= slideStart) {
        currentIdx = i;
      }
    }
    setActiveIndex(currentIdx);
    setInStackView(latest >= 0 && latest <= 1);
  });

  // Keyboard navigation (ArrowDown / ArrowUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!inStackView) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeIndex < total - 1) {
          e.preventDefault();
          navigateToSection(activeIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeIndex > 0) {
          e.preventDefault();
          navigateToSection(activeIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inStackView, activeIndex, total]);

  // Scroll directly to a section's hold window
  const navigateToSection = (targetIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalHeight = container.offsetHeight - window.innerHeight;

    const targetFraction =
      targetIndex === 0
        ? 0
        : Math.min(1, (targetIndex - 1 + holdFraction * 0.5) * step);
    const targetScroll = containerTop + targetFraction * totalHeight;

    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  if (shouldReduceMotion) {
    return (
      <div className={`w-full ${className}`}>
        {pages.map((page, i) => (
          <div
            key={i}
            className={
              pageMeta?.[i]?.isFooter
                ? "w-full"
                : "w-full min-h-screen flex flex-col justify-center"
            }
          >
            {page}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        height: `${numTransitions * 160}vh`,
      }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {pages.map((page, index) => {
          const isFooterCard = Boolean(pageMeta?.[index]?.isFooter);
          return (
            <StackedPageCard
              key={index}
              index={index}
              total={total}
              meta={pageMeta[index]}
              hasFirstPageLeft={hasFirstPageLeft}
              scrollYProgress={springProgress}
              isFooter={isFooterCard}
            >
              {page}
            </StackedPageCard>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Legacy exports for backward compatibility
 */
export function StackedSection({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function StackedFooterWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
