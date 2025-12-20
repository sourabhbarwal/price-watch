// /lib/extensionBridge.js
import { checkPriceAlerts } from "./priceAlert";

export function handleExtensionMessage(data) {
  if (!data?.products) return;
  checkPriceAlerts(data.products);
}
