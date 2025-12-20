// src/store/productStore.js

import { create } from "zustand";
import { simulatePriceDrop } from "@/lib/mockPriceUpdater";
import { useAlertStore } from "@/store/alertStore";

export const useProductStore = create((set, get) => ({
  products: [
    {
      id: "1",
      title: "iPhone 15",
      currentPrice: 79999,
      targetPrice: 75000,
      alertEnabled: true,
    },
    {
      id: "2",
      title: "Sony WH-1000XM5",
      currentPrice: 29999,
      targetPrice: 26000,
      alertEnabled: true,
    },
  ],

  updateProductPrice: (productId) => {
    const alertStore = useAlertStore.getState();

    set((state) => ({
      products: state.products.map((product) => {
        if (product.id !== productId) return product;

        const updatedProduct = {
          ...product,
          currentPrice: simulatePriceDrop(product.currentPrice),
        };

        // 🔔 TRIGGER ALERT HERE
        alertStore.runAlertCheck(updatedProduct);

        return updatedProduct;
      }),
    }));
  },
}));
