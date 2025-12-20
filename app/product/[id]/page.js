// app/product/[id]/page.js
"use client";

import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import TargetPriceInput from "../../../components/TargetPriceInput";
import ClientPriceHistoryChart from "../../../components/ClientPriceHistoryChart";
import { calculatePriceAnalytics } from "@/lib/priceAnalytics";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const { products } = useProductStore();

  const product = products.find(
    (p) => String(p.id) === String(productId)
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

      {/* <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">
            Lowest Price
          </p>
          <p className="font-semibold">
            ₹{analytics.lowestPrice}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">
            Average Price
          </p>
          <p className="font-semibold">
            ₹{analytics.averagePrice}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">
            Volatility
          </p>
          <p className="font-semibold">
            {analytics.volatilityScore}
          </p>
        </div>

        <div className="rounded-lg border p-4 col-span-2">
          <p className="text-xs text-muted-foreground">
            Buying Hint
          </p>
          <p className="font-medium">
            {analytics.bestTimeToBuy}
          </p>
        </div>

        <TargetPriceInput
          productId={product.id}
          currentTarget={product.targetPrice}
        />
      </div> */}
      {/* PRICE INSIGHTS */}
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

// function Insight({ label, value, highlight }) {
//   return (
//     <div className="rounded-lg bg-black/30 p-3">
//       <p className="text-xs text-gray-400">{label}</p>
//       <p
//         className={`text-sm font-medium mt-1 ${
//           highlight ? "text-teal-400" : "text-white"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

function InsightItem({ label, value, suffix = "", highlight, muted }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 ${
        highlight
          ? "bg-teal-500/10 border border-teal-400/30"
          : "bg-black/30"
      }`}
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


