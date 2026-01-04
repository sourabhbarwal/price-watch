// src/services/alertService.js
import { supabase } from "@/lib/supabaseClient";

export const alertService = {
  async saveAlert(alert) {
    if (!alert.productId) return;

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return;

    const payload = {
      user_id: user.id,
      product_id: alert.productId,
      type: alert.type,
      title: alert.title,
      message: alert.description ?? alert.message ?? "",
      read: alert.read ?? false,
      metadata: alert.metadata ?? {},
    };

    const { error } = await supabase.from("alerts").insert(payload);

    // 🔕 Ignore duplicate alerts safely
    if (error?.code === "23505") {
      // unique constraint violation
      return;
    }

    if (error) {
      console.error("[AlertService] Insert failed", error);
      throw error;
    }
  },
};
