// src/components/ClientPriceHistoryChart.js
"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { buildPriceChartData } from "@/lib/priceAnalytics";
import PriceHistoryChart from "./PriceHistoryChart";

export default function ClientPriceHistoryChart({ productId, onLoaded }) {
  const [data, setData] = useState([]);
  const [rawHistory, setRawHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    async function loadHistory() {
      try {
        const history = await productService.getPriceHistory(productId);
        setRawHistory(history);
        setData(buildPriceChartData(history));

        // 🔁 Pass history upward if needed
        onLoaded?.(history);
      } catch (err) {
        console.error("Failed to load price history", err);
        setData([]);
        setRawHistory([]);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [productId]);

  if (loading) {
    return <p className="text-xs text-slate-400">Loading price history…</p>;
  }

  if (data.length < 2) {
    return (
      <p className="text-xs text-slate-500">
        Not enough data for price chart
      </p>
    );
  }

  return <PriceHistoryChart data={data} />;
}
