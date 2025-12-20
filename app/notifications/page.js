// // /app/notifications/page.js
// "use client";

// import { useAlertStore } from "@/store/alertStore";
// import NotificationCard from "@/components/NotificationCard";

// export default function NotificationsPage() {
//   const { notifications, markAllAsRead } = useAlertStore();

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-semibold">Notifications</h1>

//         {notifications.length > 0 && (
//           <button
//             onClick={markAllAsRead}
//             className="text-xs px-3 py-1 rounded-md bg-indigo-600 text-white"
//           >
//             Mark all as read
//           </button>
//         )}
//       </div>

//       {notifications.length === 0 ? (
//         <p className="text-sm opacity-60">No notifications yet</p>
//       ) : (
//         <div className="space-y-3">
//           {notifications.map((n) => (
//             <NotificationCard key={n.id} notification={n} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// src/app/notifications/page.js
"use client";

import { useAlertStore } from "@/store/alertStore";

export default function NotificationsPage() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useAlertStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notifications</h1>

        {notifications.length > 0 && (
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Mark all as read
              </button>
            )}

            <button
              onClick={clearNotifications}
              className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Clear all
            </button>
          </div>
        )}
      </header>

      {/* EMPTY STATE */}
      {notifications.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No notifications yet</p>
          <p className="text-sm mt-2">
            Price alerts and system updates will appear here.
          </p>
        </div>
      )}

      {/* NOTIFICATION LIST */}
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            onClick={() => !n.read && markAsRead(n.id)}
            className={`cursor-pointer rounded-lg border p-4 transition
              ${n.read ? "bg-white/5 opacity-70" : "bg-white/10 hover:bg-white/20"}
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">{n.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {n.message}
                </p>
              </div>

              {!n.read && (
                <span className="h-2 w-2 rounded-full bg-teal-400 mt-1" />
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
