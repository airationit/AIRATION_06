"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { variants, transitions } from "@/config/animations";
import { cn } from "@/lib/utils";

interface MotionWrapperProps
  extends Omit<HTMLMotionProps<"div">, "transition"> {
  variant?: keyof typeof variants;
  speed?: keyof typeof transitions;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable motion wrapper for consistent reveal animations.
 * Wrap any section or element with this to get viewport-triggered animations.
 */
export function MotionWrapper({
  variant = "fadeInUp",
  speed = "smooth",
  className,
  children,
  ...props
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[variant]}
      transition={transitions[speed]}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
