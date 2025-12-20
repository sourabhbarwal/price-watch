// app/product/[id]/page.js

import { mockProducts } from "../../../data/mockProducts";

export default function ProductDetailPage({ params }) {
  const product = mockProducts.find(
    (item) => item.id === params.id
  );

  if (!product) {
    return (
      <p className="text-center text-slate-400">
        Product not found.
      </p>
    );
  }

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {product.name}
      </h1>

      <p className="text-slate-400 mb-6">
        Store: {product.store}
      </p>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4">
        <p>
          <span className="text-slate-400">Current Price:</span>{" "}
          <span className="text-xl font-semibold">
            ₹{product.currentPrice}
          </span>
        </p>

        <p className="text-teal-400">
          Lowest Recorded Price: ₹{product.lowestPrice}
        </p>

        <p className="text-sm text-slate-500">
          Last updated: {product.lastUpdated}
        </p>
      </div>

      {/* Chart placeholder */}
      <div className="mt-10 p-6 rounded-xl border border-dashed border-white/20 text-slate-400 text-center">
        📈 Price history chart coming in Phase-4
      </div>
    </section>
  );
}
