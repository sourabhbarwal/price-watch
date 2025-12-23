"use client";

import { useAuthCleanup } from "@/hooks/useAuthCleanup";

export default function AuthCleanupClient() {
  useAuthCleanup();
  return null;
}
