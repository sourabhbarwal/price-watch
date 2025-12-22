// // src/adapters/localAdapter.js

// const safeJSON = {
//   get(key, fallback) {
//     if (typeof window === "undefined") return fallback;
//     try {
//       const value = localStorage.getItem(key);
//       return value ? JSON.parse(value) : fallback;
//     } catch {
//       return fallback;
//     }
//   },

//   set(key, value) {
//     if (typeof window === "undefined") return;
//     localStorage.setItem(key, JSON.stringify(value));
//   },
// };

// export const localAdapter = {
//   // PRODUCTS
//   getProducts() {
//     return safeJSON.get("pw_products", []);
//   },

//   saveProducts(products) {
//     safeJSON.set("pw_products", products);
//   },

//   // ALERTS
//   getAlerts() {
//     return safeJSON.get("pw_alerts", []);
//   },

//   saveAlerts(alerts) {
//     safeJSON.set("pw_alerts", alerts);
//   },

//   // SETTINGS
//   getSettings() {
//     return safeJSON.get("pw_settings", {});
//   },

//   saveSettings(settings) {
//     safeJSON.set("pw_settings", settings);
//   },
// };

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

const PRODUCTS_KEY = "pw_products";
const ALERTS_KEY = "pw_alerts";
const PRICE_HISTORY_KEY = "pw_price_history";

/**
 * Local adapter MUST match Supabase adapter shape
 */
export const localAdapter = {
  /* ---------------- PRODUCTS ---------------- */

  async getProducts() {
    return safeJSON.get(PRODUCTS_KEY, []);
  },

  async saveProduct(product) {
    const products = safeJSON.get(PRODUCTS_KEY, []);

    const exists = products.find((p) => p.id === product.id);

    const updated = exists
      ? products.map((p) =>
          p.id === product.id ? product : p
        )
      : [product, ...products];

    safeJSON.set(PRODUCTS_KEY, updated);
  },

  /* ---------------- PRICE HISTORY ---------------- */

  async addPriceHistory(productId, price) {
    const history =
      safeJSON.get(PRICE_HISTORY_KEY, {});

    const updated = {
      ...history,
      [productId]: [
        ...(history[productId] || []),
        {
          price,
          recorded_at: new Date().toISOString(),
        },
      ],
    };

    safeJSON.set(PRICE_HISTORY_KEY, updated);
  },

  /* ---------------- ALERTS ---------------- */

  async getAlerts() {
    return safeJSON.get(ALERTS_KEY, []);
  },

  async saveAlert(alert) {
    const alerts = safeJSON.get(ALERTS_KEY, []);
    safeJSON.set(ALERTS_KEY, [
      { id: crypto.randomUUID(), ...alert },
      ...alerts,
    ]);
  },
};
