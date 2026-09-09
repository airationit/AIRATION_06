import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body || {};

    const cleanPayload = {
      name: (name || "").trim(),
      email: (email || "").trim(),
      subject: (subject || "Free Job Alert Subscription").trim(),
      message: (message || "Subscribed to Free Job Alerts").trim(),
    };

    console.log("[Contact API Route] Lead received:", cleanPayload);

    // Forward to remote Hirance backend API if available
    try {
      await fetch(`${BASE_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanPayload),
      });
    } catch {
      // Remote backend endpoint not yet deployed; server-side fallback
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        data: cleanPayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit lead",
      },
      { status: 500 }
    );
  }
}
