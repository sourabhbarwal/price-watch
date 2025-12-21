// src/services/analyticsService.js
import { calculatePriceAnalytics } from "@/lib/priceAnalytics";

export function getProductAnalytics(priceHistory) {
  return calculatePriceAnalytics(priceHistory);
}
