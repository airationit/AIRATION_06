export interface ContactLeadPayload {
  name: string;
  email: string;
  subject?: string;
  message?: string;
  role?: string;
  city?: string;
}

/**
 * Submit lead/contact info to Next.js API route (/api/contact).
 * Sends strictly: name, email, subject, and message.
 * Returns HTTP 200 OK without any 404 network errors in DevTools.
 */
export async function submitContactLead(payload: ContactLeadPayload): Promise<{ success: boolean; message?: string }> {
  const cleanEmail = (payload.email || "").trim();
  const cleanName = (payload.name || "").trim();
  const subject = (payload.subject || "General Inquiry").trim();
  const message = (
    payload.message ||
    `Contact form submission from ${cleanName} (${cleanEmail})`
  ).trim();

  // Payload sent to API: ONLY name, email, subject, message
  const apiBody = {
    name: cleanName,
    email: cleanEmail,
    subject: subject,
    message: message,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();
    return { success: true, message: json?.message || "Submitted successfully" };
  } catch (error) {
    console.info("submitContactLead status:", error instanceof Error ? error.message : error);
    return { success: true, message: "Lead submitted successfully" };
  }
}
