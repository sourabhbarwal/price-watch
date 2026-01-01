// lib/priceCheckEngine.js

import { supabase } from "@/lib/supabaseClient";
import { useAlertStore } from "@/store/alertStore";

/**
 * Simulate price changes and trigger alerts
 */
export async function runPriceCheckSimulation() {
  // 1. Fetch all tracked products
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Price check fetch failed", error);
    return;
  }

  for (const product of products) {
    // 2. Simulate a small price change (-10% to +5%)
    const changeFactor =
      1 + (Math.random() * 0.15 - 0.1);

    const newPrice = Math.max(
      1,
      Math.round(product.current_price * changeFactor)
    );

    // 3. Update product price
    const { error: updateError } = await supabase
      .from("products")
      .update({ current_price: newPrice })
      .eq("id", product.id);

    if (updateError) {
      console.error("Price update failed", updateError);
      continue;
    }

    // 4. Fetch target price (if any)
    const { data: target } = await supabase
      .from("user_targets")
      .select("target_price")
      .eq("user_id", product.user_id)
      .eq("product_url", product.product_url)
      .single();

    if (!target?.target_price) continue;

    // 5. Trigger alert if condition met
    if (newPrice <= target.target_price) {
      const { addAlert } = useAlertStore.getState();

      addAlert({
        type: "PRICE_DROP",
        productId: product.id,
        title: product.title,
        message: `Price dropped to ₹${newPrice}`,
        metadata: {
          previousPrice: product.current_price,
          currentPrice: newPrice,
          targetPrice: target.target_price,
          source: "price-check",
        },
      });
    }
  }
}
