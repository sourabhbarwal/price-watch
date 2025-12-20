// src/lib/priceAnalytics.js
export function calculatePriceAnalytics(priceHistory = []) {
  if (!priceHistory || priceHistory.length === 0) {
    return {
      lowestPrice: null,
      highestPrice: null,
      averagePrice: null,
      volatilityScore: 0,
      bestTimeToBuy: "Insufficient data",
    };
  }

  const prices = priceHistory.map((p) => p.price);

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const averagePrice = Math.round(
    prices.reduce((sum, price) => sum + price, 0) / prices.length
  );

  let totalChange = 0;
  for (let i = 1; i < prices.length; i++) {
    totalChange += Math.abs(prices[i] - prices[i - 1]);
  }

  const volatilityScore =
    prices.length > 1 ? Math.round(totalChange / (prices.length - 1)) : 0;

  let bestTimeToBuy = "Stable";
  const latestPrice = prices[prices.length - 1];

  if (latestPrice === lowestPrice) {
    bestTimeToBuy = "Now";
  } else if (volatilityScore > 500) {
    bestTimeToBuy = "Wait for drop";
  }

  return {
    lowestPrice,
    highestPrice,
    averagePrice,
    volatilityScore,
    bestTimeToBuy,
  };
}
