// /components/NotificationDropdown.js
"use client";

import Link from "next/link";
import { useAlertStore } from "@/store/alertStore";

export default function NotificationDropdown({ onClose }) {
  const { notifications, markAsRead } = useAlertStore();

  // show latest first, limit for preview
  const recent = notifications.slice(0, 5);

  return (
    <div
      className="
        absolute right-0 top-[52px]
        w-[360px]
        rounded-xl
        bg-slate-900
        border border-slate-800
        shadow-2xl
        z-50
        overflow-hidden

        transition-all duration-200 ease-out
        origin-top-right
        data-[state=open]:opacity-100
        data-[state=open]:scale-100
        data-[state=open]:translate-y-0
        opacity-100 scale-95 -translate-y-1
      "
    >
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-slate-800">
        <span className="text-sm font-medium text-white">
          Notifications
        </span>
      </div>

      {/* LIST */}
      <div className="max-h-[320px] overflow-y-auto">
        {recent.length === 0 ? (
          <div className="px-4 py-6 text-sm text-slate-400 text-center">
            No notifications yet
          </div>
        ) : (
          recent.map((n) => (
            <Link
              key={n.id}
              href={n.href || "/notifications"}
              onClick={() => markAsRead(n.id)}
              className={`
                block px-4 py-3
                border-b border-slate-800
                hover:bg-slate-800
                transition
                ${!n.read ? "bg-slate-800/50" : ""}
              `}
            >
              <div className="text-sm text-white">
                {n.title}
              </div>

              {n.description && (
                <div className="text-xs text-slate-400 mt-1">
                  {n.description}
                </div>
              )}
            </Link>
          ))
        )}
      </div>

      {/* FOOTER */}
      <Link
        href="/notifications"
        onClick={onClose}
        className="
          block text-center
          px-4 py-2
          text-sm
          text-indigo-400
          hover:bg-slate-800
        "
      >
        View all notifications →
      </Link>
    </div>
  );
}
