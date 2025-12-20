// src/app/notifications/page.js
"use client";

import { useAlertStore } from "@/store/alertStore";

const TYPE_STYLES = {
  "price-drop": "border-l-teal-400",
  info: "border-l-indigo-400",
  warning: "border-l-red-400",
};

export default function NotificationsPage() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useAlertStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-gray-400 mt-1">
            Alerts, price drops, and system updates
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm px-3 py-1.5 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white transition"
              >
                Mark all as read
              </button>
            )}

            <button
              onClick={clearNotifications}
              className="text-sm px-3 py-1.5 rounded-md bg-red-600/80 hover:bg-red-600 text-white transition"
            >
              Clear all
            </button>
          </div>
        )}
      </header>

      {/* EMPTY STATE */}
      {notifications.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 py-20 text-center bg-white/5">
          <p className="text-lg font-medium">You’re all caught up ✨</p>
          <p className="text-sm text-gray-400 mt-2">
            New price alerts will appear here automatically.
          </p>
        </div>
      )}

      {/* LIST */}
      <ul className="space-y-4">
        {notifications.map((n) => (
          <li
            key={n.id}
            onClick={() => !n.read && markAsRead(n.id)}
            className={`
              group cursor-pointer rounded-xl border border-white/10 p-4
              bg-white/5 hover:bg-white/10 transition
              border-l-4 ${TYPE_STYLES[n.type] || "border-l-gray-400"}
              ${n.read ? "opacity-60" : ""}
            `}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {n.title}
                  {!n.read && (
                    <span className="h-2 w-2 rounded-full bg-teal-400" />
                  )}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {n.message}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
