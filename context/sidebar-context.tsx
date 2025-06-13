"use client";
import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  mobileOpen: boolean; // Control móvil
  desktopCompact: boolean; // Control desktop
  toggleMobile: () => void;
  toggleDesktop: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  mobileOpen: true,
  desktopCompact: false,
  toggleMobile: () => {},
  toggleDesktop: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(true);
  const [desktopCompact, setDesktopCompact] = useState(false);

  return (
    <SidebarContext.Provider value={{
      mobileOpen,
      desktopCompact,
      toggleMobile: () => setMobileOpen(!mobileOpen),
      toggleDesktop: () => setDesktopCompact(!desktopCompact),
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);