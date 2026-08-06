"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type PageShellProps = {
  brand?: string
  title: string
  description: string
  children: ReactNode
  className?: string
  narrow?: boolean
}

export const PageShell = ({
  brand = "Hirance",
  title,
  description,
  children,
  className,
  narrow = false,
}: PageShellProps) => {
  return (
    <main className={cn("relative flex min-h-dvh flex-col", className)}>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.12),transparent_55%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div
          className={cn(
            "mx-auto px-6",
            narrow ? "max-w-3xl" : "max-w-5xl"
          )}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-sm font-semibold tracking-wide text-brand-600 dark:text-brand-400"
          >
            {brand}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        </div>
      </section>

      <div
        className={cn(
          "mx-auto w-full flex-1 px-6 pb-24",
          narrow ? "max-w-3xl" : "max-w-5xl"
        )}
      >
        {children}
      </div>
    </main>
  )
}

type LegalSectionProps = {
  id: string
  title: string
  children: ReactNode
}

export const LegalSection = ({ id, title, children }: LegalSectionProps) => {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border/60 py-10 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline-offset-4 hover:[&_a]:underline dark:[&_a]:text-brand-400 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}

type LegalMetaProps = {
  updated: string
}

export const LegalMeta = ({ updated }: LegalMetaProps) => {
  return (
    <p className="mb-10 text-sm text-muted-foreground">
      Last updated: <time dateTime={updated}>{updated}</time>
    </p>
  )
}

type InlineLinkProps = {
  href: string
  children: ReactNode
}

export const InlineLink = ({ href, children }: InlineLinkProps) => {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:")

  if (isExternal) {
    return (
      <a
        href={href}
        className="font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
    >
      {children}
    </Link>
  )
}
