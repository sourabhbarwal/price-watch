// // /store/alertStore.js

import { create } from "zustand";
const STORAGE_KEY = "price-watch-alerts";
const ALERT_COOLDOWN_MS = 24 * 60 * 60 * 1000;

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

function isDuplicate(existing, incoming) {
  return existing.some(
    (a) =>
      a.type === incoming.type &&
      a.productId === incoming.productId &&
      a.metadata?.currentPrice === incoming.metadata?.currentPrice
  );
}

function isInCooldown(existing, incoming) {
  const last = existing.find(
    (a) => a.type === incoming.type && a.productId === incoming.productId
  );
  return last ? Date.now() - last.createdAt < ALERT_COOLDOWN_MS : false;
}

export const useAlertStore = create((set, get) => ({
  notifications: loadAlerts(),
  lastTriggered: {},

  pushAlert(alert) {
    const existing = get().notifications;

    if (isDuplicate(existing, alert)) return;
    if (isInCooldown(existing, alert)) return;

    const updated = [
      { id: crypto.randomUUID(), ...alert },
      ...existing,
    ];

    saveAlerts(updated);
    set({ notifications: updated });
  },

  markAsRead(id) {
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveAlerts(updated);
    set({ notifications: updated });
  },

  markAllAsRead() {
    const updated = get().notifications.map((n) => ({
      ...n,
      read: true,
    }));
    saveAlerts(updated);
    set({ notifications: updated });
  },

  clearNotifications() {
    saveAlerts([]);
    set({ notifications: [] });
  },
}));
