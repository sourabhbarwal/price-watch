// /components/AuthGuard.js
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const PUBLIC_ROUTES = ["/login"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, init } = useAuthStore();

  // Restore session on first mount
  useEffect(() => {
    init();
  }, [init]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/login");
      return;
    }
    if (user && PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-sm text-slate-400">
        Checking session…
      </div>
    );
  }

  return children;
}
