// // src/store/authStore.js

import { create } from "zustand";
import { authService } from "@/services/authService";

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  loading: true,

  async init() {
    // 🔑 Restore session FIRST
    const session = await authService.getSession();

    set({
      session,
      user: session?.user ?? null,
      loading: false,
    });

    // 🔑 Subscribe to future auth changes
    authService.onAuthChange((session) => {
      set({
        session,
        user: session?.user ?? null,
      });
    });
  },

  async signIn(email, password) {
    const session = await authService.signIn(
      email,
      password
    );

    set({
      session,
      user: session.user,
    });

    return session;
  },

  async signOut() {
    await authService.signOut();
    set({ session: null, user: null });
  },
}));
