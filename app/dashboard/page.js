// /app/dashboard/page.js
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import { productService } from "@/services/productService";
import ProductCard from "@/components/ProductCard";

export default function DashboardPage() {
  const { user, loading: authLoading } =
    useAuthStore();
  const { products, loadProducts, loading: productLoading } = useProductStore();

  useEffect(() => {
    if (!authLoading && user) {
      loadProducts();
    }
  }, [authLoading, user]);

  if (authLoading || productLoading) {
    return <p className="p-6">Loading…</p>;
  }

  if (!products.length) {
    return (
      <p className="p-6 text-slate-400">
        No products yet.
      </p>
    );
  }

  const handleAddDevProduct = async () => {
    if (!user) return;

    try{
      await productService.createProduct({
        userId: user.id,
        title: "DEV Test Product",
        url: "https://example.com/product",
        price: 1999,
      });
      
      await loadProducts();
    } catch (err) {
        console.error("DEV product insert failed:", err);
        alert(
          err?.message ||
            "Failed to add dev product. Check console."
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
       <button
        onClick={handleAddDevProduct}
        className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm"
      >
        + Add Dev Product
      </button>

      {products.length === 0 ? (
        <p className="text-slate-400">No products yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
