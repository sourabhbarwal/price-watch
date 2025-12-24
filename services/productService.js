// src/services/productService.js
import { adapter } from "@/adapters";
import { supabase } from "@/lib/supabaseClient";

export const productService = {
  async getProducts(userId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async createProduct({ userId, title, url, price }) {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          user_id: userId,
          title,
          url,
          current_price: price,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
