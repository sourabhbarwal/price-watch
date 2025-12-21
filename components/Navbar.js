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
      className="flex justify-right items-center gap-3"
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
        h-[44px] w-[44px]
        rounded-xl
        font-medium text-sm
        overflow-hidden
        transition-all duration-300 ease-in-out

        ${
          active
            ? "bg-indigo-600 text-white"
            : "bg-slate-800 text-slate-400 hover:w-[160px] hover:bg-indigo-600 hover:text-white"
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
