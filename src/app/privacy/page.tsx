import type { Metadata } from "next"
import {
  InlineLink,
  LegalMeta,
  LegalSection,
  PageShell,
} from "@/components/shared"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Hirance collects, uses, and protects personal information across our hiring platform.",
}

export default function PrivacyPage() {
  return (
    <PageShell
      narrow
      title="Privacy Policy"
      description="How we collect, use, share, and protect information when you use Hirance."
    >
      <LegalMeta updated="2026-08-06" />

      <LegalSection id="overview" title="1. Overview">
        <p>
          Hirance Private Limited (“Hirance,” “we,” “us,” or “our”) respects
          your privacy. This Policy explains what information we process when
          you use our website, apps, and related services (the “Services”),
          and the choices available to you.
        </p>
        <p>
          For cookie-specific details, see our{" "}
          <InlineLink href="/cookies">Cookie Policy</InlineLink>.
        </p>
      </LegalSection>

      <LegalSection id="information-we-collect" title="2. Information we collect">
        <p>We may collect:</p>
        <ul>
          <li>
            <strong className="font-medium text-foreground">Account data</strong>
            — name, email, phone, password hashes, and profile details you
            provide
          </li>
          <li>
            <strong className="font-medium text-foreground">Career data</strong>
            — resumes, work history, skills, preferences, and application
            activity
          </li>
          <li>
            <strong className="font-medium text-foreground">Employer data</strong>
            — company details, job posts, hiring team contacts, and candidate
            interactions
          </li>
          <li>
            <strong className="font-medium text-foreground">Usage data</strong>
            — device type, browser, IP address, pages viewed, and approximate
            location derived from IP
          </li>
          <li>
            <strong className="font-medium text-foreground">Communications</strong>
            — messages you send to us or through the platform
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="how-we-use" title="3. How we use information">
        <p>We use information to:</p>
        <ul>
          <li>Provide, maintain, and improve the Services</li>
          <li>Match candidates with roles and support employer workflows</li>
          <li>Authenticate accounts and keep the platform secure</li>
          <li>Send service notices, product updates, and (with consent) marketing</li>
          <li>Analyze product performance and fix issues</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" title="4. How we share information">
        <p>We may share information with:</p>
        <ul>
          <li>
            Employers or candidates when you apply, message, or otherwise
            interact through the Services
          </li>
          <li>
            Service providers who process data on our behalf (hosting,
            analytics, email, payments) under contractual safeguards
          </li>
          <li>
            Authorities when required by law or to protect rights, safety, and
            security
          </li>
          <li>
            Parties involved in a merger, acquisition, or asset sale, subject
            to this Policy
          </li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection id="retention" title="5. Retention">
        <p>
          We keep personal information only as long as needed for the purposes
          described above, including legal, accounting, or dispute-resolution
          requirements. You may request deletion subject to lawful exceptions.
        </p>
      </LegalSection>

      <LegalSection id="security" title="6. Security">
        <p>
          We use administrative, technical, and organizational measures designed
          to protect personal information. No method of transmission or storage
          is completely secure; please use a strong, unique password.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="7. Your rights">
        <p>
          Depending on your location, you may have rights to access, correct,
          delete, or export your personal information, and to object to or
          restrict certain processing. Contact us to exercise these rights. You
          may also unsubscribe from marketing emails via the link in those
          messages.
        </p>
      </LegalSection>

      <LegalSection id="children" title="8. Children">
        <p>
          The Services are not directed to children under 18. We do not
          knowingly collect personal information from children. If you believe
          a child has provided information, contact us and we will take
          appropriate steps.
        </p>
      </LegalSection>

      <LegalSection id="international" title="9. International transfers">
        <p>
          Hirance is based in India. If you access the Services from outside
          India, your information may be processed in India and other countries
          where we or our providers operate.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="10. Changes">
        <p>
          We may update this Policy from time to time. The “Last updated” date
          at the top will change when we do. Continued use of the Services after
          an update means you accept the revised Policy.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="11. Contact">
        <p>
          Privacy questions or requests:{" "}
          <InlineLink href="mailto:hello@hirance.com">
            hello@hirance.com
          </InlineLink>{" "}
          or our <InlineLink href="/contact">Contact</InlineLink> page.
        </p>
        <p>
          Hirance Private Limited · Bengaluru, Karnataka, India
        </p>
      </LegalSection>
    </PageShell>
  )
}
