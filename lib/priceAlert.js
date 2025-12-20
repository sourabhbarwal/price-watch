// /lib/priceAlert.js
import { useAlertStore } from "@/store/alertStore";

export function checkPriceAlerts(products) {
  const { addNotification } = useAlertStore.getState();

  products.forEach((product) => {
    if (product.currentPrice <= product.targetPrice) {
      addNotification({
        refId: product.id,
        title: "Price Drop Alert 🔥",
        message: `${product.name} dropped to ₹${product.currentPrice}`,
      });
    }
  });
}
