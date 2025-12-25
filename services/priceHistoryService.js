// src/services/priceHistoryService.js
import { supabase } from "@/lib/supabaseClient";

export const priceHistoryService = {
  async getByProduct(productId) {
    const { data, error } = await supabase
      .from("price_history")
      .select("price, recorded_at")
      .eq("product_id", productId)
      .order("recorded_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  async addPricePoint(productId, price) {
    const { error } = await supabase
      .from("price_history")
      .insert({
        product_id: productId,
        price,
      });

    if (error) throw error;
  },
};
