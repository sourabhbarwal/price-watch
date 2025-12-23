// src/store/productStore.js
import { create } from "zustand";
import { productService } from "@/services/productService";
import { useAuthStore } from "@/store/authStore";

export const useProductStore = create((set,get) => ({
  products: [],
  loading: false,
  error: null,

  async loadProducts() {
    const { user } = useAuthStore.getState();

    if (!user){
      set({products: [],loading:false});
      return;
    }

    set({ loading: true , error: null});
    try {
      const products = await productService.getProducts(user.id);
      set({ products });
    } catch (err) {
      console.error("Failed to load products", err);
      set({ error: err.message || "Failed to load products" });
    } finally {
      set({ loading: false });
    }
  },

  clearProducts() {
    set({ products: [] , loading: false , error:null});
  },
}));
