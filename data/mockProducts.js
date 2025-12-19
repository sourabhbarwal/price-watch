// // data/mockProducts.js
// import { ProductModel } from "../models/ProductModel";

// export const mockProducts = [
//   {
//     ...ProductModel,
//     id: "p1",
//     title: "Apple AirPods Pro (2nd Gen)",
//     imageUrl: "/images/airpods.png",
//     productUrl: "https://amazon.in/...",
//     platform: "amazon",
//     currentPrice: 19999,
//     originalPrice: 24999,
//     priceHistory: [
//       { date: "2025-12-01", price: 24999 },
//       { date: "2025-12-10", price: 21999 },
//       { date: "2025-12-18", price: 19999 },
//     ],
//     analytics: {
//       lowestPrice: 18999,
//       highestPrice: 24999,
//       averagePrice: 21500,
//       predictedLowInDays: 5,
//     },
//   },
// ];

// data/mockProducts.js

export const mockProducts = [
  {
    id: "p1",
    name: "Apple AirPods Pro (2nd Gen)",
    store: "Amazon",
    currentPrice: 21999,
    lowestPrice: 18999,
    lastUpdated: "2025-12-18",
  },
  {
    id: "p2",
    name: "Samsung Galaxy Watch 6",
    store: "Flipkart",
    currentPrice: 28999,
    lowestPrice: 25999,
    lastUpdated: "2025-12-17",
  },
  {
    id: "p3",
    name: "Sony WH-1000XM5",
    store: "Amazon",
    currentPrice: 29999,
    lowestPrice: 27999,
    lastUpdated: "2025-12-15",
  },
];
