// src/components/notifications/NotificationItem.js

"use client";

import { useAlertStore } from "@/store/alertStore";

export default function NotificationItem({ notification }) {
  const { markAsRead } = useAlertStore();

  return (
    <div
      className={`p-4 rounded-lg border transition ${
        notification.read
          ? "bg-muted"
          : "bg-background border-indigo-500"
      }`}
    >
      <h3 className="font-medium">{notification.title}</h3>
      <p className="text-sm text-muted-foreground">
        {notification.message}
      </p>

      {!notification.read && (
        <button
          onClick={() => markAsRead(notification.id)}
          className="text-xs mt-2 text-indigo-600 hover:underline"
        >
          Mark as read
        </button>
      )}
    </div>
  );
}
