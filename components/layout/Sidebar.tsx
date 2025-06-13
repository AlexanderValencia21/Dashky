"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINK } from "@/constants/sidebar";
import clsx from "clsx";
import Logo from "./Logo";
import { useSidebar } from "@/context/sidebar-context";

export default function Sidebar() {
  const pathname = usePathname();
  const { mobileOpen, desktopCompact, toggleMobile} = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <>
      {/* Overlay para móvil */}
      {!mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" 
        onClick={toggleMobile}/>
      )}

      <aside className={clsx(
        "fixed top-0 left-0 h-full flex flex-col z-40",
        "transition-all duration-300",
        // Colores corporativos
        "bg-corporate-dark", // Dark Jungle Green
        "text-corporate-white", // Chinese White
        // Mobile
        "w-16 transform", // Compacto en móvil
        {
          "-translate-x-full": !mobileOpen,
          "translate-x-0": mobileOpen,
        },
        // Desktop
        "md:translate-x-0",
        "md:w-16",          // Compacto por defecto
        !desktopCompact && "md:w-64" 
      )}>
        <Logo compact={desktopCompact} />
        
        <nav className="flex-1 py-4">
          {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center mx-2 p-3 rounded transition-colors",
                "justify-center md:justify-start",
                pathname === href ? "bg-corporate-slate" : "hover:bg-corporate-black", // Malachite/Ocean Green
                !desktopCompact && "md:px-4"
              )}
              title={label}
            >
              <Icon className="w-5 h-5" />
              {!desktopCompact && (
                <span className="font-titles ml-3 hidden md:block text-sm">{label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-2 border-t border-corporate-dark"> {/* Dark Jungle Green */}
          <button
            onClick={handleLogout}
            className={clsx(
              "flex items-center w-full p-3 rounded",
              "text-red-500 hover:text-red-400",
              "hover:bg-corporate-black/20", // Ocean Green
              desktopCompact ? "justify-center" : "justify-start"
            )}
            title="Cerrar sesión"
          >
            <SIDEBAR_BOTTOM_LINK.icon className="w-5 h-5" />
            {!desktopCompact && (
              <span className="ml-3 hidden md:block text-md">Cerrar sesión</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}