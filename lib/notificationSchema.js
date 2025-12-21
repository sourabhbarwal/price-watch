// /lib/notificationSchema.js

import { ALERT_TYPES } from "./alertTypes";

export function createPriceDropNotification(product) {
  return {
    type: ALERT_TYPES.PRICE_DROP,
    productId: product.id,
    title: "Price Drop Alert 🔥",
    message: `${product.title} dropped to ₹${product.currentPrice}`,
    metadata: {
      productId: product.id,
      currentPrice: product.currentPrice,
      targetPrice: product.targetPrice,
    },
    createdAt: Date.now(),
    read: false,
  };
}

export function createPredictionNotification(product, predictionText) {
  return {
    type: ALERT_TYPES.PREDICTION,
    productId: product.id,
    title: "Price Prediction 📉",
    message: predictionText,
    metadata: {
      productId: product.id,
    },
    createdAt: Date.now(),
    read: false,
  };
}

export function createSystemNotification(message) {
  return {
    type: ALERT_TYPES.SYSTEM,
    productId: null,
    title: "System Notification",
    message,
    metadata: {},
    createdAt: Date.now(),
    read: false,
  };
}
