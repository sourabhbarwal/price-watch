// src/lib/priceAnalytics.js

/**
 * Calculates analytics from price history
 * This is a PURE FUNCTION (no state, no side effects)
 */
export function calculatePriceAnalytics(priceHistory = []) {
  // 1. Safety guard
  if (!Array.isArray(priceHistory) || priceHistory.length < 2) {
    return {
      lowestPrice: null,
      highestPrice: null,
      averagePrice: null,
      volatilityScore: 0,
      bestTimeToBuy: "Not enough data",
    };
  }

  // 2. Extract prices
  const prices = priceHistory.map((entry) => entry.price);

  // 3. Basic analytics
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const averagePrice = Math.round(
    prices.reduce((sum, p) => sum + p, 0) / prices.length
  );

  // 4. Volatility calculation
  let totalChange = 0;
  for (let i = 1; i < prices.length; i++) {
    totalChange += Math.abs(prices[i] - prices[i - 1]);
  }

  const volatilityScore = Math.round(
    totalChange / (prices.length - 1)
  );

  // 5. Trend detection (last two prices)
  const lastPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2];

  let bestTimeToBuy = "Stable price — monitor";

  if (lastPrice < previousPrice) {
    bestTimeToBuy = "Likely to drop further — wait";
  }

  if (lastPrice === lowestPrice) {
    bestTimeToBuy = "Near lowest — good time to buy";
  }

  if (lastPrice > averagePrice && lastPrice > previousPrice) {
    bestTimeToBuy = "Rising trend — buy if urgent";
  }

  return {
    lowestPrice,
    highestPrice,
    averagePrice,
    volatilityScore,
    bestTimeToBuy,
  };
}
