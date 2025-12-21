import { storage } from "../adapters/localStorageAdapter";
import { simulatePriceDrop } from "../mockPriceUpdater";
import { runAlertCheck } from "./alertService";

export const productService = {
  getAll() {
    return storage.getProducts();
  },

  saveAll(products) {
    storage.saveProducts(products);
  },

  updatePrice(productId) {
    const products = storage.getProducts();

    const updated = products.map((p) => {
      if (p.id !== productId) return p;

      const updatedProduct = {
        ...p,
        currentPrice: simulatePriceDrop(p.currentPrice),
        updatedAt: Date.now(),
      };

      runAlertCheck(updatedProduct);
      return updatedProduct;
    });

    storage.saveProducts(updated);
    return updated;
  },
};
