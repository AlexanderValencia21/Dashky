"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINK } from "@/constants/sidebar";
import clsx from "clsx";
import Logo from "./Logo";
import { useSidebar } from "@/context/sidebar-context";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
export default function Sidebar() {
  const pathname = usePathname();
  const { mobileOpen, desktopCompact, toggleMobile } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    confirmAlert({
        title: 'Cerrar sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        buttons: [
          {
            label: 'Sí',
            onClick: () => {
              localStorage.removeItem("user")
              toast.success("Sesión cerrada correctamente 👋")
              router.push("/login")
            }
          },
          {
            label: 'Cancelar',
            onClick: () => {}
          }
        ],
        overlayClassName: "bg-corporate-dark bg-opacity-40"
      })
  };

  return (
    <>
      {/* Overlay para móvil */}
      {!mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleMobile}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full flex flex-col z-40",
          "transition-all duration-300",
          "bg-corporate-dark", 
          "text-corporate-white", 
          // Mobile
          "w-16 transform",
          {
            "-translate-x-full": !mobileOpen,
            "translate-x-0": mobileOpen,
          },
          // Desktop
          "md:translate-x-0",
          "md:w-14", 
          !desktopCompact && "md:w-52"
        )}
      >
        <Logo compact={desktopCompact} />

        <nav className="flex-1 py-4">
          {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "font-raleway flex items-center md:mr-8 md:ml-2 md:mb-2 mx-2 mb-2  p-4 rounded-xl transition-colors",
                "justify-center md:justify-start",
                pathname === href
                  ? "bg-corporate-slate"
                  : "hover:bg-corporate-black",
                !desktopCompact && "md:px-4"
              )}
              title={label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!desktopCompact && (
                <span className="font-titles ml-4 hidden md:block text-sm">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-2 border-t border-corporate-dark">
          {" "}
          <button
            onClick={handleLogout}
            className={clsx(
              "flex items-center w-full p-3 rounded",
              "text-red-500 hover:text-red-400",
              "hover:bg-corporate-black/20", 
              desktopCompact ? "justify-center" : "justify-start"
            )}
            title="Cerrar sesión"
          >
            <SIDEBAR_BOTTOM_LINK.icon className="w-5 h-5" />
            {!desktopCompact && (
              <span className="ml-3 hidden md:block text-md">
                Cerrar sesión
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
