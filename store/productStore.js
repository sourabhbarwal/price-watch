// src/store/productStore.js
import { create } from "zustand";
import { productService } from "@/services/productService";
import { useAuthStore } from "@/store/authStore";

export const useProductStore = create((set,get) => ({
  products: [],
  loading: false,

  async loadProducts() {
    const { user, loading: authLoading } =
      useAuthStore.getState();

    if (authLoading || !user) return;

    set({ loading: true});
    try {
      const products = await productService.getProducts(user.id);
      set({ products });
    } catch (err) {
      console.error("Failed to load products", err);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },

  clearProducts() {
    set({ products: []  });
  },
}));
