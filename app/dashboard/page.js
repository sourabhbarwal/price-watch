// // /app/dashboard/page.js
// "use client";

// import { useProductStore } from "@/store/productStore";
// import ProductCard from "../../components/ProductCard";
// import { useMemo } from "react";

// export default function DashboardPage() {
//   const { products, updateProductPrice } = useProductStore();
//   const productCards = useMemo(
//     () =>
//       products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       )),
//     [products]
//   );
//   return (
//     <section className="max-w-7xl mx-auto">
      // <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      //   {products.map((product) => (
      //     <div key={product.id} className="space-y-3">
      //       <ProductCard product={product} />
      //     </div>
      //   ))}
      // </div>
//     </section>
//   );
// }

"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";

export default function DashboardPage() {
  const { products, loadProducts } =
    useProductStore();

  // TEMP: hardcoded userId
  useEffect(() => {
    loadProducts("demo-user-id");
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="space-y-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
