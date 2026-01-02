// src/services/alertService.js
import { supabase } from "@/lib/supabaseClient";

export const alertService = {
  async saveAlert(alert) {
    // 🔒 Must have product
    if (!alert.productId) return;

    // 🔑 Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.warn("[AlertService] No authenticated user");
      return;
    }

    const payload = {
      user_id: user.id,
      product_id: alert.productId,
      type: alert.type,
      title: alert.title,
      message : alert.description ?? alert.message ?? "",
      read: alert.read ?? false,
      metadata: alert.metadata ?? {},
    };

    const { error } = await supabase.from("alerts").insert(payload);

    if (error) {
      console.error("[AlertService] Insert failed", error);
      throw error;
    }
  },
};
