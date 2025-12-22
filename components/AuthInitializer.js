"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

/**
 * Client-only auth bootstrapper
 * Keeps app/layout.js as a Server Component
 */
export default function AuthInitializer() {
  const initAuth = useAuthStore(
    (state) => state.init
  );

  useEffect(() => {
    initAuth();
  }, []);

  return null; // no UI
}
