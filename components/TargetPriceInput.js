// components/TargetPriceInput.js
"use client";

import { useState } from "react";
import { useUserTargetsStore } from "@/store/userTargetStore";

export default function TargetPriceInput({ productId, currentTarget }) {
  const { setTarget, removeTarget } = useUserTargetsStore();
  const [value, setValue] = useState(currentTarget || "");

  function saveTarget() {
    if (!value) {
      removeTarget(productId);
      return;
    }
    setTarget(productId, Number(value));
  }

  return (
    <div className="mt-4 space-y-2">
      <label className="block text-sm text-slate-400">
        Target Price (₹)
      </label>

      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter target price"
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
        />

        <button
          onClick={saveTarget}
          className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-sm font-medium"
        >
          Save
        </button>
      </div>

      <p className="text-xs text-slate-500">
        You’ll be notified when price drops below this value
      </p>
    </div>
  );
}
