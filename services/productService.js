// src/services/productService.js
import { supabase } from "@/lib/supabaseClient";

export const productService = {
  async getProducts(userId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async createProduct(payload) {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * 🔑 Single source of truth for price updates
   */
  async updateProductPrice({ productId, newPrice }) {
    // 1️⃣ Get latest recorded price
    const { data: lastPoint } = await supabase
      .from("price_history")
      .select("price")
      .eq("product_id", productId)
      .order("recorded_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // 2️⃣ If price unchanged → do nothing
    if (lastPoint?.price === newPrice) {
      return { skipped: true };
    }

    // 3️⃣ Update product current price
    const { error: productError } = await supabase
      .from("products")
      .update({ current_price: newPrice })
      .eq("id", productId);

    if (productError) throw productError;

    // 4️⃣ Insert price history point
    const { error: historyError } = await supabase
      .from("price_history")
      .insert({
        product_id: productId,
        price: newPrice,
      });

    if (historyError) throw historyError;

    return { updated: true };
  },

  async getPriceHistory(productId) {
    const { data, error } = await supabase
      .from("price_history")
      .select("price, recorded_at")
      .eq("product_id", productId)
      .order("recorded_at", { ascending: true });

    if (error) throw error;
    return data;
  },
};
