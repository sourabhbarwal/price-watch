// data/mockProducts.js

// export const mockProducts = [
//   {
//     id: "prod_1",
//     title: "Apple AirPods Pro",
//     currentPrice: 19999,
//     currency: "INR",
//     platform: "Amazon",
//     priceHistory: [24999, 23999, 21999, 19999],
//   },
//   {
//     id: "prod_2",
//     title: "Samsung Galaxy S23",
//     currentPrice: 64999,
//     currency: "INR",
//     platform: "Flipkart",
//     priceHistory: [74999, 72999, 69999, 64999],
//   },
// ];

import { ProductModel } from "../models/ProductModel";

export const mockProducts = [
  {
    ...ProductModel,
    id: "p1",
    title: "Apple AirPods Pro (2nd Gen)",
    imageUrl: "/images/airpods.png",
    productUrl: "https://amazon.in/...",
    platform: "amazon",
    currentPrice: 19999,
    originalPrice: 24999,
    priceHistory: [
      { date: "2025-12-01", price: 24999 },
      { date: "2025-12-10", price: 21999 },
      { date: "2025-12-18", price: 19999 },
    ],
    analytics: {
      lowestPrice: 18999,
      highestPrice: 24999,
      averagePrice: 21500,
      predictedLowInDays: 5,
    },
  },
];
