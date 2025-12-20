// // app/product/[id]/page.js

// import { mockProducts } from "../../../data/mockProducts";

// export default function ProductDetailPage({ params }) {
//   const product = mockProducts.find(
//     (item) => item.id === params.id
//   );

//   if (!product) {
//     return (
//       <p className="text-center text-slate-400">
//         Product not found.
//       </p>
//     );
//   }

//   return (
//     <section className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">
//         {product.name}
//       </h1>

//       <p className="text-slate-400 mb-6">
//         Store: {product.store}
//       </p>

//       <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4">
//         <p>
//           <span className="text-slate-400">Current Price:</span>{" "}
//           <span className="text-xl font-semibold">
//             ₹{product.currentPrice}
//           </span>
//         </p>

//         <p className="text-teal-400">
//           Lowest Recorded Price: ₹{product.lowestPrice}
//         </p>

//         <p className="text-sm text-slate-500">
//           Last updated: {product.lastUpdated}
//         </p>
//       </div>

//       {/* Chart placeholder */}
//       <div className="mt-10 p-6 rounded-xl border border-dashed border-white/20 text-slate-400 text-center">
//         📈 Price history chart coming in Phase-4
//       </div>
//     </section>
//   );
// }

// app/product/[id]/page.js

import { mockProducts } from "../../../data/mockProducts";
import { priceHistory } from "../../../data/priceHistory";
import AlertBadge from "../../../components/AlertBadge";
import TargetPriceInput from "../../../components/TargetPriceInput";
import { userTargets } from "../../../data/UserTargets";
import ClientPriceHistoryChart from "../../../components/ClientPriceHistoryChart";


export default async function ProductDetailPage({ params }) {
  // ✅ params is a Promise in new Next.js
  const resolvedParams = await params;
  const productId = String(resolvedParams.id);

  const product = mockProducts.find(
    (item) => String(item.id) === productId
  );

  if (!product) {
    return (
      <p className="text-center text-slate-400">
        Product not found.
      </p>
    );
  }

  const history = priceHistory[product.id] || [];
  const targetPrice = userTargets[product.id];
  const alertActive =
    targetPrice && product.currentPrice <= targetPrice;

  const trend =
    history.length >= 2
      ? history[history.length - 1].price -
        history[history.length - 2].price
      : 0;
  const predictionHint =
    trend < 0
      ? "🧠 Likely to drop further"
      : "🧠 Price may rise or stabilize";

  const trendLabel =
    trend < 0
      ? "📉 Price dropping — good time to buy"
      : trend > 0
      ? "📈 Price rising — consider waiting"
      : "➖ Price stable";

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>
        <AlertBadge isActive={alertActive} />
      </div>

      <p className="text-slate-400">
        Store: {product.store}
      </p>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-3">
        <p className="text-xl font-semibold">
          ₹{product.currentPrice}
        </p>

        {targetPrice && (
          <p className="text-sm text-slate-400">
            Target price: ₹{targetPrice}
          </p>
        )}

        <p className="text-teal-400">
          Lowest recorded: ₹{product.lowestPrice}
        </p>

        <p className="text-sm text-slate-400">
          {predictionHint}
        </p>

        <TargetPriceInput targetPrice={targetPrice} />
      </div>

      <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Price History
        </h2>
        <ClientPriceHistoryChart data={history} />
      </div>
    </section>
  );
}
