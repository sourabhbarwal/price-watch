// components/ExtensionToast.js
"use client";

import { useEffect } from "react";

export default function ExtensionToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-indigo-600/90 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur">
      {message}
    </div>
  );
}
