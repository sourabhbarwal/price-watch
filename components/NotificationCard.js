// /components/NotificationCard.js
"use client";

import { motion } from "framer-motion";
import { useAlertStore } from "@/store/alertStore";

export default function NotificationCard({ notification }) {
  const { markAsRead } = useAlertStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border cursor-pointer transition ${
        notification.read
          ? "bg-white/5 border-white/10"
          : "bg-indigo-500/10 border-indigo-400"
      }`}
      onClick={() => markAsRead(notification.id)}
    >
      <h4 className="font-semibold text-sm">{notification.title}</h4>
      <p className="text-xs opacity-80 mt-1">{notification.message}</p>
      <span className="text-[10px] opacity-60">
        {notification.createdAt.toLocaleString()}
      </span>
    </motion.div>
  );
}
