// src/store/alertStore.js

import { create } from "zustand";
import { checkPriceAlert } from "@/lib/alertEngine";

export const useAlertStore = create((set, get) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  runAlertCheck: (product) => {
    const alert = checkPriceAlert(product);
    if (alert) {
      get().addNotification(alert);
    }
  },
}));
