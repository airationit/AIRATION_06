"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const socialLinks = [
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  {
    label: "Feedback",
    href: "mailto:hello@hirance.com?subject=Feedback%20for%20Hirance",
  },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
]

export function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="relative flex justify-center px-6 pb-4 sm:pb-6">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand-500/[0.04] via-transparent to-transparent"
          aria-hidden="true"
        />
        <Link
          href="/"
          className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
          aria-label="Hirance Home"
          id="footer-logo-link"
          tabIndex={0}
        >
          <Image
            src="/images/logo.png"
            alt="Hirance Logo"
            width={480}
            height={160}
            loading="lazy"
            className="h-16 w-auto opacity-90 transition-[opacity,transform] duration-300 group-hover:scale-[1.02] group-hover:opacity-100 sm:h-24 md:h-28"
            id="footer-logo-center"
          />
        </Link>
      </div>

      <div className="relative border-t border-border/50 bg-background/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-7 md:flex-row md:items-center md:py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <p className="text-xs text-muted-foreground md:text-sm">
              &copy; {new Date().getFullYear()} Hirance Private Limited. All
              rights reserved.
            </p>
            <span
              className="hidden h-4 w-px bg-border/60 md:block"
              aria-hidden="true"
            />
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  id={`footer-social-${social.name.toLowerCase()}`}
                  href={social.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground transition-colors hover:border-brand-500 hover:bg-brand-600 hover:text-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                  aria-label={`Follow us on ${social.name}`}
                  tabIndex={0}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label="Footer links"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                id={`footer-link-${item.label.toLowerCase()}`}
                href={item.href}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40 dark:hover:text-brand-400 md:text-sm"
                tabIndex={0}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
