export function computeAnalytics(priceHistory = []) {
  if (!priceHistory.length) return null;

  const prices = priceHistory.map((p) => p.price);
  const sum = prices.reduce((a, b) => a + b, 0);

  return {
    lowestPrice: Math.min(...prices),
    highestPrice: Math.max(...prices),
    averagePrice: Math.round(sum / prices.length),
    predictedLowInDays: 7, // placeholder
  };
}
