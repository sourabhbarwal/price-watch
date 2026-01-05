// // app/api/internal/price-check/route.js

// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient";
// import { evaluatePriceAlert } from "@/server/serverAlertEngine";

// export async function POST(req) {
//   const secret = req.headers.get("x-cron-secret");
//   const token = secret || (authHeader?.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null);
//   if (secret !== process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   } 

//   // 🔒 Simple cron secret check
//   const authHeader = req.headers.get("authorization");
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   if (!token || token !== process.env.CRON_SECRET) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     const { data: products, error } = await supabase
//       .from("products")
//       .select("*")
//       .eq("alert_enabled", true);

//     if (error) throw error;

//     for (const product of products) {
//       await evaluatePriceAlert({
//         product,
//         previousPrice: product.previous_price,
//         currentPrice: product.current_price,
//         userTargetPrice: product.target_price,
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       processed: products.length,
//     });
//   } catch (err) {
//     console.error("[Cron Price Check Error]", err);
//     return NextResponse.json(
//       { success: false },
//       { status: 500 }
//     );
//   }
// }

// app/api/internal/price-check/route.js

import { NextResponse } from "next/server";

/**
 * Internal cron / manual trigger endpoint
 * Secured using CRON_SECRET
 */
export async function POST(request) {
  // ---- DEBUG SAFE LOG (remove after verification) ----
  console.log("[CRON] ENV SECRET:", process.env.CRON_SECRET);

  // ---- READ HEADERS (App Router compatible) ----
  const headers = request.headers;

  const headerSecret = headers.get("x-cron-secret");
  const authHeader = headers.get("authorization");

  console.log("[CRON] x-cron-secret:", headerSecret);
  console.log("[CRON] authorization:", authHeader);

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
