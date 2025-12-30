// src/lib/alertEngineV2.js
import { ALERT_TYPES } from "@/lib/alertTypes";
import { useUserTargetsStore } from "@/store/userTargetStore";

/**
 * ✅ CANONICAL ALERT ENGINE
 * Evaluates whether an alert should be fired for a product update.
 */
export function evaluatePriceAlert(product) {
  console.log("🔍 Evaluating alert for:", {
    id: product.id,
    current_price: product.current_price,
    target_price: product.target_price,
    alert_enabled: product.alert_enabled,
  });

  if (!product.alert_enabled) return null;
  if (!product.target_price) return null;

  if (product.current_price <= product.target_price) {
    console.log("🚨 ALERT CONDITION MET");
    return {
      type: ALERT_TYPES.PRICE_DROP,
      title: "Target Price Reached 🎯",
      message: `${product.title} is now ₹${product.current_price}`,
      productId: product.id,
      metadata: {
        productId: product.id,
        currentPrice: product.current_price,
        targetPrice: product.target_price,
      },
      createdAt: Date.now(),
      read: false,
    };
  }

  return null;
}
