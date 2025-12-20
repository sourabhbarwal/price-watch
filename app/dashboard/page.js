// /app/dashboard/page.js
"use client";

import { useEffect } from "react";
import { checkPriceAlerts } from "@/lib/priceAlert";
import { mockProducts } from "../../data/mockProducts";
import ProductCard from "../../components/ProductCard";

export default function DashboardPage() {
  useEffect(() => {
    checkPriceAlerts(mockProducts);
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// // src/app/dashboard/page.js
// "use client";

// import { useAlertStore } from "@/store/alertStore";

// export default function DashboardPage() {
//   const { addNotification } = useAlertStore();

//   function triggerPriceDrop() {
//     addNotification({
//       type: "price-drop",
//       title: "Price Dropped 🎉",
//       message: "MacBook Air M2 price dropped by ₹5,000",
//       productId: "macbook-air-m2",
//     });
//   }

//   function triggerInfo() {
//     addNotification({
//       type: "info",
//       title: "Tracking Active",
//       message: "Price Watch is actively tracking your products.",
//     });
//   }

//   return (
//     <main className="p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">Dashboard</h1>

//       {/* TEMP DEV CONTROLS */}
//       <section className="rounded-lg border p-4 space-y-3 bg-white/5">
//         <h2 className="text-lg font-medium">Dev Notification Triggers</h2>

//         <div className="flex gap-3">
//           <button
//             onClick={triggerPriceDrop}
//             className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
//           >
//             Simulate Price Drop
//           </button>

//           <button
//             onClick={triggerInfo}
//             className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Trigger Info Alert
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// }
