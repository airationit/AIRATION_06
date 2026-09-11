import type { Metadata } from "next";
import { MobilePrivacyPolicyContent } from "@/components/legal/mobile-privacy-policy-content";

export const metadata: Metadata = {
  title: "Mobile App Privacy Policy | Hirance",
};

export default function MobilePrivacyPolicyPage() {
  return <MobilePrivacyPolicyContent />;
}
