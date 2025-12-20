// src/app/notifications/page.js

"use client";

import { useAlertStore } from "@/store/alertStore";
import NotificationItem from "@/components/notifications/NotificationItem";

export default function NotificationsPage() {
  const { notifications } = useAlertStore();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-muted-foreground">No alerts yet.</p>
      )}

      <div className="space-y-4">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}
