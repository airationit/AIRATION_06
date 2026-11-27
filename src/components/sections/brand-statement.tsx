"use client";

import React from "react";

const MARQUEE = ["SWIPE.", "MATCH.", "GET HIRED.", "SWIPE.", "MATCH.", "GET HIRED."];

export function BrandStatement() {
  return (
    <section
      className="relative py-4 sm:py-6 md:py-8 overflow-hidden rounded-none border-t border-white/10 bg-[var(--hi-navy)] text-white shadow-2xl shadow-slate-950/20"
      data-testid="brand-statement-section"
      aria-label="Hirance Brand Statement"
    >
      {/* Background Dot Texture */}
      <div className="absolute inset-0 dot-bg opacity-40" />

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[160px] sm:h-[200px] bg-sky-500/10 blur-[100px]"
        aria-hidden="true"
      />

      {/* editorial marquee */}
      <div className="overflow-hidden mask-fade-r">
        <div className="flex gap-4 sm:gap-8 w-max animate-marquee-slow select-none" aria-hidden="true">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span
              key={i}
              className={`font-display text-6xl font-black tracking-tight ${
                i % 3 === 2 ? "text-gradient-blue" : "text-white/10"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandStatement;