// components/ProductCard.js

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-teal-400/60 hover:scale-[1.02] transition cursor-pointer">
        <h2 className="text-lg font-semibold mb-2">
          {product.name}
        </h2>

        <p className="text-sm text-slate-400 mb-4">
          Store: {product.store}
        </p>

        <p>
          <span className="text-slate-400">Current:</span>{" "}
          ₹{product.currentPrice}
        </p>

        <p className="text-teal-400">
          Lowest: ₹{product.lowestPrice}
        </p>
      </div>
    </Link>
  );
}
