"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINK } from "@/constants/sidebar";
import clsx from "clsx";
import Logo from "./Logo";
import { useSidebar } from "@/context/sidebar-context";

export default function Sidebar() {
  const pathname = usePathname();
  const {  mobileOpen, desktopCompact } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };
  return (
    <>
      {/* Overlay para móvil */}
      {!mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" />
      )}

      <aside className={clsx(
        "fixed top-0 left-0 h-full bg-green-600 text-white flex flex-col z-40",
        "transition-all duration-300",
        // Mobile
        "w-16 md:w-64", // Base width
        {
          // Comportamiento móvil
          "-translate-x-full md:translate-x-0": !mobileOpen,
          // Comportamiento desktop
          "md:w-16": desktopCompact,
        }
      )}>
        <Logo compact={desktopCompact} />
        
        <nav className="flex-1 py-4">
          {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center mx-2 p-3 rounded hover:bg-green-700",
                "justify-center md:justify-start",
                pathname === href && "bg-green-800",
                !desktopCompact && "md:px-4"
              )}
              title={label}
            >
              <Icon className="w-5 h-5" />
              {!desktopCompact && (
                <span className="ml-3 hidden md:block text-sm">{label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2 hover:bg-green-700 rounded"
            title="Cerrar sesión"
          >
            <SIDEBAR_BOTTOM_LINK.icon className="w-5 h-5" />
            {!desktopCompact && (
              <span className="ml-3 hidden md:block text-sm">Cerrar sesión</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
