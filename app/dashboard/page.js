// app/dashboard/page.js

import { mockProducts } from "../../data/mockProducts";

export default function DashboardPage() {
  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {mockProducts.length === 0 ? (
        <p className="text-slate-400">
          No products tracked yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-teal-400/50 transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                {product.name}
              </h2>

              <p className="text-sm text-slate-400 mb-4">
                Store: {product.store}
              </p>

              <div className="space-y-1">
                <p>
                  <span className="text-slate-400">Current:</span>{" "}
                  <span className="font-medium">
                    ₹{product.currentPrice}
                  </span>
                </p>

                <p className="text-teal-400">
                  Lowest: ₹{product.lowestPrice}
                </p>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Last updated: {product.lastUpdated}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
