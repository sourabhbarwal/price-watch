// // src/store/alertStore.js

// import { create } from "zustand";
// import { checkPriceAlert } from "@/lib/alertEngine";

// export const useAlertStore = create((set, get) => ({
//   notifications: [],

//   addNotification: (notification) =>
//     set((state) => ({
//       notifications: [notification, ...state.notifications],
//     })),

//   markAsRead: (id) =>
//     set((state) => ({
//       notifications: state.notifications.map((n) =>
//         n.id === id ? { ...n, read: true } : n
//       ),
//     })),

//   runAlertCheck: (product) => {
//     const alert = checkPriceAlert(product);
//     if (alert) {
//       get().addNotification(alert);
//     }
//   },
// }));

// /store/alertStore.js
import { create } from "zustand";

export const useAlertStore = create((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: Date.now(),
          read: false,
          createdAt: new Date(),
          ...notification,
        },
        ...state.notifications,
      ],
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        read: true,
      })),
    })),
}));
