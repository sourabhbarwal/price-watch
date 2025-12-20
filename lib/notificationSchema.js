// /lib/notificationSchema.js
export function createPriceDropNotification(product) {
  return {
    refId: product.id,
    type: "PRICE_DROP",
    title: "Price Drop Alert 🔥",
    message: `${product.name} dropped to ₹${product.currentPrice}`,
    metadata: {
      productId: product.id,
      newPrice: product.currentPrice,
    },
  };
}
