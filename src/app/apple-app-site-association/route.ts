import { NextResponse } from "next/server";

const appleAppSiteAssociation = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "<APPLE_TEAM_ID>.org.reactjs.native.example.Hirance",
        paths: [
          "/job/*",
          "/jobs",
          "/jobs/*",
          "/application/*",
          "/applications",
          "/saved-jobs",
          "/interviews",
          "/messages",
          "/chat/*",
          "/profile",
          "/profile/*",
          "/settings",
          "/subscription",
          "/manage-subscription",
          "/limit-hit",
          "/notifications",
          "/help",
          "/contact",
          "/report-bug",
          "/support-ticket",
          "/privacy-policy",
          "/terms",
        ],
      },
    ],
  },
};

export async function GET() {
  return NextResponse.json(appleAppSiteAssociation, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
