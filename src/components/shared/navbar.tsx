"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { GooglePlayButton } from "./google-play-button";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out pt-3 px-3 sm:px-5 sm:pt-4",
        className
      )}
    >
      <nav
        className={cn(
          "relative mx-auto flex items-center justify-between transition-all duration-500 ease-in-out px-6 bg-white",
          scrolled
            ? "h-16 max-w-4xl rounded-full shadow-[0_10px_40px_-16px_rgba(37,99,235,0.25)]"
            : "h-20 max-w-6xl rounded-full border border-transparent shadow"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={300}
            height={100}
            loading="eager"
            fetchPriority="high"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-11"
          />
        </Link>

        {/* Center nav — desktop */}
        <div
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {siteConfig.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative rounded-full px-4.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="navbar-hover-bg"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-500/10 dark:bg-brand-500/15"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Right actions — desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <GooglePlayButton />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl md:hidden transition-all duration-300",
            scrolled ? "glass" : "border border-border/20 bg-background/50 backdrop-blur-md"
          )}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl bg-white p-4 shadow-[0_10px_40px_-16px_rgba(37,99,235,0.25)] md:hidden"
          >
            <div className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              <GooglePlayButton className="justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
