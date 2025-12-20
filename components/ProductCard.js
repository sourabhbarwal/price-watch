// components/ProductCard.js
import Link from "next/link";
import React from "react";
import { useMemo } from "react";

const ProductCard = React.memo(function ProductCard({ product }) {
  // Derive lowest price safely from priceHistory
  // const lowestPrice =
  //   product.priceHistory && product.priceHistory.length > 0
  //     ? Math.min(...product.priceHistory.map((p) => p.price))
  //     : product.currentPrice;
  const lowestPrice = useMemo(() => {
    if (!product.priceHistory?.length) return product.currentPrice;
    return Math.min(...product.priceHistory.map(p => p.price));
  }, [product.priceHistory, product.currentPrice]);

  let buyHint = "Stable";
  let buyColor = "bg-gray-500/20 text-gray-300";

  if (product.priceHistory?.length) {
    const prices = product.priceHistory.map(p => p.price);
    const lowest = Math.min(...prices);

    if (product.currentPrice === lowest) {
      buyHint = "Buy Now";
      buyColor = " bg-green-500/20 text-green-400 border border-green-900";
    }
  }

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
        <h2 className="text-lg font-semibold mb-2">
          {product.title}
        </h2>

        <p className="text-sm text-slate-400 mb-4">
          Store: Amazon
        </p>

        <p>
          <span className="text-slate-400">Current:</span>{" "}
          ₹{product.currentPrice}
        </p>

        <p className="text-teal-400">
          Lowest: ₹{lowestPrice}
        </p>
        {/* <span className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${buyColor}`}>
          {buyHint === "Buy Now" ? "Best Time" : buyHint}
        </span> */}
        <span
          className={`
            px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide
            transition-colors duration-150
            ${buyHint === "Buy Now"
              ? "bg-emerald-500/15 text-emerald-400 animate-[pulse_2s_ease-in-out_infinite]"
              : "bg-slate-500/10 text-slate-300"}
          `}
        >
          {buyHint === "Buy Now" ? "Best Time" : "Stable Trend"}
        </span>

      </div>
    </Link>
  );
});

export default ProductCard;