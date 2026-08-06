import type { Metadata } from "next"
import { PageShell } from "@/components/shared"
import { ContactForm } from "@/components/shared/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Hirance for hiring support, partnerships, press, or general questions. We typically reply within one business day.",
}

export default function ContactPage() {
  return (
    <PageShell
      title="Contact us"
      description="Tell us what you need—employer support, job-seeker help, press, or partnerships. We read every message."
    >
      <ContactForm />
    </PageShell>
  )
}
