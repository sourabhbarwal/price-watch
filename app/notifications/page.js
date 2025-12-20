// /app/notifications/page.js
"use client";

import { useAlertStore } from "@/store/alertStore";
import NotificationCard from "@/components/NotificationCard";

export default function NotificationsPage() {
  const { notifications, markAllAsRead } = useAlertStore();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Notifications</h1>

        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs px-3 py-1 rounded-md bg-indigo-600 text-white"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm opacity-60">No notifications yet</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationCard key={n.id} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
}
