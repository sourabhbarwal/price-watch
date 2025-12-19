// components/Navbar.js

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-teal-400">
          Price Watch
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-white/80 hover:text-white transition"
          >
            Dashboard
          </Link>

          <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
