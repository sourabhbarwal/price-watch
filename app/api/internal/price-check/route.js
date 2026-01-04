// // app/api/internal/price-check/route.js

// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient";
// import { evaluatePriceAlert } from "@/server/serverAlertEngine";

// /**
//  * INTERNAL: Server-side price check runner
//  * This will later be invoked by cron
//  */
// export async function POST() {
//   try {
//     // 1️⃣ Fetch all products with alert enabled
//     const { data: products, error } = await supabase
//       .from("products")
//       .select("*")
//       .eq("alert_enabled", true);

//     if (error) throw error;

//     // 2️⃣ Evaluate alerts for each product
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
//     console.error("[Price Check API Error]", err);
//     return NextResponse.json(
//       { success: false, error: "Price check failed" },
//       { status: 500 }
//     );
//   }
// }

// app/api/internal/price-check/route.js

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { evaluatePriceAlert } from "@/server/serverAlertEngine";

export async function POST(req) {
  // 🔒 Simple cron secret check
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("alert_enabled", true);

    if (error) throw error;

    for (const product of products) {
      await evaluatePriceAlert({
        product,
        previousPrice: product.previous_price,
        currentPrice: product.current_price,
        userTargetPrice: product.target_price,
      });
    }

    return NextResponse.json({
      success: true,
      processed: products.length,
    });
  } catch (err) {
    console.error("[Cron Price Check Error]", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
