"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_LINKS } from "@/constants/sidebar";
import clsx from "clsx";
import Logo from "./Logo";
import { useSidebar } from "@/context/sidebar-context";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
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
  
  const handleChangePassword = () => {
    // Lógica para cambiar contraseña
    toast.info("Funcionalidad de cambiar contraseña");
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
          !desktopCompact && "md:w-46"
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

        {/*Settings */}
        <div className="mt-auto p-2 border-t border-corporate-dark">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={clsx(
                  "flex items-center w-full p-3 rounded-lg",
                  "text-corporate-white hover:bg-corporate-black/20",
                  desktopCompact ? "justify-center" : "justify-start",
                  "cursor-pointer focus:outline-none"
                )}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {!desktopCompact && (
                  <span className="font-raleway ml-3 hidden md:block text-sm">
                    Settings
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="right"
              align="start"
              className="w-48 bg-corporate-dark border border-corporate-slate text-corporate-white"
            >
              <DropdownMenuItem 
                className="cursor-pointer font-raleway hover:bg-corporate-slate focus:bg-corporate-slate"
                onClick={handleChangePassword}
              >
                Cambiar contraseña
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer font-raleway text-red-500 hover:bg-red-500/10 focus:bg-red-500/10"
                onClick={handleLogout}
              >
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}
