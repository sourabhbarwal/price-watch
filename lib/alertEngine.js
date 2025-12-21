// // src/lib/alertEngine.js

// export function checkPriceAlert(product) {
//   if (!product.alertEnabled) return null;

//   if (product.currentPrice <= product.targetPrice) {
//     return {
//       id: crypto.randomUUID(),
//       productId: product.id,
//       title: "Price Drop Alert 🚨",
//       message: `${product.title} dropped to ₹${product.currentPrice}`,
//       createdAt: new Date().toISOString(),
//       read: false,
//     };
//   }

//   return null;
// }

/**
 * 🚫 OBSOLETE ALERT ENGINE
 * Replaced by alertEngineV2.
 * Do not use.
 */

export function checkPriceAlert() {
  return null;
}
