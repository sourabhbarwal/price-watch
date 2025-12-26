// // src/lib/priceAnalytics.js

/**
 * Converts raw price_history rows into chart-friendly data
 */
// export function buildPriceChartData(history = []) {
//   if (!Array.isArray(history)) return [];

//   return history.map((point) => ({
//     price: point.price,
//     date: new Date(point.recorded_at).toLocaleDateString(),
//   }));
// }

// /**
//  * Basic analytics (safe even with 0–1 points)
//  */
// export function calculatePriceAnalytics(history = []) {
//   if (!history.length) {
//     return {
//       lowest: null,
//       highest: null,
//       trend: "flat",
//     };
//   }

//   const prices = history.map((p) => p.price);

//   const lowest = Math.min(...prices);
//   const highest = Math.max(...prices);

//   let trend = "flat";
//   if (prices.length > 1) {
//     trend =
//       prices[prices.length - 1] > prices[0]
//         ? "up"
//         : prices[prices.length - 1] < prices[0]
//         ? "down"
//         : "flat";
//   }

//   return { lowest, highest, trend };
// }

// src/lib/priceAnalytics.js

export function buildPriceChartData(history = []) {
  if (!Array.isArray(history)) return [];

  return history.map((point) => ({
    price: point.price,
    date: new Date(point.recorded_at).toLocaleDateString(),
  }));
}

export function calculatePriceAnalytics(history = []) {
  if (!Array.isArray(history) || history.length === 0) {
    return {
      lowestPrice: "—",
      averagePrice: "—",
      volatilityScore: "—",
      bestTimeToBuy: "Not enough data",
    };
  }

  const prices = history.map(p => p.price);

  const lowestPrice = Math.min(...prices);
  const averagePrice = Math.round(
    prices.reduce((a, b) => a + b, 0) / prices.length
  );

  // 📉 Volatility = average absolute % change
  let volatility = 0;

  if (prices.length > 1) {
    let totalChange = 0;

    for (let i = 1; i < prices.length; i++) {
      const change =
        Math.abs(prices[i] - prices[i - 1]) / prices[i - 1];
      totalChange += change;
    }

    volatility = Math.round((totalChange / (prices.length - 1)) * 100);
  }

  const currentPrice = prices[prices.length - 1];

  let bestTimeToBuy = "Stable";

  if (currentPrice === lowestPrice && prices.length > 1) {
    bestTimeToBuy = "Best Time";
  } else if (currentPrice < averagePrice) {
    bestTimeToBuy = "Good Time";
  } else if (currentPrice > averagePrice) {
    bestTimeToBuy = "Wait";
  }

  return {
    lowestPrice,
    averagePrice,
    volatilityScore: volatility,
    bestTimeToBuy,
  };
}
