import type { Metadata } from "next"
import {
  InlineLink,
  LegalMeta,
  LegalSection,
  PageShell,
} from "@/components/shared"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service that govern your use of the Hirance hiring platform and related services.",
}

export default function TermsPage() {
  return (
    <PageShell
      narrow
      title="Terms of Service"
      description="These terms govern your access to and use of Hirance. Please read them carefully."
    >
      <LegalMeta updated="2026-08-06" />

      <LegalSection id="agreement" title="1. Agreement to terms">
        <p>
          By accessing or using Hirance (“Hirance,” “we,” “us,” or “our”),
          including our website, mobile applications, and related services
          (collectively, the “Services”), you agree to these Terms of Service
          (“Terms”). If you do not agree, do not use the Services.
        </p>
        <p>
          If you use the Services on behalf of an organization, you represent
          that you have authority to bind that organization to these Terms.
        </p>
      </LegalSection>

      <LegalSection id="accounts" title="2. Accounts and eligibility">
        <p>
          You must provide accurate information when creating an account and
          keep your credentials secure. You are responsible for activity under
          your account.
        </p>
        <p>
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) to use the Services. Employers must have legal
          authority to post roles and process applications.
        </p>
      </LegalSection>

      <LegalSection id="platform" title="3. The Hirance platform">
        <p>
          Hirance connects job seekers and employers. We do not guarantee
          interviews, offers, hires, or employment outcomes. Content posted by
          users (profiles, job listings, messages, and related materials)
          remains the responsibility of the posting party.
        </p>
        <p>
          We may change, suspend, or discontinue features of the Services at
          any time. Material changes to these Terms will be reflected on this
          page with an updated date.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="4. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Post false, misleading, discriminatory, or unlawful content</li>
          <li>Scrape, reverse engineer, or disrupt the Services</li>
          <li>Impersonate others or misrepresent your affiliation</li>
          <li>Use the Services to spam, harass, or solicit improperly</li>
          <li>Upload malware or attempt unauthorized access</li>
        </ul>
        <p>
          We may remove content or suspend accounts that violate these Terms
          or applicable law.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" title="5. Intellectual property">
        <p>
          Hirance and its licensors own the Services, branding, and underlying
          software. You retain ownership of content you submit, and grant
          Hirance a worldwide, non-exclusive license to host, display, and
          process that content solely to operate and improve the Services.
        </p>
      </LegalSection>

      <LegalSection id="payments" title="6. Paid plans">
        <p>
          Certain employer features may require payment. Fees, billing cycles,
          and cancellation terms will be presented at purchase. Unless required
          by law, fees are non-refundable once a billing period begins.
        </p>
      </LegalSection>

      <LegalSection id="disclaimers" title="7. Disclaimers">
        <p>
          The Services are provided “as is” and “as available.” To the fullest
          extent permitted by law, Hirance disclaims warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant uninterrupted or error-free
          operation.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="8. Limitation of liability">
        <p>
          To the fullest extent permitted by law, Hirance will not be liable
          for indirect, incidental, special, consequential, or punitive
          damages, or any loss of profits, data, or goodwill arising from your
          use of the Services. Our aggregate liability for any claim relating
          to the Services will not exceed the greater of (a) amounts you paid
          us in the twelve months before the claim or (b) INR 10,000.
        </p>
      </LegalSection>

      <LegalSection id="termination" title="9. Termination">
        <p>
          You may stop using the Services at any time. We may suspend or
          terminate access if you breach these Terms or if we discontinue the
          Services. Provisions that by nature should survive (including
          ownership, disclaimers, and liability limits) will survive
          termination.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" title="10. Governing law">
        <p>
          These Terms are governed by the laws of India. Courts in Bengaluru,
          Karnataka shall have exclusive jurisdiction, subject to any
          mandatory consumer protections that apply where you live.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="11. Contact">
        <p>
          Questions about these Terms? Email{" "}
          <InlineLink href="mailto:hello@hirance.com">
            hello@hirance.com
          </InlineLink>{" "}
          or visit our <InlineLink href="/contact">Contact</InlineLink> page.
        </p>
      </LegalSection>
    </PageShell>
  )
}
