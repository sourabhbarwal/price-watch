// src/store/userTargetsStore.js
import { create } from "zustand";
import { useAlertStore } from "./alertStore";

export const useUserTargetsStore = create((set, get) => ({
  targets: {},

  setTarget(productId, price) {
    useAlertStore.getState().resetProductAlert(productId);

    set((state) => ({
      targets: {
        ...state.targets,
        [productId]: price,
      },
    }));
  },

  removeTarget(productId) {
    useAlertStore.getState().resetProductAlert(productId);

    set((state) => {
      const updated = { ...state.targets };
      delete updated[productId];
      return { targets: updated };
    });
  },
}));
