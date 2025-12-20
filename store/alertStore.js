// // /store/alertStore.js
// import { create } from "zustand";

// const STORAGE_KEY = "pricewatch_notifications";

// export const useAlertStore = create((set, get) => ({
//   notifications:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
//       : [],

//   addNotification: (notification) => {
//     const exists = get().notifications.some(
//       (n) => n.refId === notification.refId
//     );

//     if (exists) return;

//     const updated = [
//       {
//         id: Date.now(),
//         read: false,
//         createdAt: new Date(),
//         ...notification,
//       },
//       ...get().notifications,
//     ];

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//     set({ notifications: updated });
//   },

//   markAsRead: (id) => {
//     const updated = get().notifications.map((n) =>
//       n.id === id ? { ...n, read: true } : n
//     );

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//     set({ notifications: updated });
//   },

//   markAllAsRead: () => {
//     const updated = get().notifications.map((n) => ({
//       ...n,
//       read: true,
//     }));

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//     set({ notifications: updated });
//   },
// }));

// src/store/alertStore.js

import { create } from "zustand";

const STORAGE_KEY = "price-watch-alerts";

function loadAlerts() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAlerts(alerts) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
}

export const useAlertStore = create((set, get) => ({
  notifications: loadAlerts(),

  addNotification: (notification) => {
    const newAlert = {
      id: crypto.randomUUID(),
      type: notification.type || "info",
      title: notification.title,
      message: notification.message,
      productId: notification.productId || null,
      createdAt: Date.now(),
      read: false,
    };

    const updated = [newAlert, ...get().notifications];
    saveAlerts(updated);

    set({ notifications: updated });
  },

  markAsRead: (id) => {
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );

    saveAlerts(updated);
    set({ notifications: updated });
  },

  markAllAsRead: () => {
    const updated = get().notifications.map((n) => ({
      ...n,
      read: true,
    }));

    saveAlerts(updated);
    set({ notifications: updated });
  },

  clearNotifications: () => {
    saveAlerts([]);
    set({ notifications: [] });
  },
}));
