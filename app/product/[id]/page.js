// // app/product/[id]/page.js
import { mockProducts } from "../../../data/mockProducts";
import { priceHistory } from "../../../data/priceHistory";
import AlertBadge from "../../../components/AlertBadge";
import TargetPriceInput from "../../../components/TargetPriceInput";
import ClientPriceHistoryChart from "../../../components/ClientPriceHistoryChart";
import { useUserTargetsStore } from "@/store/userTargetStore";
import { calculatePriceAnalytics } from "@/lib/priceAnalytics";

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = String(resolvedParams.id);

  const product = mockProducts.find(
    (item) => String(item.id) === productId
  );

  if (!product) {
    return <p className="text-center text-slate-400">Product not found.</p>;
  }

  const history = priceHistory[product.id] || [];
  const analytics = calculatePriceAnalytics(history);

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-slate-400">Store: {product.store}</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Lowest Price</p>
          <p className="font-semibold">₹{analytics.lowestPrice}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Average Price</p>
          <p className="font-semibold">₹{analytics.averagePrice}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">Volatility</p>
          <p className="font-semibold">{analytics.volatilityScore}</p>
        </div>

        <div className="rounded-lg border p-4 col-span-2">
          <p className="text-xs text-muted-foreground">Buying Hint</p>
          <p className="font-medium">{analytics.bestTimeToBuy}</p>
        </div>
        <TargetPriceInput
          productId={product.id}
          currentTarget={null}
        />
      </div>

      <ClientPriceHistoryChart data={history} />
    </section>
  );
}