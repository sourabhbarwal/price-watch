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

      <div className="grid grid-cols-2 gap-4 mt-6">
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
      </div>

      <ClientPriceHistoryChart data={history} />
    </section>
  );
}
