//components//AuthGate.js
"use client";

import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGate({ children }) {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [user, loading, pathname]);

  if (loading) return null;

  if (!user && pathname !== "/login") {
    return null;
  }

  return children;
}
