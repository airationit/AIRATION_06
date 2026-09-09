import type { Metadata } from "next";
import { DownloadAppContent } from "@/components/download-app/download-app-content";

export const metadata: Metadata = {
  title: "Download Hirance Mobile App | Swipe. Match. Get Hired.",
  description:
    "Download the Hirance Android App to swipe right on verified jobs in Bangalore, Mumbai, Delhi NCR, and remote. Apply in 1 second with instant AI match scores.",
  keywords: [
    "download Hirance app",
    "Hirance Android app download",
    "Hirance APK download",
    "swipe hiring app India",
    "Tinder style job app",
    "best job search app India",
    "apply jobs without resume app",
  ],
  alternates: {
    canonical: "https://hirance.com/download-app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/download-app",
    title: "Download Hirance Mobile App | Swipe. Match. Get Hired.",
    description:
      "Download the Hirance Mobile App. Form-free job search, 1-tap swipe application, and direct HR chats.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Download Hirance App",
      },
    ],
  },
};

export default function DownloadAppPage() {
  return <DownloadAppContent />;
}
