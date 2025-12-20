// // app/product/[id]/page.js
import { mockProducts } from "../../../data/mockProducts";
import { priceHistory } from "../../../data/priceHistory";
import AlertBadge from "../../../components/AlertBadge";
import TargetPriceInput from "../../../components/TargetPriceInput";
import ClientPriceHistoryChart from "../../../components/ClientPriceHistoryChart";
import { useUserTargetsStore } from "@/store/userTargetStore";

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

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-slate-400">Store: {product.store}</p>

      <div className="bg-white/10 border border-white/20 rounded-xl p-6">
        <p className="text-xl font-semibold">
          ₹{product.currentPrice}
        </p>

        <TargetPriceInput
          productId={product.id}
          currentTarget={null}
        />
      </div>

      <ClientPriceHistoryChart data={history} />
    </section>
  );
}
