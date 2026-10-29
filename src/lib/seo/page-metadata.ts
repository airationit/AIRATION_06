import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Complete social objects are needed because Next.js merges metadata shallowly. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, siteConfig.url).href;
  const images = [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website", locale: "en_IN", siteName: siteConfig.name,
      title, description, url, images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
