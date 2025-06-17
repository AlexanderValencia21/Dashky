'use client'
import { SidebarProvider } from "@/context/sidebar-context";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebar } from "@/context/sidebar-context";
import clsx from "clsx";
import PrivateRoute from "@/components/auth/private-route";
import LoadingSpinner from "@/components/ui/loading-spinner";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {mobileOpen } = useSidebar();
  return (
    <PrivateRoute loadingComponent={<LoadingSpinner fullScreen />}>
    <SidebarProvider>
      <div className="flex bg-corporate-white">
        <Sidebar />
        <main className={clsx(
          "min-h-screen bg-corporate-white w-full transition-all duration-300",
          {
            "ml-16": mobileOpen, 
          },
          "md:ml-46"
        )}>
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
    </PrivateRoute>
  );
}