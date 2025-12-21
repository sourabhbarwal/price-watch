// // /store/alertStore.js

// import { create } from "zustand";

// const STORAGE_KEY = "price-watch-alerts";

// function loadAlerts() {
//   if (typeof window === "undefined") return [];
//   try {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   } catch {
//     return [];
//   }
// }

// function saveAlerts(alerts) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
// }

// function isDuplicate(existingAlerts, newAlert) {
//   return existingAlerts.some((alert) => {
//     return (
//       alert.type === newAlert.type &&
//       alert.productId === newAlert.productId &&
//       alert.metadata?.currentPrice === newAlert.metadata?.currentPrice
//     );
//   });
// }

// export const useAlertStore = create((set, get) => ({
//   notifications: loadAlerts(),

//   pushAlert: (alert) => {
//     const existing = get().notifications;

//     if (isDuplicate(existing, alert)) {
//       return;
//     }

//     const alertWithId = {
//       id: crypto.randomUUID(),
//       ...alert,
//     };

//     const updated = [alertWithId, ...existing];
//     saveAlerts(updated);
//     set({ notifications: updated });
//   },

//   markAsRead: (id) => {
//     const updated = get().notifications.map((n) =>
//       n.id === id ? { ...n, read: true } : n
//     );
//     saveAlerts(updated);
//     set({ notifications: updated });
//   },

//   markAllAsRead: () => {
//     const updated = get().notifications.map((n) => ({
//       ...n,
//       read: true,
//     }));
//     saveAlerts(updated);
//     set({ notifications: updated });
//   },

//   clearNotifications: () => {
//     saveAlerts([]);
//     set({ notifications: [] });
//   },
// }));

// /store/alertStore.js

import { create } from "zustand";

const STORAGE_KEY = "price-watch-alerts";
const ALERT_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

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

function isDuplicate(existingAlerts, newAlert) {
  return existingAlerts.some((alert) => {
    return (
      alert.type === newAlert.type &&
      alert.productId === newAlert.productId &&
      alert.metadata?.currentPrice === newAlert.metadata?.currentPrice
    );
  });
}

function isInCooldown(existingAlerts, newAlert) {
  const now = Date.now();

  const lastAlert = existingAlerts.find(
    (alert) =>
      alert.type === newAlert.type &&
      alert.productId === newAlert.productId
  );

  if (!lastAlert) return false;

  return now - lastAlert.createdAt < ALERT_COOLDOWN_MS;
}

export const useAlertStore = create((set, get) => ({
  notifications: loadAlerts(),

  pushAlert: (alert) => {
    const existing = get().notifications;

    // 1️⃣ Exact duplicate protection
    if (isDuplicate(existing, alert)) {
      return;
    }

    // 2️⃣ Cooldown protection
    if (isInCooldown(existing, alert)) {
      return;
    }

    const alertWithId = {
      id: crypto.randomUUID(),
      ...alert,
    };

    const updated = [alertWithId, ...existing];
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
