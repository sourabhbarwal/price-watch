// app/api/internal/price-check/route.js

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function POST(request) {
  try {
    /* ---------------------------------------------
       1. Cron authentication
    --------------------------------------------- */
    const secret = request.headers.get("x-cron-secret");
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* ---------------------------------------------
       2. Load products with target price
    --------------------------------------------- */
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id, title, current_price, target_price, user_id")
      .not("target_price", "is", null);

    if (productError) throw productError;

    if (!products || products.length === 0) {
      return NextResponse.json({
        success: true,
        alertsGenerated: 0,
      });
    }

    /* ---------------------------------------------
       3. Build alerts safely (ALL REQUIRED FIELDS)
    --------------------------------------------- */
    const alertsToInsert = [];

    for (const product of products) {
      const current = Number(product.current_price);
      const target = Number(product.target_price);

      if (current <= target) {
        alertsToInsert.push({
          user_id: product.user_id,
          product_id: product.id,
          type: "TARGET_PRICE_REACHED",

          // 🔴 REQUIRED BY DB (FIX)
          title: "Target price reached",

          // Used by UI
          message: `Price dropped to ₹${current}`,

          metadata: {
            currentPrice: current,
            targetPrice: target,
            productTitle: product.title,
          },

          read: false,
        });
      }
    }

    /* ---------------------------------------------
       4. Insert alerts (duplicate-safe)
    --------------------------------------------- */
    if (alertsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from("alerts")
        .upsert(alertsToInsert, {
          onConflict: "user_id,product_id,type",
        });

      if (insertError) throw insertError;
    }

    /* ---------------------------------------------
       5. Done
    --------------------------------------------- */
    return NextResponse.json({
      success: true,
      alertsGenerated: alertsToInsert.length,
    });
  } catch (err) {
    console.error("[CRON PRICE CHECK ERROR]", err);

    return NextResponse.json(
      {
        error: err.message,
        code: err.code,
      },
      { status: 500 }
    );
  }
}
