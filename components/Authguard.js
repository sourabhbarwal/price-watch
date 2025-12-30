// /components/AuthGuard.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { user, loading, init } = useAuthStore();

  // Restore session on first mount
  useEffect(() => {
    init();
  }, [init]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-sm text-slate-400">
        Checking session…
      </div>
    );
  }

  return children;
}
