// export default ProductCard;

import Link from "next/link";
import React from "react";

const ProductCard = React.memo(function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="
          group relative
          bg-white/10 backdrop-blur-md
          border border-white/20 rounded-2xl p-6
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-emerald-400/40
          hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]
        ">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

        <p className="text-sm text-slate-400 mb-4">
          Store: {product.platform}
        </p>

        <p>
          <span className="text-slate-400">Current:</span>{" "}
          ₹{product.current_price}
        </p>
        

        <span className="mt-3 inline-block px-3 py-1 rounded-full text-[11px] bg-slate-500/10 text-slate-300">
          View details
        </span>
      </div>
    </Link>
  );
});

export default ProductCard;
