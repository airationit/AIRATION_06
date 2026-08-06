import type { Metadata } from "next"
import {
  InlineLink,
  LegalMeta,
  LegalSection,
  PageShell,
} from "@/components/shared"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Hirance uses cookies and similar technologies on our website and hiring platform.",
}

export default function CookiesPage() {
  return (
    <PageShell
      narrow
      title="Cookie Policy"
      description="How Hirance uses cookies and similar technologies to run, secure, and improve our Services."
    >
      <LegalMeta updated="2026-08-06" />

      <LegalSection id="what-are-cookies" title="1. What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a
          website. Similar technologies include local storage, pixels, and SDKs.
          Together, they help sites remember preferences, keep you signed in,
          and understand how the product is used.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" title="2. How Hirance uses cookies">
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Keep you authenticated and secure across sessions</li>
          <li>Remember preferences such as theme or locale where applicable</li>
          <li>Understand traffic and feature usage so we can improve Hirance</li>
          <li>Measure marketing performance where you have consented</li>
        </ul>
      </LegalSection>

      <LegalSection id="types" title="3. Types of cookies we use">
        <ul>
          <li>
            <strong className="font-medium text-foreground">Essential</strong>
            — required for core functionality, security, and load balancing.
            These cannot be switched off in our systems.
          </li>
          <li>
            <strong className="font-medium text-foreground">Preferences</strong>
            — remember choices you make so the experience feels consistent.
          </li>
          <li>
            <strong className="font-medium text-foreground">Analytics</strong>
            — help us understand which pages and flows are useful (aggregated
            where possible).
          </li>
          <li>
            <strong className="font-medium text-foreground">Marketing</strong>
            — used only when allowed, to measure campaign effectiveness and
            avoid showing irrelevant ads.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="third-parties" title="4. Third-party cookies">
        <p>
          Some cookies are set by trusted partners who help us host analytics,
          authentication, or communications. Those partners process information
          under their own policies and our contractual terms.
        </p>
      </LegalSection>

      <LegalSection id="managing" title="5. Managing cookies">
        <p>
          Most browsers let you block or delete cookies via settings. Blocking
          essential cookies may break sign-in or other core features. You can
          also use platform-level privacy controls on mobile devices.
        </p>
        <p>
          Where a cookie banner or preference center is available, you can
          update non-essential choices at any time.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="6. Duration">
        <p>
          Session cookies expire when you close your browser. Persistent cookies
          remain for a set period or until you delete them. Retention depends on
          the cookie’s purpose (for example, keeping you signed in vs. measuring
          a campaign).
        </p>
      </LegalSection>

      <LegalSection id="updates" title="7. Updates">
        <p>
          We may update this Cookie Policy as our practices or the law change.
          Check the “Last updated” date at the top of this page.
        </p>
      </LegalSection>

      <LegalSection id="more" title="8. More information">
        <p>
          For broader data practices, read our{" "}
          <InlineLink href="/privacy">Privacy Policy</InlineLink>. Questions:{" "}
          <InlineLink href="mailto:hello@hirance.com">
            hello@hirance.com
          </InlineLink>{" "}
          or <InlineLink href="/contact">Contact</InlineLink>.
        </p>
      </LegalSection>
    </PageShell>
  )
}
