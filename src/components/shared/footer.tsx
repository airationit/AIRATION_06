"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "How It Works", href: "#" },
      { label: "For Job Seekers", href: "#" },
      { label: "For Employers", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
};

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
];

const legalLinks = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cookies", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background/30 backdrop-blur-md glass">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand-500/5 via-transparent to-transparent opacity-50 dark:from-brand-500/10" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="group inline-flex items-center" aria-label="Hirance Home">
              <Image
                src="/images/logo.png"
                alt="Hirance"
                width={150}
                height={50}
                loading="lazy"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              The modern hiring platform connecting ambitious people with the companies building the future.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-card/60 text-muted-foreground transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title} className="md:col-span-2 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Get in touch</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@hirance.com"
                  className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  hello@hirance.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <Phone className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  +91 98765 43210
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Bengaluru, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hirance Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-muted-foreground transition-colors hover:text-brand-600 dark:hover:text-brand-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
