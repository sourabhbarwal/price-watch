// lib/utils.js

export function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10);
}
