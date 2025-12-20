// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
      </head>

      <body className="bg-slate-950 text-white">
        {/* ✅ SINGLE STICKY HEADER */}
        <header
          className="
            sticky top-0 z-50
            bg-slate-950/90 backdrop-blur-md
            border-b border-slate-800
          "
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* BRAND */}
            <div className="text-lg font-semibold text-teal-400">
              Price Watch
            </div>

            {/* NAVBAR */}
            <Navbar />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-h-screen max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
