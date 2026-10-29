import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { MobilePrivacyPolicyContent } from "@/components/legal/mobile-privacy-policy-content";

export const metadata: Metadata = {
  ...pageMetadata("Mobile App Privacy Policy | Hirance", "Learn how the Hirance mobile app collects, uses, and protects your personal data.", "/mobile-privacy-policy"),
  title: "Mobile App Privacy Policy | Hirance",
};

export default function MobilePrivacyPolicyPage() {
  return <MobilePrivacyPolicyContent />;
}
