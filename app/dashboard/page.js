// /app/dashboard/page.js
"use client";

import { useEffect } from "react";
import { checkPriceAlerts } from "@/lib/priceAlert";
import { mockProducts } from "../../data/mockProducts";
import ProductCard from "../../components/ProductCard";

export default function DashboardPage() {
  useEffect(() => {
    checkPriceAlerts(mockProducts);
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}