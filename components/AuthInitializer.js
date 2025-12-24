//src/components/AuthInitializer.js
"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";

/**
 * Client-only auth bootstrapper
 * Runs exactly once
 */
export default function AuthInitializer() {
  const init = useAuthStore((state) => state.init);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    init();
  }, [init]);

  return null;
}
