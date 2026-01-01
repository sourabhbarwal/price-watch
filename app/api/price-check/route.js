// app/api/price-check/route.js

import { NextResponse } from "next/server";
import { runPriceCheckSimulation } from "@/lib/priceCheckEngine";

export async function POST(request) {
  // Optional: basic protection (later replace with secret)
  const cronHeader = request.headers.get("x-vercel-cron");

  if (process.env.NODE_ENV === "production" && !cronHeader) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await runPriceCheckSimulation();

  return NextResponse.json({ status: "ok" });
}
