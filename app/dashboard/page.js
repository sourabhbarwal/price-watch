// src/app/dashboard/page.js
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import { productService } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import AuthGuard from "@/components/Authguard";
import { startAutoPriceCheck } from "@/lib/autoPriceCheckEngine";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import ExtensionToast from "@/components/ExtensionToast";
import { triggerImmediatePriceAlert } from "@/lib/extensionAlertHelper";




export default function DashboardPage() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const extensionHandledRef = useRef(false);
  const [toastMessage, setToastMessage] = useState(null);
  const {
    products,
    loading,
    loadProducts,
    addProduct,
  } = useProductStore();

  useEffect(() => {
    if (!user?.id) return;

    const fromExt = searchParams.get("fromExt");
    if (fromExt !== "1") return;

    if (extensionHandledRef.current) return;
    extensionHandledRef.current = true;

    const title = searchParams.get("title");
    const price = Number(searchParams.get("price"));
    const platform = searchParams.get("platform");
    const productUrl = searchParams.get("productUrl");

    if (!title || !price || !platform || !productUrl) return;
    async function addFromExtension() {
      try {
        const exists = await productService.productExists({
          userId: user.id,
          productUrl,
        });

        if (exists) {
          setToastMessage("You’re already tracking this product");
          router.replace("/dashboard");
          return;
        }
        const newProduct = await productService.createProduct({
          user_id: user.id,
          title,
          platform,
          product_url: productUrl,
          current_price: price,
        });

        // 🔔 Check & trigger alert
        const targetPrice = await productService.getTargetPrice({
          userId: user.id,
          productUrl,
        });

        triggerImmediatePriceAlert({
          product: newProduct,
          targetPrice,
        });

        setToastMessage("Product added from extension");
        router.replace("/dashboard");
      } catch (err) {
        console.error("Extension add failed", err);
      }
    }
    addFromExtension();
  }, [user?.id]);


  // Load products when user is ready
  useEffect(() => {
    if (user?.id) {
      loadProducts(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (products.length > 0) {
      startAutoPriceCheck(products);
    }
  }, [products]);

  // 🔹 DEV: Add product (already existing in your flow)
  async function handleAddDevProduct() {
    try {
      if (!user?.id) return;

      const product = await productService.createProduct({
        user_id: user.id,
        title: "DEV Test Product",
        platform: "Amazon",
        product_url: "https://amazon.in",
        current_price: 29999,
      });

      addProduct(product);
    } catch (err) {
      console.error("DEV product insert failed:", err);
      alert(err.message);
    }
  }

  // 🔹 DEV: Trigger REAL price update (this triggers alerts)
  async function handleDevPriceDrop(productId, currentPrice) {
    try {
      const newPrice = Math.max(currentPrice - 1000, 1);

      await productService.updateProductPrice({
        productId,
        newPrice,
      });

      alert("DEV: Price updated");
    } catch (err) {
      console.error("DEV price update failed:", err);
      alert(err.message);
    }
  }

  return (
    <AuthGuard>
    <div className="space-y-6">
      {/* 🔹 HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <button
          onClick={handleAddDevProduct}
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
        >
          + Add Dev Product
        </button>
      </div>

      {/* 🔹 STATES */}
      {loading && (
        <p className="text-slate-400">Loading products…</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-slate-400">
          No products yet. Add your first product to start tracking prices.
        </p>
      )}
      
      {/* 🔹 PRODUCT GRID */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <ProductCard product={product} />

              {/* 🔴 DEV BUTTON (remove later) */}
              <button
                onClick={() =>
                  handleDevPriceDrop(
                    product.id,
                    product.current_price
                  )
                }
                className="w-full px-3 py-2 text-xs rounded-md
                           bg-red-500/15 text-red-400
                           hover:bg-red-500/25 transition"
              >
                DEV: Drop Price by ₹1000
              </button>
            </div>
          ))}
        </div>
      )}
      {toastMessage && (
        <ExtensionToast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
    </AuthGuard>
  );
}
