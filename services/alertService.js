import { storage } from "@/adapters/localStorageAdapter";
import { createPriceDropNotification } from "@/lib/notificationSchema";

export function runAlertCheck(product) {
  if (!product.alertEnabled) return;

  if (product.currentPrice <= product.targetPrice) {
    const alerts = storage.getAlerts();

    const exists = alerts.some(
      (a) =>
        a.metadata?.productId === product.id &&
        a.metadata?.newPrice === product.currentPrice
    );

    if (exists) return;

    const notification = {
      id: crypto.randomUUID(),
      ...createPriceDropNotification(product),
      createdAt: Date.now(),
      read: false,
    };

    storage.saveAlerts([notification, ...alerts]);
  }
}
