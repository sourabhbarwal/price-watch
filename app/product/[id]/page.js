// app/product/[id]/page.js
"use client";

import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import TargetPriceInput from "../../../components/TargetPriceInput";
import ClientPriceHistoryChart from "../../../components/ClientPriceHistoryChart";
import { calculatePriceAnalytics } from "@/lib/priceAnalytics";
import { useMemo } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const { products } = useProductStore();

  const product = useMemo(
  () => products.find(p => String(p.id) === String(productId)),
  [products, productId]
);

  if (!product) {
    return (
      <p className="text-center text-slate-400">
        Product not found.
      </p>
    );
  }

  const history = product.priceHistory || [];
  const analytics = calculatePriceAnalytics(history);

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {product.title}
      </h1>

      <p className="text-slate-400">
        Current Price: ₹{product.currentPrice}
      </p>
      {/* PRICE INSIGHTS */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Price Insights
          </h2>
          <span className="text-xs text-slate-400">
            Based on recent trends
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InsightItem
            label="Lowest"
            value={`₹${analytics.lowestPrice}`}
            muted
          />
          <InsightItem
            label="Average"
            value={`₹${analytics.averagePrice}`}
          />
          <InsightItem
            label="Volatility"
            value={analytics.volatilityScore}
            suffix=" pts"
          />
          <InsightItem
            label="Buying Signal"
            value={analytics.bestTimeToBuy}
            highlight
          />
        </div>
      </div>
      <ClientPriceHistoryChart data={history} />
    </section>
  );
}


function InsightItem({ label, value, suffix = "", highlight, muted }) {
  return (
    <div
      className={`
        rounded-xl px-4 py-3
        transition-transform transition-shadow duration-180
        hover:-translate-y-0.5 hover:shadow-md 
        ${highlight
          ? "bg-emerald-500/10 border border-emerald-400/30"
          : "bg-black/30"}
      `}
    >

      <p className="text-[11px] uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </p>
      <p
        className={`text-base font-semibold ${
          highlight
            ? "text-teal-400"
            : muted
            ? "text-slate-300"
            : "text-white"
        }`}
      >
        {value}
        {suffix}
      </p>
    </div>
  );
}


