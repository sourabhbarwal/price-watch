// src/store/alertStore.js
import { create } from "zustand";
const STORAGE_KEY = "price-watch-alerts";
const COOLDOWN_MS = 1000 * 60 * 60; // 1 hour
function loadAlerts() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveAlerts(alerts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
}

export const useAlertStore = create((set, get) => ({
  notifications: loadAlerts(),
  lastTriggered: {},

  canTrigger: (productId) => {
    const last = get().lastTriggered[productId];
    if (!last) return true;
    return Date.now() - last > COOLDOWN_MS;
  },

  addNotification: (notification) => {
    if (!notification?.productId) return;
    if (!get().canTrigger(notification.productId)) return;

    const existingIndex = get().notifications.findIndex(
      (n) =>
        n.productId === notification.productId &&
        n.type === notification.type
    );

    let updatedNotifications;

    if (existingIndex !== -1) {
      // 🔁 Merge into existing alert group
      updatedNotifications = get().notifications.map((alert, idx) =>
        idx === existingIndex
          ? {
              ...alert,
              count: (alert.count || 1) + 1,
              message: notification.message,
              severity: notification.severity,
              lastUpdatedAt: Date.now(),
              read: false,
            }
          : alert
      );
    } else {
      // 🆕 Create new alert group
      const newAlert = {
        id: crypto.randomUUID(),
        productId: notification.productId,
        type: notification.type,
        severity: notification.severity,
        title: notification.title,
        message: notification.message,
        count: 1,
        read: false,
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
      };

      updatedNotifications = [newAlert, ...get().notifications];
    }

    saveAlerts(updatedNotifications);

    set((state) => ({
      notifications: updatedNotifications,
      lastTriggered: {
        ...state.lastTriggered,
        [notification.productId]: Date.now(),
      },
    }));
  },
  resetProductAlert: (productId) => {
    const filtered = get().notifications.filter(
      (n) => n.productId !== productId
    );

    saveAlerts(filtered);

    set((state) => {
      const updatedLastTriggered = { ...state.lastTriggered };
      delete updatedLastTriggered[productId];

      return {
        notifications: filtered,
        lastTriggered: updatedLastTriggered,
      };
    });
  },
  markAsRead: (id) => {
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveAlerts(updated);
    set({ notifications: updated });
  },

  clearNotifications: () => {
    saveAlerts([]);
    set({ notifications: [] });
  },
}));
