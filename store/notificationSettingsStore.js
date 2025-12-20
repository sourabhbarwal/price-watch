// // /store/notificationSettingsStore.js
// import { create } from "zustand";

// const STORAGE_KEY = "pricewatch_notification_settings";

// export const useNotificationSettingsStore = create((set) => ({
//   enabled: true,
//   muteUntil: null,

//   loadSettings: () => {
//     const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     if (saved) set(saved);
//   },

//   updateSettings: (settings) => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
//     set(settings);
//   },
// }));

// src/store/notificationSettingsStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationSettingsStore = create(
  persist(
    (set) => ({
      enabled: true,

      updateSettings(settings) {
        set(settings);
      },
    }),
    {
      name: "price-watch-settings",
    }
  )
);
