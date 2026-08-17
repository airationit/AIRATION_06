"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CONTACT_CHANNELS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "hello@hirance.com",
    href: "mailto:hello@hirance.com",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Phone",
    value: "+91 9793780913",
    href: "tel:+919793780913",
  },
  {
    id: "office",
    icon: MapPin,
    label: "Office",
    value: "Janki Puram Extension, Lucknow-226021, India",
    href: "https://maps.google.com/?q=Janki+Puram+Extension,+Lucknow+226021,+India",
  },
] as const

type FormState = {
  name: string
  email: string
  topic: string
  message: string
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  topic: "general",
  message: "",
}

export const ContactForm = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)

    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForm(INITIAL_FORM)
    }, 600)
  }

  const handleReset = () => {
    setSubmitted(false)
  }

  const handleResetKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleReset()
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-border/70 bg-white/80 px-6 py-12 text-center shadow-sm backdrop-blur-sm dark:bg-background/80"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="mx-auto h-10 w-10 text-emerald-500"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          Message received
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Thanks for reaching out. Our team typically replies within one
          business day.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 h-11 px-5"
          onClick={handleReset}
          onKeyDown={handleResetKeyDown}
          aria-label="Send another message"
          tabIndex={0}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
      <aside className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Talk with the team
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Whether you are hiring, job hunting, or partnering with us—we are
            here to help.
          </p>
        </div>

        <ul className="space-y-4">
          {CONTACT_CHANNELS.map((channel) => {
            const Icon = channel.icon
            return (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  className="group flex items-start gap-3 rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`${channel.label}: ${channel.value}`}
                  tabIndex={0}
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-blue-500/10 text-blue-600 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-foreground group-hover:text-blue-600">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </aside>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:bg-background/80 sm:p-8"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Name
            </span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClassName}
              placeholder="Your name"
              aria-label="Your name"
            />
          </label>

          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClassName}
              placeholder="you@company.com"
              aria-label="Your email"
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Topic
          </span>
          <select
            name="topic"
            value={form.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            className={cn(inputClassName, "appearance-none")}
            aria-label="Message topic"
          >
            <option value="general">General inquiry</option>
            <option value="employers">For employers</option>
            <option value="seekers">For job seekers</option>
            <option value="press">Press & media</option>
            <option value="partnership">Partnership</option>
            <option value="support">Support</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Message
          </span>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={cn(inputClassName, "min-h-[140px] resize-y")}
            placeholder="How can we help?"
            aria-label="Your message"
          />
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            By submitting, you agree to our{" "}
            <a
              href="/privacy"
              className="font-medium text-blue-600 underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 min-w-[140px] px-5 bg-blue-600 hover:bg-blue-700 text-white"
            aria-label="Send message"
          >
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>
    </div>
  )
}

const inputClassName =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
