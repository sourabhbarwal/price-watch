// /store/alertStore.js
import { create } from "zustand";

const STORAGE_KEY = "price-watch-alerts";
const ALERT_COOLDOWN_MS = 24 * 60 * 60 * 1000;

/* ------------------------
   Storage helpers
------------------------- */
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

/* ------------------------
   Normalization
------------------------- */
function normalizeAlert(alert) {
  return {
    id: alert.id ?? crypto.randomUUID(),
    type: alert.type ?? "generic",
    title: alert.title ?? "Notification",
    description: alert.description ?? "",
    productId: alert.productId ?? null,

    // ✅ ALWAYS SAFE DEFAULTS
    read: alert.read ?? false,
    createdAt: alert.createdAt ?? Date.now(),

    // Optional metadata
    metadata: alert.metadata ?? {},

    // Optional navigation
    href: alert.href ?? "/notifications",
  };
}

/* ------------------------
   Guards
------------------------- */
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
  return last
    ? Date.now() - last.createdAt < ALERT_COOLDOWN_MS
    : false;
}

/* ------------------------
   Store
------------------------- */
export const useAlertStore = create((set, get) => ({
  notifications: loadAlerts(),

  /* 🔔 Push alert (hardened) */
  pushAlert(rawAlert) {
    const normalized = normalizeAlert(rawAlert);
    const existing = get().notifications;

    if (isDuplicate(existing, normalized)) return;
    if (isInCooldown(existing, normalized)) return;

    const updated = [normalized, ...existing];

    saveAlerts(updated);
    set({ notifications: updated });

    // DEV-only visibility
    if (process.env.NODE_ENV === "development") {
      console.debug(
        "[Alert pushed]",
        normalized.type,
        normalized
      );
    }
  },

  /* 👁 Mark single as read */
  markAsRead(id) {
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );

    saveAlerts(updated);
    set({ notifications: updated });
  },

  /* 👁 Mark all as read */
  markAllAsRead() {
    const updated = get().notifications.map((n) => ({
      ...n,
      read: true,
    }));

    saveAlerts(updated);
    set({ notifications: updated });
  },

  /* 🧹 Clear all */
  clearNotifications() {
    saveAlerts([]);
    set({ notifications: [] });
  },
}));
