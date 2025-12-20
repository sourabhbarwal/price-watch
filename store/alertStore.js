// // src/store/alertStore.js
// import { create } from "zustand";

// export const useAlertStore = create((set, get) => ({
//   notifications: [],
//   alertedProducts: {},

//   addNotification(notification) {
//     set((state) => ({
//       notifications: [
//         {
//           id: crypto.randomUUID(),
//           read: false,
//           createdAt: new Date(),
//           ...notification,
//         },
//         ...state.notifications,
//       ],
//       alertedProducts: {
//         ...state.alertedProducts,
//         [notification.productId]: true,
//       },
//     }));
//   },

//   markAsRead(id) {
//     set((state) => ({
//       notifications: state.notifications.map((n) =>
//         n.id === id ? { ...n, read: true } : n
//       ),
//     }));
//   },

//   markAllAsRead() {
//     set((state) => ({
//       notifications: state.notifications.map((n) => ({
//         ...n,
//         read: true,
//       })),
//     }));
//   },

//   clearNotifications() {
//     set({
//       notifications: [],
//     });
//   },

//   resetProductAlert(productId) {
//     set((state) => {
//       const updated = { ...state.alertedProducts };
//       delete updated[productId];
//       return { alertedProducts: updated };
//     });
//   },
// }));

// src/store/alertStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAlertStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      alertedProducts: {},

      addNotification(notification) {
        const exists = get().notifications.some(
          (n) =>
            n.productId === notification.productId &&
            n.message === notification.message
        );
        if (exists) return;

        set((state) => ({
          notifications: [
            {
              id: crypto.randomUUID(),
              read: false,
              createdAt: new Date(),
              ...notification,
            },
            ...state.notifications,
          ],
          alertedProducts: {
            ...state.alertedProducts,
            [notification.productId]: true,
          },
        }));
      },

      markAsRead(id) {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllAsRead() {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
          })),
        }));
      },

      clearNotifications() {
        set({
          notifications: [],
          alertedProducts: {},
        });
      },

      resetProductAlert(productId) {
        set((state) => {
          const updated = { ...state.alertedProducts };
          delete updated[productId];
          return { alertedProducts: updated };
        });
      },
    }),
    {
      name: "price-watch-alerts",
    }
  )
);
