// // src/services/productService.js
// import { adapter } from "@/adapters";
// import { simulatePriceDrop } from "@/lib/mockPriceUpdater";
// import { handleProductAlert } from "./alertService";

// /**
//  * DEV seed products (used only if no data exists)
//  */
// const SEED_PRODUCTS = [
//   {
//     id: "1",
//     title: "iPhone 15",
//     currentPrice: 79999,
//     alertEnabled: true,
//     priceHistory: [
//       { date: "Dec 10", price: 82999 },
//       { date: "Dec 12", price: 81999 },
//       { date: "Dec 14", price: 80999 },
//       { date: "Dec 16", price: 79999 },
//     ],
//   },
//   {
//     id: "2",
//     title: "Sony WH-1000XM5",
//     currentPrice: 29999,
//     alertEnabled: true,
//     priceHistory: [
//       { date: "Dec 10", price: 31999 },
//       { date: "Dec 12", price: 30999 },
//       { date: "Dec 14", price: 29999 },
//     ],
//   },
// ];

// export const productService = {
//   /* ---------------- LOAD ---------------- */

//   async loadProducts() {
//     const products = await adapter.getProducts();

//     // DEV fallback
//     if (!products || products.length === 0) {
//       for (const product of SEED_PRODUCTS) {
//         await adapter.saveProduct(product);
//       }
//       return SEED_PRODUCTS;
//     }

//     return products;
//   },

//   /* ---------------- UPDATE ---------------- */

//   async updatePrice(product) {
//     const newPrice = simulatePriceDrop(
//       product.currentPrice
//     );

//     const updatedProduct = {
//       ...product,
//       currentPrice: newPrice,
//     };

//     await adapter.saveProduct(updatedProduct);
//     await adapter.addPriceHistory(product.id, newPrice);

//     handleProductAlert(updatedProduct);

//     return updatedProduct;
//   },
// };

// src/services/productService.js
import { adapter } from "@/adapters";
import { simulatePriceDrop } from "@/lib/mockPriceUpdater";
import { handleProductAlert } from "./alertService";

export const productService = {
  async loadProducts(user) {
    if (!user) return [];
    return adapter.getProducts(user.id);
  },

  async updatePrice(product, user) {
    const newPrice = simulatePriceDrop(
      product.currentPrice
    );

    const updatedProduct = {
      ...product,
      currentPrice: newPrice,
      user_id: user.id,
    };

    await adapter.saveProduct(updatedProduct);
    await adapter.addPriceHistory(
      product.id,
      newPrice
    );

    handleProductAlert(updatedProduct);

    return updatedProduct;
  },
};
