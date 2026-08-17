"use client";

import { useMemo } from "react";
import { cleanJobHtml } from "@/lib/html-utils";

interface RichDescriptionProps {
  content?: string | null;
  fallbackText?: string;
  className?: string;
}

/**
 * Component to cleanly render rich-text job descriptions
 * Automatically decodes &nbsp; spaces, strips clashing inline styles,
 * and formats paragraphs, lists, and headings with modern Hirance typography.
 */
export function RichDescription({
  content,
  fallbackText = "Detailed job overview will be provided during the interview process.",
  className = "",
}: RichDescriptionProps) {
  const renderedContent = useMemo(() => {
    if (!content || !content.trim()) {
      return null;
    }

    const raw = content.trim();

    // Check if the input contains HTML tags
    const hasHtmlTags = /<[a-z/][\s\S]*>/i.test(raw);

    if (hasHtmlTags) {
      const sanitized = cleanJobHtml(raw);
      return { type: "html" as const, html: sanitized };
    }

    // Otherwise format plain text with markdown-like bullet/paragraph recognition
    const paragraphs = raw.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    return { type: "plain" as const, paragraphs };
  }, [content]);

  if (!renderedContent) {
    return (
      <p className={`text-[15px] leading-relaxed text-muted-foreground ${className}`}>
        {fallbackText}
      </p>
    );
  }

  if (renderedContent.type === "plain") {
    return (
      <div className={`space-y-3 text-[15px] sm:text-base leading-relaxed text-foreground/90 ${className}`}>
        {renderedContent.paragraphs.map((para, idx) => {
          // If paragraph looks like bullet list
          if (para.includes("\n- ") || para.includes("\n• ") || para.startsWith("- ") || para.startsWith("• ")) {
            const items = para
              .split(/\n/)
              .map((l) => l.replace(/^[-•*]\s*/, "").trim())
              .filter(Boolean);

            return (
              <ul key={idx} className="my-2 space-y-1.5 pl-4 list-disc marker:text-brand-600 dark:marker:text-brand-400">
                {items.map((item, i) => (
                  <li key={i} className="text-foreground/90 pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={idx} className="text-foreground/90">
              {para}
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`prose-job text-[15px] sm:text-base leading-relaxed text-foreground/90 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent.html }}
    />
  );
}
