/**
 * Utility functions for cleaning, sanitizing, and formatting HTML descriptions
 * Handles rich-text output from various job editor backends (Quill, TinyMCE, Word paste, etc.)
 */

/**
 * Replace HTML entity codes with their decoded text representations
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";

  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&bull;/gi, "•")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&rsquo;/gi, "’")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&rdquo;/gi, "”")
    .replace(/&ldquo;/gi, "“")
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, "/");
}

/**
 * Strip all HTML tags to produce clean, readable plain text for SEO meta tags and JSON-LD
 */
export function stripHtml(html?: string | null): string {
  if (!html) return "";

  // 1. Replace non-breaking spaces
  let text = html.replace(/&nbsp;/gi, " ").replace(/&#160;/gi, " ").replace(/\u00a0/g, " ");

  // 2. Add spaces before block element closings so words don't stick together
  text = text.replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, " ");
  text = text.replace(/<br\s*[\/]?>/gi, " ");

  // 3. Remove all HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // 4. Decode remaining entities
  text = decodeHtmlEntities(text);

  // 5. Collapse multiple spaces into single space and trim
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Clean and sanitize rich HTML strings from job descriptions
 * - Replaces `&nbsp;` with regular spaces so text wraps naturally
 * - Strips dangerous inline styles (`style="..."`) that break dark mode / typography
 * - Removes classes, IDs, and scripts
 * - Demotes <h1> and <h2> to <h3> to protect page SEO heading hierarchy
 * - Removes empty paragraphs and excess whitespace
 */
export function cleanJobHtml(rawHtml?: string | null): string {
  if (!rawHtml) return "";

  // 1. First decode double-encoded HTML if present (e.g. &lt;p&gt;)
  let html = rawHtml;
  if (/&lt;[a-z/][\s\S]*?&gt;/i.test(html)) {
    html = decodeHtmlEntities(html);
  }

  // 2. Replace all non-breaking spaces with standard space
  html = html
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/\u00a0/g, " ");

  // 3. Remove scripts, iframes, objects, embeds, style tags
  html = html.replace(/<(script|iframe|object|embed|style)[\s\S]*?<\/\1>/gi, "");

  // 4. Strip dangerous or layout-breaking attributes: style, class, id, onclick, onerror, etc.
  html = html.replace(/\s+(style|class|id|onload|onclick|onerror|data-[a-z0-9_-]+)="[^"]*"/gi, "");
  html = html.replace(/\s+(style|class|id|onload|onclick|onerror|data-[a-z0-9_-]+)='[^']*'/gi, "");

  // 5. Demote h1, h2 to h3/h4 to preserve single <h1> hierarchy
  html = html.replace(/<h1(\s*|>)/gi, "<h3$1").replace(/<\/h1>/gi, "</h3>");
  html = html.replace(/<h2(\s*|>)/gi, "<h3$1").replace(/<\/h2>/gi, "</h3>");

  // 6. Clean empty paragraphs / breaks
  html = html
    .replace(/<p>\s*<br\s*[\/]?>\s*<\/p>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/(<br\s*[\/]?>\s*){3,}/gi, "<br><br>");

  return html.trim();
}

/**
 * Format relative dates in a human-friendly way (e.g. "Today", "2 days ago", "1 week ago")
 */
export function formatRelativeTime(dateInput?: string | null): string {
  if (!dateInput) return "Recently posted";

  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Recently posted";

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) return "Posted today";
    if (diffInDays === 1) return "Posted 1 day ago";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 14) return "Posted 1 week ago";
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 60) return "Posted 1 month ago";
    return `Posted ${Math.floor(diffInDays / 30)} months ago`;
  } catch {
    return "Recently posted";
  }
}
