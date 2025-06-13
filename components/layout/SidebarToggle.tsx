"use client";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";
import clsx from "clsx";
export default function SidebarToggle() {
  const { mobileOpen, desktopCompact, toggleMobile, toggleDesktop } = useSidebar();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className={clsx(
          "md:hidden p-2 fixed z-50 bg-white rounded-full shadow",
          "top-3 left-3 transition-all",
          mobileOpen && "left-20" // Ajuste posición cuando sidebar está abierto
        )}
        onClick={toggleMobile}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Toggle */}
      <button
        className="hidden md:block p-2 fixed top-4 left-16 z-40 bg-green-700 rounded-r-full"
        onClick={toggleDesktop}
      >
        {desktopCompact ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>
    </>
  );
}