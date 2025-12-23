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
    return data.session; // 🔑 return session
  },

  async signUp(email, password) {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) throw error;
    return data.session; // 🔑 return session
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  },

  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session); // 🔑 pass session, not user
      }
    );
  },
};
