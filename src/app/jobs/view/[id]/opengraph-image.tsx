import { ImageResponse } from "next/og";
import { getJobById } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";

export const alt = "Job Opening on Hirance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);

  // Fallback OG if job not found
  if (!job) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #1a56db 0%, #0c2461 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "white", fontSize: 48, fontWeight: 700 }}>
            {siteConfig.name}
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 24 }}>
            Find Your Next Job — Swipe to Apply
          </p>
        </div>
      ),
      size
    );
  }

  const city = job.cityName || job.location || "India";
  const salary =
    job.salaryRange && job.salaryRange !== "Competitive Salary"
      ? job.salaryRange
      : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a56db 0%, #0c2461 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        {/* Top row: company logo placeholder + site name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Company logo or initials circle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {job.companyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.companyLogo}
                alt={job.company}
                width={64}
                height={64}
                style={{
                  borderRadius: 12,
                  background: "white",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {job.company
                  .split(" ")
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 22,
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {job.company}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 16,
                  margin: 0,
                }}
              >
                {city}
              </p>
            </div>
          </div>

          {/* Site brand */}
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 20,
              padding: "8px 20px",
              color: "white",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Job title — large */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxWidth: 900,
            }}
          >
            {job.title}
          </p>

          {/* Badge row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 32,
                padding: "8px 20px",
                color: "white",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {job.jobType}
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 32,
                padding: "8px 20px",
                color: "white",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              📍 {city}
            </div>
            {salary && (
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 32,
                  padding: "8px 20px",
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                💰 {salary}
              </div>
            )}
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 32,
                padding: "8px 20px",
                color: "white",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              🎓 {job.experience}
            </div>
          </div>
        </div>

        {/* Bottom: CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, margin: 0 }}>
            hirance.com/jobs
          </p>
          <div
            style={{
              background: "white",
              color: "#1a56db",
              borderRadius: 16,
              padding: "14px 32px",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            Swipe to Apply →
          </div>
        </div>
      </div>
    ),
    size
  );
}
