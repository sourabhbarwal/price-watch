// src/lib/mockPriceUpdater.js

export function simulatePriceDrop(price) {
  const drop = Math.floor(Math.random() * 500);
  return Math.max(price - drop, 100);
}
