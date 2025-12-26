// // src/store/productStore.js
// import { create } from "zustand";
// import { productService } from "@/services/productService";
// import { useAuthStore } from "@/store/authStore";

// export const useProductStore = create((set,get) => ({
//   products: [],
//   loading: false,

//   async loadProducts() {
//     const { user, loading: authLoading } =
//       useAuthStore.getState();

//     if (authLoading || !user) return;

//     set({ loading: true});
//     try {
//       const products = await productService.getProducts(user.id);
//       set({ products });
//     } catch (err) {
//       console.error("Failed to load products", err);
//       set({ products: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   clearProducts() {
//     set({ products: []  });
//   },
// }));

// src/store/productStore.js
import { create } from "zustand";
import { productService } from "@/services/productService";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  async loadProducts(userId) {
    // 🔒 HARD GUARD — prevents uuid = undefined
    if (!userId) {
      console.warn("Skipping loadProducts: userId not ready");
      return;
    }

    set({ loading: true, error: null });

    try {
      const products = await productService.getProducts(userId);
      set({ products });
    } catch (err) {
      console.error("Failed to load products", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addProduct(product) {
    set((state) => ({
      products: [product, ...state.products],
    }));
  },

  clearProducts() {
    set({ products: [] });
  },
}));
