// src/store/productStore.js
import { create } from "zustand";
import { simulatePriceDrop } from "@/lib/mockPriceUpdater";
import { evaluatePriceAlert } from "@/lib/alertEngineV2";
import { useAlertStore } from "@/store/alertStore";

export const useProductStore = create((set, get) => ({
  products: [
    {
      id: "1",
      title: "iPhone 15",
      currentPrice: 79999,
      targetPrice: 75000,
      alertEnabled: true,
      priceHistory: [
        { date: "Dec 10", price: 82999 },
        { date: "Dec 12", price: 81999 },
        { date: "Dec 14", price: 80999 },
        { date: "Dec 16", price: 79999 },
      ],
    },
    {
      id: "2",
      title: "Sony WH-1000XM5",
      currentPrice: 29999,
      targetPrice: 26000,
      alertEnabled: true,
      priceHistory: [
        { date: "Dec 10", price: 31999 },
        { date: "Dec 12", price: 30999 },
        { date: "Dec 14", price: 29999 },
      ],
    },
  ],

  updateProductPrice: (productId) => {
    const alertStore = useAlertStore.getState();

    set((state) => ({
      products: state.products.map((product) => {
        if (product.id !== productId) return product;

        // 1️⃣ Simulate price change
        const newPrice = simulatePriceDrop(product.currentPrice);

        // 2️⃣ Update price history
        const updatedHistory = [
          ...product.priceHistory,
          {
            date: new Date().toLocaleDateString(),
            price: newPrice,
          },
        ];

        const updatedProduct = {
          ...product,
          currentPrice: newPrice,
          priceHistory: updatedHistory,
        };

        // 3️⃣ Ask alert engine if alert should fire
        const alert = evaluatePriceAlert(updatedProduct);

        // 4️⃣ Trigger alert (if allowed by cooldown)
        if (alert) {
          alertStore.addNotification(alert);
        }

        return updatedProduct;
      }),
    }));
  },
}));
