export const ProductModel = {
  id: "",
  title: "",
  imageUrl: "",
  productUrl: "",
  platform: "amazon", // amazon | flipkart | myntra | etc
  currentPrice: 0,
  originalPrice: 0,
  currency: "INR",
  availability: true,

  priceHistory: [], // Array of PricePointModel

  alerts: {
    targetPrice: null,
    alertEnabled: false,
  },

  analytics: {
    lowestPrice: 0,
    highestPrice: 0,
    averagePrice: 0,
    predictedLowInDays: null,
  },

  createdAt: "",
  updatedAt: "",
};
