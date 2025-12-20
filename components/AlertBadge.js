// components/AlertBadge.js

export default function AlertBadge({ isActive }) {
  if (!isActive) return null;

  return (
    <span className="inline-block px-3 py-1 text-sm rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
      🔔 Alert Active
    </span>
  );
}
