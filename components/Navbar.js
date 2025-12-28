// components/Navbar.js
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAlertStore } from "@/store/alertStore";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { session, signOut } = useAuthStore();
  // const { notifications } = useAlertStore();
  const notifications = useAlertStore((state) => state.notifications);
  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  const user = session?.user || null;
  // const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="flex items-center gap-6 px-6 py-4 ">
      {/* LEFT LINKS */}
      <Link
        href="/dashboard"
        className="
          group relative flex items-center
          h-[44px] w-[44px]
          overflow-hidden rounded-xl
          transition-all duration-300 ease-in-out
          hover:w-[160px]
          bg-slate-800 hover:bg-indigo-600
          text-slate-400 hover:text-white
        "
      >
        <span className="material-symbols-rounded ml-3 text-[22px]">
          dashboard
        </span>
        <span className="
          ml-3 whitespace-nowrap
          opacity-0 translate-x-3
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0
        ">
          Dashboard
        </span>
      </Link>

      <Link
        href="/notifications"
        className="
          group relative flex items-center
          h-[44px] w-[44px]
          overflow-hidden rounded-xl
          transition-all duration-300 ease-in-out
          hover:w-[160px]
          bg-slate-800 hover:bg-indigo-600
          text-slate-400 hover:text-white
        "
      >
        <span className="material-symbols-rounded ml-3 text-[22px]">
          notifications
        </span>
        <span className="
          ml-3 whitespace-nowrap
          opacity-0 translate-x-3
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0
        ">
          Notifications
          {unreadCount > 0 && (
            <span className="
              absolute top-1 right-1
              flex items-center justify-center
              w-5 h-5
              rounded-full
              bg-red-500
              text-white
              text-[10px]
              font-semibold
            ">
              {unreadCount}
            </span>
          )}
        </span>
      </Link>

      {/* RIGHT AUTH ACTION */}
      <div className="ml-auto">
        {user ? (
          <button
            onClick={() => {
              signOut();
              router.replace("/login");
            }}
            className="
              group relative flex items-center
              h-[44px] w-[44px]
              overflow-hidden rounded-xl
              transition-all duration-300 ease-in-out
              hover:w-[160px]
              bg-red-500/10 hover:bg-red-600
              text-red-400 hover:text-white
            "
          >
            <span className="material-symbols-rounded ml-3 text-[22px]">
              logout
            </span>

            <span className="
              ml-3 whitespace-nowrap
              opacity-0 translate-x-3
              transition-all duration-300
              group-hover:opacity-100 group-hover:translate-x-0
            ">
              Logout
            </span>
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="
              group relative flex items-center
              h-[44px] w-[44px]
              overflow-hidden rounded-xl
              transition-all duration-300 ease-in-out
              hover:w-[160px]
              bg-slate-800 hover:bg-indigo-600
              text-slate-400 hover:text-white
            "
          >
            <span className="material-symbols-rounded ml-3 text-[22px]">
              login
            </span>

            <span className="
              ml-3 whitespace-nowrap
              opacity-0 translate-x-3
              transition-all duration-300
              group-hover:opacity-100 group-hover:translate-x-0
            ">
              Login
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
