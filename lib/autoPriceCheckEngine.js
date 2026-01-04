// src/lib/autoPriceCheckEngine.js
import { evaluatePriceAlert } from "@/server/serverAlertEngine";
import { useProductStore } from "@/store/productStore";

export function startAutoPriceCheck() {
  const interval = setInterval(async () => {
    const products = useProductStore.getState().products;

    products.forEach(async (product) => {
      const simulatedDrop = product.currentPrice - 1000;

      await evaluatePriceAlert({
        product,
        previousPrice: product.currentPrice,
        currentPrice: simulatedDrop,
        userTargetPrice: product.targetPrice,
      });
    });
  }, 15000);

  return () => clearInterval(interval);
}
