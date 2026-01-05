// app/api/internal/price-check/route.js

import { NextResponse } from "next/server";

/**
 * Internal cron / manual trigger endpoint
 * Secured using CRON_SECRET
 */
export async function POST(request) {
  // ---- DEBUG SAFE LOG (remove after verification) ----
  // console.log("[CRON] ENV SECRET:", process.env.CRON_SECRET);

  // ---- READ HEADERS (App Router compatible) ----
  const headers = request.headers;

  const headerSecret = headers.get("x-cron-secret");
  const authHeader = headers.get("authorization");

  // console.log("[CRON] x-cron-secret:", headerSecret);
  // console.log("[CRON] authorization:", authHeader);

  // ---- EXTRACT TOKEN ----
  let token = null;

  if (headerSecret) {
    token = headerSecret;
  } else if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.replace("Bearer ", "");
  }

  // ---- AUTH CHECK ----
  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (!token || token !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // ---- TEMP RESPONSE (before price logic) ----
  return NextResponse.json({
    success: true,
    message: "Cron endpoint verified successfully",
  });
}
