// src/services/productService.js
import { adapter } from "@/adapters";

export const productService = {
  async getProducts(userId) {
    if (!userId) return [];
    return adapter.getProducts(userId);
  },
};
