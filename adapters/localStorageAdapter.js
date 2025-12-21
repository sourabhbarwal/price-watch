const safeJSON = {
  get(key, fallback) {
    if (typeof window === "undefined") return fallback;
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export const storage = {
  getProducts: () => safeJSON.get("pw_products", []),
  saveProducts: (data) => safeJSON.set("pw_products", data),

  getAlerts: () => safeJSON.get("pw_alerts", []),
  saveAlerts: (data) => safeJSON.set("pw_alerts", data),

  getSettings: () => safeJSON.get("pw_settings", {}),
  saveSettings: (data) => safeJSON.set("pw_settings", data),
};
