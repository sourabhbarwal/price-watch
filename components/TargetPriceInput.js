// components/TargetPriceInput.js

"use client";

export default function TargetPriceInput({ targetPrice }) {
  return (
    <div className="mt-4">
      <label className="block text-sm text-slate-400 mb-1">
        Target Price (₹)
      </label>
      <input
        type="number"
        value={targetPrice || ""}
        disabled
        placeholder="Set target price"
        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-slate-500"
      />
      <p className="text-xs text-slate-500 mt-1">
        Editable in Phase-6
      </p>
    </div>
  );
}
