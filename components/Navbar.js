// // src/components/Navbar.js
// "use client";
// import Link from "next/link";
// import { useAlertStore } from "@/store/alertStore";

// export default function RootLayout({ children }) {
//   const { notifications } = useAlertStore();

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <html lang="en">
//       <body>
//         {/* NAVBAR */}
//         <header className="flex items-center justify-between px-6 py-4 border-b">
//           <div className="text-lg font-semibold text-teal-400">
//             Price Watch
//           </div>

//           <nav className="flex items-center gap-6 text-sm">
//             <Link href="/dashboard" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
//               Dashboard
//             </Link>

//             {/* 🔔 NEW NOTIFICATIONS TAB */}
//             <Link href="/notifications" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
//               Notifications
//               {unreadCount > 0 && (
//                 <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
//                   {unreadCount}
//                 </span>
//               )}
//             </Link>

//             <Link
//               href="/login"
//               className="px-4 py-2 rounded-md bg-indigo-600 text-white"
//             >
//               Login
//             </Link>
//           </nav>
//         </header>

//         {children}
//       </body>
//     </html>
//   );
// }

// components/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: "notifications",
  },
  {
    label: "Login",
    href: "/login",
    icon: "login",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { notifications } = useAlertStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-3"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <NavItem
            key={item.href}
            {...item}
            active={isActive}
            unreadCount={
              item.href === "/notifications" ? unreadCount : 0
            }
          />
        );
      })}
    </nav>
  );
}

function NavItem({ label, href, icon, active, unreadCount }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`
        group relative flex items-center
        h-[44px]
        overflow-hidden
        rounded-xl
        font-medium text-sm
        transition-all duration-300 ease-in-out

        ${
          active
            ? "w-[160px] bg-indigo-600 text-white shadow-md"
            : "w-[44px] bg-slate-800 text-slate-400 hover:w-[160px] hover:bg-indigo-600 hover:text-white"
        }
      `}
    >
      {/* ICON */}
      <span
        className="
          material-symbols-rounded
          text-[22px]
          ml-3
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        {icon}
      </span>

      {/* LABEL */}
      <span
        className={`
          ml-3 whitespace-nowrap
          transition-all duration-300
          ${
            active
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
          }
        `}
      >
        {label}
      </span>

      {/* 🔔 NOTIFICATION BADGE */}
      {unreadCount > 0 && (
        <span
          className="
            absolute top-1 right-1
            flex items-center justify-center
            w-5 h-5
            rounded-full
            bg-red-500
            text-white
            text-[10px]
            font-semibold
          "
        >
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
