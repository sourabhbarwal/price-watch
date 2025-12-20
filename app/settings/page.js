// // src/app/settings/page.js

// export default function SettingsPage() {
//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Settings</h1>

//       <div className="space-y-4">
//         <div className="p-4 border rounded-lg">
//           <h3 className="font-medium">Price Alerts</h3>
//           <p className="text-sm text-muted-foreground">
//             Manage how you receive price drop alerts.
//           </p>
//         </div>

//         <div className="p-4 border rounded-lg">
//           <h3 className="font-medium">Email Alerts</h3>
//           <p className="text-sm text-muted-foreground">
//             Coming soon
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

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
