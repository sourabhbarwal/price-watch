// src/lib/priceAlert.js
import { useAlertStore } from "@/store/alertStore";
import { useUserTargetsStore } from "@/store/userTargetStore";
import { useNotificationSettingsStore } from "@/store/notificationSettingsStore";

export function checkPriceAlerts(products) {
  const { addNotification, alertedProducts } =
    useAlertStore.getState();
  const { targets } = useUserTargetsStore.getState();
  const { enabled } =
    useNotificationSettingsStore.getState();

  if (!enabled) return;

  products.forEach((product) => {
    const target = targets[product.id];
    if (!target) return;

    const alreadyAlerted = alertedProducts[product.id];

    // Fire ONLY once per threshold crossing
    if (
      product.currentPrice <= target &&
      !alreadyAlerted
    ) {
      addNotification({
        type: "price-drop",
        title: "Price Drop Alert 🎯",
        message: `${product.name} is now ₹${product.currentPrice} (below ₹${target})`,
        productId: product.id,
      });
    }

    // Reset alert eligibility if price goes back up
    if (
      product.currentPrice > target &&
      alreadyAlerted
    ) {
      useAlertStore
        .getState()
        .resetProductAlert(product.id);
    }
  });
}
