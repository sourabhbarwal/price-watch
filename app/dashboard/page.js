// /app/dashboard/page.js
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.loading);
  const { products, loadProducts, loading } = useProductStore();

  useEffect(() => {
    if (user?.id) {
      loadProducts(user.id);
    }
  }, [user?.id]);
  
  if (authLoading) return null;
  if (!user) return null;
  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2">
      {products.length === 0 && (
        <p className="text-slate-400">No products yet.</p>
      )}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
