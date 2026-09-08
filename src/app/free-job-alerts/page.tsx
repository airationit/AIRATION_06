import type { Metadata } from "next";
import { JobAlertsContent } from "@/components/job-alerts/job-alerts-content";

export const metadata: Metadata = {
  title: "Free Job Alerts on WhatsApp & Email | Hirance",
  description:
    "Get instant free job alerts on WhatsApp and Email for top verified job openings in India. Select your role and city to receive instant 1-tap alerts with 0 spam.",
  keywords: [
    "free job alerts",
    "job alert on whatsapp",
    "whatsapp job alerts India",
    "email job alerts",
    "fresher job alerts",
    "IT job alerts Bangalore",
    "remote job alerts India",
    "Hirance job alerts",
  ],
  alternates: {
    canonical: "https://hirance.com/free-job-alerts",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/free-job-alerts",
    title: "Free Job Alerts on WhatsApp & Email | Hirance",
    description:
      "Instant free job alerts delivered to your phone and email. Zero spam, 100% verified corporate hiring managers.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Free Job Alerts",
      },
    ],
  },
};

export default function FreeJobAlertsPage() {
  return <JobAlertsContent />;
}
