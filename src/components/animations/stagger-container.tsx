"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { variants } from "@/config/animations";
import { cn } from "@/lib/utils";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  className?: string;
  children: React.ReactNode;
  staggerDelay?: number;
}

/**
 * Container that staggers the animation of its children.
 * Children should use <MotionWrapper> or framer-motion variants.
 */
export function StaggerContainer({
  className,
  children,
  staggerDelay = 0.1,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
