"use client";

/**
 * App-wide background.
 * Simple, clean, uniform solid light blue color with zero gradients.
 */
export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[#f0f7ff] dark:bg-[#070A14]"
    />
  );
}

export default GradientBackground;
