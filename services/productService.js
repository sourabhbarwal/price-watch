// src/services/productService.js
import { adapter } from "@/adapters";
import { simulatePriceDrop } from "@/lib/mockPriceUpdater";
import { handleProductAlert } from "./alertService";

export const productService = {
  async loadProducts(user) {
    if (!user) return [];
    return adapter.getProducts(user.id);
  },

  async updatePrice(product, user) {
    const newPrice = simulatePriceDrop(
      product.currentPrice
    );

    const updatedProduct = {
      ...product,
      currentPrice: newPrice,
      user_id: user.id,
    };

    await adapter.saveProduct(updatedProduct);
    await adapter.addPriceHistory(
      product.id,
      newPrice
    );

    handleProductAlert(updatedProduct);

    return updatedProduct;
  },
};
