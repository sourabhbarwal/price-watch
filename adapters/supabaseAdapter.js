// src/adapters/supabaseAdapter.js
import { supabase } from "@/lib/supabaseClient";

export const supabaseAdapter = {
  /* ---------------- PRODUCTS ---------------- */

  async getProducts(userId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  },

  async saveProduct(product) {
    const { error } = await supabase
      .from("products")
      .upsert(product);

    if (error) throw error;
  },

  /* ---------------- PRICE HISTORY ---------------- */

  async addPriceHistory(productId, price) {
    const { error } = await supabase
      .from("price_history")
      .insert({
        product_id: productId,
        price,
      });

    if (error) throw error;
  },

  /* ---------------- ALERTS ---------------- */

  async getAlerts(userId) {
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async saveAlert(alert) {
    const { error } = await supabase
      .from("alerts")
      .insert(alert);

    if (error) throw error;
  },
};
