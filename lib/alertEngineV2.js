// src/lib/alertEngineV2.js
import { ALERT_TYPES } from "@/lib/alertTypes";
import { useUserTargetsStore } from "@/store/userTargetStore";

/**
 * ✅ CANONICAL ALERT ENGINE
 * Evaluates whether an alert should be fired for a product update.
 */
export function evaluatePriceAlert(product) {
  const { targets } = useUserTargetsStore.getState();
  const targetPrice = targets[product.id];

  if (!product.alertEnabled) return null;
  if (!targetPrice) return null;

  if (product.currentPrice <= targetPrice) {
    return {
      type: ALERT_TYPES.PRICE_DROP,
      title: "Target Price Reached 🎯",
      message: `${product.title} is now ₹${product.currentPrice}`,
      productId: product.id,
      metadata: {
        productId: product.id,
        currentPrice: product.currentPrice,
        targetPrice,
      },
      createdAt: Date.now(),
      read: false,
    };
  }

  return null;
}
