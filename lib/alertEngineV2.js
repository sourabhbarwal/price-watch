// src/lib/alertEngineV2.js
import { ALERT_TYPES, ALERT_SEVERITY } from "@/lib/alertTypes";
import { useUserTargetsStore } from "@/store/userTargetStore";
export function evaluatePriceAlert(product) {
  const { targets } = useUserTargetsStore.getState();
  const targetPrice = targets[product.id];

  if (!targetPrice) return null;
  if (!product.alertEnabled) return null;

  if (product.currentPrice <= targetPrice) {
    return {
      type: ALERT_TYPES.TARGET_HIT,
      severity: ALERT_SEVERITY.CRITICAL,
      title: "Target Price Reached 🎯",
      message: `${product.title} is now ₹${product.currentPrice}`,
      productId: product.id,
    };
  }

  return null;
}
