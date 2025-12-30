// /lib/autoPriceCheckEngine.js

import { useAlertStore } from "@/store/alertStore";

/**
 * DEV-ONLY auto price check simulator
 * Mimics a background price polling job
 */
export function startAutoPriceCheck(products) {
  if (process.env.NODE_ENV !== "development") return;

  const INTERVAL_MS = 15_000; // 15 seconds

  setInterval(() => {
    products.forEach((product) => {
      if (!product.target_price) return;

      // Simulate small random movement
      const delta = Math.floor(Math.random() * 1500);
      const newPrice = product.current_price - delta;

      if (newPrice <= product.target_price) {
        useAlertStore.getState().pushAlert({
          type: "price-drop",
          title: "Price Drop Alert 🎯",
          description: `${product.title} dropped to ₹${newPrice}`,
          productId: product.id,
          metadata: {
            currentPrice: newPrice,
            targetPrice: product.target_price,
          },
          href: `/product/${product.id}`,
        });
      }
    });
  }, INTERVAL_MS);
}
