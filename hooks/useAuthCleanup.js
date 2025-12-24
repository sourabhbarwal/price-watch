"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";

export function useAuthCleanup() {
  const user = useAuthStore((s) => s.user);
  const clearProducts = useProductStore((s) => s.clearProducts);

  useEffect(() => {
    if (!user) {
      clearProducts();
    }
  }, [user,clearProducts]);
}
