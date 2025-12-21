// src/services/productService.js
import { simulatePriceDrop } from "@/lib/mockPriceUpdater";
import { handleProductAlert } from "./alertService";

/**
 * Business rules for product updates
 */
export const productService = {
  updatePrice(product) {
    const newPrice = simulatePriceDrop(product.currentPrice);

    const updatedProduct = {
      ...product,
      currentPrice: newPrice,
      priceHistory: [
        ...product.priceHistory,
        {
          date: new Date().toLocaleDateString(),
          price: newPrice,
        },
      ],
    };

    handleProductAlert(updatedProduct);

    return updatedProduct;
  },
};
