'use client'
import { SidebarProvider } from "@/context/sidebar-context";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebar } from "@/context/sidebar-context";
import clsx from "clsx";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {mobileOpen } = useSidebar();
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <main className={clsx(
          "min-h-screen bg-gray-100 w-full transition-all duration-300",
          {
            "ml-14": mobileOpen, 
          },
          "md:ml-50"
        )}>
          <div className="">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}