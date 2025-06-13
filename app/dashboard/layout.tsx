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
    const { desktopCompact } = useSidebar();
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <main className={clsx(
          "min-h-screen bg-gray-100 w-full transition-all duration-300",
          "md:ml-16",
          desktopCompact ? "md:ml-16" : "md:ml-64"
        )}>
          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}