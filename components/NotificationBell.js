// /components/NotificationBell.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAlertStore } from "@/store/alertStore";

export default function NotificationBell() {
  const { notifications } = useAlertStore();
  const unread = notifications.filter((n) => !n.read);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        animate={
          unread.length > 0
            ? { rotate: [0, -10, 10, -10, 0] }
            : {}
        }
        transition={{ duration: 0.4 }}
        className="relative p-2 rounded-full hover:bg-white/10"
      >
        🔔

        {unread.length > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white">
            {unread.length}
          </span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute right-0 mt-2 w-72 rounded-xl bg-black/90 border border-white/10 backdrop-blur-md p-3 z-50"
          >
            <p className="text-xs font-semibold mb-2">
              Notifications
            </p>

            {notifications.length === 0 ? (
              <p className="text-xs opacity-60">
                No notifications yet
              </p>
            ) : (
              <div className="space-y-2">
                {notifications.slice(0, 3).map((n) => (
                  <div
                    key={n.id}
                    className={`text-xs p-2 rounded-md ${
                      n.read
                        ? "opacity-60"
                        : "bg-indigo-500/10"
                    }`}
                  >
                    {n.title}
                  </div>
                ))}
              </div>
            )}

            <Link
              href="/notifications"
              className="block text-xs text-indigo-400 mt-3 text-right"
              onClick={() => setOpen(false)}
            >
              View all →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
