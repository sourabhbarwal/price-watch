// src/server/serverAlertEngine.js

import { useAlertStore } from "@/store/alertStore";

/**
 * Canonical server-side alert evaluator
 * This will later be reused by cron / workers
 */
export async function evaluatePriceAlert({
  product,
  currentPrice,
  previousPrice,
  userTargetPrice,
}) {
  if (!product?.id || !userTargetPrice) return;

  // 🔻 Target price reached
  if (currentPrice <= userTargetPrice) {
    await useAlertStore.getState().pushAlert({
      type: "TARGET_PRICE_REACHED",
      title: "Target price reached 🎯",
      description: `${product.title} is now ₹${currentPrice}`,
      productId: product.id,
      metadata: {
        previousPrice,
        currentPrice,
        targetPrice: userTargetPrice,
      },
    });
  }

  // 🔻 Significant price drop
  if (
    previousPrice &&
    currentPrice < previousPrice &&
    previousPrice - currentPrice >= 500
  ) {
    await useAlertStore.getState().pushAlert({
      type: "PRICE_DROP",
      title: "Price dropped 📉",
      description: `${product.title} dropped from ₹${previousPrice} to ₹${currentPrice}`,
      productId: product.id,
      metadata: {
        previousPrice,
        currentPrice,
      },
    });
  }
}
