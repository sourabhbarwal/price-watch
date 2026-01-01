// lib/extensionAlertHelper.js

import { useAlertStore } from "@/store/alertStore";

export function triggerImmediatePriceAlert({
  product,
  targetPrice,
}) {
  if (!targetPrice) return;
  if (product.current_price > targetPrice) return;

  const { addAlert } = useAlertStore.getState();

  addAlert({
    type: "PRICE_DROP",
    productId: product.id,
    title: product.title,
    message: `Price dropped to ₹${product.current_price}`,
    metadata: {
      currentPrice: product.current_price,
      targetPrice,
      source: "extension",
    },
  });
}
