// src/adapters/localAdapter.js

const safeJSON = {
  get(key, fallback) {
    if (typeof window === "undefined") return fallback;
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export const localAdapter = {
  // PRODUCTS
  getProducts() {
    return safeJSON.get("pw_products", []);
  },

  saveProducts(products) {
    safeJSON.set("pw_products", products);
  },

  // ALERTS
  getAlerts() {
    return safeJSON.get("pw_alerts", []);
  },

  saveAlerts(alerts) {
    safeJSON.set("pw_alerts", alerts);
  },

  // SETTINGS
  getSettings() {
    return safeJSON.get("pw_settings", {});
  },

  saveSettings(settings) {
    safeJSON.set("pw_settings", settings);
  },
};
