// src/components/alerts/AlertToggle.js

export default function AlertToggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        enabled ? "bg-green-500 text-white" : "bg-gray-200"
      }`}
    >
      {enabled ? "Alerts ON" : "Alerts OFF"}
    </button>
  );
}
