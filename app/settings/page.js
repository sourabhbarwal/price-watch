// /app/settings/page.js
"use client";

import { useEffect } from "react";
import { useNotificationSettingsStore } from "@/store/notificationSettingsStore";

export default function SettingsPage() {
  const { enabled, updateSettings, loadSettings } =
    useNotificationSettingsStore();

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Notification Settings</h1>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) =>
            updateSettings({ enabled: e.target.checked })
          }
        />
        Enable Price Alerts
      </label>
    </div>
  );
}
