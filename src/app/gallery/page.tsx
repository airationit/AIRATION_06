import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery/gallery-content";

export const metadata: Metadata = {
  title: "Gallery | Hirance - Launch Event Photos & Videos",
  description: "Explore highlights from the Hirance official launch event — keynotes, app demos, team moments, media coverage, and networking sessions from India's next-gen hiring platform.",
  keywords: ["Hirance launch event", "Hirance gallery", "Hirance photos", "hiring platform launch India", "Hirance team", "Swipe Match Get Hired event"],
  alternates: { canonical: "https://hirance.com/gallery" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/gallery",
    title: "Gallery | Hirance Launch Event",
    description: "Photos and videos from the Hirance official launch event in Bengaluru, India.",
    siteName: "Hirance",
    images: [{ url: "/images/gallery/launch-event.jpg", width: 1200, height: 800, alt: "Hirance Official Launch Event" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Hirance Launch Event",
    description: "Behind every swipe is a story. Explore the Hirance launch event gallery.",
  },
};

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Hirance Official Launch Event Gallery",
    url: "https://hirance.com/gallery",
    description: "Photos and videos from the Hirance official product launch event held in Bengaluru, India in March 2025.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/images/logo.svg",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryContent />
    </>
  );
}
