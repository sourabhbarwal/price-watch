// src/services/authService.js
import { supabase } from "@/lib/supabaseClient";

export const authService = {
  async signIn(email, password) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;
    return data.user;
  },

  async signUp(email, password) {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) throw error;
    return data.user;
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session?.user ?? null);
      }
    );
  },
};
