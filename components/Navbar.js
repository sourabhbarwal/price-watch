// // components/Navbar.js

// "use client";

// import Link from "next/link";
// import { useAlertStore } from "@/store/alertStore";

// export default function Navbar() {
//   const { notifications } = useAlertStore();
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <Link href="/" className="text-xl font-bold text-teal-400">
//           Price Watch
//         </Link>

//         <div className="flex items-center gap-6">
//           <Link
//             href="/dashboard"
//             className="text-white/80 hover:text-white transition"
//           >
//             Dashboard
//           </Link>

//           <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
//             Login
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// }

// src/app/layout.js

"use client";

import Link from "next/link";
import { useAlertStore } from "@/store/alertStore";

export default function RootLayout({ children }) {
  const { notifications } = useAlertStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <html lang="en">
      <body>
        {/* NAVBAR */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <div className="text-lg font-semibold text-teal-400">
            Price Watch
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
              Dashboard
            </Link>

            {/* 🔔 NEW NOTIFICATIONS TAB */}
            <Link href="/notifications" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white"
            >
              Login
            </Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
