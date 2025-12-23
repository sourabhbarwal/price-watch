// src/store/productStore.js
import { create } from "zustand";
import { productService } from "@/services/productService";
import { useAuthStore } from "./authStore";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  async loadProducts() {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true });

    try {
      const products =
        await productService.loadProducts(user);
      set({ products });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  async updateProductPrice(productId) {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true });

    try {
      set((state) => ({
        products: state.products.map((p) =>
          p.id === productId
            ? productService.updatePrice(p, user)
            : p
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },
}));
