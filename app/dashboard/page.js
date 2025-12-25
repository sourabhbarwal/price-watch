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
  const { products, loadProducts, loading: productLoading, addProduct,error } = useProductStore();

  useEffect(() => {
    if (!authLoading && user?.id) {
      loadProducts(user.id);
    }
  }, [authLoading, user?.id]);

  if (authLoading || productLoading) {
    return <p className="p-6">Loading…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-400">{error}</p>;
  }

  if (!products.length) {
    return (
      <p className="p-6 text-slate-400">
        No products yet.
      </p>
    );
  }
  async function handleAddDevProduct() {
    if (!user) return;

    try {
      const product = await productService.createProduct({
        user_id: user.id,
        title: "DEV Test Product",
        platform: "Amazon",
        product_url: "https://amazon.in/dev",
        current_price: 29999,
      });

      addProduct(product);
    } catch (err) {
      console.error("DEV product insert failed:", err);
      alert(err.message);
    }
  }

  return (
    <div className="p-6 space-y-6">
       <button
        onClick={handleAddDevProduct}
        className="mb-6 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
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
