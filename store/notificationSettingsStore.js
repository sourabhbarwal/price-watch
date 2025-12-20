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
