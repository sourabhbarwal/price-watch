// components/ProductCard.js
import Link from "next/link";
export default function ProductCard({ product }) {
  // Derive lowest price safely from priceHistory
  const lowestPrice =
    product.priceHistory && product.priceHistory.length > 0
      ? Math.min(...product.priceHistory.map((p) => p.price))
      : product.currentPrice;

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
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-teal-400/60 hover:scale-[1.02] transition cursor-pointer">
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
        <span className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${buyColor}`}>
          {buyHint === "Buy Now" ? "Best Time" : buyHint}
        </span>

      </div>
    </Link>
  );
}
