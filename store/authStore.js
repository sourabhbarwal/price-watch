// src/store/authStore.js
import { create } from "zustand";
import { authService } from "@/services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  async init() {
    const user = await authService.getCurrentUser();
    set({ user, loading: false });

    authService.onAuthChange((user) => {
      set({ user });
    });
  },

  async signIn(email, password) {
    const user = await authService.signIn(
      email,
      password
    );
    set({ user });
  },

  async signUp(email, password) {
    const user = await authService.signUp(
      email,
      password
    );
    set({ user });
  },

  async signOut() {
    await authService.signOut();
    set({ user: null });
  },
}));
